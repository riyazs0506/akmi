import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router';
import { CircleAlert, CircleCheck, Info, LoaderCircle } from 'lucide-react';
import Button from './Button';
import { interestOptions } from '../content/products';
import styles from './EnquiryForm.module.css';

// When VITE_ENQUIRY_ENDPOINT is set, submissions are POSTed there as JSON.
// Otherwise the form runs in a clearly-labelled demo mode and sends nothing.
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT || '';
const DEMO_MODE = !ENDPOINT;

const MESSAGE_MAX = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_ORDER = ['fullName', 'email', 'company', 'country', 'interest', 'message'];

const EMPTY = { fullName: '', email: '', company: '', country: '', interest: '', message: '', website: '' };

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!values.email.trim()) errors.email = 'Please enter your business email address.';
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = 'Please enter a valid email address, for example name@company.com.';
  if (!values.company.trim()) errors.company = 'Please enter your company name.';
  if (!values.country.trim()) errors.country = 'Please enter your country.';
  if (!values.interest) errors.interest = 'Please select a product interest.';
  if (!values.message.trim()) errors.message = 'Please tell us a little about your enquiry.';
  else if (values.message.trim().length < 20)
    errors.message = 'Please add a little more detail (at least 20 characters).';
  return errors;
}

async function submitEnquiry(values) {
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 900));
    return { demo: true };
  }
  const { website, ...payload } = values; // honeypot is never sent
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return { demo: false };
}

function Field({ id, label, error, hint, required = true, children }) {
  return (
    <div className={`${styles.field} ${error ? styles.hasError : ''}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.req} aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className={styles.optional}> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          <CircleAlert size={16} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default function EnquiryForm({ initialInterest = '' }) {
  const uid = useId();
  const id = (name) => `${uid}-${name}`;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    if (initialInterest && interestOptions.some((o) => o.value === initialInterest)) {
      setValues((v) => ({ ...v, interest: initialInterest }));
    }
  }, [initialInterest]);

  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus();
  }, [status]);

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    const v = validate(values);
    setErrors(v);
    setTouched(Object.fromEntries(FIELD_ORDER.map((name) => [name, true])));
    const firstInvalid = FIELD_ORDER.find((name) => v[name]);
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }
    // Honeypot filled: silently treat as handled without sending.
    if (values.website) {
      setStatus('success');
      setResult({ demo: DEMO_MODE });
      return;
    }
    setStatus('submitting');
    try {
      const r = await submitEnquiry(values);
      setResult(r);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setResult(null);
  };

  const err = (name) => (touched[name] ? errors[name] : undefined);
  const describedBy = (name, hint) =>
    [err(name) ? `${id(name)}-error` : null, hint && !err(name) ? `${id(name)}-hint` : null]
      .filter(Boolean)
      .join(' ') || undefined;

  if (status === 'success') {
    return (
      <div className={styles.result} ref={statusRef} tabIndex={-1} role="status">
        <CircleCheck className={styles.resultIcon} size={32} strokeWidth={1.6} aria-hidden="true" />
        {result?.demo ? (
          <>
            <h2 className={styles.resultTitle}>Demo submission complete</h2>
            <p>
              Your details passed validation, but this form is running in <strong>demo mode</strong> and is
              not yet connected to an email service or server. <strong>Your enquiry has not been sent</strong>{' '}
              and no information was stored.
            </p>
            <p className="muted">
              Official contact details will be published here once confirmed.
            </p>
          </>
        ) : (
          <>
            <h2 className={styles.resultTitle}>Thank you, your enquiry has been submitted.</h2>
            <p>Our team will review your message and respond using the email address you provided.</p>
          </>
        )}
        <div className={styles.resultActions}>
          <Button variant="secondary" onClick={reset}>
            Start a new enquiry
          </Button>
          <Button to="/products" variant="text" arrow>
            Back to products
          </Button>
        </div>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={DEMO_MODE ? `${uid}-demo` : undefined}>
      {DEMO_MODE && (
        <div id={`${uid}-demo`} className={styles.demo}>
          <Info size={18} aria-hidden="true" />
          <p>
            <strong>Demo mode.</strong> This form is not yet connected to an email service. Submitting it will
            check your entries but will not send or store your enquiry.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.alert} role="alert" ref={statusRef} tabIndex={-1}>
          <CircleAlert size={18} aria-hidden="true" />
          <p>
            <strong>Your enquiry could not be sent.</strong> Please check your connection and try again in a
            moment.
          </p>
        </div>
      )}

      <div className={styles.grid}>
        <Field id={id('fullName')} label="Full Name" error={err('fullName')}>
          <input
            id={id('fullName')}
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!err('fullName')}
            aria-describedby={describedBy('fullName')}
            aria-required="true"
            className={styles.input}
          />
        </Field>

        <Field id={id('email')} label="Business Email" error={err('email')}>
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!err('email')}
            aria-describedby={describedBy('email')}
            aria-required="true"
            className={styles.input}
          />
        </Field>

        <Field id={id('company')} label="Company Name" error={err('company')}>
          <input
            id={id('company')}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!err('company')}
            aria-describedby={describedBy('company')}
            aria-required="true"
            className={styles.input}
          />
        </Field>

        <Field id={id('country')} label="Country" error={err('country')}>
          <input
            id={id('country')}
            name="country"
            type="text"
            autoComplete="country-name"
            value={values.country}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={!!err('country')}
            aria-describedby={describedBy('country')}
            aria-required="true"
            className={styles.input}
          />
        </Field>

        <Field id={id('interest')} label="Product Interest" error={err('interest')}>
          <div className={styles.selectWrap}>
            <select
              id={id('interest')}
              name="interest"
              value={values.interest}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={!!err('interest')}
              aria-describedby={describedBy('interest')}
              aria-required="true"
              className={`${styles.input} ${styles.select}`}
            >
              <option value="">Select an option</option>
              {interestOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </Field>

        <div className={styles.full}>
          <Field
            id={id('message')}
            label="Message"
            error={err('message')}
            hint="Share your product requirements, destination market, or the opportunity you would like to discuss."
          >
            <textarea
              id={id('message')}
              name="message"
              rows={6}
              maxLength={MESSAGE_MAX}
              value={values.message}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={!!err('message')}
              aria-describedby={describedBy('message', true)}
              aria-required="true"
              className={`${styles.input} ${styles.textarea}`}
            />
          </Field>
          <p className={styles.counter} aria-live="off">
            {values.message.length} / {MESSAGE_MAX}
          </p>
        </div>

        {/* Honeypot for basic spam prevention — hidden from people and assistive tech. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor={id('website')}>Website</label>
          <input
            id={id('website')}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={onChange}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.privacy}>
          Fields marked <span aria-hidden="true">*</span>
          <span className="visually-hidden">with an asterisk</span> are required. We only use your details to respond
          to your enquiry. See our <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
        <Button type="submit" disabled={submitting} aria-disabled={submitting} className={styles.submit}>
          {submitting ? (
            <>
              <LoaderCircle className={styles.spinner} size={18} aria-hidden="true" />
              Sending…
            </>
          ) : DEMO_MODE ? (
            'Submit Enquiry (Demo)'
          ) : (
            'Submit Enquiry'
          )}
        </Button>
      </div>
      <p className="visually-hidden" aria-live="polite">
        {submitting ? 'Submitting your enquiry…' : ''}
      </p>
    </form>
  );
}
