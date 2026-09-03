import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Copy, Check, ShieldCheck } from 'lucide-react';

export const Donate: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyZelle = () => {
    navigator.clipboard.writeText('info@bharatcricketclub.org');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar currentPage="donate" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="hero-star-row" style={{ justifyContent: 'center' }}>
            <div className="hero-star-line"></div>
            <span className="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div className="hero-star-line r"></div>
          </div>
          <h1 className="page-title">Player Fees & Donations</h1>
          <p className="page-subtitle">
            Support Bharat Cricket Club by contributing toward ground fees, match equipment, league registrations, and community athletics.
          </p>
        </div>
      </section>

      {/* Donation Grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="donation-grid">
            <div>
              <h2 className="font-oswald" style={{ fontSize: '2.2rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--gold-light)' }}>
                Empowering The Club
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '24px' }}>
                Whether you are paying seasonal player dues or generously donating to support our cricket operations, 
                every contribution directly funds turf ground bookings, professional white balls, certified umpires, 
                and tournament entries across Dallas-Fort Worth.
              </p>
              
              <div style={{ background: '#08172c', border: '1px solid rgba(216, 144, 24, 0.2)', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 className="font-oswald" style={{ color: 'white', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Official Zelle Transfer Info
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '10px' }}>
                  <span id="zelle-email" style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold-light)' }}>
                    info@bharatcricketclub.org
                  </span>
                  <button 
                    type="button"
                    onClick={handleCopyZelle}
                    style={{ background: copied ? '#18a06a' : 'var(--primary-light)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, transition: 'background 0.2s' }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy Email'}
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                  <ShieldCheck size={14} color="#22c55e" />
                  <span>Verified 501(c)(3) community sports initiative under UGNT</span>
                </div>
              </div>

              {/* What dues support */}
              <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>🏟️ Ground Fees</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>DFW turf ground and training facility rentals</div>
                </div>
                <div className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>🏏 Match Gear</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Official leather match balls & training equipment</div>
                </div>
                <div className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>⚖️ League Officiating</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Certified umpires and official match scorers</div>
                </div>
              </div>
            </div>

            <div>
              <div className="donation-card glass-card" style={{ textAlign: 'center', padding: '36px 24px' }}>
                <h3 className="font-oswald" style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Scan Zelle QR Code
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: '16px' }}>
                  Open your mobile banking app, select Zelle, and scan the QR code below:
                </p>
                <img 
                  src="./images/brand/zelle-qr.jpg" 
                  alt="Zelle QR Code" 
                  className="zelle-qr-img" 
                  style={{ maxWidth: '240px', borderRadius: '12px', border: '2px solid rgba(216,144,24,0.3)', margin: '0 auto 14px', display: 'block' }}
                />
                <div style={{ color: 'var(--gold-light)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Bharat Cricket Club
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '4px' }}>
                  Memo: Player Name & Season (e.g., "Fall 2026 Dues")
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
