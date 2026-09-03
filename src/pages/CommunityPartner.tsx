import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HeartHandshake, ExternalLink, ArrowRight } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
  description: string;
  link: string;
  linkText: string;
}

export const CommunityPartner: React.FC = () => {
  const partners: Partner[] = [
    {
      name: "United Gujaratis of North Texas (UGNT)",
      logo: "./images/brand/ugnt-logo.png",
      description: "Our founding community organization — bringing together Gujarati families across the Dallas-Fort Worth metroplex through culture, sport, and service.",
      link: "https://www.ugnt.org/",
      linkText: "Visit Website →"
    },
    {
      name: "Battle of Bats",
      logo: "./images/logos/battle-of-bats.svg",
      description: "An exclusive cricket-meets-networking experience by VTEX. Elite cricket, premium hospitality, and high-level executive connections — where commerce meets culture.",
      link: "https://www.battleofbats.com/",
      linkText: "Visit Website →"
    }
  ];

  return (
    <>
      <Navbar currentPage="community-partner" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="hero-star-row" style={{ justifyContent: 'center' }}>
            <div className="hero-star-line"></div>
            <span className="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div className="hero-star-line r"></div>
          </div>
          <h1 className="page-title">Community Partners</h1>
          <p className="page-subtitle">
            Proud to stand alongside the organizations and individuals who strengthen our community, support athletics, and share our core values.
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="partner-grid">
            {partners.map((partner, idx) => (
              <div key={idx} className="glass-card partner-card">
                <div className="partner-logo-box">
                  <img src={partner.logo} alt={partner.name} loading="lazy" />
                </div>
                <div className="partner-content">
                  <h3 className="partner-title">{partner.name}</h3>
                  <p className="partner-desc">{partner.description}</p>
                  <div className="partner-action">
                    <a 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="sponsor-outbound-link"
                    >
                      <span>{partner.linkText}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Become a Community Partner CTA */}
          <div className="glass-card become-partner-card" style={{ marginTop: '50px', textAlign: 'center', padding: '48px 24px' }}>
            <HeartHandshake size={36} color="var(--gold-light)" style={{ marginBottom: '16px' }} />
            <h3 className="font-oswald" style={{ fontSize: '1.8rem', color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>
              Become A Community Partner
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Is your organization aligned with our mission? Partner with Bharat Cricket Club to build stronger community ties and support the sport you love.
            </p>
            <a href="join.html" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.85rem' }}>
              Get In Touch With Us <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
