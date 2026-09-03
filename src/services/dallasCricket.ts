export interface Match {
  id?: number;
  opponent: string;
  opponentLogo?: string;
  date: string;
  time: string;
  venue: string;
  status: 'live' | 'upcoming' | 'completed';
  type: string;
  season?: string;
  ourScore?: string;
  ourWickets?: string;
  oppScore?: string;
  oppWickets?: string;
  result?: string;
  dclUrl?: string;
  scorecardUrl?: string;
  rawDate?: string;
}

export interface RawDCLMatch {
  id: number;
  mst_tournament_id?: number;
  tournament_name?: string;
  league?: string;
  team1_id: number;
  team2_id: number;
  team1Name?: string;
  team2Name?: string;
  ground_name?: string;
  location?: string;
  date: string;
  start_time?: string;
  end_time?: string;
  is_match_ended?: number;
  edit_status?: number;
  score_details?: string | Record<string, unknown>;
}

export const DCL_TEAM_ID = 308;
export const DCL_SCHEDULES_URL = 'https://www.dallascricket.org/team/308/schedules';

// Format time string like "13:30:00" to "1:30 PM"
export function formatMatchTime(timeStr?: string): string {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let h = parseInt(parts[0], 10);
  const m = parts[1];
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

// Format date string like "2026-08-30" to "Aug 30, 2026"
export function formatMatchDate(dateStr?: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Parse single DCL match object into application Match format
export function parseDCLMatch(m: RawDCLMatch): Match {
  const isTeam1 = m.team1_id === DCL_TEAM_ID || (m.team1Name && m.team1Name.toLowerCase().includes('bharat'));
  const opponent = (isTeam1 ? m.team2Name : m.team1Name) || 'TBD';
  
  let scoreData: any = null;
  if (m.score_details) {
    try {
      scoreData = typeof m.score_details === 'string' ? JSON.parse(m.score_details) : m.score_details;
    } catch {
      scoreData = null;
    }
  }

  const venue = m.ground_name ? m.ground_name.trim() : 'Dallas Cricket Ground';
  const dateFormatted = formatMatchDate(m.date);
  const timeFormatted = formatMatchTime(m.start_time);

  let ourScore: string | undefined;
  let ourWickets: string | undefined;
  let oppScore: string | undefined;
  let oppWickets: string | undefined;
  let result: string | undefined;

  const hasInningsData = scoreData && (
    (scoreData.inning1 && scoreData.inning1.runs !== undefined) ||
    (scoreData.inning2 && scoreData.inning2.runs !== undefined)
  );
  const isEnded = m.is_match_ended === 1 || Boolean(scoreData?.extraDetails?.wonBy);

  // Compare date with today's date
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  let status: 'live' | 'upcoming' | 'completed' = 'upcoming';
  if (isEnded || hasInningsData || (m.date && m.date < todayStr)) {
    status = 'completed';
  } else if (m.date === todayStr) {
    status = scoreData?.isLive ? 'live' : 'upcoming';
  }

  if (scoreData) {
    const inn1 = scoreData.inning1;
    const inn2 = scoreData.inning2;

    const ourInn = (inn1 && (inn1.teamId === DCL_TEAM_ID || inn1.teamName?.toLowerCase().includes('bharat'))) ? inn1 :
                   (inn2 && (inn2.teamId === DCL_TEAM_ID || inn2.teamName?.toLowerCase().includes('bharat'))) ? inn2 :
                   (isTeam1 ? inn1 : inn2);
    const oppInn = ourInn === inn1 ? inn2 : inn1;

    if (ourInn && ourInn.runs !== undefined) {
      ourScore = String(ourInn.runs);
      ourWickets = String(ourInn.wickets ?? 0);
    }
    if (oppInn && oppInn.runs !== undefined) {
      oppScore = String(oppInn.runs);
      oppWickets = String(oppInn.wickets ?? 0);
    }

    if (scoreData.extraDetails?.message) {
      result = String(scoreData.extraDetails.message).trim();
    } else if (scoreData.extraDetails?.isNoResult) {
      result = 'No Result (Weather/Abandoned)';
    } else if (scoreData.extraDetails?.isTied) {
      result = 'Match Tied';
    } else if (scoreData.extraDetails?.wonBy) {
      result = scoreData.extraDetails.wonBy === DCL_TEAM_ID ? 'Bharat CC won' : `${opponent} won`;
    }
  }

  return {
    id: m.id,
    opponent,
    date: dateFormatted,
    time: timeFormatted,
    venue,
    status,
    type: m.tournament_name || m.league || 'DLCL Tournament',
    season: (m.tournament_name || '').includes('Fall') ? 'Fall 2026' : (m.tournament_name || '').includes('Summer') ? 'Summer 2026' : 'Other',
    ourScore,
    ourWickets,
    oppScore,
    oppWickets,
    result: result || (status === 'upcoming' ? 'Upcoming Fixture' : 'Match Completed'),
    dclUrl: DCL_SCHEDULES_URL,
    scorecardUrl: m.id ? `https://www.dallascricket.org/match/${m.id}/scorecard-view` : undefined,
    rawDate: m.date ? `${m.date}T${m.start_time || '00:00:00'}` : undefined,
  };
}

const STORAGE_KEY = 'bcc_dcl_schedules_cache_v1';

// Attempt fetching from endpoint with fallbacks
async function fetchFromUrl(url: string): Promise<RawDCLMatch[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.teamShedules || [];
  } finally {
    clearTimeout(timeoutId);
  }
}

// Fetch all paginated pages (offset 0, 1, 2...) so we don't truncate at 10 matches
async function fetchAllFromBaseUrl(baseUrl: string): Promise<RawDCLMatch[]> {
  // Fetch offset 0 and offset 1 in parallel to get at least 20 matches immediately
  const [page0, page1] = await Promise.all([
    fetchFromUrl(`${baseUrl}&offset=0`),
    fetchFromUrl(`${baseUrl}&offset=1`),
  ]);

  const all = [...page0, ...page1];

  // If page1 returned 10 items, fetch page 2 to capture the complete history
  if (page1.length === 10) {
    try {
      const page2 = await fetchFromUrl(`${baseUrl}&offset=2`);
      if (page2 && page2.length > 0) {
        all.push(...page2);
      }
    } catch {
      // Ignore
    }
  }

  // Deduplicate by match ID
  const seen = new Set<number>();
  return all.filter(m => {
    if (!m.id || seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });
}

/**
 * Fetches schedules for Bharat CC (Team 308) from Dallas Cricket League on demand.
 * Tries Vite dev proxy in local development, and CORS proxy in production.
 */
export async function fetchLiveSchedules(teamId: number = DCL_TEAM_ID): Promise<Match[]> {
  const isDev = import.meta.env.DEV;
  
  // Build candidate URLs in order of preference
  const urls: string[] = [];
  if (isDev) {
    // Vite dev server proxy
    urls.push(`/api/dcl/api/schedules/${teamId}?teamId=${teamId}`);
  }
  // Public CORS proxies that support port 3000
  urls.push(`https://cors.eu.org/https://dallascricket.org:3000/api/schedules/${teamId}?teamId=${teamId}`);

  let rawList: RawDCLMatch[] = [];
  let fetchError: unknown = null;

  for (const url of urls) {
    try {
      rawList = await fetchAllFromBaseUrl(url);
      if (rawList && rawList.length > 0) {
        break; // Successfully received data
      }
    } catch (err) {
      fetchError = err;
    }
  }

  if (rawList.length === 0 && fetchError) {
    console.warn('Live DCL fetch failed, falling back to cached/local schedules:', fetchError);
    // Check local storage
    const cached = getCachedSchedules();
    if (cached && cached.length > 0) {
      return cached;
    }
  }

  const parsed = rawList.map(parseDCLMatch);

  // Sort: Upcoming and Live games first (closest date first), then Completed games (newest first)
  parsed.sort((a, b) => {
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    if (a.status === 'completed' && b.status !== 'completed') return 1;

    const timeA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
    const timeB = b.rawDate ? new Date(b.rawDate).getTime() : 0;

    if (a.status !== 'completed') {
      // Upcoming: ascending (soonest first)
      return timeA - timeB;
    }
    // Completed: descending (most recent first)
    return timeB - timeA;
  });

  // Cache to localStorage if in browser
  if (typeof window !== 'undefined' && parsed.length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        data: parsed,
        timestamp: Date.now()
      }));
    } catch {
      // Ignore quota errors
    }
  }

  return parsed;
}

// Read cached schedules from localStorage for instant initial paint
export function getCachedSchedules(): Match[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.data || null;
  } catch {
    return null;
  }
}
