import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Award, ExternalLink, ArrowRight } from 'lucide-react';

interface Sponsor {
  name: string;
  logo: string;
  description: string;
  link: string;
  linkText: string;
}

export const Sponsors: React.FC = () => {
  const sponsors: Sponsor[] = [
    {
      name: "Infinity Legacy Group",
      logo: "./images/logos/infinity-legacy.jpg",
      description: "Real estate, investment, and insurance specialists serving families across the USA and Canada. Covering Auto, Life, Health, Home, and Business — building legacies that last.",
      link: "https://www.instagram.com/infinity_legacy_group?igsh=ZGl0cDZ5YXJtMGR6",
      linkText: "Visit Instagram →"
    },
    {
      name: "Grain Market",
      logo: "./images/logos/grain-market.png",
      description: "Dallas-based wholesale distributor of premium Indian spices and groceries across the U.S. Delivering authentic flavors, consistent quality, and real value to every customer.",
      link: "https://www.instagram.com/grainmarket.usa/",
      linkText: "Visit Instagram →"
    },
    {
      name: "Rajula's Kitchen",
      logo: "./images/logos/rajula.png",
      description: "100% vegetarian Indian eatery serving chaats, thalis, and catering across Dallas, Atlanta & Chicago. Authentic flavors, unlimited thali options — one bite at a time.",
      link: "https://www.instagram.com/rajulaskitchenusa/",
      linkText: "Visit Instagram →"
    },
    {
      name: "NLP Financial",
      logo: "./images/logos/nlp-financial.jpeg",
      description: "Personalized wealth-building strategies rooted in integrity and transparency. Helping families grow, protect, and preserve a financial legacy they can count on.",
      link: "https://nlp-financial.com/",
      linkText: "Visit Website →"
    },
    {
      name: "AksharNix Global",
      logo: "./images/logos/aksharnix-global.png",
      description: "Full-service digital agency specializing in web development, software, and digital transformation. Helping businesses worldwide build modern, high-impact digital experiences.",
      link: "https://aksharnixglobal.com/",
      linkText: "Visit Website →"
    },
    {
      name: "TrophyHub",
      logo: "./images/logos/trophyhub.jpg",
      description: "Your go-to source for trophies, awards, and custom recognition products. Crafted to honor achievements and celebrate champions on and off the field.",
      link: "https://www.facebook.com/share/18L46dpgm5/",
      linkText: "Learn More →"
    }
  ];

  return (
    <>
      <Navbar currentPage="sponsors" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="hero-star-row" style={{ justifyContent: 'center' }}>
            <div className="hero-star-line"></div>
            <span className="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div className="hero-star-line r"></div>
          </div>
          <h1 className="page-title">Our Sponsors</h1>
          <p className="page-subtitle">
            We are deeply grateful to our sponsors who support our journey and empower our pursuit of cricket excellence across North Texas.
          </p>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sponsor-grid">
            {sponsors.map((sponsor, idx) => (
              <div key={idx} className="glass-card sponsor-card">
                <div className="sponsor-logo-box">
                  <img src={sponsor.logo} alt={sponsor.name} loading="lazy" />
                </div>
                <div className="sponsor-content">
                  <h3 className="sponsor-title">{sponsor.name}</h3>
                  <p className="sponsor-desc">{sponsor.description}</p>
                  <div className="sponsor-action">
                    <a 
                      href={sponsor.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="sponsor-outbound-link"
                    >
                      <span>{sponsor.linkText}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Become a Sponsor CTA */}
          <div className="glass-card become-sponsor-card" style={{ marginTop: '50px', textAlign: 'center', padding: '48px 24px' }}>
            <Award size={36} color="var(--gold-light)" style={{ marginBottom: '16px' }} />
            <h3 className="font-oswald" style={{ fontSize: '1.8rem', color: '#fff', textTransform: 'uppercase', marginBottom: '8px' }}>
              Become A Club Sponsor
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Join our mission to empower athletes and elevate cricket in Dallas-Fort Worth. Gain prominent brand exposure across our jersey, website, and match streams.
            </p>
            <a href="join.html" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.85rem' }}>
              Inquire About Sponsorship <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
