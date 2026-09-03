import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { 
  ArrowRight, 
  Trophy, 
  Users, 
  Calendar, 
  ShieldCheck, 
  HeartHandshake, 
  Award,
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react';
import scheduleSnapshot from '../data/schedule.json';

export const Home: React.FC = () => {
  // Real upcoming matches from schedule data (up to 3)
  const upcomingMatches = (scheduleSnapshot.matches as Array<{
    id?: number;
    opponent: string;
    date: string;
    time: string;
    venue: string;
    status: string;
    type: string;
  }>)
    .filter(m => m.status === 'upcoming' || m.status === 'live')
    .slice(0, 3);

  return (
    <>
      <Navbar currentPage="home" />

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-star-row">
            <div className="hero-star-line"></div>
            <span className="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div className="hero-star-line r"></div>
          </div>
          <div className="hero-brand-emblem">
            <img src="./images/brand/bcc-logo.jpg" alt="Bharat Cricket Club Crest" className="hero-bcc-emblem" />
          </div>
          <p className="hero-eyebrow">Welcome to</p>
          <h1 className="hero-title">Bharat Cricket Club</h1>
          <div className="hero-rule"></div>
          <p className="hero-tagline">One Club. One Pride.</p>
          
          <div className="hero-mahadev">
            <img src="./images/assets/om.png" alt="Om Symbol" className="om-icon" />
            <span>Har Har Mahadev</span>
            <img src="./images/assets/om.png" alt="Om Symbol" className="om-icon" />
          </div>

          <div className="hero-buttons">
            <a href="join.html" className="btn btn-primary">
              Join The Club <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </a>
            <a href="fixtures.html" className="btn btn-secondary">
              Live Fixtures & Results
            </a>
          </div>
        </div>
      </header>

      {/* Seamless Golden Hero Stats Ribbon */}
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">3</div>
          <div className="hero-stat-label">Active Squads</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">5+</div>
          <div className="hero-stat-label">Premier Leagues</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">100+</div>
          <div className="hero-stat-label">Match Caps</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">DFW</div>
          <div className="hero-stat-label">Dallas-Fort Worth, TX</div>
        </div>
      </div>

      {/* Main Section */}
      <section className="section" style={{ paddingTop: '50px' }}>
        <div className="container">

          {/* Upcoming Matches Section */}
          <div style={{ marginBottom: '55px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gold-light)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  <Calendar size={14} />
                  <span>Next On The Pitch</span>
                </div>
                <h2 className="section-title" style={{ textAlign: 'left', margin: 0, fontSize: '1.9rem' }}>
                  Upcoming Matches
                </h2>
              </div>
              <a href="fixtures.html" className="btn btn-secondary" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>
                View All {scheduleSnapshot.matches.length} Results →
              </a>
            </div>

            {upcomingMatches.length > 0 ? (
              <div className="home-upcoming-grid">
                {upcomingMatches.map((match, idx) => (
                  <div key={match.id || idx} className="glass-card home-upcoming-card">
                    <div className="upcoming-card-header">
                      <span className="upcoming-type-badge" title={match.type}>{match.type}</span>
                      <span className="upcoming-status-pill">Upcoming</span>
                    </div>

                    <div className="upcoming-date-row">
                      <Clock size={14} color="var(--gold-light)" />
                      <span>{match.date} · {match.time}</span>
                    </div>

                    <div className="upcoming-matchup">
                      <div className="upcoming-team">
                        <div className="upcoming-crest">
                          <img src="./images/brand/bcc-logo.jpg" alt="Bharat Cricket Club Logo" />
                        </div>
                        <span className="upcoming-team-name">Bharat CC</span>
                      </div>

                      <div className="upcoming-vs-badge">VS</div>

                      <div className="upcoming-team">
                        <div className="upcoming-crest opp">
                          <span>🏏</span>
                        </div>
                        <span className="upcoming-team-name">{match.opponent}</span>
                      </div>
                    </div>

                    <div className="upcoming-footer">
                      <div className="upcoming-venue" title={match.venue}>
                        <MapPin size={13} color="var(--gold-light)" style={{ flexShrink: 0 }} />
                        <span>{match.venue}</span>
                      </div>
                      <a href="fixtures.html" className="btn-scorecard" style={{ padding: '5px 12px', fontSize: '0.78rem', textDecoration: 'none' }}>
                        <span>Details</span>
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No scheduled upcoming matches currently */
              <div className="glass-card" style={{ padding: '36px 24px', textAlign: 'center', border: '1.5px solid rgba(216, 144, 24, 0.25)', background: 'linear-gradient(160deg, rgba(14, 34, 68, 0.5) 0%, rgba(7, 20, 40, 0.8) 100%)', borderRadius: '14px' }}>
                <div style={{ fontSize: '2.4rem', marginBottom: '10px' }}>🏏</div>
                <h3 className="font-oswald" style={{ fontSize: '1.35rem', color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>
                  No Upcoming Matches Scheduled
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.65)', maxWidth: '560px', margin: '0 auto 20px', fontSize: '0.92rem', lineHeight: '1.5' }}>
                  All scheduled Fall 2026 matches have concluded. Stay tuned for upcoming tournament announcements and playoff fixtures.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="fixtures.html" className="btn btn-primary" style={{ padding: '9px 22px', fontSize: '0.85rem' }}>
                    View Completed Match Results ({scheduleSnapshot.matches.length})
                  </a>
                  <a 
                    href="https://www.dallascricket.org/team/308/schedules" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary" 
                    style={{ padding: '9px 20px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>DCL Portal</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Club Central</h2>
            <p className="section-subtitle">
              Explore Bharat Cricket Club's competitive squads, live schedules, executive leadership, and sponsors.
            </p>
          </div>

          {/* 6 Structured Non-Overlapping Bento Tiles */}
          <div className="home-explore-grid">
            
            {/* Tile 1: Teams */}
            <a href="team.html" className="nav-feature-card">
              <div className="feature-icon-box">
                <Users size={26} color="var(--gold-light)" />
              </div>
              <h3 className="feature-title">Our Teams & Squads</h3>
              <p className="feature-desc">
                Meet our 3 competitive squads: BCC DFCL T20, BCC DLCL T20, and BCC DLCL T30, plus our 2025 and 2024 Star Performers.
              </p>
              <div className="feature-card-arrow">
                <span>View Squads & Honours</span>
                <ArrowRight size={14} />
              </div>
            </a>

            {/* Tile 2: Fixtures */}
            <a href="fixtures.html" className="nav-feature-card">
              <div className="feature-icon-box">
                <Calendar size={26} color="var(--gold-light)" />
              </div>
              <h3 className="feature-title">Fixtures & Results</h3>
              <p className="feature-desc">
                Live match schedules connected directly to Dallas Cricket League. View upcoming match venues, timings, and official scorecards.
              </p>
              <div className="feature-card-arrow">
                <span>Open Match Center</span>
                <ArrowRight size={14} />
              </div>
            </a>

            {/* Tile 3: Leagues */}
            <a href="leagues.html" className="nav-feature-card">
              <div className="feature-icon-box">
                <Trophy size={26} color="var(--gold-light)" />
              </div>
              <h3 className="feature-title">Participating Leagues</h3>
              <p className="feature-desc">
                Competing across premier North Texas cricket associations including DFCL T20, DLCL T30, DLCL T20, and LECA.
              </p>
              <div className="feature-card-arrow">
                <span>Explore Leagues</span>
                <ArrowRight size={14} />
              </div>
            </a>

            {/* Tile 4: Leaders */}
            <a href="leaders.html" className="nav-feature-card">
              <div className="feature-icon-box">
                <ShieldCheck size={26} color="var(--gold-light)" />
              </div>
              <h3 className="feature-title">Club Leadership</h3>
              <p className="feature-desc">
                Guided by President Pratik Patel, Manager Jugal Chokshi, and an experienced executive committee fostering teamwork and integrity.
              </p>
              <div className="feature-card-arrow">
                <span>Meet Leadership</span>
                <ArrowRight size={14} />
              </div>
            </a>

            {/* Tile 5: Sponsors */}
            <a href="sponsors.html" className="nav-feature-card">
              <div className="feature-icon-box">
                <Award size={26} color="var(--gold-light)" />
              </div>
              <h3 className="feature-title">Our Sponsors</h3>
              <p className="feature-desc">
                Supported by Infinity Legacy Group, Grain Market, Rajula's Kitchen, NLP Financial, AksharNix Global, and TrophyHub.
              </p>
              <div className="feature-card-arrow">
                <span>View Sponsors</span>
                <ArrowRight size={14} />
              </div>
            </a>

            {/* Tile 6: Community Partners */}
            <a href="community-partner.html" className="nav-feature-card">
              <div className="feature-icon-box">
                <HeartHandshake size={26} color="var(--gold-light)" />
              </div>
              <h3 className="feature-title">Community Partners</h3>
              <p className="feature-desc">
                Proud to stand shoulder to shoulder with United Gujaratis of North Texas (UGNT) and Battle of Bats.
              </p>
              <div className="feature-card-arrow">
                <span>View Partners</span>
                <ArrowRight size={14} />
              </div>
            </a>

          </div>

          {/* Community Spotlight Banner */}
          <div className="glass-card" style={{ marginTop: '50px', padding: '36px', border: '1.5px solid rgba(216, 144, 24, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img 
                src="./images/brand/ugnt-logo.png" 
                alt="UGNT Logo" 
                style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(216,144,24,0.4)', flexShrink: 0 }} 
              />
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--gold-light)', textTransform: 'uppercase' }}>
                  Community Pillar
                </span>
                <h3 className="font-oswald" style={{ fontSize: '1.5rem', color: '#fff', margin: '4px 0', textTransform: 'uppercase' }}>
                  United Gujaratis of North Texas
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', margin: 0 }}>
                  Empowering youth, cultural bonding, and community sports across the Dallas-Fort Worth metroplex.
                </p>
              </div>
            </div>
            <a 
              href="https://www.ugnt.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              Visit UGNT Website ↗
            </a>
          </div>

          {/* Join CTA Card */}
          <div className="glass-card" style={{ marginTop: '40px', padding: '40px 24px', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, rgba(216,144,24,0.12) 0%, rgba(8,23,44,0.9) 80%)', border: '1.5px solid rgba(216,144,24,0.3)' }}>
            <h3 className="font-oswald" style={{ fontSize: '1.9rem', color: '#fff', textTransform: 'uppercase', marginBottom: '10px' }}>
              Ready To Play For Bharat Cricket Club?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '640px', margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              We welcome players of all experience levels across Dallas-Fort Worth. Register online to join our weekly practice nets and selection trials.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a href="join.html" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.9rem' }}>
                Register For Trials <ArrowRight size={14} style={{ marginLeft: '6px' }} />
              </a>
              <a href="donate.html" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
                Player Fees & Zelle
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};
