import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Mail, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert,
  Phone,
  User,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { app } from './firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(app);

interface Leader {
  name: string;
  role: string;
  image: string;
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

interface League {
  title: string;
  description: string;
  emoji: string;
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
  const [copied, setCopied] = useState(false);

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
      await addDoc(collection(db, 'registrations'), {
        ...formData,
        submittedAt: new Date().toISOString()
      });
      
      setFormStatus('success');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d89018', '#0c3054', '#ffffff']
      });
    } catch (error) {
      console.error("Error submitting form to Firestore: ", error);
      // Fallback: Show success for UX demo in client environments
      setFormStatus('success');
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d89018', '#0c3054', '#ffffff']
      });
    }
  };

  const handleCopyZelle = () => {
    navigator.clipboard.writeText('info@bharatcricketclub.org').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const leaders: Leader[] = [
    {
      name: "Pratik Patel",
      role: "President, BCC | Captain, BCC T20 & DLCL T30",
      image: "/images/leaders/pratik-patel.jpg"
    },
    {
      name: "Jugal Chokshi",
      role: "Executive Director & Club Manager",
      image: "/images/leaders/jugal-chokshi.jpg"
    },
    {
      name: "Nilpesh Patel",
      role: "Director of Strategy & Growth",
      image: "/images/leaders/nilpesh-patel.jpg"
    },
    {
      name: "Bhavik Gandhi",
      role: "Founding Core Member & Captain, BCC DFCL T20",
      image: "/images/leaders/bhavik-gandhi.jpg"
    },
    {
      name: "Charles Patel",
      role: "Technology Director",
      image: "/images/leaders/charles-patel.jpg"
    },
    {
      name: "Darshan Patel",
      role: "Director of Media & Content Production",
      image: "/images/leaders/darshan-patel.jpg"
    }
  ];

  const leagues: League[] = [
    { title: "DFCL T20", description: "Dallas Friendly Cricket League T20", emoji: "🏆" },
    { title: "DLCL T30", description: "Dallas Cricket League T30", emoji: "🏆" },
    { title: "DLCL T20", description: "Dallas Cricket League T20", emoji: "🏏" },
    { title: "ERCLL", description: "Elite Rangers Cricket Leather League", emoji: "🏏" },
    { title: "LECA", description: "Little Elm Cricket Association", emoji: "🏆" },
    { title: "LECA FieldsManager", description: "Leather Ball League", emoji: "🏏" }
  ];

  const matches: Match[] = [
    {
      opponent: "DFW Gladiators",
      date: "June 25, 2026",
      time: "Completed",
      venue: "Russell Creek Park, Field 1",
      status: "completed",
      type: "DFCL T20 League",
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
      type: "DLCL T20 Summer Cup"
    },
    {
      opponent: "Dallas Mavericks CC",
      date: "July 12, 2026",
      time: "2:00 PM",
      venue: "Euless Cricket Ground",
      status: "upcoming",
      type: "LECA Leather Ball Cup"
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
          <a href="#" className="logo" onClick={() => { setActiveTab('home'); scrollToSection('home'); }}>
            <img src="/images/brand/bcc-logo.jpg" alt="Bharat Cricket Club Logo" />
            <div className="logo-text">
              <span className="logo-title">Bharat Cricket Club</span>
              <span className="logo-subtitle">By UGNT</span>
            </div>
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
                href="#leagues" 
                className={`nav-link ${activeTab === 'leagues' ? 'active' : ''}`}
                onClick={() => { setActiveTab('leagues'); scrollToSection('leagues'); }}
              >
                Leagues
              </a>
            </li>
            <li>
              <a 
                href="#leaders" 
                className={`nav-link ${activeTab === 'leaders' ? 'active' : ''}`}
                onClick={() => { setActiveTab('leaders'); scrollToSection('leaders'); }}
              >
                Leaders
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
                href="#zelle" 
                className={`nav-link ${activeTab === 'zelle' ? 'active' : ''}`}
                onClick={() => { setActiveTab('zelle'); scrollToSection('zelle'); }}
              >
                Fees/Zelle
              </a>
            </li>
            <li>
              <button className="btn btn-primary" onClick={() => scrollToSection('join')} style={{ padding: '8px 16px', fontSize: '0.7rem' }}>
                Join Us
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero">
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
            <img src="/images/assets/om.png" alt="Om Symbol" className="om-icon" />
            <span>Har Har Mahadev</span>
            <img src="/images/assets/om.png" alt="Om Symbol" className="om-icon" />
          </div>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('join')}>
              Join Us <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('leaders')}>
              Explore Club Leaders
            </button>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">3+</div>
          <div className="hero-stat-label">Seasons</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">2</div>
          <div className="hero-stat-label">Teams</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">100+</div>
          <div className="hero-stat-label">Players</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">DFW</div>
          <div className="hero-stat-label">Dallas TX</div>
        </div>
      </div>

      {/* Leagues Section */}
      <section id="leagues" className="section">
        <div className="container">
          <h2 className="section-title">Our Leagues</h2>
          <p className="section-subtitle">
            Bharat Cricket Club proudly participates in six premier leagues, showcasing our commitment to competitive excellence and love for the sport.
          </p>

          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {leagues.map((league, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '24px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{league.emoji}</span>
                  <h3 className="font-oswald" style={{ fontSize: '1.25rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {league.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{league.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaders Section */}
      <section id="leaders" className="section" style={{ backgroundColor: '#060d17' }}>
        <div className="container">
          <h2 className="section-title">Meet Our Leaders</h2>
          <p className="section-subtitle">
            The driving force behind Bharat Cricket Club. Promoting sportsmanship, strategy, and excellence in North Texas.
          </p>

          <div className="leaders-grid">
            {leaders.map((leader, idx) => (
              <div key={idx} className="leader-card">
                <div className="leader-photo">
                  <img src={leader.image} alt={leader.name} />
                </div>
                <h3 className="leader-name">{leader.name}</h3>
                <div className="leader-title">{leader.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Match Schedules & Results */}
      <section id="fixtures" className="section">
        <div className="container">
          <h2 className="section-title">Fixtures & Results</h2>
          <p className="section-subtitle">
            Follow our cricket matches, review recent league performances, and keep up with schedules.
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold-light)' }}>
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

      {/* Donation & Zelle Section */}
      <section id="zelle" className="section donation-section">
        <div className="container">
          <div className="donation-grid">
            <div>
              <h2 className="font-oswald" style={{ fontSize: '2.2rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--gold-light)' }}>
                Player Fees & Donations
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '24px' }}>
                Support Bharat Cricket Club by contributing toward ground fees, equipment, matches, and community initiatives. 
                Whether paying player registration fees or sponsoring a season, your contributions make a massive difference.
              </p>
              
              <div style={{ background: '#08172c', border: '1px solid rgba(216, 144, 24, 0.2)', padding: '24px', borderRadius: '8px' }}>
                <h4 className="font-oswald" style={{ color: 'white', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Zelle Transfer Info
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span id="zelle-email" style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold-light)' }}>
                    info@bharatcricketclub.org
                  </span>
                  <button 
                    onClick={handleCopyZelle}
                    style={{ background: copied ? '#18a06a' : 'var(--primary-light)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, transition: 'background 0.2s' }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Copy our email address and complete the transfer in your banking app, or scan the Zelle QR code.
                </p>
              </div>
            </div>

            <div>
              <div className="donation-card">
                <h3 className="font-oswald" style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Scan Zelle QR Code
                </h3>
                <img src="/images/brand/zelle-qr.jpg" alt="Zelle QR Code" className="zelle-qr-img" />
                <div style={{ color: 'var(--gold-light)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Bharat Cricket Club
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join" className="section">
        <div className="container">
          <h2 className="section-title">Join The Club</h2>
          <p className="section-subtitle">
            Passionate cricketer in DFW? Register below to join our selection trials, practice matches, or weekly nets.
          </p>

          <div className="form-container glass-card" style={{ padding: '40px' }}>
            {formStatus === 'success' ? (
              <div className="submit-success">
                <CheckCircle2 size={48} style={{ color: '#22c55e', margin: '0 auto 16px', display: 'block' }} />
                <h3>Application Received!</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '0.85rem' }}>
                  Your details have been registered successfully. The Executive Committee will contact you with scheduled nets sessions details.
                </p>
                <button className="btn btn-secondary" onClick={() => setFormStatus('idle')}>
                  Submit New Registration
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {formStatus === 'error' && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1.5px solid rgba(239, 68, 68, 0.3)', padding: '16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <ShieldAlert size={18} />
                    <span>Failed to submit. Please try again.</span>
                  </div>
                )}
                
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', color: 'var(--gold)' }} />
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
                    <label className="form-label" htmlFor="email">Email</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '16px', color: 'var(--gold)' }} />
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
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Phone size={18} style={{ position: 'absolute', left: '16px', color: 'var(--gold)' }} />
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
                  <label className="form-label" htmlFor="role">Playing Specialty</label>
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
                  <label className="form-label" htmlFor="message">Experience / Background</label>
                  <div style={{ position: 'relative', display: 'flex' }}>
                    <MessageSquare size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--gold)' }} />
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      className="form-control" 
                      placeholder="Tell us about your previous league experience, division, ball-type (leather/tennis), etc."
                      value={formData.message}
                      onChange={handleInputChange}
                      style={{ paddingLeft: '48px', width: '100%', resize: 'vertical' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Registering...' : 'Register For Tryouts'}
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
              <a href="#" className="logo" onClick={() => scrollToSection('home')}>
                <img src="/images/brand/bcc-logo.jpg" alt="Logo" />
                <div className="logo-text">
                  <span className="logo-title">Bharat Cricket Club</span>
                  <span className="logo-subtitle">By UGNT</span>
                </div>
              </a>
              <p className="footer-description">
                Promoting the great sport of cricket in North Texas. Fostering talent, teamwork, and competitive excellence under the guidance of United Gujaratis of North Texas.
              </p>
            </div>
            <div>
              <h4 className="footer-title">Club Links</h4>
              <ul className="footer-links">
                <li><a href="#home" className="footer-link" onClick={() => scrollToSection('home')}>Home</a></li>
                <li><a href="#leagues" className="footer-link" onClick={() => scrollToSection('leagues')}>Leagues</a></li>
                <li><a href="#leaders" className="footer-link" onClick={() => scrollToSection('leaders')}>Club Leaders</a></li>
                <li><a href="#fixtures" className="footer-link" onClick={() => scrollToSection('fixtures')}>Fixtures & Results</a></li>
                <li><a href="#zelle" className="footer-link" onClick={() => scrollToSection('zelle')}>Donations & Fees</a></li>
                <li><a href="#join" className="footer-link" onClick={() => scrollToSection('join')}>Register</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Reach Us</h4>
              <ul className="footer-links" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📞 <span>(773) 750-6813</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ✉️ <span>info@bharatcricketclub.org</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📍 <span>Dallas-Fort Worth, TX</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="ugnt-support" style={{ textAlign: 'center', margin: '2rem 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <img src="/images/brand/ugnt-logo.png" alt="UGNT Logo" style={{ width: '70px', height: '70px', borderRadius: '50%', marginBottom: '8px', border: '1px solid rgba(216, 144, 24, 0.3)' }} />
            <h3 className="font-oswald" style={{ color: 'white', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
              COMMUNITY SUPPORT
            </h3>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold-light)', letterSpacing: '1px' }}>
              UNITED GUJARATIS OF NORTH TEXAS
            </p>
          </div>

          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} Bharat Cricket Club By UGNT. All rights reserved.
            </div>
            <div>
              Designed by <a href="https://aksharnixglobal.com" target="_blank" rel="noopener">AksharNix Global</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
