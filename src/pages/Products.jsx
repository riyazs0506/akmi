import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, Info } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import Img from '../components/Img';
import { productCategories, interestOptions } from '../content/products';
import styles from './Products.module.css';

function InterestPicker() {
  const navigate = useNavigate();
  const [choice, setChoice] = useState(interestOptions[0].value);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/contact?interest=${encodeURIComponent(choice)}`);
  };

  return (
    <form className={styles.picker} onSubmit={onSubmit}>
      <fieldset className={styles.pickerSet}>
        <legend className={styles.pickerLegend}>I am interested in</legend>
        <div className={styles.pickerOptions}>
          {interestOptions.map((o) => (
            <label key={o.value} className={`${styles.option} ${choice === o.value ? styles.optionOn : ''}`}>
              <input
                type="radio"
                name="interest"
                value={o.value}
                checked={choice === o.value}
                onChange={() => setChoice(o.value)}
                className={styles.optionInput}
              />
              <span className={styles.optionCheck} aria-hidden="true">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <Button type="submit" arrow className={styles.pickerBtn}>
        Continue to enquiry
      </Button>
    </form>
  );
}

export default function Products() {
  return (
    <>
      <PageHero eyebrow="Products" title="Fresh produce from India, for international buyers.">
        <p>
          Our initial portfolio is focused on two categories: fresh fruits and fresh vegetables. We work with each
          buyer to understand their requirements before discussing sourcing.
        </p>
      </PageHero>

      <nav className={styles.jump} aria-label="Product categories">
        <div className={`container ${styles.jumpInner}`}>
          <span className={styles.jumpLabel}>Categories</span>
          <ul>
            {productCategories.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span> {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {productCategories.map((c, i) => (
        <section
          key={c.id}
          id={c.id}
          className={`section ${i % 2 ? 'section--warm' : ''}`}
          aria-labelledby={`${c.id}-title`}
        >
          <div className={`container ${styles.category} ${i % 2 ? styles.flip : ''}`}>
            <ScrollReveal className={styles.media}>
              <div className={`zoom-host ${styles.mainImage}`}>
                <div className="zoom-frame">
                  <Img name={c.image} alt={c.alt} sizes="(min-width: 1000px) 34vw, 100vw" />
                </div>
              </div>
              <div className={styles.detailImage}>
                <Img name={c.detailImage} alt={c.detailAlt} sizes="(min-width: 1000px) 20vw, 45vw" />
              </div>
            </ScrollReveal>

            <ScrollReveal className={styles.body} delay={80}>
              <p className="eyebrow">Category {String.fromCharCode(65 + i)}</p>
              <h2 id={`${c.id}-title`} className={styles.title}>
                {c.label}
              </h2>
              <p className="lead">{c.description}</p>
              <ul className={styles.points}>
                {c.points.map((p) => (
                  <li key={p}>
                    <Check size={18} strokeWidth={2} aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.actions}>
                <Button to={`/contact?interest=${c.interest}`} arrow>
                  Enquire about {c.label}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      <section className={`section ${styles.enquire}`} aria-labelledby="choose-title">
        <div className={`container ${styles.enquireGrid}`}>
          <div className={styles.enquireText}>
            <SectionHeading eyebrow="Start an enquiry" title="Tell us what you are looking for." id="choose-title">
              <p>Choose a product interest and continue to our enquiry form — we will pre-select it for you.</p>
            </SectionHeading>
            <div className={styles.note} role="note">
              <Info size={20} strokeWidth={1.75} aria-hidden="true" />
              <p>
                <strong>Availability and specifications.</strong> Product availability, varieties, grades and
                specifications vary with season and requirements, and can be discussed through an enquiry. The
                categories shown here do not indicate that every product is currently available.
              </p>
            </div>
          </div>
          <InterestPicker />
        </div>
      </section>

      <section className={styles.portfolio} aria-label="Future portfolio">
        <div className={`container ${styles.portfolioInner}`}>
          <p>
            <strong>A growing portfolio.</strong> We begin with fresh produce and intend to expand thoughtfully as new
            opportunities emerge.
          </p>
          <Button to="/about" variant="text" arrow>
            Our intent
          </Button>
        </div>
      </section>
    </>
  );
}

