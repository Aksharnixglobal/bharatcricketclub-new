import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';

interface Leader {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export const Leaders: React.FC = () => {
  const leaders: Leader[] = [
    {
      name: "Pratik Patel",
      role: "President, BCC | Captain, BCC T20 & DLCL T30",
      image: "./images/leaders/pratik-patel.jpg",
      bio: "Leading from the front with tactical discipline, vision, and deep commitment to cricket excellence in North Texas."
    },
    {
      name: "Jugal Chokshi",
      role: "Executive Director & Club Manager",
      image: "./images/leaders/jugal-chokshi.jpg",
      bio: "Overseeing all club administrative operations, league affiliations, logistics, and tournament scheduling."
    },
    {
      name: "Nilpesh Patel",
      role: "Director of Strategy & Growth",
      image: "./images/leaders/nilpesh-patel.jpg",
      bio: "Spearheading long-term expansion, player development pathways, and strategic community partnerships."
    },
    {
      name: "Bhavik Gandhi",
      role: "Founding Core Member & Captain, BCC DFCL T20",
      image: "./images/leaders/bhavik-gandhi.jpg",
      bio: "Pioneering BCC's founding culture of brotherhood, on-field passion, and aggressive T20 cricket execution."
    },
    {
      name: "Charles Patel",
      role: "Technology Director",
      image: "./images/leaders/charles-patel.jpg",
      bio: "Managing digital infrastructure, real-time match integrations, website systems, and technological innovation."
    },
    {
      name: "Darshan Patel",
      role: "Director of Media & Content Production",
      image: "./images/leaders/darshan-patel.jpg",
      bio: "Directing creative media, match coverage, social engagement, and highlighting our players' accomplishments."
    }
  ];

  return (
    <>
      <Navbar currentPage="leaders" />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="hero-star-row" style={{ justifyContent: 'center' }}>
            <div className="hero-star-line"></div>
            <span className="hero-star-dots">★ &nbsp; ★ &nbsp; ★</span>
            <div className="hero-star-line r"></div>
          </div>
          <h1 className="page-title">Club Leadership</h1>
          <p className="page-subtitle">
            Meet the visionary executive committee dedicated to building a culture of sportsmanship, growth, and championship standards.
          </p>
        </div>
      </section>

      {/* Leaders Grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="leaders-grid">
            {leaders.map((leader, index) => (
              <div key={index} className="leader-card glass-card">
                <div className="leader-img-wrap">
                  <img src={leader.image} alt={leader.name} loading="lazy" />
                  <div className="leader-badge-pill">
                    <ShieldCheck size={12} color="var(--gold-light)" />
                    <span>Executive</span>
                  </div>
                </div>
                <div className="leader-info">
                  <h3 className="leader-name">{leader.name}</h3>
                  <p className="leader-role">{leader.role}</p>
                  {leader.bio && <p className="leader-bio">{leader.bio}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Leadership CTA */}
          <div className="glass-card" style={{ marginTop: '50px', padding: '36px', textAlign: 'center', border: '1px solid rgba(216,144,24,0.3)' }}>
            <h3 className="font-oswald" style={{ color: 'white', fontSize: '1.6rem', textTransform: 'uppercase', marginBottom: '8px' }}>
              Connect With Club Leadership
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 20px', fontSize: '0.9rem' }}>
              Have questions about trials, sponsorships, or joining the club? Reach out directly to our committee.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="mailto:info@bharatcricketclub.org" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} />
                <span>info@bharatcricketclub.org</span>
              </a>
              <a href="join.html" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>Player Registration</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
