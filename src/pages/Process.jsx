import { Package, MapPin, ClipboardList, FileSignature } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ProcessTimeline from '../components/ProcessTimeline';
import ScrollReveal from '../components/ScrollReveal';
import CTASection from '../components/CTASection';
import Img from '../components/Img';
import { processSteps } from '../content/process';
import styles from './Process.module.css';

const factors = [
  { icon: Package, title: 'The product', text: 'Each fruit or vegetable has its own handling, packing and timing considerations.' },
  { icon: MapPin, title: 'The destination', text: 'Import requirements and documentation differ from one market to another.' },
  { icon: ClipboardList, title: 'Buyer requirements', text: 'Specifications, quantities and packaging preferences are agreed with each buyer.' },
  { icon: FileSignature, title: 'Agreed terms', text: 'Responsibilities and timelines follow the commercial terms agreed for each order.' },
];

const commitments = [
  {
    title: 'Requirements first',
    text: 'We begin by understanding the product, specification and destination requirements before any sourcing begins.',
  },
  {
    title: 'Appropriate checks',
    text: 'Product checks are applied according to the requirements agreed with the buyer for each shipment.',
  },
  {
    title: 'Careful coordination',
    text: 'Handling, packing and documentation are coordinated with the relevant parties as the shipment is prepared.',
  },
  {
    title: 'Transparent updates',
    text: 'Buyers are kept informed through planning and coordination, so expectations stay clear.',
  },
];

export default function Process() {
  return (
    <>
      <PageHero
        eyebrow="Our process & quality approach"
        title="A considered approach to every shipment."
        image="carrots-crate"
        imageAlt="Freshly harvested carrots with leafy tops packed in a wooden crate"
      >
        <p>
          Our proposed export workflow follows five stages, from identifying suitable sourcing opportunities to
          coordinating shipment with the relevant parties.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="workflow-title">
        <div className="container">
          <div className={styles.head}>
            <SectionHeading eyebrow="Export workflow" title="Five stages, clearly coordinated." id="workflow-title" />
          </div>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      <section className="section section--warm" aria-labelledby="factors-title">
        <div className={`container ${styles.factorsGrid}`}>
          <ScrollReveal className={styles.factorsIntro}>
            <SectionHeading eyebrow="Every shipment is different" title="Procedures shaped by the details." id="factors-title">
              <p>
                Specific procedures depend on the product, the destination, the buyer’s requirements and the terms
                agreed for each order. We confirm these details together before a shipment is planned.
              </p>
            </SectionHeading>
          </ScrollReveal>
          <ul className={styles.factors}>
            {factors.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal as="li" key={f.title} className={styles.factor} delay={i * 70}>
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" className={styles.factorIcon} />
                  <h3 className={styles.factorTitle}>{f.title}</h3>
                  <p className="muted">{f.text}</p>
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="quality-title">
        <div className={`container ${styles.quality}`}>
          <ScrollReveal className={styles.qualityMedia}>
            <div className={styles.qualityImage}>
              <Img
                name="warehouse"
                alt="Interior of a large, organised warehouse with stacked goods on shelving"
                sizes="(min-width: 1000px) 45vw, 100vw"
              />
            </div>
          </ScrollReveal>
          <div className={styles.qualityText}>
            <SectionHeading eyebrow="Quality approach" title="Quality, approached with care and clarity." id="quality-title" />
            <ol className={styles.commitments}>
              {commitments.map((c, i) => (
                <ScrollReveal as="li" key={c.title} className={styles.commitment} delay={i * 60}>
                  <span className={styles.commitmentNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={styles.commitmentTitle}>{c.title}</h3>
                    <p className="muted">{c.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </ol>
            <p className={styles.disclaimer}>
              Where a market requires specific certifications, inspections or handling arrangements, these are
              discussed and agreed as part of each enquiry.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Discuss the requirements for your shipment."
        text="Tell us about the product, destination and specifications you have in mind, and we can talk through how we would approach it."
      />
    </>
  );
}
