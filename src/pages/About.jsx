import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import TileMotif from '../components/TileMotif';
import Img from '../components/Img';
import CTASection from '../components/CTASection';
import styles from './About.module.css';

const stages = [
  {
    label: 'Foundation',
    title: 'Establish a dependable fresh-produce foundation.',
    text: 'Focusing first on Indian fresh fruits and vegetables, and on the sourcing and export practices that make trade dependable.',
  },
  {
    label: 'Relationships',
    title: 'Build trusted sourcing and international business relationships.',
    text: 'Developing relationships with sourcing partners and international buyers, and understanding the requirements of different markets.',
  },
  {
    label: 'Expansion',
    title: 'Explore broader product opportunities over time.',
    text: 'Considering new products and opportunities that align with our capabilities and the needs of the markets we serve.',
  },
];

const values = ['Quality', 'Integrity', 'Long-term growth'];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Connecting India’s potential with the world."
        image="produce-market"
        imageAlt="A colourful market display of fresh fruits and vegetables"
      >
        <p>
          AKMI International was established with a focused ambition: to connect India’s quality fresh fruits and
          vegetables with international markets through reliable sourcing and dependable export practices.
        </p>
      </PageHero>

      {/* Vision & Mission */}
      <section className="section" aria-labelledby="vm-title">
        <div className="container">
          <h2 id="vm-title" className="visually-hidden">
            Vision and mission
          </h2>
          <div className={styles.statements}>
            <ScrollReveal as="article" className={styles.statement}>
              <p className="eyebrow">Our Vision</p>
              <p className={styles.statementText}>
                To build a globally connected enterprise from India, creating businesses that carry Indian
                potential, quality and opportunity to markets around the world.
              </p>
            </ScrollReveal>
            <ScrollReveal as="article" className={styles.statement} delay={90}>
              <p className="eyebrow">Our Mission</p>
              <p className={styles.statementText}>
                To identify opportunities, build dependable businesses and create lasting relationships that
                connect India with the world, driven by quality, integrity and a commitment to long-term growth.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal className={styles.values}>
            <span className={styles.valuesLabel}>What drives us</span>
            <ul>
              {values.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Intent */}
      <section className="section section--warm" aria-labelledby="intent-title">
        <div className={`container ${styles.intent}`}>
          <ScrollReveal className={styles.intentMedia}>
            <TileMotif className={styles.intentMotif} />
            <div className={styles.intentImage}>
              <Img
                name="fruits-flatlay"
                alt="An overhead arrangement of fresh tropical fruits including papaya, citrus and grapes"
                sizes="(min-width: 1000px) 42vw, 100vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal className={styles.intentText} delay={80}>
            <SectionHeading eyebrow="Our Intent" title="From fresh produce to a broader global portfolio." id="intent-title" />
            <div className={styles.prose}>
              <p>
                Our immediate focus is on building strong foundations in fresh produce — developing trusted
                relationships, understanding global markets and working towards consistent quality.
              </p>
              <p>
                Over time, AKMI International intends to expand beyond its initial portfolio, exploring new products
                and opportunities that align with our capabilities and the needs of the markets we serve.
              </p>
              <p className={styles.pull}>Our journey begins with fresh produce. Our ambition extends much further.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Path forward */}
      <section className="section" aria-labelledby="path-title">
        <div className="container">
          <SectionHeading eyebrow="The path ahead" title="Three stages of deliberate growth." id="path-title">
            <p>
              These are our strategic intentions — the way we plan to grow — rather than milestones already
              completed.
            </p>
          </SectionHeading>
          <ol className={styles.stages}>
            {stages.map((s, i) => (
              <ScrollReveal as="li" key={s.label} className={styles.stage} delay={i * 90}>
                <div className={styles.stageHead}>
                  <span className={styles.stageNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.stageLabel}>{s.label}</span>
                </div>
                <h3 className={styles.stageTitle}>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="Interested in working with AKMI International?"
        text="Whether you are an international buyer or a potential sourcing partner, we would welcome a conversation."
      />
    </>
  );
}
