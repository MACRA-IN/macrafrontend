import SEO from "../../components/common/SEO";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";

const S = {
  section: "mt-10 border-t border-sage pt-10",
  h2: "font-heading text-lg font-bold text-forest sm:text-xl",
  h3: "mt-5 font-heading text-sm font-bold text-forest sm:text-base",
  p: "mt-3 text-sm leading-relaxed text-text-muted",
  ul: "mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-text-muted",
};

function Table({ heads, rows }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-sage">
      <table className="w-full text-sm">
        <thead className="bg-sage/20">
          <tr>
            {heads.map((h) => (
              <th key={h} className="px-4 py-2.5 text-left font-heading text-xs font-bold uppercase tracking-wide text-forest">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-sage">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-sm text-text-muted">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RefundScenario({ icon, title, eligible, children }) {
  return (
    <div className={`mt-4 rounded-xl border p-4 ${eligible ? "border-emerald/30 bg-sage/10" : "border-red-100 bg-red-50/30"}`}>
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <p className={`font-heading text-sm font-bold ${eligible ? "text-forest" : "text-red-700"}`}>{title}</p>
        <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${eligible ? "bg-emerald/15 text-emerald-dark" : "bg-red-100 text-red-600"}`}>
          {eligible ? "Eligible" : "Not eligible"}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-text-muted">{children}</p>
    </div>
  );
}

export default function RefundPolicy() {
  return (
    <div className="bg-bg">
      <SEO
        title="Refund & Cancellation Policy | Macra"
        description="Macra's refund and cancellation policy for meal subscriptions. Pro-rata refunds, cancellation process, and damaged order replacements explained clearly."
        canonicalPath="/refund-policy"
      />
      <Header />

      {/* Hero */}
      <div className="bg-forest py-10 text-white sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald">Legal</p>
          <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            Refund and Cancellation Policy
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            Last updated: June 25, 2026
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Operated by <strong className="text-white">Srava Technologies Private Limited</strong> · KPHB, Hyderabad, Telangana – 500072, India
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">

        {/* 1 */}
        <div>
          <h2 className={S.h2}>1. Overview</h2>
          <p className={S.p}>
            At Macra, we believe you should feel confident before you commit. This policy explains your rights and our
            obligations when it comes to cancellations, refunds, and issues with your subscription or individual deliveries.
          </p>
          <p className={S.p}>
            This policy is in addition to your rights under the{" "}
            <strong className="text-forest">Consumer Protection Act, 2019</strong> and other applicable Indian laws, which are
            not restricted by anything in this document.
          </p>
          <p className="mt-3 rounded-xl border border-sage bg-sage/10 px-4 py-3 text-sm font-semibold text-forest">
            All refunds are credited back to the original payment method used at the time of purchase, processed through
            Razorpay within the timelines described below.
          </p>
        </div>

        {/* 2 */}
        <div className={S.section}>
          <h2 className={S.h2}>2. Cancellation by the Customer</h2>

          <h3 className={S.h3}>2.1 Cancellation Before First Delivery</h3>
          <p className={S.p}>
            If you cancel your subscription <strong className="text-forest">before your first delivery has been made</strong>, you are
            entitled to a <strong className="text-forest">full refund</strong> of the amount paid, with no deductions.
          </p>
          <p className="mt-2 rounded-xl bg-sage/20 px-4 py-2.5 text-xs font-semibold text-forest">
            Condition: Cancellation must be requested before the scheduled time of your first delivery.
          </p>

          <h3 className={S.h3}>2.2 Cancellation After First Delivery (Pro-rata Refund)</h3>
          <p className={S.p}>
            If you cancel after at least one delivery has been made, you are eligible for a{" "}
            <strong className="text-forest">pro-rata refund</strong> based on the number of undelivered meals remaining.
          </p>
          <div className="mt-4 rounded-xl border border-sage bg-sage/10 p-4">
            <p className="font-heading text-xs font-bold uppercase tracking-wide text-forest">Refund Calculation Formula</p>
            <p className="mt-2 font-mono text-sm text-text-muted">
              Refund = (Undelivered bowls ÷ Total bowls) × Amount paid
            </p>
            <p className="mt-3 text-xs text-text-muted">
              <strong className="text-forest">Example:</strong> You subscribed to a Monthly plan for ₹3,000 with 25 bowls.
              After 10 bowls delivered, you cancel. Remaining = 15.
              Refund = (15 ÷ 25) × ₹3,000 = <strong className="text-forest">₹1,800</strong>
            </p>
          </div>

          <p className={S.p}>Important notes for mid-subscription cancellations:</p>
          <ul className={S.ul}>
            <li>Bowls that have been prepared and dispatched on the day of your cancellation request are considered "delivered" for refund purposes, even if still in transit</li>
            <li>Any Razorpay processing fees charged at the time of the original payment are non-refundable</li>
          </ul>
        </div>

        {/* 3 */}
        <div className={S.section}>
          <h2 className={S.h2}>3. Trial Plan — Specific Refund Terms</h2>
          <ul className={S.ul}>
            <li><strong className="text-forest">Full refund</strong> if cancelled before your first delivery</li>
            <li><strong className="text-forest">No refund</strong> for any meal that has already been delivered</li>
            <li><strong className="text-forest">Pro-rata refund</strong> for remaining undelivered bowls under the same formula in Section 2.2, if 1 or more meals have been delivered</li>
            <li>The Trial discount (if any) applied to your subscription will be accounted for — the effective per-bowl price after discount will be used in the refund calculation</li>
          </ul>
        </div>

        {/* 4 */}
        <div className={S.section}>
          <h2 className={S.h2}>4. Refunds for Delivery Failures Caused by Macra</h2>
          <p className={S.p}>
            If we fail to deliver your meal due to reasons within our control, you will not be charged for that meal and
            will receive a credit or refund.
          </p>

          <RefundScenario icon="🍳" title="Kitchen or Preparation Issues" eligible={true}>
            If a meal cannot be prepared or dispatched due to a kitchen failure, ingredient unavailability, or staff
            shortage, we will notify you as early as possible. The affected bowl will not count as delivered. You will
            receive a credit or refund for that bowl.
          </RefundScenario>

          <RefundScenario icon="🚴" title="Delivery Personnel Issues" eligible={true}>
            If a meal is prepared but cannot be delivered due to rider failure and no alternative can be arranged within
            the delivery window, the bowl will not count as delivered. You will receive a credit or refund.
          </RefundScenario>

          <RefundScenario icon="🔄" title="Incorrect or Wrong Order Delivered" eligible={true}>
            If you receive a bowl from a different tier than your subscription or significantly different from your
            selection, notify us within 2 hours of delivery with a photograph. We will arrange a replacement or issue a
            full refund for the affected bowl.
          </RefundScenario>

          <RefundScenario icon="⚠️" title="Damaged or Spoiled Food" eligible={true}>
            If your meal arrives damaged or spoiled, notify us within 2 hours of delivery with a photograph. We will offer
            a replacement delivery or a full refund for the affected bowl, at your choice. Claims reported after 2 hours
            will not be eligible.
          </RefundScenario>
        </div>

        {/* 5 */}
        <div className={S.section}>
          <h2 className={S.h2}>5. Non-Refundable Situations</h2>
          <p className={S.p}>The following situations are <strong className="text-forest">not eligible</strong> for a refund or replacement:</p>

          <Table
            heads={["Situation", "Reason"]}
            rows={[
              ["Meals that have been successfully delivered", "Food is perishable and consumed; no return is possible"],
              ["Missed delivery due to customer unavailability", "The meal was prepared and dispatched; failure was outside our control"],
              ["Missed weekly meal plan submission", "A default bowl is assigned; the bowl is still prepared and delivered"],
              ["Change of mind after delivery has been dispatched", "Preparation and dispatch costs have already been incurred"],
              ["Meals missed due to incorrect address provided by the customer", "Address error is the customer's responsibility"],
              ["Pause days exceeding the plan limit", "Pause days are capped per plan; excess requests are not honoured"],
              ["Meals skipped voluntarily within an active plan", "Voluntary skips are not refundable"],
            ]}
          />
        </div>

        {/* 6 */}
        <div className={S.section}>
          <h2 className={S.h2}>6. Cancellation by Macra</h2>
          <p className={S.p}>We reserve the right to cancel your subscription in the following circumstances:</p>
          <ul className={S.ul}>
            <li>
              <strong className="text-forest">Delivery area change:</strong> If your address falls outside our serviceable area due to a zone update, we will issue a full refund for all undelivered meals.
            </li>
            <li>
              <strong className="text-forest">Account violation:</strong> If your account is terminated due to a violation of our Terms and Conditions, we will refund only the pro-rata value of undelivered meals at our discretion.
            </li>
            <li>
              <strong className="text-forest">Business suspension:</strong> If Macra permanently or temporarily ceases operations, all active subscribers will receive a full pro-rata refund for undelivered meals within 14 business days.
            </li>
          </ul>
        </div>

        {/* 7 */}
        <div className={S.section}>
          <h2 className={S.h2}>7. Force Majeure — Disruptions Beyond Our Control</h2>
          <p className={S.p}>
            In the event of service disruption caused by circumstances beyond our reasonable control — including natural
            disasters, government lockdowns, pandemics, severe weather, or civil unrest — we will:
          </p>
          <ul className={S.ul}>
            <li>Notify you promptly via email and SMS</li>
            <li>Pause your subscription for the duration of the disruption (force majeure pause days do not count against your plan's pause limit)</li>
            <li>Extend your subscription end date by the number of days affected</li>
            <li>If extension is not possible, offer a pro-rata refund for remaining undelivered bowls</li>
          </ul>
        </div>

        {/* 8 */}
        <div className={S.section}>
          <h2 className={S.h2}>8. How to Request a Refund or Cancellation</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "💻",
                title: "Account Dashboard",
                desc: "Log in and use the 'Cancel Subscription' option. Requests are automatically timestamped.",
              },
              {
                icon: "✉️",
                title: "By Email",
                desc: "Email nanduboda13@gmail.com with subject: \"Refund/Cancellation — [Your Name] — [Order ID]\"",
              },
              {
                icon: "📞",
                title: "By Phone",
                desc: "Call +91 83091 80145 · Mon–Sat, 9 AM – 6 PM IST. We'll confirm by email.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-sage bg-white p-4 shadow-card">
                <span className="text-xl">{item.icon}</span>
                <p className="mt-2 font-heading text-sm font-bold text-forest">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className={S.h3}>For food quality issues, include in your request:</h3>
          <ul className={S.ul}>
            <li>Your registered name and email address</li>
            <li>Your subscription plan and order ID (from your account or confirmation email)</li>
            <li>The reason for your cancellation or refund request</li>
            <li>A clear photograph of the affected meal (for damaged/wrong orders)</li>
          </ul>
        </div>

        {/* 9 */}
        <div className={S.section}>
          <h2 className={S.h2}>9. Refund Processing Timeline</h2>
          <Table
            heads={["Step", "Timeline"]}
            rows={[
              ["Acknowledgement of your request", "Within 24 hours of receiving the request"],
              ["Refund approval (verification)", "Within 2 business days"],
              ["Refund initiated to Razorpay", "Within 3 business days of approval"],
              ["Amount credited to your account", "5–7 business days from initiation (depending on your bank)"],
            ]}
          />
          <p className={S.p}>
            <strong className="text-forest">Total maximum timeline: 5–7 business days from the date of approval.</strong>
            {" "}If you have not received your refund within 10 business days of our confirmation, please contact your
            bank first, then reach out to us.
          </p>
        </div>

        {/* 10 */}
        <div className={S.section}>
          <h2 className={S.h2}>10. Refund Method</h2>
          <p className={S.p}>Refunds are always processed to the <strong className="text-forest">original payment method</strong> used at the time of subscription:</p>
          <Table
            heads={["Payment Method", "Refund Destination"]}
            rows={[
              ["UPI (GPay, PhonePe, Paytm, etc.)", "Original UPI ID / linked bank account"],
              ["Credit card", "Original credit card"],
              ["Debit card", "Original debit card"],
              ["Net banking", "Original bank account"],
            ]}
          />
          <p className={S.p}>
            We are unable to process refunds to a different payment method or as cash. If your original payment method is
            no longer active, please contact us and we will work with Razorpay to find an alternative resolution.
          </p>
        </div>

        {/* 11 */}
        <div className={S.section}>
          <h2 className={S.h2}>11. Dispute Resolution</h2>
          <p className={S.p}>If you are not satisfied with our response to a refund or cancellation request:</p>
          <ul className={S.ul}>
            <li><strong className="text-forest">Step 1:</strong> Reply to our resolution email or call <strong className="text-forest">+91 83091 80145</strong> to escalate to a senior team member.</li>
            <li><strong className="text-forest">Step 2:</strong> Contact our Grievance Officer at <strong className="text-forest">nanduboda13@gmail.com</strong> with the subject "Escalated Complaint." We will respond within 5 business days.</li>
            <li><strong className="text-forest">Step 3:</strong> You may file a complaint with the <strong className="text-forest">District Consumer Disputes Redressal Commission, Hyderabad</strong>, under the Consumer Protection Act, 2019.</li>
          </ul>
        </div>

        {/* 12 */}
        <div className={S.section}>
          <h2 className={S.h2}>12. Policy Updates</h2>
          <p className={S.p}>
            We may update this Refund and Cancellation Policy from time to time. Any changes will be effective immediately
            upon posting to our website, with the "Last updated" date revised accordingly. For material changes, we will
            notify you by email. Changes will not apply retroactively to subscriptions purchased before the effective date.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-2xl bg-forest p-6 text-white">
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-emerald">
            Refund or delivery issue? We're here.
          </p>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
            Srava Technologies Private Limited (Macra)
            <br />KPHB, Hyderabad, Telangana – 500072, India
          </p>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
            Email: <span className="font-semibold text-white">nanduboda13@gmail.com</span>
            <br />Phone: <span className="font-semibold text-white">+91 83091 80145</span>
            <br />Business hours: Monday to Saturday, 9:00 AM – 9:00 PM IST
          </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}
