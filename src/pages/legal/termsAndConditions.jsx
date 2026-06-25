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

export default function TermsAndConditions() {
  return (
    <div className="bg-bg">
      <Header />

      {/* Hero */}
      <div className="bg-forest py-10 text-white sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald">Legal</p>
          <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            Terms and Conditions
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
          <h2 className={S.h2}>1. Introduction and Acceptance of Terms</h2>
          <p className={S.p}>
            These Terms and Conditions ("Terms") form a legally binding agreement between you ("you", "user", "customer")
            and <strong className="text-forest">Srava Technologies Private Limited</strong> (operating as "Macra"), a company
            incorporated under the Companies Act, 2013, with its registered office at KPHB, Hyderabad, Telangana – 500072, India.
          </p>
          <p className={S.p}>
            By accessing our website at <strong className="text-forest">https://macra.in</strong>, creating an account, or placing
            a subscription order, you confirm that you have read, understood, and agree to be bound by these Terms and our
            Privacy Policy, which is incorporated into these Terms by reference.
          </p>
          <p className="mt-3 rounded-xl border border-sage bg-sage/10 px-4 py-3 text-sm font-semibold text-forest">
            If you do not agree to these Terms, please do not use our website or services.
          </p>
        </div>

        {/* 2 */}
        <div className={S.section}>
          <h2 className={S.h2}>2. Eligibility</h2>
          <p className={S.p}>To use Macra's services, you must:</p>
          <ul className={S.ul}>
            <li>Be at least <strong className="text-forest">18 years of age</strong></li>
            <li>Be a natural person (not a corporation, organisation, or automated system)</li>
            <li>Provide a valid delivery address within our current delivery area (within a 3 km radius of KPHB, Hyderabad, Telangana)</li>
            <li>Have a valid Indian mobile number and email address</li>
            <li>Have the legal capacity to enter into a binding contract under Indian law</li>
          </ul>
          <p className={S.p}>
            By registering on our platform, you represent and warrant that you meet all of the above eligibility requirements.
            If we discover that you do not meet these requirements, we reserve the right to suspend or terminate your account
            immediately.
          </p>
        </div>

        {/* 3 */}
        <div className={S.section}>
          <h2 className={S.h2}>3. Account Registration and Responsibilities</h2>

          <h3 className={S.h3}>3.1 Creating an Account</h3>
          <p className={S.p}>
            To place a subscription order, you must create an account by providing your name, email address, phone number,
            delivery address, and a secure password. You agree to provide accurate, complete, and current information.
          </p>

          <h3 className={S.h3}>3.2 Account Security</h3>
          <p className={S.p}>You are responsible for:</p>
          <ul className={S.ul}>
            <li>Maintaining the confidentiality of your password and account credentials</li>
            <li>All activity that occurs under your account</li>
            <li>Immediately notifying us at <strong className="text-forest">nanduboda13@gmail.com</strong> if you suspect any unauthorised access</li>
          </ul>

          <h3 className={S.h3}>3.3 One Account Per Customer</h3>
          <p className={S.p}>
            Each customer may maintain only one account. Creating multiple accounts to circumvent any restriction —
            including Trial plan eligibility — is a violation of these Terms and may result in account termination.
          </p>

          <h3 className={S.h3}>3.4 Account Termination</h3>
          <p className={S.p}>
            We reserve the right to suspend or permanently terminate your account if we reasonably believe you have violated
            these Terms, engaged in fraudulent activity, or used our services in a manner harmful to others or our business.
          </p>
        </div>

        {/* 4 */}
        <div className={S.section}>
          <h2 className={S.h2}>4. Our Products</h2>
          <p className={S.p}>
            Macra offers daily-delivered protein bowls across the following tiers. Prices are inclusive of applicable taxes
            unless otherwise stated:
          </p>
          <Table
            heads={["Bowl Tier", "Price per Bowl"]}
            rows={[
              ["Mini", "₹149"],
              ["Mini Protein", "₹169"],
              ["Regular", "₹199"],
              ["Large", "₹249"],
            ]}
          />
          <p className={S.p}>
            All bowls are cooked in olive oil, are 100% preservative-free, and include macro-nutritional information.
            Exact nutritional values may vary slightly due to natural variation in ingredients. Specific bowl options
            within your chosen tier may change from week to week.
          </p>
        </div>

        {/* 5 */}
        <div className={S.section}>
          <h2 className={S.h2}>5. Subscription Plans</h2>
          <p className={S.p}>
            Macra operates on a subscription model. Subscriptions are <strong className="text-forest">not automatically renewed</strong> —
            you must actively re-subscribe at the end of each plan.
          </p>

          <h3 className={S.h3}>5.1 Plan Overview</h3>
          <Table
            heads={["Plan", "Duration", "Max Delivery Days", "Bowl Tiers"]}
            rows={[
              ["Trial", "4 days", "4", "All tiers"],
              ["Weekly", "7 days", "6 (Mon–Sat)", "All tiers"],
              ["Monthly", "~30 days", "25 (Mon–Sat)", "All tiers"],
            ]}
          />

          <h3 className={S.h3}>5.2 Trial Plan</h3>
          <ul className={S.ul}>
            <li>Available to first-time subscribers only</li>
            <li>Each customer is entitled to one Trial plan per account, for life</li>
            <li>Once used, the Trial plan will not be available for future subscriptions on the same account</li>
          </ul>

          <h3 className={S.h3}>5.3 Weekly Plan</h3>
          <ul className={S.ul}>
            <li>Covers up to 6 delivery days (Monday through Saturday) within a 7-day period</li>
            <li>Customers may pause delivery for a maximum of <strong className="text-forest">3 days</strong> within the subscription period</li>
          </ul>

          <h3 className={S.h3}>5.4 Monthly Plan</h3>
          <ul className={S.ul}>
            <li>Covers up to 25 delivery days (Monday through Saturday) within approximately 30 days</li>
            <li>Customers may pause delivery for a maximum of <strong className="text-forest">12 days</strong> within the subscription period</li>
          </ul>
        </div>

        {/* 6 */}
        <div className={S.section}>
          <h2 className={S.h2}>6. Meal Planning</h2>

          <h3 className={S.h3}>6.1 Weekly Bowl Selection</h3>
          <p className={S.p}>
            Every <strong className="text-forest">Sunday</strong>, subscribers must log in and select their bowls for the upcoming week
            (Monday to Saturday). You can choose from the available bowl options within your subscribed tier for each
            delivery slot (lunch, dinner, or both).
          </p>

          <h3 className={S.h3}>6.2 Submission Deadline</h3>
          <p className={S.p}>
            Bowl selections must be submitted by <strong className="text-forest">11:59 PM on Sunday</strong>. Failure to submit may result
            in a default bowl being assigned from your tier for that week.
          </p>

          <h3 className={S.h3}>6.3 Lock-in Policy</h3>
          <p className={S.p}>
            Once your weekly meal plan is submitted, it is <strong className="text-forest">locked and cannot be changed</strong>. We begin
            procurement and preparation schedules based on customer selections immediately after the Sunday deadline.
            Please review your selections carefully before submitting.
          </p>

          <h3 className={S.h3}>6.4 Slot Selection</h3>
          <p className={S.p}>At the time of subscription, you will select your preferred delivery slot(s):</p>
          <ul className={S.ul}>
            <li><strong className="text-forest">Lunch only:</strong> 12:00 PM – 2:00 PM</li>
            <li><strong className="text-forest">Dinner only:</strong> 6:00 PM – 8:00 PM</li>
            <li><strong className="text-forest">Both:</strong> Both time windows above</li>
          </ul>
          <p className={S.p}>Your slot selection applies for the full duration of your subscription and cannot be changed mid-subscription.</p>
        </div>

        {/* 7 */}
        <div className={S.section}>
          <h2 className={S.h2}>7. Pricing and Payment</h2>

          <h3 className={S.h3}>7.1 Payment Timing</h3>
          <p className={S.p}>
            <strong className="text-forest">Payment is collected in full and upfront</strong> at the time of subscription. We do not
            offer pay-per-delivery or post-payment options. Your subscription is activated only after successful payment.
          </p>

          <h3 className={S.h3}>7.2 Payment Methods</h3>
          <p className={S.p}>We accept the following payment methods through Razorpay:</p>
          <ul className={S.ul}>
            <li>UPI (GPay, PhonePe, Paytm, BHIM, and others)</li>
            <li>Credit cards (Visa, Mastercard, RuPay, American Express)</li>
            <li>Debit cards</li>
            <li>Net banking (major Indian banks)</li>
          </ul>

          <h3 className={S.h3}>7.3 Pricing Changes</h3>
          <p className={S.p}>
            We reserve the right to change our prices at any time. Price changes will{" "}
            <strong className="text-forest">not affect active subscriptions</strong> — the price you paid at the time of subscription
            is honoured for its full duration. Changed prices apply to future subscriptions.
          </p>

          <h3 className={S.h3}>7.4 Payment Failure</h3>
          <p className={S.p}>
            If your payment fails, your subscription will not be activated. If your payment is debited but the subscription
            is not activated, please contact us at <strong className="text-forest">nanduboda13@gmail.com</strong> and we will resolve the
            issue within 48 hours.
          </p>

          <h3 className={S.h3}>7.5 Taxes</h3>
          <p className={S.p}>All displayed prices include applicable Goods and Services Tax (GST) unless explicitly stated otherwise.</p>
        </div>

        {/* 8 */}
        <div className={S.section}>
          <h2 className={S.h2}>8. Delivery Terms</h2>

          <h3 className={S.h3}>8.1 Delivery Area</h3>
          <p className={S.p}>
            We currently deliver within a <strong className="text-forest">3 km radius of KPHB, Hyderabad, Telangana</strong>. We verify
            your address at checkout using your GPS location. If your address falls outside our delivery zone, we will
            not be able to accept your subscription. We are actively expanding our coverage.
          </p>

          <h3 className={S.h3}>8.2 Delivery Days and Times</h3>
          <ul className={S.ul}>
            <li>Deliveries are made <strong className="text-forest">Monday through Saturday only</strong>. No deliveries on Sundays or national public holidays.</li>
            <li><strong className="text-forest">Lunch slot:</strong> 12:00 PM – 2:00 PM</li>
            <li><strong className="text-forest">Dinner slot:</strong> 6:00 PM – 8:00 PM</li>
          </ul>
          <p className={S.p}>
            Exact delivery times within a window may vary due to traffic, weather, kitchen delays, or high order volumes.
          </p>

          <h3 className={S.h3}>8.3 Customer Availability</h3>
          <p className={S.p}>
            You are responsible for ensuring someone is available at the delivery address during your selected window. If
            no one is available, our delivery personnel will attempt to reach you on your registered mobile number. Missed
            deliveries due to customer unavailability will not be refunded or rescheduled.
          </p>

          <h3 className={S.h3}>8.4 Delivery Address</h3>
          <p className={S.p}>
            You cannot change your delivery address mid-subscription. If you need to change your address for a future
            subscription, update it in your account settings before subscribing again.
          </p>
        </div>

        {/* 9 */}
        <div className={S.section}>
          <h2 className={S.h2}>9. Pause Policy</h2>
          <Table
            heads={["Plan", "Maximum Pause Days"]}
            rows={[
              ["Trial", "Not eligible for pause"],
              ["Weekly", "Up to 3 days"],
              ["Monthly", "Up to 12 days"],
            ]}
          />
          <p className={S.p}>Pause rules:</p>
          <ul className={S.ul}>
            <li>Pause requests must be submitted at least <strong className="text-forest">24 hours before</strong> the delivery day you wish to pause</li>
            <li>Paused days extend the end date of your subscription by the corresponding number of days</li>
            <li>Unused pause days cannot be carried over to future subscriptions</li>
          </ul>
          <p className={S.p}>
            To request a pause, use the pause feature in your account dashboard or contact us at{" "}
            <strong className="text-forest">nanduboda13@gmail.com</strong> or <strong className="text-forest">+91 83091 80145</strong>.
          </p>
        </div>

        {/* 10 */}
        <div className={S.section}>
          <h2 className={S.h2}>10. Cancellation Policy</h2>
          <p className={S.p}>
            You may cancel your subscription at any time. Please refer to our{" "}
            <a href="/refund-policy" className="font-semibold text-emerald-dark underline underline-offset-2 hover:text-emerald">
              Refund and Cancellation Policy
            </a>{" "}
            for complete details on refund eligibility. You may cancel by using the cancellation option in your account
            dashboard, emailing <strong className="text-forest">nanduboda13@gmail.com</strong>, or calling{" "}
            <strong className="text-forest">+91 83091 80145</strong> during business hours.
          </p>
        </div>

        {/* 11 */}
        <div className={S.section}>
          <h2 className={S.h2}>11. Food Safety and Allergen Disclaimer</h2>

          <h3 className={S.h3}>11.1 FSSAI</h3>
          <p className={S.p}>
            Macra's kitchen operations are covered under FSSAI Basic Registration (registration in process). We adhere to
            applicable food safety and hygiene standards as prescribed under the Food Safety and Standards Act, 2006.
          </p>

          <h3 className={S.h3}>11.2 Allergen Warning</h3>
          <p className={S.p}>
            Our bowls may contain or may have been prepared in an environment containing common allergens including but not
            limited to: <strong className="text-forest">gluten, dairy, soy, nuts (including peanuts and tree nuts), sesame, eggs, and shellfish</strong>.
            While we take care to label our products accurately, we cannot guarantee a fully allergen-free environment.
          </p>
          <p className="mt-3 rounded-xl border border-sage bg-sage/10 px-4 py-3 text-sm font-semibold text-forest">
            If you have a known food allergy or intolerance, please consult a healthcare professional before subscribing.
          </p>

          <h3 className={S.h3}>11.3 Nutritional Information</h3>
          <p className={S.p}>
            Macro-nutritional values (calories, protein, fibre) are estimates based on ingredient composition and standard
            nutritional databases. Actual values may vary by up to 10% due to natural variation in raw ingredients, cooking
            methods, and portion weighing.
          </p>
        </div>

        {/* 12 */}
        <div className={S.section}>
          <h2 className={S.h2}>12. Intellectual Property</h2>
          <p className={S.p}>
            All content on our website — including the "Macra" brand name, logo, taglines, photographs, illustrations, text,
            graphics, and software — is the exclusive intellectual property of Srava Technologies Private Limited and is
            protected under the Copyright Act, 1957, the Trade Marks Act, 1999, and other applicable Indian laws.
          </p>
          <p className={S.p}>
            You may not reproduce, distribute, modify, republish, or transmit any of our content without our prior written
            permission, except for personal, non-commercial use.
          </p>
        </div>

        {/* 13 */}
        <div className={S.section}>
          <h2 className={S.h2}>13. Prohibited Conduct</h2>
          <p className={S.p}>You agree not to use our website or services to:</p>
          <ul className={S.ul}>
            <li>Violate any applicable Indian law or regulation</li>
            <li>Provide false, inaccurate, or misleading information at registration or at any time</li>
            <li>Create multiple accounts to abuse the Trial plan or any promotional offer</li>
            <li>Use our platform for any commercial purpose without prior written consent</li>
            <li>Attempt to gain unauthorised access to any portion of our website, systems, or servers</li>
            <li>Upload or transmit any viruses, malware, or other harmful code</li>
            <li>Harass, threaten, or abuse our staff, delivery personnel, or other customers</li>
            <li>Use automated tools (bots, scrapers) to access our website without written permission</li>
          </ul>
        </div>

        {/* 14 */}
        <div className={S.section}>
          <h2 className={S.h2}>14. Limitation of Liability</h2>
          <p className={S.p}>
            To the fullest extent permitted by applicable Indian law, Srava Technologies Private Limited and its officers,
            directors, employees, and agents shall not be liable for any indirect, incidental, special, or consequential
            damages — including loss of profits, loss of data, or business interruption — arising from your use of or
            inability to use our services.
          </p>
          <p className={S.p}>
            Our total liability for any claim arising from these Terms shall not exceed the{" "}
            <strong className="text-forest">total amount you paid us in the 30 days immediately preceding the event</strong> giving rise
            to the claim.
          </p>
          <p className={S.p}>
            Nothing in this section limits or excludes any rights you have as a consumer under the{" "}
            <strong className="text-forest">Consumer Protection Act, 2019</strong>. Your statutory rights are not affected.
          </p>
        </div>

        {/* 15 */}
        <div className={S.section}>
          <h2 className={S.h2}>15. Force Majeure</h2>
          <p className={S.p}>
            We shall not be held liable for any delay or failure in our obligations arising from circumstances beyond our
            reasonable control, including acts of God, natural disasters, pandemics, government lockdowns, civil unrest,
            power failures, internet outages, or supply chain disruptions. In such events, we will notify you as soon as
            reasonably practicable and will make reasonable efforts to resume service or offer credits or refunds for
            affected deliveries.
          </p>
        </div>

        {/* 16 */}
        <div className={S.section}>
          <h2 className={S.h2}>16. Modification of Terms</h2>
          <p className={S.p}>
            We reserve the right to modify these Terms at any time. For material changes, we will update the "Last updated"
            date on this page and send a notification to your registered email address at least 7 days before the changes
            take effect. Your continued use of our services after the effective date constitutes acceptance of the updated Terms.
          </p>
        </div>

        {/* 17 */}
        <div className={S.section}>
          <h2 className={S.h2}>17. Governing Law and Dispute Resolution</h2>
          <p className={S.p}>
            These Terms are governed by the laws of the Republic of India, including the Indian Contract Act, 1872, the
            Consumer Protection Act, 2019, and the Information Technology Act, 2000.
          </p>
          <p className={S.p}>
            In the event of a dispute, you agree to first contact us at{" "}
            <strong className="text-forest">nanduboda13@gmail.com</strong> and attempt to resolve it informally. If unresolved, it shall
            be subject to the <strong className="text-forest">exclusive jurisdiction of the courts in Hyderabad, Telangana, India</strong>.
          </p>
          <p className={S.p}>
            Nothing in this section prevents you from raising a complaint with the appropriate consumer forum under the
            Consumer Protection Act, 2019.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-2xl bg-forest p-6 text-white">
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-emerald">
            Questions about these Terms?
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
