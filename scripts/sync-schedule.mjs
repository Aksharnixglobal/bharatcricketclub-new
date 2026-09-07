#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const DCL_TEAM_ID = 308;
const BASE_API_URL = `https://dallascricket.org:3000/api/schedules/${DCL_TEAM_ID}?teamId=${DCL_TEAM_ID}`;
const DCL_SCHEDULES_URL = `https://www.dallascricket.org/team/${DCL_TEAM_ID}/schedules`;

function formatMatchTime(timeStr) {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let h = parseInt(parts[0], 10);
  const m = parts[1];
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

function formatMatchDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function parseDCLMatch(m) {
  const isTeam1 = m.team1_id === DCL_TEAM_ID || (m.team1Name && m.team1Name.toLowerCase().includes('bharat'));
  const opponent = (isTeam1 ? m.team2Name : m.team1Name) || 'TBD';

  let scoreData = null;
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

  let ourScore;
  let ourWickets;
  let oppScore;
  let oppWickets;
  let result;

  const hasInningsData = scoreData && (
    (scoreData.inning1 && scoreData.inning1.runs !== undefined) ||
    (scoreData.inning2 && scoreData.inning2.runs !== undefined)
  );
  const isEnded = m.is_match_ended === 1 || Boolean(scoreData?.extraDetails?.wonBy);

  // Status computation
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  let status = 'upcoming';
  if (isEnded || hasInningsData || (m.date && m.date < todayStr && m.is_match_ended !== 0 && m.is_match_ended !== null)) {
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

  const stageName = (m.name && m.name.toLowerCase() !== 'league') ? m.name : undefined;
  const tournamentTitle = m.tournament_name || m.league || 'DLCL Tournament';
  const displayType = stageName ? `${tournamentTitle} • ${stageName}` : tournamentTitle;

  return {
    id: m.id,
    opponent,
    date: dateFormatted,
    time: timeFormatted,
    venue,
    status,
    stage: stageName,
    type: displayType,
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

async function fetchOffset(offset) {
  const url = `${BASE_API_URL}&offset=${offset}`;
  const res = await fetch(url, {
    headers: {
      'Origin': 'https://www.dallascricket.org',
      'Referer': 'https://www.dallascricket.org/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
      'Accept': 'application/json, text/plain, */*'
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from ${url}`);
  }
  const data = await res.json();
  return data.teamShedules || [];
}

async function sync() {
  console.log(`[Sync] Fetching schedules from Dallas Cricket League for Team ${DCL_TEAM_ID}...`);
  const allRaw = [];
  let offset = 0;
  let keepGoing = true;

  while (keepGoing && offset < 10) {
    console.log(`[Sync] Requesting page offset ${offset}...`);
    try {
      const list = await fetchOffset(offset);
      if (!list || list.length === 0) {
        keepGoing = false;
      } else {
        allRaw.push(...list);
        if (list.length < 10) {
          keepGoing = false;
        } else {
          offset++;
        }
      }
    } catch (err) {
      console.error(`[Sync] Error at offset ${offset}:`, err.message);
      keepGoing = false;
    }
  }

  if (allRaw.length === 0) {
    console.error('[Sync] Failed to retrieve any matches from DCL. Keeping existing schedule.');
    process.exit(1);
  }

  // Deduplicate by match id
  const seen = new Set();
  const deduped = [];
  for (const m of allRaw) {
    if (m.id && !seen.has(m.id)) {
      seen.add(m.id);
      deduped.push(m);
    }
  }

  console.log(`[Sync] Retrieved ${deduped.length} unique matches.`);

  const parsed = deduped.map(parseDCLMatch);

  // Sort: Upcoming and Live games first (closest date first), then Completed games (newest first)
  parsed.sort((a, b) => {
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    if (a.status === 'completed' && b.status !== 'completed') return 1;

    const timeA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
    const timeB = b.rawDate ? new Date(b.rawDate).getTime() : 0;

    if (a.status !== 'completed') {
      // Upcoming: soonest first
      return timeA - timeB;
    }
    // Completed: newest first
    return timeB - timeA;
  });

  const upcomingCount = parsed.filter(m => m.status === 'upcoming' || m.status === 'live').length;
  const completedCount = parsed.filter(m => m.status === 'completed').length;
  console.log(`[Sync] Processed: ${upcomingCount} upcoming/live matches, ${completedCount} completed matches.`);

  const schedulePayload = {
    teamId: DCL_TEAM_ID,
    teamName: 'Bharat Cricket Club',
    season: 'Fall 2026',
    dclUrl: DCL_SCHEDULES_URL,
    totalMatches: parsed.length,
    upcomingCount,
    completedCount,
    updatedAt: new Date().toISOString(),
    matches: parsed
  };

  // Ensure output directories exist
  const srcDataDir = path.join(ROOT_DIR, 'src', 'data');
  const publicDataDir = path.join(ROOT_DIR, 'public', 'data');

  fs.mkdirSync(srcDataDir, { recursive: true });
  fs.mkdirSync(publicDataDir, { recursive: true });

  const srcPath = path.join(srcDataDir, 'schedule.json');
  const publicPath = path.join(publicDataDir, 'schedule.json');

  const jsonContent = JSON.stringify(schedulePayload, null, 2) + '\n';
  fs.writeFileSync(srcPath, jsonContent, 'utf-8');
  fs.writeFileSync(publicPath, jsonContent, 'utf-8');

  console.log(`[Sync] Successfully wrote updated schedules to:`);
  console.log(`  - ${srcPath}`);
  console.log(`  - ${publicPath}`);
}

sync().catch(err => {
  console.error('[Sync] Fatal error:', err);
  process.exit(1);
});
