import { Compass, MessagesSquare, Handshake, Sprout, Users, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import GlobeGraphic from '../components/GlobeGraphic';
import Button from '../components/Button';
import CTASection from '../components/CTASection';
import Img from '../components/Img';
import styles from './GlobalTrade.module.css';

const pillars = [
  {
    icon: Search,
    title: 'Understanding market requirements',
    text: 'Learning what each market expects in product, specification, packaging and documentation.',
  },
  {
    icon: MessagesSquare,
    title: 'Communicating clearly',
    text: 'Setting clear expectations and keeping every party informed as trade relationships develop.',
  },
  {
    icon: Handshake,
    title: 'Developing dependable partnerships',
    text: 'Building relationships that can grow steadily, grounded in quality, integrity and trust.',
  },
];

const partners = [
  {
    icon: Users,
    eyebrow: 'For international buyers',
    title: 'Sourcing Indian fresh produce?',
    text: 'If you are an importer, distributor or wholesaler interested in Indian fresh fruits or vegetables, share your requirements and we can discuss how we might work together.',
    cta: { to: '/contact?interest=other', label: 'Start a buyer enquiry' },
  },
  {
    icon: Sprout,
    eyebrow: 'For sourcing partners',
    title: 'Growing or supplying in India?',
    text: 'We are interested in building relationships with growers, aggregators and suppliers who share our commitment to quality and dependable practice.',
    cta: { to: '/contact?interest=other', label: 'Introduce your business' },
  },
];

export default function GlobalTrade() {
  return (
    <>
      <PageHero eyebrow="Global trade & markets" title="Connecting Indian opportunity with global demand.">
        <p>
          We aim to build lasting trade relationships by understanding market requirements, communicating clearly,
          and developing dependable business partnerships.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="ambition-title">
        <div className={`container ${styles.ambition}`}>
          <ScrollReveal className={styles.globe}>
            <GlobeGraphic />
          </ScrollReveal>
          <ScrollReveal className={styles.ambitionText} delay={80}>
            <SectionHeading eyebrow="Our ambition" title="Starting in India, built to reach further." id="ambition-title" />
            <div className={styles.prose}>
              <p>
                AKMI International was founded to connect India’s potential, quality and opportunities with markets
                around the world. Our first step is fresh produce: building the sourcing relationships and export
                practices that dependable international trade requires.
              </p>
              <p>
                As those foundations strengthen, we intend to develop relationships with buyers in international
                markets and, over time, explore a broader portfolio of products.
              </p>
            </div>
            <div className={styles.status}>
              <div>
                <span className={styles.statusLabel}>Today</span>
                <p>Establishing our fresh-produce sourcing and export foundation in India.</p>
              </div>
              <div>
                <span className={styles.statusLabel}>Ambition</span>
                <p>Lasting trade relationships with buyers and partners in international markets.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--grey" aria-labelledby="pillars-title">
        <div className="container">
          <SectionHeading
            eyebrow="How we approach markets"
            title="Trade relationships built on understanding."
            id="pillars-title"
            align="center"
          />
          <ul className={styles.pillars}>
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal as="li" key={p.title} className={styles.pillar} delay={i * 80}>
                  <span className={styles.pillarIcon}>
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className="muted">{p.text}</p>
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={styles.band} aria-hidden="true">
        <div className={styles.bandImage}>
          <Img name="port-aerial" alt="" sizes="100vw" />
        </div>
      </section>

      <section className="section" aria-labelledby="partners-title">
        <div className="container">
          <SectionHeading eyebrow="Partnerships" title="Buyer and sourcing partnerships." id="partners-title">
            <p>
              Dependable trade depends on strong relationships at both ends. We welcome conversations with
              international buyers and with sourcing partners in India.
            </p>
          </SectionHeading>
          <div className={styles.partners}>
            {partners.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal as="article" key={p.title} className={styles.partner} delay={i * 90}>
                  <Icon size={26} strokeWidth={1.5} aria-hidden="true" className={styles.partnerIcon} />
                  <p className="eyebrow">{p.eyebrow}</p>
                  <h3 className={styles.partnerTitle}>{p.title}</h3>
                  <p className="muted">{p.text}</p>
                  <Button to={p.cta.to} variant="text" arrow className={styles.partnerCta}>
                    {p.cta.label}
                  </Button>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal className={styles.brandStrip}>
            <div className={styles.brandStripImage}>
              <Img
                name="branded-container"
                alt="Visualisation of a shipping container in AKMI International branding at a port"
                sizes="(min-width: 1000px) 55vw, 100vw"
              />
            </div>
            <div className={styles.brandStripText}>
              <Compass size={24} strokeWidth={1.5} aria-hidden="true" className={styles.partnerIcon} />
              <p className={styles.brandStripQuote}>Our journey begins with fresh produce. Our ambition extends much further.</p>
              <p className="muted">Brand visualisation</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        title="International buyers and business partners — let’s talk."
        text="Tell us about your market, product requirements or partnership idea. We will use your enquiry to understand your needs and discuss potential opportunities."
      />
    </>
  );
}
