import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="index.html" className="logo">
              <img src="./images/brand/bcc-logo.jpg" alt="Logo" />
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
              <li><a href="index.html" className="footer-link">Home</a></li>
              <li><a href="team.html" className="footer-link">Teams</a></li>
              <li><a href="leagues.html" className="footer-link">Leagues</a></li>
              <li><a href="fixtures.html" className="footer-link">Fixtures & Results</a></li>
              <li><a href="leaders.html" className="footer-link">Club Leaders</a></li>
              <li><a href="sponsors.html" className="footer-link">Sponsors</a></li>
              <li><a href="community-partner.html" className="footer-link">Community Partners</a></li>
              <li><a href="donate.html" className="footer-link">Donations & Fees</a></li>
              <li><a href="join.html" className="footer-link">Register</a></li>
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
          <img 
            src="./images/brand/ugnt-logo.png" 
            alt="UGNT Logo" 
            style={{ width: '70px', height: '70px', borderRadius: '50%', marginBottom: '8px', border: '1px solid rgba(216, 144, 24, 0.3)' }} 
          />
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
            Designed by <a href="https://aksharnixglobal.com" target="_blank" rel="noopener noreferrer">AksharNix Global</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
