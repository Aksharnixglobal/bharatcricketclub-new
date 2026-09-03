import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MapPin, Clock, RefreshCw, ExternalLink } from 'lucide-react';
import { fetchLiveSchedules, getCachedSchedules, DCL_SCHEDULES_URL } from '../services/dallasCricket';
import type { Match } from '../services/dallasCricket';
import scheduleSnapshot from '../data/schedule.json';

export const Fixtures: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(() => {
    const cached = getCachedSchedules();
    if (cached && cached.length > 0) return cached;
    return (scheduleSnapshot.matches as Match[]) || [];
  });
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [fixturesFilter, setFixturesFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [seasonFilter, setSeasonFilter] = useState<'Fall 2026' | 'All'>('Fall 2026');
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  const loadSchedules = async () => {
    setLoadingMatches(true);
    try {
      const live = await fetchLiveSchedules();
      if (live && live.length > 0) {
        setMatches(live);
        setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.error('Failed to fetch live matches from Dallas Cricket League:', err);
    } finally {
      setLoadingMatches(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const fallCount = matches.filter(m => m.season === 'Fall 2026' || m.type.includes('Fall')).length;

  const seasonMatches = matches.filter(m => {
    if (seasonFilter === 'All') return true;
    return m.season === 'Fall 2026' || m.type.includes('Fall');
  });

  const upcomingMatches = seasonMatches.filter(m => m.status === 'upcoming' || m.status === 'live');
  const completedMatches = seasonMatches.filter(m => m.status === 'completed');

  const displayedMatches = seasonMatches.filter(m => {
    if (fixturesFilter === 'upcoming') return m.status === 'upcoming' || m.status === 'live';
    if (fixturesFilter === 'completed') return m.status === 'completed';
    return true;
  });

  return (
    <>
      <Navbar currentPage="fixtures" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="hero-star-row" style={{ justifyContent: 'center' }}>
            <div className="hero-star-line"></div>
            <span className="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div className="hero-star-line r"></div>
          </div>
          <h1 className="page-title">Fixtures & Results</h1>
          <p className="page-subtitle">
            Live on-demand match schedules, results, and official league scorecards directly connected to Dallas Cricket League.
          </p>
        </div>
      </section>

      {/* Fixtures Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          
          {/* Season Selector */}
          <div className="season-bar">
            <span className="season-label">Tournament Season:</span>
            <div className="season-tabs">
              <button 
                type="button"
                className={`season-tab ${seasonFilter === 'Fall 2026' ? 'active' : ''}`}
                onClick={() => setSeasonFilter('Fall 2026')}
              >
                Fall 2026 ({fallCount || 14})
              </button>
              <button 
                type="button"
                className={`season-tab ${seasonFilter === 'All' ? 'active' : ''}`}
                onClick={() => setSeasonFilter('All')}
              >
                All Seasons ({matches.length})
              </button>
            </div>
          </div>

          {/* Fixtures Toolbar with Filters & Live Sync */}
          <div className="fixtures-toolbar">
            <div className="fixtures-filters">
              <button 
                type="button"
                className={`fixtures-pill ${fixturesFilter === 'all' ? 'active' : ''}`}
                onClick={() => setFixturesFilter('all')}
              >
                All Matches <span className="pill-count">{seasonMatches.length}</span>
              </button>
              <button 
                type="button"
                className={`fixtures-pill ${fixturesFilter === 'upcoming' ? 'active' : ''}`}
                onClick={() => setFixturesFilter('upcoming')}
              >
                Upcoming <span className="pill-count">{upcomingMatches.length}</span>
              </button>
              <button 
                type="button"
                className={`fixtures-pill ${fixturesFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setFixturesFilter('completed')}
              >
                Results <span className="pill-count">{completedMatches.length}</span>
              </button>
            </div>

            <div className="fixtures-actions">
              <div className="sync-status-badge">
                <span className={`sync-dot ${loadingMatches ? 'loading' : ''}`}></span>
                <span>{loadingMatches ? 'Syncing DCL...' : lastSynced ? `Updated ${lastSynced}` : 'Live DCL Sync'}</span>
              </div>
              <button 
                type="button"
                className="btn-sync" 
                onClick={() => loadSchedules()}
                disabled={loadingMatches}
                title="Fetch latest schedules from Dallas Cricket League on demand"
              >
                <RefreshCw size={13} className={loadingMatches ? 'spin-icon' : ''} />
                <span>{loadingMatches ? 'Fetching...' : 'Refresh'}</span>
              </button>
              <a 
                href={DCL_SCHEDULES_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-dcl-link"
                title="View full official team schedule on Dallas Cricket League portal"
              >
                <span>DCL Official</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Matches Grid */}
          <div className="card-grid">
            {displayedMatches.length === 0 ? (
              <div className="empty-fixtures-card glass-card">
                <h4>No {fixturesFilter} fixtures found</h4>
                <p>
                  {fixturesFilter === 'upcoming' 
                    ? 'All scheduled matches for this round have been completed. Check back soon or view the full schedule on Dallas Cricket League.'
                    : 'No matches found matching the selected filter.'}
                </p>
                <div style={{ marginTop: '16px' }}>
                  <a 
                    href={DCL_SCHEDULES_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', fontSize: '0.85rem' }}
                  >
                    <span>View Official DCL Schedules</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ) : (
              displayedMatches.map((match, idx) => (
                <div key={match.id || idx} className="glass-card match-card">
                  <div className="match-header">
                    {match.id ? (
                      <a 
                        href={`https://www.dallascricket.org/match/${match.id}/scorecard-view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="match-header-link"
                        title="View match on Dallas Cricket League"
                      >
                        {match.type}
                      </a>
                    ) : (
                      <span title={match.type}>{match.type}</span>
                    )}
                    <span className={`match-status ${
                      match.status === 'completed' ? 'status-completed' : 
                      match.status === 'live' ? 'status-live' : 'status-upcoming'
                    }`}>
                      {match.status}
                    </span>
                  </div>
                  <div className="match-teams">
                    <div className="team">
                      <div className="team-logo">
                        <img src="./images/brand/bcc-logo.jpg" alt="Bharat Cricket Club Logo" />
                      </div>
                      <div className="team-name">Bharat CC</div>
                      {match.status === 'completed' && match.ourScore !== undefined && (
                        <div className="team-score">
                          {match.ourScore}
                          <span className="team-wickets">/{match.ourWickets || 0}</span>
                        </div>
                      )}
                    </div>
                    <div className="match-versus">VS</div>
                    <div className="team">
                      <div className="team-logo">🛡️</div>
                      <div className="team-name">{match.opponent}</div>
                      {match.status === 'completed' && match.oppScore !== undefined && (
                        <div className="team-score">
                          {match.oppScore}
                          <span className="team-wickets">/{match.oppWickets || 0}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="match-footer">
                    <div className="match-venue" title={match.venue}>
                      <MapPin size={14} />
                      <span>{match.venue}</span>
                    </div>
                    <div className="match-result">
                      {match.status === 'completed' ? (
                        match.result
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold-light)' }}>
                          <Clock size={14} /> {match.date} {match.time ? `• ${match.time}` : ''}
                        </div>
                      )}
                    </div>
                  </div>
                  {match.id && (
                    <div className="match-card-action">
                      <a 
                        href={`https://www.dallascricket.org/match/${match.id}/scorecard-view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-scorecard"
                        title={`View official scorecard for match #${match.id}`}
                      >
                        <span>{match.status === 'completed' ? 'Scorecard' : 'Match Details'}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};
