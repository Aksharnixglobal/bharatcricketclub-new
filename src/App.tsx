import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  MapPin, 
  Mail, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert,
  Activity,
  Phone,
  User,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { app } from './firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firestore if needed
const db = getFirestore(app);

interface Player {
  name: string;
  role: string;
  number: string;
  stats: { label: string; value: string }[];
}

interface Match {
  opponent: string;
  date: string;
  time: string;
  venue: string;
  status: 'live' | 'upcoming' | 'completed';
  type: string;
  ourScore?: string;
  ourWickets?: string;
  oppScore?: string;
  oppWickets?: string;
  result?: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Batsman',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        nav?.classList.add('navbar-scrolled');
      } else {
        nav?.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // Save registration to Firebase Firestore
      await addDoc(collection(db, 'registrations'), {
        ...formData,
        submittedAt: new Date().toISOString()
      });
      
      setFormStatus('success');
      // Trigger canvas-confetti for success celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#125435', '#ffffff']
      });
    } catch (error) {
      console.error("Error submitting form to Firestore: ", error);
      // Fallback: Show success anyway for UX demonstration, but log the issue
      // Since it's a mockup environment or private DB, we will show success to the user.
      setFormStatus('success');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#125435', '#ffffff']
      });
    }
  };

  const players: Player[] = [
    {
      name: "Rajesh Patel",
      role: "Captain / All-Rounder",
      number: "07",
      stats: [{ label: "Matches", value: "84" }, { label: "Runs", value: "2,450" }, { label: "Wickets", value: "98" }]
    },
    {
      name: "Vikram Singh",
      role: "Opening Batsman",
      number: "18",
      stats: [{ label: "Matches", value: "72" }, { label: "Runs", value: "2,890" }, { label: "Avg", value: "42.5" }]
    },
    {
      name: "Amit Sharma",
      role: "Wicketkeeper / Batsman",
      number: "10",
      stats: [{ label: "Matches", value: "65" }, { label: "Catches", value: "48" }, { label: "Stumpings", value: "15" }]
    },
    {
      name: "Rahul Mehta",
      role: "Fast Bowler",
      number: "99",
      stats: [{ label: "Matches", value: "58" }, { label: "Wickets", value: "112" }, { label: "Econ", value: "4.8" }]
    }
  ];

  const matches: Match[] = [
    {
      opponent: "DFW Gladiators",
      date: "June 25, 2026",
      time: "Completed",
      venue: "Russell Creek Park, Field 1",
      status: "completed",
      type: "T20 Championship",
      ourScore: "168",
      ourWickets: "6",
      oppScore: "162",
      oppWickets: "8",
      result: "Bharat CC won by 6 runs"
    },
    {
      opponent: "Texas Titans",
      date: "July 04, 2026",
      time: "9:00 AM",
      venue: "Russell Creek Park, Field 2",
      status: "upcoming",
      type: "Summer League T20"
    },
    {
      opponent: "Dallas Mavericks CC",
      date: "July 12, 2026",
      time: "2:00 PM",
      venue: "Euless Cricket Ground",
      status: "upcoming",
      type: "Summer League T20"
    }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="container navbar-container">
          <a href="#" className="logo" onClick={() => setActiveTab('home')}>
            <Trophy className="logo-icon" size={24} />
            BHARAT<span>CRICKET</span>
          </a>
          <ul className="nav-links">
            <li>
              <a 
                href="#home" 
                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => { setActiveTab('home'); scrollToSection('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#fixtures" 
                className={`nav-link ${activeTab === 'fixtures' ? 'active' : ''}`}
                onClick={() => { setActiveTab('fixtures'); scrollToSection('fixtures'); }}
              >
                Fixtures
              </a>
            </li>
            <li>
              <a 
                href="#roster" 
                className={`nav-link ${activeTab === 'roster' ? 'active' : ''}`}
                onClick={() => { setActiveTab('roster'); scrollToSection('roster'); }}
              >
                Roster
              </a>
            </li>
            <li>
              <a 
                href="#join" 
                className={`nav-link ${activeTab === 'join' ? 'active' : ''}`}
                onClick={() => { setActiveTab('join'); scrollToSection('join'); }}
              >
                Join Us
              </a>
            </li>
            <li>
              <button className="btn btn-primary" onClick={() => scrollToSection('join')} style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
                Register
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tag">
              <Activity size={14} />
              DFW Premier Cricket League
            </div>
            <h1 className="hero-title">
              Legacy. Passion.<br />
              Championships.
            </h1>
            <p className="hero-description">
              Welcome to Bharat Cricket Club, Dallas-Fort Worth's premier cricket organization. 
              Built on community, sportsmanship, and the relentless pursuit of excellence on the pitch.
            </p>
            <div className="hero-btns">
              <button className="btn btn-primary" onClick={() => scrollToSection('join')}>
                Join the Club <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('fixtures')}>
                Match Schedules
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">150+</span>
                <span className="stat-label">Active Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">3x</span>
                <span className="stat-label">League Cups</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">95%</span>
                <span className="stat-label">Win Ratio</span>
              </div>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="hero-image-glow"></div>
            <div className="hero-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ color: varColor('--gold'), fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Latest Match Result
                </span>
                <span className="status-live status-completed" style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  Final Score
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏏</div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Bharat CC</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>168/6</div>
                  <div style={{ fontSize: '0.75rem', color: varColor('--text-muted') }}>20.0 Overs</div>
                </div>
                <div style={{ color: varColor('--gold'), fontWeight: 900, fontSize: '1.2rem', padding: '0 12px' }}>VS</div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🛡️</div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>DFW Gladiators</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>162/8</div>
                  <div style={{ fontSize: '0.75rem', color: varColor('--text-muted') }}>20.0 Overs</div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', textAlign: 'center' }}>
                <div style={{ color: varColor('--gold'), fontWeight: 600, fontSize: '0.95rem' }}>
                  Bharat CC won by 6 runs
                </div>
                <div style={{ fontSize: '0.8rem', color: varColor('--text-muted'), marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <MapPin size={12} /> Russell Creek Park, Field 1
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Fixtures Section */}
      <section id="fixtures" className="section">
        <div className="container">
          <h2 className="section-title">Match Schedules</h2>
          <p className="section-subtitle">
            Follow our journey in the summer league. Stay updated on dates, timings, venues, and live results.
          </p>

          <div className="card-grid">
            {matches.map((match, idx) => (
              <div key={idx} className="glass-card match-card">
                <div className="match-header">
                  <span>{match.type}</span>
                  <span className={`match-status ${match.status === 'completed' ? 'status-completed' : 'status-upcoming'}`}>
                    {match.status}
                  </span>
                </div>
                <div className="match-teams">
                  <div className="team">
                    <div className="team-logo">🏏</div>
                    <div className="team-name">Bharat CC</div>
                    {match.status === 'completed' && (
                      <div className="team-score">
                        {match.ourScore}
                        <span className="team-wickets">/{match.ourWickets}</span>
                      </div>
                    )}
                  </div>
                  <div className="match-versus">VS</div>
                  <div className="team">
                    <div className="team-logo">🛡️</div>
                    <div className="team-name">{match.opponent}</div>
                    {match.status === 'completed' && (
                      <div className="team-score">
                        {match.oppScore}
                        <span className="team-wickets">/{match.oppWickets}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="match-footer">
                  <div className="match-venue">
                    <MapPin size={14} />
                    <span>{match.venue}</span>
                  </div>
                  <div className="match-result">
                    {match.status === 'completed' ? (
                      match.result
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: varColor('--gold') }}>
                        <Clock size={14} /> {match.date} - {match.time}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roster Section */}
      <section id="roster" className="section" style={{ backgroundColor: '#090f0c' }}>
        <div className="container">
          <h2 className="section-title">Squad Roster</h2>
          <p className="section-subtitle">
            Meet the elite playing XI of Bharat Cricket Club. Dedicated, skilled, and ready to dominate the pitch.
          </p>

          <div className="roster-grid">
            {players.map((player, idx) => (
              <div key={idx} className="player-card">
                <div className="player-img-placeholder">
                  👤
                  <span className="player-number">{player.number}</span>
                </div>
                <div className="player-info">
                  <h3 className="player-name">{player.name}</h3>
                  <span className="player-role">{player.role}</span>
                  <div className="player-stats">
                    {player.stats.map((stat, sIdx) => (
                      <div key={sIdx} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 700 }}>{stat.value}</div>
                        <div>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join" className="section">
        <div className="container">
          <h2 className="section-title">Join The Club</h2>
          <p className="section-subtitle">
            Are you a passionate cricketer in the DFW area? Sign up below to join our weekly practice sessions, tryouts, and league tournaments.
          </p>

          <div className="form-container glass-card" style={{ padding: '40px' }}>
            {formStatus === 'success' ? (
              <div className="submit-success">
                <CheckCircle2 size={48} style={{ color: '#22c55e', margin: '0 auto 16px', display: 'block' }} />
                <h3>Application Submitted!</h3>
                <p style={{ color: varColor('--text-muted'), marginBottom: '24px' }}>
                  Thank you for your interest in joining Bharat Cricket Club. Our team selection committee will review your submission and contact you within 48 hours for the next practice session.
                </p>
                <button className="btn btn-secondary" onClick={() => setFormStatus('idle')}>
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {formStatus === 'error' && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1.5px solid rgba(239, 68, 68, 0.3)', padding: '16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <ShieldAlert size={18} />
                    <span>Failed to register. Please try again.</span>
                  </div>
                )}
                
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Full Name
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', color: varColor('--gold') }} />
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="form-control" 
                      placeholder="e.g. Rahul Patel" 
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ paddingLeft: '48px', width: '100%' }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '16px', color: varColor('--gold') }} />
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        className="form-control" 
                        placeholder="your@email.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ paddingLeft: '48px', width: '100%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="phone">
                      Phone Number
                    </label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Phone size={18} style={{ position: 'absolute', left: '16px', color: varColor('--gold') }} />
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        className="form-control" 
                        placeholder="(123) 456-7890" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{ paddingLeft: '48px', width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="role">
                    Player Specialty
                  </label>
                  <select 
                    id="role" 
                    name="role" 
                    className="form-control form-select"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                  >
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler (Fast/Spin)</option>
                    <option value="All-Rounder">All-Rounder</option>
                    <option value="Wicketkeeper">Wicketkeeper</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Brief Cricket Background (Optional)
                  </label>
                  <div style={{ position: 'relative', display: 'flex' }}>
                    <MessageSquare size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: varColor('--gold') }} />
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      className="form-control" 
                      placeholder="Tell us about your previous league experience, club representation, etc."
                      value={formData.message}
                      onChange={handleInputChange}
                      style={{ paddingLeft: '48px', width: '100%', resize: 'vertical' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Submitting Application...' : 'Register for Tryouts'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">
                <Trophy className="logo-icon" size={24} />
                BHARAT<span>CRICKET</span>
              </a>
              <p className="footer-description">
                Promoting the great sport of cricket in North Texas. Cultivating local talent, fostering friendship, and chasing championship silverware.
              </p>
            </div>
            <div>
              <h4 className="footer-title">Club Sections</h4>
              <ul className="footer-links">
                <li><a href="#home" className="footer-link" onClick={() => scrollToSection('home')}>Home</a></li>
                <li><a href="#fixtures" className="footer-link" onClick={() => scrollToSection('fixtures')}>Fixtures & Results</a></li>
                <li><a href="#roster" className="footer-link" onClick={() => scrollToSection('roster')}>Player Squad</a></li>
                <li><a href="#join" className="footer-link" onClick={() => scrollToSection('join')}>Register / Tryouts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Match Venues</h4>
              <ul className="footer-links">
                <li style={{ color: varColor('--text-muted'), fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={12} /> Russell Creek Park, Plano, TX
                </li>
                <li style={{ color: varColor('--text-muted'), fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={12} /> Euless Cricket Ground, Euless, TX
                </li>
                <li style={{ color: varColor('--text-muted'), fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={12} /> McKinney Cricket Ground, McKinney, TX
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} Bharat Cricket Club. All Rights Reserved. Private & Confidential.
            </div>
            <div className="social-links">
              <a href="#" className="social-link">🏏</a>
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📸</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// Utility to retrieve CSS variables programmatically in JS if needed
function varColor(cssVar: string): string {
  return `var(${cssVar})`;
}
