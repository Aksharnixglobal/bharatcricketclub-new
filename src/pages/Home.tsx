import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowRight, Trophy, Users, Calendar, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

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
              Join Us <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </a>
            <a href="team.html" className="btn btn-secondary">
              Meet Our Teams
            </a>
          </div>
        </div>
      </header>

      {/* Club Highlights Banner */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card glass-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Active Squads (T20 & T30)</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">DFW Premier Leagues</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Matches Played</div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Passion & Community Pride</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="section-title" style={{ marginBottom: '16px' }}>Our Mission & Heritage</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '24px' }}>
                Bharat Cricket Club By UGNT is a premier North Texas cricket organization rooted in community, 
                discipline, and competitive excellence. Under the auspices of the United Gujaratis of North Texas, 
                our club unites dedicated cricket warriors across Dallas-Fort Worth to compete at the highest level of league cricket.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '30px' }}>
                <a href="team.html" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} />
                  <span>View Squads & Honors</span>
                </a>
                <a href="fixtures.html" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} />
                  <span>Live Fixtures & Results</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Grid */}
      <section className="section" style={{ background: 'rgba(5, 14, 26, 0.5)' }}>
        <div className="container">
          <h2 className="section-title">Explore The Club</h2>
          <p className="section-subtitle">
            Navigate through our teams, league fixtures, executive leaders, and community partners.
          </p>

          <div className="card-grid">
            <a href="team.html" className="glass-card nav-feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon-box">
                <Users size={28} color="var(--gold-light)" />
              </div>
              <h3 className="font-oswald" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', margin: '12px 0 8px', textTransform: 'uppercase' }}>
                Our Teams
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Meet BCC DFCL T20, BCC DLCL T20, and BCC DLCL T30 squads, along with our 2025 and 2024 Star Performers.
              </p>
              <div className="feature-card-arrow">Explore Teams →</div>
            </a>

            <a href="fixtures.html" className="glass-card nav-feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon-box">
                <Calendar size={28} color="var(--gold-light)" />
              </div>
              <h3 className="font-oswald" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', margin: '12px 0 8px', textTransform: 'uppercase' }}>
                Fixtures & Results
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Live Dallas Cricket League integration with scores, upcoming match dates, venues, and official match scorecards.
              </p>
              <div className="feature-card-arrow">View Match Center →</div>
            </a>

            <a href="leagues.html" className="glass-card nav-feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon-box">
                <Trophy size={28} color="var(--gold-light)" />
              </div>
              <h3 className="font-oswald" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', margin: '12px 0 8px', textTransform: 'uppercase' }}>
                Leagues
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Competing across DFCL, DLCL T30, DLCL T20, LECA, and premier leather ball associations across DFW.
              </p>
              <div className="feature-card-arrow">See Leagues →</div>
            </a>

            <a href="leaders.html" className="glass-card nav-feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon-box">
                <ShieldCheck size={28} color="var(--gold-light)" />
              </div>
              <h3 className="font-oswald" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', margin: '12px 0 8px', textTransform: 'uppercase' }}>
                Club Leaders
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Meet the President, Executive Director, Strategy Director, Captains, and Committee driving BCC.
              </p>
              <div className="feature-card-arrow">Meet Leadership →</div>
            </a>

            <a href="sponsors.html" className="glass-card nav-feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon-box">
                <Award size={28} color="var(--gold-light)" />
              </div>
              <h3 className="font-oswald" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', margin: '12px 0 8px', textTransform: 'uppercase' }}>
                Our Sponsors
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Recognizing Infinity Legacy, Grain Market, Rajula's Kitchen, NLP Financial, AksharNix, and TrophyHub.
              </p>
              <div className="feature-card-arrow">View Sponsors →</div>
            </a>

            <a href="community-partner.html" className="glass-card nav-feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon-box">
                <HeartHandshake size={28} color="var(--gold-light)" />
              </div>
              <h3 className="font-oswald" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', margin: '12px 0 8px', textTransform: 'uppercase' }}>
                Community Partners
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Standing shoulder to shoulder with United Gujaratis of North Texas and Battle of Bats.
              </p>
              <div className="feature-card-arrow">View Partners →</div>
            </a>
          </div>
        </div>
      </section>

      {/* Community Spotlight Banner */}
      <section className="section">
        <div className="container">
          <div className="glass-card" style={{ padding: '36px', border: '1px solid rgba(216, 144, 24, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
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
        </div>
      </section>

      <Footer />
    </>
  );
};
