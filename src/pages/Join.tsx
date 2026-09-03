import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields (Name, Email, Phone).');
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');

    try {
      // Simulate submission network call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setFormStatus('success');
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
    } catch {
      setErrorMessage('Something went wrong while submitting. Please try again.');
      setFormStatus('error');
    }
  };

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
          <h1 className="page-title">Join The Club</h1>
          <p className="page-subtitle">
            Passionate cricketer in Dallas-Fort Worth? Register below to join our selection trials, practice matches, or weekly nets.
          </p>
        </div>
      </section>

      {/* Registration Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="form-container glass-card" style={{ padding: '40px', maxWidth: '850px', margin: '0 auto' }}>
            {formStatus === 'success' ? (
              <div className="submit-success" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={56} style={{ color: '#22c55e', margin: '0 auto 16px', display: 'block' }} />
                <h3 className="font-oswald" style={{ fontSize: '2rem', color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Application Received!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 24px' }}>
                  Your details have been registered successfully. The Executive Committee will contact you with scheduled nets session and trial match details.
                </p>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setFormStatus('idle')}
                >
                  Submit Another Registration
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {formStatus === 'error' && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1.5px solid rgba(239, 68, 68, 0.3)', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <AlertCircle size={20} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <h3 className="font-oswald" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', textTransform: 'uppercase', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  1. Personal Information
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="e.g. Rahul"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name *</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="e.g. Sharma"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="e.g. (214) 555-0199"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <h3 className="font-oswald" style={{ fontSize: '1.4rem', color: 'var(--gold-light)', textTransform: 'uppercase', margin: '30px 0 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  2. Cricket Profile
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="role">Primary Playing Role *</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="Top-order Batsman">Top-order Batsman</option>
                      <option value="Middle-order Batsman">Middle-order Batsman</option>
                      <option value="All-Rounder">All-Rounder</option>
                      <option value="Wicketkeeper-Batsman">Wicketkeeper-Batsman</option>
                      <option value="Pace / Fast Bowler">Pace / Fast Bowler</option>
                      <option value="Spin Bowler">Spin Bowler</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="experience">Years of Leather Ball Experience</label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="battingStyle">Batting Style</label>
                    <select
                      id="battingStyle"
                      name="battingStyle"
                      value={formData.battingStyle}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="Right-hand Bat">Right-hand Bat</option>
                      <option value="Left-hand Bat">Left-hand Bat</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="bowlingStyle">Bowling Style</label>
                    <select
                      id="bowlingStyle"
                      name="bowlingStyle"
                      value={formData.bowlingStyle}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="Right-arm Medium Fast">Right-arm Medium Fast</option>
                      <option value="Right-arm Fast">Right-arm Fast</option>
                      <option value="Left-arm Fast / Medium">Left-arm Fast / Medium</option>
                      <option value="Right-arm Off-Break">Right-arm Off-Break</option>
                      <option value="Right-arm Leg-Break">Right-arm Leg-Break</option>
                      <option value="Slow Left-arm Orthodox">Slow Left-arm Orthodox</option>
                      <option value="Non-Bowler">Non-Bowler</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label" htmlFor="leaguesPlayed">Previous Leagues / Clubs (Optional)</label>
                  <input
                    id="leaguesPlayed"
                    name="leaguesPlayed"
                    type="text"
                    placeholder="e.g. DLCL, DFCL, Houston, Dallas Premier, College, etc."
                    value={formData.leaguesPlayed}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label" htmlFor="message">Any Additional Notes or Availability</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your weekend availability, practice preferences, or anything else..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={formStatus === 'submitting'}
                  style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Send size={16} />
                  <span>{formStatus === 'submitting' ? 'Registering...' : 'Submit Player Registration'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
