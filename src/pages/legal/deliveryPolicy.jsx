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

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-sage bg-white p-4 shadow-card">
      <p className="text-xl">{icon}</p>
      <p className="mt-2 font-heading text-xs font-bold uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <p className="mt-1 font-heading text-sm font-bold text-forest">{value}</p>
    </div>
  );
}

export default function DeliveryPolicy() {
  return (
    <div className="bg-bg">
      <SEO
        title="Delivery Policy | Macra Hyderabad"
        description="Macra delivers protein bowls in KPHB, Hyderabad within a 3km radius. Lunch 12–2 PM, Dinner 6–8 PM, Monday to Saturday. Fresh, tamper-evident packaging."
        keywords="food delivery Hyderabad, KPHB delivery, protein bowl delivery, meal delivery times Hyderabad"
        canonicalPath="/delivery-policy"
      />
      <Header />

      {/* Hero */}
      <div className="bg-forest py-10 text-white sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
            Legal
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            Delivery Policy
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            Last updated: June 2026
          </p>
          <p
            className="mt-4 max-w-xl text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Operated by <strong className="text-white">Macra</strong> · KPHB,
            Hyderabad, Telangana – 500085, India
          </p>
        </div>
      </div>

      {/* Quick-glance cards */}
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <InfoCard icon="📍" label="Service area" value="3 km from KPHB" />
          <InfoCard icon="☀️" label="Lunch slot" value="12:00 – 2:00 PM" />
          <InfoCard icon="🌙" label="Dinner slot" value="6:00 – 8:00 PM" />
          <InfoCard icon="📅" label="Delivery days" value="Mon – Sat only" />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">

        {/* 1 */}
        <div>
          <h2 className={S.h2}>1. Overview</h2>
          <p className={S.p}>
            This Delivery Policy describes how Macra delivers your protein bowls, the
            conditions that govern each delivery, and what happens if a delivery is missed,
            delayed, or fails. Please read this policy carefully before placing a
            subscription order.
          </p>
          <p className={S.p}>
            By subscribing to Macra, you agree to the delivery terms described in this
            policy. This policy should be read together with our{" "}
            <a
              href="/terms"
              className="font-semibold text-emerald-dark underline underline-offset-2 hover:text-emerald"
            >
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a
              href="/refund-policy"
              className="font-semibold text-emerald-dark underline underline-offset-2 hover:text-emerald"
            >
              Refund and Cancellation Policy
            </a>
            .
          </p>
        </div>

        {/* 2 */}
        <div className={S.section}>
          <h2 className={S.h2}>2. Service Area</h2>
          <p className={S.p}>
            Macra currently delivers within a{" "}
            <strong className="text-forest">3 km radius of KPHB, Hyderabad, Telangana</strong>.
            This is our initial launch area; we are actively working to expand coverage
            across Hyderabad.
          </p>
          <p className={S.p}>
            At the time of checkout, we verify your delivery address against our serviceable
            zone using your GPS location. If your address falls outside our current delivery
            radius, we will not be able to accept your subscription. You will be notified
            immediately and not charged.
          </p>
          <p className={S.p}>
            If our delivery zone changes after your subscription is active and your address
            falls outside the new zone, we will contact you and issue a full pro-rata refund
            for undelivered meals.
          </p>
        </div>

        {/* 3 */}
        <div className={S.section}>
          <h2 className={S.h2}>3. Delivery Days and Time Windows</h2>

          <h3 className={S.h3}>3.1 Delivery Days</h3>
          <p className={S.p}>
            Deliveries are made <strong className="text-forest">Monday through Saturday only</strong>.
            There are no deliveries on Sundays or on national public holidays as listed under
            the Negotiable Instruments Act, 1881. Holidays falling on a delivery day will be
            treated as a non-delivery day; your subscription end date will be extended
            accordingly.
          </p>

          <h3 className={S.h3}>3.2 Delivery Time Windows</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { emoji: "☀️", slot: "Lunch", time: "12:00 PM – 2:00 PM" },
              { emoji: "🌙", slot: "Dinner", time: "6:00 PM – 8:00 PM" },
            ].map((s) => (
              <div
                key={s.slot}
                className="rounded-xl border border-sage bg-white p-4"
              >
                <span className="text-xl">{s.emoji}</span>
                <p className="mt-2 font-heading text-sm font-bold text-forest">
                  {s.slot}
                </p>
                <p className="text-xs text-text-muted">{s.time}</p>
              </div>
            ))}
          </div>
          <p className={S.p}>
            We make every effort to deliver within these windows. However, exact delivery
            times within a window may vary due to traffic, weather conditions, kitchen
            preparation times, or high order volumes. We do not guarantee a specific
            minute within the window.
          </p>

          <h3 className={S.h3}>3.3 Slot Selection</h3>
          <p className={S.p}>
            You select your preferred delivery slot(s) — Lunch only, Dinner only, or
            Both — at the time of subscription. This selection applies to all deliveries
            within that subscription and <strong className="text-forest">cannot be changed mid-subscription</strong>.
          </p>
        </div>

        {/* 4 */}
        <div className={S.section}>
          <h2 className={S.h2}>4. Meal Planning and Order Deadlines</h2>
          <p className={S.p}>
            Macra operates on a weekly meal planning cycle. Every{" "}
            <strong className="text-forest">Sunday by 11:59 PM</strong>, subscribers must
            log in to their account and select their bowls for the upcoming week
            (Monday to Saturday).
          </p>
          <ul className={S.ul}>
            <li>
              If you do not submit your meal plan by the Sunday deadline, a default bowl
              from your subscribed tier will be assigned for that week.
            </li>
            <li>
              Once submitted, your weekly meal plan is <strong className="text-forest">locked
              and cannot be modified</strong>. This is because we begin ingredient procurement
              and kitchen preparation immediately after the Sunday cutoff.
            </li>
            <li>
              We will send you a reminder via email and SMS before the Sunday deadline.
            </li>
          </ul>
        </div>

        {/* 5 */}
        <div className={S.section}>
          <h2 className={S.h2}>5. Delivery Method</h2>
          <p className={S.p}>
            Your meals are delivered by our delivery partners directly to the address
            saved in your Macra account. The delivery address is set at the time of
            subscription and is used for all deliveries within that plan.
          </p>
          <p className={S.p}>
            Our delivery partners are trained to follow food safety guidelines during
            transit. Meals are transported in insulated delivery bags to maintain
            freshness during the delivery window.
          </p>
        </div>

        {/* 6 */}
        <div className={S.section}>
          <h2 className={S.h2}>6. Customer Responsibilities</h2>

          <h3 className={S.h3}>6.1 Availability at Delivery Address</h3>
          <p className={S.p}>
            You are responsible for ensuring that you or an authorised person is available
            at the delivery address during your selected delivery window to receive your
            order.
          </p>

          <h3 className={S.h3}>6.2 Missed Deliveries — Customer Unavailable</h3>
          <p className={S.p}>If no one is available to receive your delivery:</p>
          <ul className={S.ul}>
            <li>Our delivery partner will attempt to contact you on your registered mobile number.</li>
            <li>If you cannot be reached, the meal may be left at the door at the delivery partner's discretion, at your own risk.</li>
            <li>
              <strong className="text-forest">Missed deliveries due to customer unavailability are not eligible for a refund or re-delivery.</strong> The meal is considered as delivered for that slot.
            </li>
          </ul>

          <h3 className={S.h3}>6.3 Failed Delivery — Wrong Address or Unreachable Customer</h3>
          <p className={S.p}>
            If the delivery fails because the address provided is incorrect or the customer
            is unreachable and the meal cannot be safely left at the location, that meal
            will be <strong className="text-forest">marked as delivered and will not be eligible for
            a refund</strong>. Please ensure your delivery address and phone number are accurate
            in your account before your subscription commences.
          </p>
        </div>

        {/* 7 */}
        <div className={S.section}>
          <h2 className={S.h2}>7. Failed Deliveries Due to Our Fault</h2>
          <p className={S.p}>
            If a delivery fails due to a reason within our control — such as a kitchen
            delay, rider breakdown, or operational issue — we will:
          </p>
          <ul className={S.ul}>
            <li>Notify you as soon as possible via SMS or phone call</li>
            <li>
              Arrange a <strong className="text-forest">replacement delivery</strong> at the earliest
              opportunity, or
            </li>
            <li>
              Issue a <strong className="text-forest">full refund</strong> for the affected bowl if
              a replacement cannot be arranged within a reasonable time
            </li>
            <li>
              The affected bowl will <strong className="text-forest">not count as delivered</strong> and
              will not be deducted from your subscription count
            </li>
          </ul>
          <p className={S.p}>
            For complete details on refund eligibility, please refer to our{" "}
            <a
              href="/refund-policy"
              className="font-semibold text-emerald-dark underline underline-offset-2 hover:text-emerald"
            >
              Refund and Cancellation Policy
            </a>
            .
          </p>
        </div>

        {/* 8 */}
        <div className={S.section}>
          <h2 className={S.h2}>8. Weather and Force Majeure</h2>
          <p className={S.p}>
            Deliveries may be delayed or cancelled during extreme weather conditions
            (heavy rain, flooding, cyclones), government-declared emergencies, curfews,
            or other events beyond our reasonable control.
          </p>
          <p className={S.p}>In such cases:</p>
          <ul className={S.ul}>
            <li>We will notify you as early as possible via email and SMS</li>
            <li>Affected delivery days will not count against your subscription</li>
            <li>Your subscription end date will be extended by the number of affected days</li>
            <li>If extension is not operationally possible, a pro-rata refund for undelivered meals will be issued</li>
          </ul>
        </div>

        {/* 9 */}
        <div className={S.section}>
          <h2 className={S.h2}>9. Delivery Tracking</h2>
          <p className={S.p}>
            Real-time delivery tracking is <strong className="text-forest">currently not available</strong>.
            However, we will send you a notification via{" "}
            <strong className="text-forest">WhatsApp and/or SMS</strong> when your meal is out for
            delivery. This feature is being actively developed and will be available in a
            future update.
          </p>
        </div>

        {/* 10 */}
        <div className={S.section}>
          <h2 className={S.h2}>10. Address Changes</h2>
          <p className={S.p}>
            You cannot change your delivery address mid-subscription. If you need to
            update your address, please do so in your account settings at least{" "}
            <strong className="text-forest">24 hours before your next scheduled delivery</strong>.
            The updated address will apply from the next delivery onwards.
          </p>
          <p className={S.p}>
            Address changes that fall outside the 3 km serviceable zone will result in
            suspension of deliveries until a valid address within the zone is provided.
            No refund is available for delivery days lost due to an out-of-zone address
            change by the customer.
          </p>
        </div>

        {/* 11 */}
        <div className={S.section}>
          <h2 className={S.h2}>11. Packaging</h2>
          <ul className={S.ul}>
            <li>All meals are packed in <strong className="text-forest">food-grade, sealed containers</strong> that comply with applicable food safety standards</li>
            <li><strong className="text-forest">Tamper-evident packaging</strong> is used on all deliveries — if the seal on your container appears broken or tampered with upon delivery, do not consume the meal and contact us immediately with a photograph</li>
            <li>Our packaging is designed to maintain food quality during transit within the delivery window</li>
          </ul>
        </div>

        {/* 12 */}
        <div className={S.section}>
          <h2 className={S.h2}>12. Food Freshness and Consumption</h2>
          <p className={S.p}>
            All Macra bowls are cooked fresh and delivered on the same day. For the best
            quality, taste, and food safety:
          </p>
          <ul className={S.ul}>
            <li>
              Please <strong className="text-forest">consume your meal within 2 hours of delivery</strong>
            </li>
            <li>If you are unable to consume immediately, refrigerate promptly and consume within 12 hours</li>
            <li>Do not consume any meal if the packaging appears damaged, the seal is broken, or the food appears or smells unusual — contact us immediately</li>
          </ul>
        </div>

        {/* 13 */}
        <div className={S.section}>
          <h2 className={S.h2}>13. Changes to This Policy</h2>
          <p className={S.p}>
            We may update this Delivery Policy from time to time. Any material changes
            will be communicated to you via email and will be reflected by updating the
            "Last updated" date on this page. Continued use of the service after such
            changes constitutes your acceptance of the updated policy.
          </p>
        </div>

        {/* Contact box */}
        <div className="mt-10 rounded-2xl bg-forest p-6 text-white">
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-emerald">
            Delivery issue? We'll sort it.
          </p>
          <p
            className="mt-3 text-sm"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Macra · KPHB, Hyderabad, Telangana – 500085, India
          </p>
          <p
            className="mt-2 text-sm"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Email:{" "}
            <span className="font-semibold text-white">
              support@macra.in
            </span>
            <br />
            Phone:{" "}
            <span className="font-semibold text-white">+91 83091 80145</span>
            <br />
            Business hours:{" "}
            <span className="font-semibold text-white">
              Monday – Saturday, 9:00 AM – 9:00 PM IST
            </span>
          </p>
          <a
            href="/contact"
            className="mt-4 inline-block rounded-full bg-emerald px-5 py-2.5 font-heading text-sm font-semibold text-white transition-colors hover:bg-emerald-dark"
          >
            Go to Contact page →
          </a>
        </div>

      </div>

      <Footer />
    </div>
  );
}
