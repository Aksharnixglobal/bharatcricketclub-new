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
  ExternalLink
} from 'lucide-react';

export const Home: React.FC = () => {
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

          {/* Latest Match Spotlight Banner */}
          <div className="home-match-spotlight">
            <div className="spotlight-top-bar">
              <div className="spotlight-tag">
                <Trophy size={15} />
                <span>Featured Match Result · DLCL Fall 30-Over Tournament</span>
              </div>
              <div className="spotlight-status">
                ✓ Victory by 6 Wickets
              </div>
            </div>

            <div className="spotlight-scoreboard">
              <div className="spotlight-team">
                <div className="spotlight-team-icon">
                  <img 
                    src="./images/brand/bcc-logo.jpg" 
                    alt="Bharat Cricket Club Logo" 
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-light)', boxShadow: '0 0 14px rgba(216,144,24,0.35)', display: 'block' }} 
                  />
                </div>
                <div className="spotlight-team-name">Bharat CC</div>
                <div className="spotlight-score">113/4</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Target: 113 in 30 Ov</div>
              </div>

              <div className="spotlight-vs">VS</div>

              <div className="spotlight-team">
                <div className="spotlight-team-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 44 44" width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="22" cy="22" r="21" fill="#08172c" stroke="rgba(216, 144, 24, 0.45)" strokeWidth="1.5" />
                    <line x1="17" y1="16" x2="17" y2="32" stroke="rgba(255,255,255,0.4)" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="22" y1="15" x2="22" y2="32" stroke="rgba(255,255,255,0.4)" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="27" y1="16" x2="27" y2="32" stroke="rgba(255,255,255,0.4)" strokeWidth="1.6" strokeLinecap="round"/>
                    <line x1="15.5" y1="15" x2="28.5" y2="15" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 11 L32 35" stroke="#E5A824" strokeWidth="2.8" strokeLinecap="round"/>
                    <path d="M32 11 L12 35" stroke="#E5A824" strokeWidth="2.8" strokeLinecap="round"/>
                    <path d="M11 10 L15 15" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round"/>
                    <path d="M33 10 L29 15" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round"/>
                    <circle cx="22" cy="25" r="5.5" fill="#dc2626" stroke="#ffffff" strokeWidth="0.8"/>
                    <path d="M20 22 C21.5 24 21.5 26 20 28" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1 1"/>
                  </svg>
                </div>
                <div className="spotlight-team-name">SPARTANS 11</div>
                <div className="spotlight-score" style={{ color: 'rgba(255,255,255,0.7)' }}>112/10</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>All Out</div>
              </div>
            </div>

            <div className="spotlight-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                <MapPin size={14} color="var(--gold-light)" />
                <span>Trenton Cricket Ground North · Aug 30, 2026</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a 
                  href="https://www.dallascricket.org/match/6021/scorecard-view" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-scorecard"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Official Scorecard</span>
                  <ExternalLink size={12} />
                </a>
                <a 
                  href="fixtures.html" 
                  className="btn-squad-link"
                  style={{ textDecoration: 'none' }}
                >
                  <span>All 14 Fall Fixtures →</span>
                </a>
              </div>
            </div>
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
