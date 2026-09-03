import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MapPin, Clock, RefreshCw, ExternalLink, Calendar, Table, LayoutGrid } from 'lucide-react';
import { fetchLiveSchedules, getCachedSchedules, DCL_SCHEDULES_URL } from '../services/dallasCricket';
import type { Match } from '../services/dallasCricket';
import scheduleSnapshot from '../data/schedule.json';

// Format match results to fit gracefully on one line
const formatMatchResult = (result?: string): { text: string; isWin: boolean } => {
  if (!result) return { text: 'Match Completed', isWin: true };
  const isBccWin = result.toLowerCase().includes('bharat cricket club') || result.toLowerCase().includes('bharat cc');
  let text = result
    .replace(/^Bharat Cricket Club is won by/i, 'Won by')
    .replace(/^Bharat Cricket Club\s+won by/i, 'Won by')
    .replace(/\.$/, '');
  
  if (!isBccWin) {
    text = text.replace(/won by/i, 'won by');
  }
  return { text, isWin: isBccWin };
};

export const Fixtures: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(() => {
    const cached = getCachedSchedules();
    if (cached && cached.length > 0) return cached;
    return (scheduleSnapshot.matches as Match[]) || [];
  });
  const [loadingMatches, setLoadingMatches] = useState(false);
  // Default to 'upcoming' as first tab requested
  const [fixturesFilter, setFixturesFilter] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [seasonFilter, setSeasonFilter] = useState<'Fall 2026' | 'All'>('Fall 2026');
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const loadSchedules = async () => {
    setLoadingMatches(true);
    try {
      const live = await fetchLiveSchedules();
      if (live && live.length > 0) {
        setMatches(live);
        setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch {
      // Keep existing matches
    } finally {
      setLoadingMatches(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const seasonalMatches = matches.filter(m => {
    if (seasonFilter === 'All') return true;
    return (m.season || '').toLowerCase().includes('fall 2026') || 
           (m.type || '').toLowerCase().includes('2026');
  });

  const upcomingMatches = seasonalMatches.filter(m => m.status === 'upcoming' || m.status === 'live');
  const completedMatches = seasonalMatches.filter(m => m.status === 'completed');

  // Display logic: When 'all' is selected, upcoming matches come first, then results
  const displayedMatches = fixturesFilter === 'upcoming'
    ? upcomingMatches
    : fixturesFilter === 'completed'
    ? completedMatches
    : [...upcomingMatches, ...completedMatches];

  return (
    <>
      <Navbar currentPage="fixtures" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container fixtures-container">
          <div className="header-badge-row">
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
      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container fixtures-container">

          {/* Season Selector */}
          <div className="season-selector-bar">
            <span className="season-label">Tournament Season:</span>
            <div className="season-tabs">
              <button 
                type="button"
                className={`season-tab ${seasonFilter === 'Fall 2026' ? 'active' : ''}`}
                onClick={() => setSeasonFilter('Fall 2026')}
              >
                Fall 2026 ({matches.filter(m => (m.season || '').toLowerCase().includes('fall 2026') || (m.type || '').toLowerCase().includes('2026')).length})
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

          {/* Fixtures Filter & Action Bar: Upcoming 1st, Results 2nd, All Matches 3rd */}
          <div className="fixtures-toolbar">
            <div className="fixtures-filters">
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
              <button 
                type="button"
                className={`fixtures-pill ${fixturesFilter === 'all' ? 'active' : ''}`}
                onClick={() => setFixturesFilter('all')}
              >
                All Matches <span className="pill-count">{seasonalMatches.length}</span>
              </button>
            </div>

            <div className="fixtures-actions">
              {/* View Switcher */}
              <div className="fixtures-view-toggle">
                <button
                  type="button"
                  className={`fixtures-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                  title="Panel Table View"
                >
                  <Table size={13} />
                  <span>Table</span>
                </button>
                <button
                  type="button"
                  className={`fixtures-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Box Cards View"
                >
                  <LayoutGrid size={13} />
                  <span>Boxes</span>
                </button>
              </div>

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

          {/* Matches Container */}
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
          ) : viewMode === 'table' ? (
            /* Panel Table View */
            <div className="fixtures-panel-table">
              {/* Panel Header */}
              <div className="panel-table-head">
                <div>Date & Tournament</div>
                <div>Matchup & Scores</div>
                <div>Venue & Time</div>
                <div>Result / Status</div>
                <div style={{ textAlign: 'right' }}>Scorecard</div>
              </div>

              {/* Panel Body */}
              <div className="panel-table-body">
                {displayedMatches.map((match, idx) => {
                  const outcome = formatMatchResult(match.result);
                  return (
                    <div key={match.id || idx} className="panel-table-row">
                      
                      {/* Col 1: Date & League */}
                      <div className="panel-col-meta">
                        <div className="panel-date-badge">
                          <Calendar size={14} color="var(--gold-light)" />
                          <span>{match.date}</span>
                        </div>
                        {match.id ? (
                          <a 
                            href={`https://www.dallascricket.org/match/${match.id}/scorecard-view`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="panel-type-text"
                            title={match.type}
                          >
                            {match.type}
                          </a>
                        ) : (
                          <span className="panel-type-text" title={match.type}>{match.type}</span>
                        )}
                        <span className={`match-status ${
                          match.status === 'completed' ? 'status-completed' : 
                          match.status === 'live' ? 'status-live' : 'status-upcoming'
                        }`} style={{ width: 'fit-content', marginTop: '2px' }}>
                          {match.status}
                        </span>
                      </div>

                      {/* Col 2: Matchup & Scores */}
                      <div className="panel-col-matchup">
                        {/* Bharat CC (with official BCC logo) */}
                        <div className="panel-team-entry">
                          <div className="panel-team-crest">
                            <img src="./images/brand/bcc-logo.jpg" alt="Bharat Cricket Club Logo" />
                          </div>
                          <div className="panel-team-title">Bharat CC</div>
                          {match.status === 'completed' && match.ourScore !== undefined && (
                            <div className="panel-team-score-num">
                              {match.ourScore}
                              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>/{match.ourWickets || 0}</span>
                            </div>
                          )}
                        </div>

                        {/* VS Divider */}
                        <div className="panel-versus-pill">VS</div>

                        {/* Opponent (with regular ball and bat emoji 🏏) */}
                        <div className="panel-team-entry reverse">
                          {match.status === 'completed' && match.oppScore !== undefined && (
                            <div className="panel-team-score-num opp-score">
                              {match.oppScore}
                              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>/{match.oppWickets || 0}</span>
                            </div>
                          )}
                          <div className="panel-team-title" style={{ color: 'rgba(255,255,255,0.85)' }}>{match.opponent}</div>
                          <div className="panel-team-crest opp-crest">
                            <span style={{ fontSize: '1.25rem' }}>🏏</span>
                          </div>
                        </div>
                      </div>

                      {/* Col 3: Venue & Time */}
                      <div className="panel-col-venue">
                        <div className="panel-venue-ground">
                          <MapPin size={14} color="var(--gold-light)" style={{ flexShrink: 0 }} />
                          <span>{match.venue}</span>
                        </div>
                        {match.time && (
                          <div className="panel-venue-time">
                            <Clock size={11} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                            <span>{match.time}</span>
                          </div>
                        )}
                      </div>

                      {/* Col 4: Result / Status */}
                      <div className="panel-col-result">
                        {match.status === 'completed' ? (
                          <span className={`panel-outcome-badge ${outcome.isWin ? '' : 'loss'}`}>
                            {outcome.text}
                          </span>
                        ) : (
                          <span className="panel-outcome-badge upcoming">
                            Upcoming · {match.time || 'TBD'}
                          </span>
                        )}
                      </div>

                      {/* Col 5: Action */}
                      <div className="panel-col-action">
                        {match.id ? (
                          <a 
                            href={`https://www.dallascricket.org/match/${match.id}/scorecard-view`}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-scorecard"
                            title={`View official scorecard on Dallas Cricket League`}
                          >
                            <span>Scorecard</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>—</span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Box Cards Grid View */
            <div className="card-grid">
              {displayedMatches.map((match, idx) => {
                const outcome = formatMatchResult(match.result);
                return (
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
                        <div className="team-logo">
                          <span>🏏</span>
                        </div>
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
                          outcome.text
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
                );
              })}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
};
