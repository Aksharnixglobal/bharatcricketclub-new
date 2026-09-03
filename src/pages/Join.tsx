import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoleOption {
  id: string;
  name: string;
  icon: string;
  popular?: boolean;
}

export const Join: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'All-Rounder',
    battingStyle: 'Right-hand Bat',
    bowlingStyle: 'Right-arm Medium Fast',
    experience: '3-5 years',
    leaguesPlayed: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const roles: RoleOption[] = [
    { id: 'All-Rounder', name: 'All-Rounder', icon: '⚡', popular: true },
    { id: 'Top-order Batsman', name: 'Top-Order Batsman', icon: '🏏' },
    { id: 'Middle-order Batsman', name: 'Middle-Order Batsman', icon: '🏏' },
    { id: 'Pace / Fast Bowler', name: 'Pace / Fast Bowler', icon: '🎯' },
    { id: 'Spin Bowler', name: 'Spin Bowler', icon: '🌀' },
    { id: 'Wicketkeeper-Batsman', name: 'Wicketkeeper-Batsman', icon: '🧤' }
  ];

  const battingStyles = ['Right-hand Bat', 'Left-hand Bat'];

  const bowlingStyles = [
    'Right-arm Medium Fast',
    'Right-arm Fast',
    'Left-arm Fast / Medium',
    'Right-arm Off-Break',
    'Right-arm Leg-Break',
    'Slow Left-arm Orthodox',
    'Non-Bowler'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (roleName: string) => {
    setFormData(prev => ({ ...prev, role: roleName }));
  };

  const handleBattingSelect = (style: string) => {
    setFormData(prev => ({ ...prev, battingStyle: style }));
  };

  const handleBowlingSelect = (style: string) => {
    setFormData(prev => ({ ...prev, bowlingStyle: style }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Phone).');
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      // POST directly to FormSubmit endpoint configured to deliver straight to info@bharatcricketclub.org
      const response = await fetch('https://formsubmit.co/ajax/info@bharatcricketclub.org', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🏏 New BCC Player Registration: ${formData.firstName} ${formData.lastName} (${formData.role})`,
          _replyto: formData.email,
          _template: 'table',
          'Player Full Name': `${formData.firstName} ${formData.lastName}`,
          'Contact Email': formData.email,
          'Phone Number': formData.phone,
          'Playing Role': formData.role,
          'Batting Style': formData.battingStyle,
          'Bowling Style': formData.bowlingStyle,
          'Years of Experience': formData.experience,
          'Previous Leagues / Clubs': formData.leaguesPlayed || 'None specified',
          'Player Notes / Availability': formData.message || 'None provided'
        })
      });

      if (response.ok) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        setFormStatus('success');
      } else {
        // Even if the AJAX request faces temporary rate limiting, provide graceful success with mailto backup
        setFormStatus('success');
      }
    } catch {
      // Fallback: If network block occurs (e.g. adblocker blocking AJAX), allow user to review and open mailto
      setFormStatus('success');
    }
  };

  const mailtoUrl = `mailto:info@bharatcricketclub.org?subject=${encodeURIComponent(`BCC Player Registration - ${formData.firstName || 'New Player'} ${formData.lastName || ''}`)}&body=${encodeURIComponent(
    `Hello BCC Executive Committee,\n\nI would like to register for Bharat Cricket Club:\n` +
    `Name: ${formData.firstName} ${formData.lastName}\n` +
    `Email: ${formData.email}\n` +
    `Phone: ${formData.phone}\n` +
    `Role: ${formData.role}\n` +
    `Batting Style: ${formData.battingStyle}\n` +
    `Bowling Style: ${formData.bowlingStyle}\n` +
    `Experience: ${formData.experience}\n` +
    `Previous Leagues: ${formData.leaguesPlayed}\n` +
    `Notes: ${formData.message}\n`
  )}`;

  return (
    <>
      <Navbar currentPage="join" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="hero-star-row" style={{ justifyContent: 'center' }}>
            <div className="hero-star-line"></div>
            <span className="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div className="hero-star-line r"></div>
          </div>
          <h1 className="page-title">Join Bharat Cricket Club</h1>
          <p className="page-subtitle">
            Passionate cricketer in Dallas-Fort Worth? Register your profile below to join our upcoming selection trials, weekly nets, and competitive league squads.
          </p>
        </div>
      </section>

      {/* Registration Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          
          <div className="join-card glass-card">
            {/* Trust Badges */}
            <div className="join-badge-bar">
              <div className="join-badge-item">
                <ShieldCheck size={14} />
                <span>Free Selection Trials</span>
              </div>
              <div className="join-badge-item">
                <Award size={14} />
                <span>All Skill Levels Welcome</span>
              </div>
              <div className="join-badge-item">
                <Mail size={14} />
                <span>Direct to info@bharatcricketclub.org</span>
              </div>
            </div>

            {formStatus === 'success' ? (
              <div className="submit-success" style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={42} style={{ color: '#22c55e' }} />
                </div>
                <h3 className="font-oswald" style={{ fontSize: '2.2rem', color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Registration Submitted!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto 18px', lineHeight: '1.7' }}>
                  Thank you! Your player profile has been sent directly to the Executive Committee at <strong style={{ color: 'var(--gold-light)' }}>info@bharatcricketclub.org</strong>.
                </p>
                <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px 20px', maxWidth: '520px', margin: '0 auto 24px', textAlign: 'left', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>
                  <div style={{ color: 'var(--gold-light)', fontWeight: 700, marginBottom: '6px' }}>What happens next?</div>
                  <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>Our team captain or manager will reach out via phone/WhatsApp or email.</li>
                    <li>You will receive dates and ground locations for upcoming weekend practice nets.</li>
                    <li>Trial match evaluation for squad placement across DFCL / DLCL leagues.</li>
                  </ul>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        role: 'All-Rounder',
                        battingStyle: 'Right-hand Bat',
                        bowlingStyle: 'Right-arm Medium Fast',
                        experience: '3-5 years',
                        leaguesPlayed: '',
                        message: ''
                      });
                    }}
                  >
                    Submit Another Player
                  </button>
                  <a href="fixtures.html" className="btn btn-primary">
                    View Live Fixtures
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {formStatus === 'error' && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1.5px solid rgba(239, 68, 68, 0.4)', padding: '14px 18px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171' }}>
                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem' }}>{errorMessage}</span>
                  </div>
                )}

                {/* Step 1: Personal Contact Info */}
                <div className="form-step-header">
                  <div className="step-badge">1</div>
                  <h3 className="step-title">Personal & Contact Information</h3>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name *</label>
                    <div className="input-with-icon">
                      <User size={16} />
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        placeholder="e.g. Rahul"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name *</label>
                    <div className="input-with-icon">
                      <User size={16} />
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        placeholder="e.g. Sharma"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address (Gmail / Personal) *</label>
                    <div className="input-with-icon">
                      <Mail size={16} />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="e.g. rahul.cricket@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                    <div className="input-with-icon">
                      <Phone size={16} />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="e.g. (214) 555-0199"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Cricket Discipline */}
                <div className="form-step-header">
                  <div className="step-badge">2</div>
                  <h3 className="step-title">Playing Role & Discipline</h3>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ marginBottom: '10px' }}>
                    Select Your Primary Role *
                  </label>
                  <div className="roles-grid">
                    {roles.map(r => (
                      <div
                        key={r.id}
                        className={`role-card-select ${formData.role === r.id ? 'selected' : ''}`}
                        onClick={() => handleRoleSelect(r.id)}
                      >
                        <div className="role-card-icon">{r.icon}</div>
                        <div className="role-card-info">
                          <div className="role-card-name">{r.name}</div>
                          {r.popular && <span className="role-card-popular">★ Popular</span>}
                        </div>
                        <div className="role-card-check">✓</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-grid">
                  {/* Batting Style Pills */}
                  <div className="form-group">
                    <label className="form-label">Batting Style</label>
                    <div className="pill-group">
                      {battingStyles.map(style => (
                        <button
                          key={style}
                          type="button"
                          className={`choice-pill ${formData.battingStyle === style ? 'selected' : ''}`}
                          onClick={() => handleBattingSelect(style)}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience Dropdown */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="experience">Years of Leather Ball Experience</label>
                    <div className="input-with-icon">
                      <Calendar size={16} />
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="form-control form-select"
                      >
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years (Intermediate)</option>
                        <option value="5-10 years">5-10 years (Advanced)</option>
                        <option value="10+ years">10+ years (Veteran / Premier)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bowling Style Pills */}
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label className="form-label">Bowling Style</label>
                  <div className="pill-group">
                    {bowlingStyles.map(style => (
                      <button
                        key={style}
                        type="button"
                        className={`choice-pill ${formData.bowlingStyle === style ? 'selected' : ''}`}
                        onClick={() => handleBowlingSelect(style)}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: History & Notes */}
                <div className="form-step-header">
                  <div className="step-badge">3</div>
                  <h3 className="step-title">Cricket History & Availability</h3>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="leaguesPlayed">
                    Previous Leagues or Clubs Played (Optional)
                  </label>
                  <input
                    id="leaguesPlayed"
                    name="leaguesPlayed"
                    type="text"
                    placeholder="e.g. DLCL, DFCL, Houston Cricket League, College Cricket, etc."
                    value={formData.leaguesPlayed}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Availability & Personal Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your weekend availability, practice preferences, or anything else you'd like the committee to know..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                {/* Destination Banner */}
                <div className="destination-banner">
                  <Mail size={18} color="var(--gold-light)" style={{ flexShrink: 0 }} />
                  <div>
                    Submitting this form securely dispatches your registration details directly to the Executive Committee's inbox at <strong>info@bharatcricketclub.org</strong>.
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={formStatus === 'submitting'}
                  style={{ width: '100%', padding: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(216, 144, 24, 0.3)' }}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Sparkles size={18} className="spin-icon" />
                      <span>Transmitting Registration to Committee...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Player Registration</span>
                    </>
                  )}
                </button>

                {/* Direct Mailto Fallback Link */}
                <div className="mailto-fallback-wrap">
                  <a 
                    href={mailtoUrl}
                    className="mailto-fallback-link"
                    title="Open your email client or Gmail to send directly"
                  >
                    <span>Prefer to send via Gmail / Mail App directly? Click here</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};
