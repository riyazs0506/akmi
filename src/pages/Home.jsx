import { Sprout, ClipboardCheck, MessagesSquare, Handshake } from 'lucide-react';
import Button from '../components/Button';
import Img from '../components/Img';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import ProcessTimeline from '../components/ProcessTimeline';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import TileMotif from '../components/TileMotif';
import { productCategories } from '../content/products';
import { processSteps } from '../content/process';
import styles from './Home.module.css';

const principles = [
  {
    icon: Sprout,
    title: 'Dependable Sourcing',
    text: 'Identifying suitable sourcing opportunities that match each buyer’s product requirements.',
  },
  {
    icon: ClipboardCheck,
    title: 'Quality-Focused Practices',
    text: 'Applying appropriate product checks and careful handling according to agreed requirements.',
  },
  {
    icon: MessagesSquare,
    title: 'Clear Communication',
    text: 'Keeping buyers and partners informed with timely, transparent updates at every stage.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnerships',
    text: 'Building relationships designed to grow steadily, grounded in quality and integrity.',
  },
];

const facts = [
  { label: 'Origin', value: 'India' },
  { label: 'Initial focus', value: 'Fresh fruits & vegetables' },
  { label: 'Approach', value: 'Relationship-led trade' },
];

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <p className="eyebrow">Indian fresh produce · International trade</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              Grown in India. <span>Connected to the world.</span>
            </h1>
            <p className={`lead ${styles.heroLead}`}>
              We connect quality Indian fresh produce with international markets through dependable sourcing and
              export practices.
            </p>
            <div className={styles.heroActions}>
              <Button to="/products" arrow>
                Explore Products
              </Button>
              <Button to="/contact" variant="secondary">
                Start a Conversation
              </Button>
            </div>
            <dl className={styles.facts}>
              {facts.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.heroMedia}>
            <TileMotif className={styles.heroMotif} />
            <div className={styles.heroMain}>
              <Img
                name="hero-mangoes"
                alt="Ripe red and yellow Indian mangoes stacked together"
                priority
                sizes="(min-width: 1000px) 40vw, 90vw"
              />
            </div>
            <div className={styles.heroInset}>
              <Img
                name="market-vegetables"
                alt="Bitter gourd, carrots and chillies at an Indian vegetable market"
                priority
                sizes="(min-width: 1000px) 18vw, 40vw"
              />
            </div>
            <p className={styles.heroTag}>
              <span className={styles.dot} aria-hidden="true" />
              Fresh fruits &amp; vegetables, sourced in India
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Introduction ---------- */}
      <section className="section" aria-labelledby="intro-title">
        <div className={`container ${styles.intro}`}>
          <ScrollReveal className={styles.introHead}>
            <p className="eyebrow">About AKMI International</p>
            <h2 id="intro-title" className={styles.h2}>
              Building connections beyond borders.
            </h2>
          </ScrollReveal>
          <ScrollReveal className={styles.introBody} delay={80}>
            <p className="lead">
              AKMI International was established with a clear ambition: to connect India&apos;s potential, quality,
              and opportunities with markets around the world. Our journey begins with fresh produce and a
              commitment to dependable business relationships.
            </p>
            <Button to="/about" variant="text" arrow>
              More about us
            </Button>
          </ScrollReveal>
        </div>
        <ScrollReveal className={`container ${styles.introImage}`}>
          <div className={styles.wideFrame}>
            <Img
              name="farm-fields"
              alt="Rows of crops growing across farmland under an open sky"
              sizes="(min-width: 1300px) 1240px, 100vw"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ---------- Products ---------- */}
      <section className="section section--warm" aria-labelledby="products-title">
        <div className="container">
          <div className={styles.rowHead}>
            <SectionHeading eyebrow="Our products" title="An initial portfolio of fresh produce." id="products-title">
              <p>
                We begin with two focused categories, sourced in India for international buyers. Availability and
                specifications are discussed with each enquiry.
              </p>
            </SectionHeading>
            <Button to="/products" variant="secondary" arrow className={styles.rowHeadBtn}>
              View all products
            </Button>
          </div>
          <div className={styles.products}>
            {productCategories.map((c, i) => (
              <ScrollReveal key={c.id} delay={i * 90}>
                <ProductCard category={c} index={i} to={`/products#${c.id}`} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Approach ---------- */}
      <section className="section" aria-labelledby="approach-title">
        <div className={`container ${styles.approach}`}>
          <ScrollReveal className={styles.approachIntro}>
            <SectionHeading eyebrow="Our approach" title="Principles that guide how we trade." id="approach-title">
              <p>
                Every relationship we build is shaped by four commitments — the foundation for dependable,
                long-term trade.
              </p>
            </SectionHeading>
            <div className={`zoom-host ${styles.approachImage}`}>
              <div className="zoom-frame">
                <Img
                  name="harvest"
                  alt="Farm workers harvesting fresh produce in a green field"
                  sizes="(min-width: 1000px) 38vw, 100vw"
                />
              </div>
            </div>
          </ScrollReveal>
          <ul className={styles.principles}>
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal as="li" key={p.title} className={styles.principle} delay={i * 70}>
                  <span className={styles.principleIcon}>
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className="muted">{p.text}</p>
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Process teaser ---------- */}
      <section className="section section--grey" aria-labelledby="process-title">
        <div className="container">
          <div className={styles.rowHead}>
            <SectionHeading eyebrow="Our process" title="A considered approach to every shipment." id="process-title" />
            <Button to="/process" variant="secondary" arrow className={styles.rowHeadBtn}>
              How we work
            </Button>
          </div>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* ---------- Global vision ---------- */}
      <section className={styles.vision} aria-labelledby="vision-title">
        <div className={styles.visionMedia}>
          <Img
            name="containers-stack"
            alt="Stacked blue and red shipping containers"
            sizes="(min-width: 960px) 50vw, 100vw"
          />
        </div>
        <div className={styles.visionText}>
          <ScrollReveal className={styles.visionInner}>
            <p className={`eyebrow ${styles.visionEyebrow}`}>Global vision</p>
            <h2 id="vision-title" className={styles.visionTitle}>
              Rooted in India. Looking towards the world.
            </h2>
            <p className={styles.visionLead}>
              Our ambition is to develop dependable businesses that connect Indian potential with international
              opportunity. We begin with fresh produce and intend to expand thoughtfully as new opportunities
              emerge.
            </p>
            <Button to="/global-trade" variant="light" arrow>
              Global trade ambition
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <div className={styles.ctaSpacer} />
      <CTASection />
    </>
  );
}
