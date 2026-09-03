import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Trophy, Star, Users, ArrowRight } from 'lucide-react';

export const Team: React.FC = () => {
  const teams = [
    {
      name: "BCC DFCL T20",
      league: "DFCL League",
      format: "T20 Format",
      captain: "Bhavik Gandhi",
      viceCaptain: "Pratik Prabhu",
      badge: "DFCL T20"
    },
    {
      name: "BCC DLCL T20",
      league: "DLCL League",
      format: "T20 Format",
      captain: "Pratik Patel",
      viceCaptain: "Nilpesh Patel",
      badge: "DLCL T20"
    },
    {
      name: "BCC DLCL T30",
      league: "DLCL League",
      format: "T30 Format",
      captain: "Pratik Patel",
      viceCaptain: "Jugal Chokshi",
      badge: "DLCL T30"
    }
  ];

  return (
    <>
      <Navbar currentPage="team" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="hero-star-row" style={{ justifyContent: 'center' }}>
            <div className="hero-star-line"></div>
            <span className="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div className="hero-star-line r"></div>
          </div>
          <h1 className="page-title">Our Teams</h1>
          <p className="page-subtitle">
            Meet the BCC squads representing our club across DFCL and DLCL leagues, competing in both T20 and T30 formats.
          </p>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="teams-grid">
            {teams.map((team, idx) => (
              <div key={idx} className="glass-card squad-card">
                <div className="squad-card-header">
                  <div className="squad-logo-wrap">
                    <div className="squad-logo-circle">
                      <img src="./images/brand/bcc-logo.jpg" alt={team.name} />
                    </div>
                  </div>
                  <div className="squad-title-group">
                    <h3 className="squad-name">{team.name}</h3>
                    <div className="squad-meta-tag">{team.league} · {team.format}</div>
                  </div>
                </div>

                <div className="squad-roles">
                  <div className="squad-role-row captain-row">
                    <div className="squad-role-indicator captain-dot"></div>
                    <div className="squad-role-info">
                      <span className="squad-role-title">Captain</span>
                      <span className="squad-player-name">{team.captain}</span>
                    </div>
                  </div>

                  <div className="squad-role-row vice-row">
                    <div className="squad-role-indicator vice-dot"></div>
                    <div className="squad-role-info">
                      <span className="squad-role-title">Vice Captain</span>
                      <span className="squad-player-name">{team.viceCaptain}</span>
                    </div>
                  </div>
                </div>

                <div className="squad-card-footer">
                  <a href="fixtures.html" className="btn-squad-link">
                    <span>View Matches</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Star Performers Section */}
          <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="section-header-inline">
              <h2 className="section-title">Star Performers</h2>
              <p className="section-subtitle">
                Honoring individual brilliance and key match-winners across our competitive seasons.
              </p>
            </div>

            {/* 2025 Honours */}
            <div className="perf-season-block">
              <div className="perf-year-badge">
                <Trophy size={16} />
                <span>2025 Season Honours</span>
              </div>

              <div className="glass-card perf-card">
                <div className="perf-grid">
                  {/* Best Batsman */}
                  <div className="perf-category">
                    <div className="perf-cat-header">
                      <span>🏏 Best Batsman</span>
                    </div>
                    <div className="perf-list">
                      <div className="perf-entry top-entry">
                        <span className="perf-rank">#1</span>
                        <span className="perf-name">Raj Lakkad</span>
                        <span className="perf-crown">★ Top</span>
                      </div>
                      <div className="perf-entry">
                        <span className="perf-rank">•</span>
                        <span className="perf-name">Nilpesh Patel</span>
                      </div>
                      <div className="perf-entry">
                        <span className="perf-rank">•</span>
                        <span className="perf-name">Sanjeet Rath</span>
                      </div>
                      <div className="perf-entry">
                        <span className="perf-rank">•</span>
                        <span className="perf-name">Varun Patel</span>
                      </div>
                    </div>
                  </div>

                  {/* Best Bowler */}
                  <div className="perf-category">
                    <div className="perf-cat-header">
                      <span>🎯 Best Bowler</span>
                    </div>
                    <div className="perf-list">
                      <div className="perf-entry top-entry">
                        <span className="perf-rank">#1</span>
                        <span className="perf-name">Raj Lakkad</span>
                        <span className="perf-crown">★ Top</span>
                      </div>
                      <div className="perf-entry">
                        <span className="perf-rank">•</span>
                        <span className="perf-name">Prabesh A</span>
                      </div>
                      <div className="perf-entry">
                        <span className="perf-rank">•</span>
                        <span className="perf-name">Venky Mudduluru</span>
                      </div>
                      <div className="perf-entry">
                        <span className="perf-rank">•</span>
                        <span className="perf-name">Abhijeet Vaidya</span>
                      </div>
                      <div className="perf-entry">
                        <span className="perf-rank">•</span>
                        <span className="perf-name">Neel Raval</span>
                      </div>
                    </div>
                  </div>

                  {/* Best Fielder */}
                  <div className="perf-category">
                    <div className="perf-cat-header">
                      <span>⚡ Best Fielder</span>
                    </div>
                    <div className="perf-list">
                      <div className="perf-entry top-entry">
                        <span className="perf-rank">#1</span>
                        <span className="perf-name">Vaidik M.</span>
                        <span className="perf-crown">★ Top</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2024 Honours */}
            <div className="perf-season-block" style={{ marginTop: '30px' }}>
              <div className="perf-year-badge">
                <Star size={16} />
                <span>2024 Season Honours</span>
              </div>

              <div className="glass-card perf-card">
                <div className="perf-grid">
                  <div className="perf-category">
                    <div className="perf-cat-header">
                      <span>🏏 Best Batsman</span>
                    </div>
                    <div className="perf-list">
                      <div className="perf-entry top-entry">
                        <span className="perf-rank">#1</span>
                        <span className="perf-name">Gaurav P.</span>
                        <span className="perf-crown">★ Top</span>
                      </div>
                    </div>
                  </div>

                  <div className="perf-category">
                    <div className="perf-cat-header">
                      <span>🎯 Best Bowler</span>
                    </div>
                    <div className="perf-list">
                      <div className="perf-entry top-entry">
                        <span className="perf-rank">#1</span>
                        <span className="perf-name">Darshan Patel</span>
                        <span className="perf-crown">★ Top</span>
                      </div>
                      <div className="perf-entry">
                        <span className="perf-rank">•</span>
                        <span className="perf-name">Pratik Patel</span>
                      </div>
                    </div>
                  </div>

                  <div className="perf-category">
                    <div className="perf-cat-header">
                      <span>⚡ Best Fielder</span>
                    </div>
                    <div className="perf-list">
                      <div className="perf-entry top-entry">
                        <span className="perf-rank">#1</span>
                        <span className="perf-name">Bhavik Gandhi</span>
                        <span className="perf-crown">★ Top</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Club Core Values */}
          <div style={{ marginTop: '50px' }}>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that govern every training session, strategic team meeting, and league contest.
            </p>

            <div className="glass-card" style={{ padding: '20px 30px' }}>
              <div className="values-list">
                <div className="value-item">
                  <div className="value-number">01</div>
                  <div className="value-content">
                    <h4 className="value-title">Excellence</h4>
                    <p className="value-desc">
                      We strive for the highest standards in every match and practice session, pushing our limits to achieve greatness.
                    </p>
                  </div>
                </div>

                <div className="value-item">
                  <div className="value-number">02</div>
                  <div className="value-content">
                    <h4 className="value-title">Teamwork</h4>
                    <p className="value-desc">
                      Individual brilliance shines brightest when supported by team unity. Together, we are unstoppable.
                    </p>
                  </div>
                </div>

                <div className="value-item">
                  <div className="value-number">03</div>
                  <div className="value-content">
                    <h4 className="value-title">Respect</h4>
                    <p className="value-desc">
                      We respect our opponents, officials, and the true spirit of cricket. Integrity and sportsmanship form our foundation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join CTA Card */}
          <div className="glass-card join-banner-card" style={{ marginTop: '50px', textAlign: 'center', padding: '48px 24px' }}>
            <Users size={36} color="var(--gold-light)" style={{ marginBottom: '16px' }} />
            <h3 className="font-oswald" style={{ fontSize: '1.8rem', color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>
              Join The BCC Family
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Be part of the Bharat Cricket Club brotherhood. We are actively looking for talented, passionate players in the Dallas-Fort Worth area!
            </p>
            <a href="join.html" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.85rem' }}>
              Register For Selection Trials
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};
