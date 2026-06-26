import { useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";

const VALUES = [
  {
    emoji: "🥗",
    title: "Real food, real macros",
    desc: "Every bowl is weighed, logged, and cooked in olive oil. No fillers, no mystery — just protein-first meals that fit your goals.",
  },
  {
    emoji: "📦",
    title: "Delivered daily, fresh",
    desc: "We cook fresh every morning. Lunch arrives 12–2 PM, dinner 6–8 PM, Monday to Saturday — straight to your door.",
  },
  {
    emoji: "🔬",
    title: "Macro-tracked, always",
    desc: "Calories, protein, and fibre are printed on every box. You know exactly what you're eating — without tracking it yourself.",
  },
  {
    emoji: "🌿",
    title: "Clean ingredients only",
    desc: "100% preservative-free. Cooked in olive oil. No artificial flavours or colour. Just food that's good for you.",
  },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="bg-bg">
      <SEO
        title="About Macra — Protein Bowls Delivered in Hyderabad"
        description="Macra is a subscription-based protein bowl delivery service in KPHB, Hyderabad. Every bowl is weighed to the gram, cooked in olive oil, and delivered fresh daily."
        keywords="about Macra, protein bowl delivery Hyderabad, healthy food Hyderabad, KPHB meal delivery"
        canonicalPath="/about"
      />
      <Header />

      {/* Hero */}
      <div className="bg-forest py-10 text-white sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
            Our story
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            Eat clean. Track nothing.<br />We do it for you.
          </h1>
          <p
            className="mt-4 max-w-xl text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Macra is a subscription-based healthy meal delivery service built for
            people in Hyderabad who want to eat well without spending hours cooking
            or counting calories.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-emerald-dark">
              Why Macra
            </p>
            <h2 className="mt-2 font-heading text-xl font-bold text-forest sm:text-2xl">
              Healthy eating is hard. We made it easy.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Most people know what they should eat — they just don't have the time
              to cook it, weigh it, or track it. Macra removes all of that friction.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              You pick a bowl tier that matches your protein goal, choose a
              subscription plan, and plan your week every Sunday. We handle the
              cooking, the macros, and the delivery — fresh to your door, twice
              a day if you want.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              We're starting in KPHB, Hyderabad, and we're just getting started.
            </p>
          </div>

          <div className="rounded-2xl bg-forest p-6 text-white sm:p-8">
            <p className="font-heading text-xs font-bold uppercase tracking-wide text-emerald">
              At a glance
            </p>
            <div className="mt-4 space-y-3">
              {[
                ["Brand", "Macra"],
                ["Operated by", "Nandu Boda"],
                ["Based in", "KPHB, Hyderabad, Telangana"],
                ["Delivery area", "Within 3 km of KPHB"],
                ["Delivery days", "Monday – Saturday"],
                ["FSSAI", "Basic Registration (in process)"],
                ["Founded", "2026"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {label}
                  </span>
                  <span className="text-right text-xs font-semibold text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-14">
          <p className="font-heading text-xs font-bold uppercase tracking-widest text-emerald-dark">
            What we stand for
          </p>
          <h2 className="mt-2 font-heading text-xl font-bold text-forest sm:text-2xl">
            Our principles
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-sage bg-white p-5 shadow-card"
              >
                <span className="text-2xl">{v.emoji}</span>
                <h3 className="mt-3 font-heading text-sm font-bold text-forest sm:text-base">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-sage/30 p-6 text-center sm:p-8">
          <h2 className="font-heading text-xl font-bold text-forest">
            Ready to eat clean?
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Start with a 4-day trial. No commitment until you've tasted Macra.
          </p>
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => navigate("/subscribe")}
              className="rounded-full bg-emerald px-6 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
            >
              Start your trial — ₹599 →
            </button>
            <a
              href="/contact"
              className="rounded-full border border-sage bg-white px-6 py-3 font-heading text-sm font-semibold text-forest transition-colors hover:bg-sage/30"
            >
              Contact us
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
