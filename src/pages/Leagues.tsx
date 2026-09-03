import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Calendar, ArrowRight } from 'lucide-react';

interface LeagueItem {
  title: string;
  category: string;
  description: string;
  emoji: string;
  format: string;
  highlights: string[];
}

export const Leagues: React.FC = () => {
  // Official leagues roster - ERCLL successfully removed per club direction
  const leagues: LeagueItem[] = [
    { 
      title: "DFCL T20", 
      category: "Dallas Friendly Cricket League", 
      description: "Premier T20 tournament bringing together competitive teams across North Texas. High-energy white ball cricket.", 
      emoji: "🏆",
      format: "20 Overs · White Ball",
      highlights: ["Competitive DFW clubs", "Weekend fixtures", "T20 Championship format"]
    },
    { 
      title: "DLCL T30", 
      category: "Dallas Cricket League T30", 
      description: "Premier 30-over leather ball tournament requiring endurance, tactical prowess, and deep squad depth.", 
      emoji: "🏆",
      format: "30 Overs · Leather Ball",
      highlights: ["Extended format cricket", "Official DCL rankings", "Summer & Fall tournaments"]
    },
    { 
      title: "DLCL T20", 
      category: "Dallas Cricket League T20", 
      description: "Fast-paced T20 league featuring top tier Dallas-Fort Worth talent and fierce regional rivalry.", 
      emoji: "🏏",
      format: "20 Overs · Leather Ball",
      highlights: ["High strike rate batting", "Precision bowling", "Knockout playoffs"]
    },
    { 
      title: "LECA", 
      category: "Little Elm Cricket Association", 
      description: "Prestigious North Texas cricket association hosting competitive seasonal tournaments across top regional venues.", 
      emoji: "🏆",
      format: "T20 & Limited Overs",
      highlights: ["Quality natural turf & turf-mat pitches", "Community fan base", "Championship trophies"]
    },
    { 
      title: "LECA FieldsManager", 
      category: "Leather Ball League", 
      description: "Competitive leather ball division focusing on traditional cricketing disciplines, field management, and tactical execution.", 
      emoji: "🏏",
      format: "Leather Ball Championship",
      highlights: ["Traditional leather ball", "Full match officiating", "Seasonal points tables"]
    }
  ];

  return (
    <>
      <Navbar currentPage="leagues" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="hero-star-row" style={{ justifyContent: 'center' }}>
            <div className="hero-star-line"></div>
            <span className="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div className="hero-star-line r"></div>
          </div>
          <h1 className="page-title">Participating Leagues</h1>
          <p className="page-subtitle">
            Bharat Cricket Club proudly fields competitive squads in the premier cricket associations across Dallas-Fort Worth.
          </p>
        </div>
      </section>

      {/* Leagues Cards */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card-grid">
            {leagues.map((league, idx) => (
              <div key={idx} className="glass-card league-card">
                <div className="league-icon-header">
                  <span className="league-emoji">{league.emoji}</span>
                  <span className="league-format-badge">{league.format}</span>
                </div>
                <h3 className="league-title">{league.title}</h3>
                <h4 className="league-category">{league.category}</h4>
                <p className="league-desc">{league.description}</p>

                <div className="league-highlights">
                  {league.highlights.map((h, i) => (
                    <span key={i} className="league-highlight-tag">
                      ✓ {h}
                    </span>
                  ))}
                </div>

                <div className="league-footer">
                  <a href="fixtures.html" className="btn-league-fixtures">
                    <Calendar size={13} />
                    <span>View Fixtures</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Schedule CTA */}
          <div className="glass-card" style={{ marginTop: '50px', padding: '36px', textAlign: 'center', border: '1px solid rgba(216,144,24,0.3)' }}>
            <h3 className="font-oswald" style={{ color: 'var(--gold-light)', fontSize: '1.6rem', textTransform: 'uppercase', marginBottom: '8px' }}>
              Follow Bharat CC's League Journey
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '650px', margin: '0 auto 20px', fontSize: '0.9rem' }}>
              Stay updated with live game schedules, real-time match statuses, ground locations, and official scorecards.
            </p>
            <a href="fixtures.html" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
              Check Live Fixtures & Scorecards →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
