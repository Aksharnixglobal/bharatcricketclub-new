import React, { useState } from 'react';

interface NavbarProps {
  currentPage?: 'home' | 'team' | 'leagues' | 'fixtures' | 'leaders' | 'sponsors' | 'community-partner' | 'donate' | 'join';
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPage = (): string => {
    if (currentPage) return currentPage;
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    if (path.includes('team.html')) return 'team';
    if (path.includes('leagues.html')) return 'leagues';
    if (path.includes('fixtures.html')) return 'fixtures';
    if (path.includes('leaders.html')) return 'leaders';
    if (path.includes('sponsors.html')) return 'sponsors';
    if (path.includes('community-partner.html')) return 'community-partner';
    if (path.includes('donate.html')) return 'donate';
    if (path.includes('join.html')) return 'join';
    return 'home';
  };

  const active = getPage();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-container">
          <a href="index.html" className="logo" onClick={closeMenu}>
            <div className="logo-icon-wrap">
              <img src="./images/brand/bcc-logo.jpg" alt="Bharat Cricket Club Logo" />
            </div>
            <div className="logo-text">
              <span className="logo-title">Bharat Cricket Club</span>
              <span className="logo-subtitle">By UGNT</span>
            </div>
          </a>

          {/* Mobile hamburger button */}
          <button 
            type="button" 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <a 
                href="index.html" 
                className={`nav-link ${active === 'home' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="team.html" 
                className={`nav-link ${active === 'team' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Teams
              </a>
            </li>
            <li>
              <a 
                href="leagues.html" 
                className={`nav-link ${active === 'leagues' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Leagues
              </a>
            </li>
            <li>
              <a 
                href="fixtures.html" 
                className={`nav-link ${active === 'fixtures' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Fixtures
              </a>
            </li>
            <li>
              <a 
                href="leaders.html" 
                className={`nav-link ${active === 'leaders' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Leaders
              </a>
            </li>
            <li>
              <a 
                href="sponsors.html" 
                className={`nav-link ${active === 'sponsors' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Sponsors
              </a>
            </li>
            <li>
              <a 
                href="community-partner.html" 
                className={`nav-link ${active === 'community-partner' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Partners
              </a>
            </li>
            <li>
              <a 
                href="donate.html" 
                className={`nav-link ${active === 'donate' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Fees/Zelle
              </a>
            </li>
            <li className="nav-cta-item">
              <a 
                href="join.html" 
                className="btn btn-primary" 
                onClick={closeMenu}
                style={{ padding: '8px 16px', fontSize: '0.75rem' }}
              >
                Join Us
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-backdrop" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};
