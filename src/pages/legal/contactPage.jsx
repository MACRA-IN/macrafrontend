import { useState } from "react";
import { MapPin, Phone, Mail, Timer, Send, CheckCircle2 } from "lucide-react";
import SEO from "../../components/common/SEO";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Macra",
  "url": "https://macra.in/contact",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "Macra",
    "telephone": "+918309180145",
    "email": "support@macra.in",
    "openingHours": "Mo-Sa 09:00-21:00",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "KPHB Colony",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500085",
      "addressCountry": "IN"
    }
  }
};

const INFO = [
  {
    icon: MapPin,
    label: "Address",
    lines: ["KPHB, Hyderabad", "Telangana – 500085, India"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["support@macra.in"],
    href: "mailto:support@macra.in",
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+91 83091 80145"],
    href: "tel:+918309180145",
  },
  {
    icon: Timer,
    label: "Business Hours",
    lines: ["Monday – Saturday", "9:00 AM – 9:00 PM IST"],
  },
];

export default function ContactPage() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-bg">
      <SEO
        title="Contact Us | Macra Hyderabad"
        description="Get in touch with Macra. We deliver protein bowls in KPHB, Hyderabad. Email, phone, and support for orders, subscriptions, and feedback."
        keywords="contact Macra, Macra Hyderabad contact, protein bowl delivery support, KPHB food delivery contact"
        canonicalPath="/contact"
        structuredData={contactSchema}
      />
      <Header />

      {/* Hero */}
      <div className="bg-forest py-10 text-white sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
            Support
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            Contact Us
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            We respond to all queries within <strong className="text-white">24 hours</strong>,
            Monday to Saturday. For order-related queries, include your{" "}
            <strong className="text-white">subscription ID</strong> for faster resolution.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Left — contact info */}
          <div className="flex flex-col gap-4">

            {INFO.map(({ icon: Icon, label, lines, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-sage bg-white p-4 shadow-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/40">
                  <Icon size={18} className="text-emerald-dark" />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-wide text-text-muted">
                    {label}
                  </p>
                  {lines.map((line, i) =>
                    href && i === 0 ? (
                      <a
                        key={i}
                        href={href}
                        className="mt-0.5 block text-sm font-semibold text-forest hover:text-emerald"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="mt-0.5 text-sm text-forest font-semibold">
                        {line}
                      </p>
                    ),
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex items-start gap-4 rounded-2xl border border-sage bg-white p-4 shadow-card">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/40">
                <MapPin size={18} className="text-emerald-dark" />
              </div>
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-wide text-text-muted">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/trymacra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block text-sm font-semibold text-forest hover:text-emerald"
                >
                  @trymacra
                </a>
              </div>
            </div>

            {/* Note */}
            <div className="rounded-2xl bg-sage/20 p-4">
              <p className="font-heading text-xs font-bold text-forest">
                For order & delivery queries
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                Please include your <strong className="text-forest">Subscription ID</strong> (found in your
                account dashboard) in the message for faster resolution. We aim to respond
                within <strong className="text-forest">24 hours</strong> on business days.
              </p>
            </div>

          </div>

          {/* Right — contact form */}
          <div className="rounded-2xl border border-sage bg-white p-6 shadow-card sm:p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/30">
                  <CheckCircle2 size={28} className="text-emerald" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-forest">
                  Message sent!
                </h3>
                <p className="mt-2 max-w-xs text-sm text-text-muted">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-6 rounded-full border border-sage px-5 py-2 text-sm font-semibold text-forest transition-colors hover:bg-sage/30"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-lg font-bold text-forest">
                  Send us a message
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  We'll respond within 24 hours on business days.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wide text-forest">
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className="w-full rounded-xl border border-sage bg-bg px-4 py-3 text-sm text-forest outline-none transition-all placeholder:text-text-muted/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wide text-forest">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-sage bg-bg px-4 py-3 text-sm text-forest outline-none transition-all placeholder:text-text-muted/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block font-heading text-xs font-bold uppercase tracking-wide text-forest">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your query. If order-related, include your Subscription ID."
                      className="w-full resize-none rounded-xl border border-sage bg-bg px-4 py-3 text-sm text-forest outline-none transition-all placeholder:text-text-muted/50 focus:border-emerald focus:ring-2 focus:ring-emerald/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 rounded-full bg-emerald py-3 font-heading text-sm font-semibold text-white transition-all hover:bg-emerald-dark active:scale-[0.98] disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Send size={14} />
                    )}
                    {submitting ? "Sending…" : "Send message"}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>

        {/* Business info strip */}
        <div className="mt-10 rounded-2xl border border-sage bg-white px-6 py-5">
          <p className="font-heading text-xs font-bold uppercase tracking-wide text-text-muted">
            Business details
          </p>
          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <span className="text-forest"><strong>Macra</strong></span>
            <span className="text-text-muted">KPHB, Hyderabad, Telangana – 500085</span>
            <span className="text-text-muted">GSTIN: Applied for</span>
            <span className="text-text-muted">FSSAI: Registration in process</span>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
