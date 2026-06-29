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
              <th
                key={h}
                className="px-4 py-2.5 text-left font-heading text-xs font-bold uppercase tracking-wide text-forest"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-sage">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-sm text-text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-bg">
      <SEO
        title="Privacy Policy | Macra"
        description="Macra's privacy policy — how we collect, store, and protect your personal data. Compliant with Indian IT Act 2000 and IT (Reasonable Security Practices) Rules 2011."
        canonicalPath="/privacy-policy"
      />
      <Header />

      {/* Hero */}
      <div className="bg-forest py-10 text-white sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald">
            Legal
          </p>
          <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            Privacy Policy
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Last updated: June 25, 2026
          </p>
          <p
            className="mt-4 max-w-xl text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Operated by{" "}
            <strong className="text-white">
              evolve Technologies Private Limited
            </strong>{" "}
            · KPHB, Hyderabad, Telangana – 500072, India
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {/* 1 */}
        <div>
          <h2 className={S.h2}>1. Introduction</h2>
          <p className={S.p}>
            Welcome to Macra ("we", "us", "our"), a subscription-based protein
            bowl delivery service operated by{" "}
            <strong className="text-forest">
              evolve Technologies Private Limited
            </strong>
            , a company incorporated under the Companies Act, 2013, with its
            registered office at KPHB, Hyderabad, Telangana – 500072, India.
          </p>
          <p className={S.p}>
            We are committed to protecting your personal information and your
            right to privacy. This Privacy Policy explains what information we
            collect, how we use it, how we protect it, and what rights you have
            over it when you visit our website at{" "}
            <strong className="text-forest">https://macra.in</strong> or use our
            services.
          </p>
          <p className={S.p}>
            By using our website or placing a subscription order, you confirm
            that you have read, understood, and agree to be bound by this
            Privacy Policy.
          </p>
        </div>

        {/* 2 */}
        <div className={S.section}>
          <h2 className={S.h2}>2. Information We Collect</h2>

          <h3 className={S.h3}>2.1 Information You Provide Directly</h3>
          <Table
            heads={["Category", "Details"]}
            rows={[
              ["Identity information", "Full name"],
              ["Contact information", "Email address, phone number"],
              ["Account credentials", "Encrypted password"],
              [
                "Delivery information",
                "Full delivery address (flat/building, street, area, city, pin code)",
              ],
              [
                "Location data",
                "GPS coordinates collected at checkout to verify delivery serviceability",
              ],
              [
                "Payment information",
                "We do not store card numbers, UPI IDs, or bank details. Payments are processed by Razorpay. We only receive a transaction reference ID and payment status.",
              ],
            ]}
          />

          <h3 className={S.h3}>2.2 Information We Collect Automatically</h3>
          <p className={S.p}>
            When you visit our website, we may automatically collect:
          </p>
          <ul className={S.ul}>
            <li>
              <strong className="text-forest">
                Device and browser information:
              </strong>{" "}
              Browser type, operating system, screen resolution, device type
            </li>
            <li>
              <strong className="text-forest">Usage data:</strong> Pages
              visited, time spent, links clicked, referring URLs
            </li>
            <li>
              <strong className="text-forest">IP address:</strong> Used to
              determine your approximate geographic location
            </li>
            <li>
              <strong className="text-forest">Cookies:</strong> Described in
              detail in Section 8
            </li>
          </ul>

          <h3 className={S.h3}>2.3 Information from Third Parties</h3>
          <ul className={S.ul}>
            <li>
              <strong className="text-forest">Razorpay:</strong> Payment
              confirmation status, transaction ID, and error codes
            </li>
            <li>
              <strong className="text-forest">Analytics providers:</strong>{" "}
              Aggregated and anonymised website usage data
            </li>
          </ul>
        </div>

        {/* 3 */}
        <div className={S.section}>
          <h2 className={S.h2}>3. How We Use Your Information</h2>

          <h3 className={S.h3}>3.1 Service Delivery</h3>
          <ul className={S.ul}>
            <li>To create and manage your Macra account</li>
            <li>
              To process your subscription order and collect payment through
              Razorpay
            </li>
            <li>
              To verify that your delivery address is within our serviceable
              area (within 3 km of KPHB, Hyderabad)
            </li>
            <li>
              To deliver your protein bowls during your selected time windows
              (Lunch: 12–2 PM, Dinner: 6–8 PM, Monday to Saturday)
            </li>
            <li>To manage your weekly meal plan selections</li>
          </ul>

          <h3 className={S.h3}>3.2 Communication</h3>
          <ul className={S.ul}>
            <li>
              To send order confirmations, delivery notifications, and
              subscription reminders
            </li>
            <li>To respond to your customer support queries</li>
            <li>
              To send service-related announcements (e.g., schedule changes, new
              menu items)
            </li>
            <li>
              To send promotional communications (only with your consent; you
              may opt out at any time)
            </li>
          </ul>

          <h3 className={S.h3}>3.3 Operations and Improvement</h3>
          <ul className={S.ul}>
            <li>
              To detect, investigate, and prevent fraudulent transactions and
              abuse
            </li>
            <li>
              To analyse usage patterns and improve our website and service
            </li>
            <li>To comply with our legal and regulatory obligations</li>
            <li>To resolve disputes and enforce our agreements</li>
          </ul>
        </div>

        {/* 4 */}
        <div className={S.section}>
          <h2 className={S.h2}>4. Legal Basis for Processing</h2>
          <p className={S.p}>
            We process your personal data on the following legal grounds:
          </p>
          <ul className={S.ul}>
            <li>
              <strong className="text-forest">Contractual necessity:</strong>{" "}
              Processing your name, contact details, address, and payment
              information is necessary to perform your subscription contract.
            </li>
            <li>
              <strong className="text-forest">Legitimate interest:</strong> We
              process usage data and device information to improve our services
              and prevent fraud.
            </li>
            <li>
              <strong className="text-forest">Consent:</strong> We process your
              GPS location and send marketing communications only with your
              explicit consent. You may withdraw consent at any time.
            </li>
            <li>
              <strong className="text-forest">Legal obligation:</strong> We
              retain transactional records to comply with the Income Tax Act,
              GST requirements, and other applicable Indian laws.
            </li>
          </ul>
        </div>

        {/* 5 */}
        <div className={S.section}>
          <h2 className={S.h2}>5. How We Share Your Information</h2>
          <p className={S.p}>
            We do not sell your personal information to any third party. We
            share your information only in the following circumstances:
          </p>

          <h3 className={S.h3}>5.1 Payment Processing — Razorpay</h3>
          <p className={S.p}>
            We use{" "}
            <strong className="text-forest">
              Razorpay Financial Solutions Private Limited
            </strong>{" "}
            as our payment gateway. When you make a payment, you are redirected
            to Razorpay's secure payment interface. Razorpay collects and
            processes your payment details directly. Their privacy policy is
            available at razorpay.com/privacy. We share your name, email, phone
            number, and order amount with Razorpay solely to facilitate payment
            processing.
          </p>

          <h3 className={S.h3}>5.2 Delivery Operations</h3>
          <p className={S.p}>
            We may share your name, phone number, and delivery address with our
            delivery personnel or third-party delivery partners solely to fulfil
            your food delivery. Delivery partners are contractually bound not to
            use your information for any other purpose.
          </p>

          <h3 className={S.h3}>5.3 Analytics and Technology Providers</h3>
          <p className={S.p}>
            We may use third-party analytics tools (such as Google Analytics)
            that collect anonymised data about how visitors use our website.
            These providers process aggregated data and do not receive your
            name, email, or personally identifiable information.
          </p>

          <h3 className={S.h3}>5.4 Legal Requirements</h3>
          <p className={S.p}>
            We may disclose your information if required by law, court order, or
            governmental authority, or to protect our rights, your safety, or
            the safety of others.
          </p>

          <h3 className={S.h3}>5.5 Business Transfers</h3>
          <p className={S.p}>
            In the event of a merger, acquisition, or sale of our business
            assets, your personal information may be transferred to the
            acquiring entity under the same protections described in this
            policy.
          </p>
        </div>

        {/* 6 */}
        <div className={S.section}>
          <h2 className={S.h2}>6. Data Storage and Security</h2>

          <h3 className={S.h3}>6.1 Storage Location</h3>
          <p className={S.p}>
            Your personal data is stored on secure servers located in India. We
            use reputable cloud infrastructure providers that maintain
            appropriate physical, technical, and organisational security
            measures.
          </p>

          <h3 className={S.h3}>6.2 Security Measures</h3>
          <p className={S.p}>
            We implement security practices in accordance with the{" "}
            <strong className="text-forest">
              Information Technology (Reasonable Security Practices and
              Procedures and Sensitive Personal Data or Information) Rules, 2011
            </strong>{" "}
            under the{" "}
            <strong className="text-forest">
              Information Technology Act, 2000
            </strong>
            . These include:
          </p>
          <ul className={S.ul}>
            <li>
              Industry-standard SSL/TLS encryption for all data transmitted
              between your browser and our servers
            </li>
            <li>
              Encrypted storage for passwords (we never store passwords in plain
              text)
            </li>
            <li>
              Access controls ensuring only authorised personnel can access your
              personal data
            </li>
            <li>Regular security reviews of our systems and practices</li>
            <li>Firewalls and intrusion detection measures on our servers</li>
          </ul>

          <h3 className={S.h3}>6.3 Data Retention</h3>
          <Table
            heads={["Data Type", "Retention Period"]}
            rows={[
              [
                "Account information (name, email, phone)",
                "Until account deletion + 3 years",
              ],
              [
                "Order and transaction records",
                "7 years (Indian financial regulations)",
              ],
              ["Delivery addresses", "Until account deletion + 1 year"],
              ["GPS coordinates", "90 days from collection"],
              ["Communication records (support emails)", "3 years"],
              ["Website usage/analytics data", "26 months (anonymised)"],
            ]}
          />
        </div>

        {/* 7 */}
        <div className={S.section}>
          <h2 className={S.h2}>7. Your Rights</h2>
          <p className={S.p}>
            You have the following rights with respect to your personal data:
          </p>
          <ul className={S.ul}>
            <li>
              <strong className="text-forest">Right to access:</strong> Request
              a copy of the personal data we hold about you.
            </li>
            <li>
              <strong className="text-forest">Right to correction:</strong>{" "}
              Request correction of inaccurate or incomplete data.
            </li>
            <li>
              <strong className="text-forest">Right to deletion:</strong>{" "}
              Request deletion of your data, subject to our legal retention
              obligations.
            </li>
            <li>
              <strong className="text-forest">
                Right to withdraw consent:
              </strong>{" "}
              Withdraw consent for marketing emails or GPS location at any time.
            </li>
            <li>
              <strong className="text-forest">
                Right to restrict processing:
              </strong>{" "}
              Request restriction of processing in certain circumstances.
            </li>
            <li>
              <strong className="text-forest">
                Right to data portability:
              </strong>{" "}
              Receive a copy of your data in a machine-readable format.
            </li>
            <li>
              <strong className="text-forest">Right to object:</strong> Object
              to processing for direct marketing at any time.
            </li>
          </ul>
          <p className={S.p}>
            To exercise any of these rights, please contact us at{" "}
            <strong className="text-forest">nanduboda13@gmail.com</strong> with
            the subject line "Data Rights Request." We will respond within 30
            days.
          </p>
        </div>

        {/* 8 */}
        <div className={S.section}>
          <h2 className={S.h2}>8. Cookies and Tracking Technologies</h2>
          <p className={S.p}>
            Our website uses cookies and similar technologies to enhance your
            experience and analyse traffic.
          </p>

          <h3 className={S.h3}>Types of Cookies We Use</h3>
          <ul className={S.ul}>
            <li>
              <strong className="text-forest">Essential cookies:</strong>{" "}
              Necessary for the website to function (e.g., maintaining your
              login session). These cannot be disabled.
            </li>
            <li>
              <strong className="text-forest">Analytics cookies:</strong> Help
              us understand how visitors interact with our website (e.g., Google
              Analytics). These are anonymised.
            </li>
            <li>
              <strong className="text-forest">Preference cookies:</strong>{" "}
              Remember your settings and preferences to personalise your
              experience.
            </li>
          </ul>

          <h3 className={S.h3}>Your Cookie Choices</h3>
          <p className={S.p}>
            You can control cookies through your browser settings. Blocking
            essential cookies may affect website functionality. For more
            information, visit allaboutcookies.org.
          </p>
        </div>

        {/* 9 */}
        <div className={S.section}>
          <h2 className={S.h2}>9. Children's Privacy</h2>
          <p className={S.p}>
            Our service is not intended for anyone under the age of 18 years. We
            do not knowingly collect personal information from children. If you
            believe your child has provided us with personal data, please
            contact us at{" "}
            <strong className="text-forest">nanduboda13@gmail.com</strong> and
            we will promptly delete that information.
          </p>
        </div>

        {/* 10 */}
        <div className={S.section}>
          <h2 className={S.h2}>10. International Users and GDPR</h2>
          <p className={S.p}>
            Our service is primarily designed for residents of Hyderabad, India.
            If you access our website from outside India, your information may
            be transferred to and processed in India, where data protection laws
            may differ from those in your country.
          </p>
          <p className={S.p}>
            If you are a resident of the European Economic Area (EEA) or the
            United Kingdom, you have rights under the General Data Protection
            Regulation (GDPR), including those listed in Section 7 above, plus
            the right to lodge a complaint with your local supervisory
            authority.
          </p>
        </div>

        {/* 11 */}
        <div className={S.section}>
          <h2 className={S.h2}>11. Changes to This Policy</h2>
          <p className={S.p}>
            We may update this Privacy Policy from time to time. When we make
            material changes, we will update the "Last updated" date at the top
            of this page, send an email notification to your registered email
            address, and display a prominent notice on our website. Your
            continued use of our service after such changes constitutes your
            acceptance of the updated policy.
          </p>
        </div>

        {/* 12 */}
        <div className={S.section}>
          <h2 className={S.h2}>12. Governing Law</h2>
          <p className={S.p}>
            This Privacy Policy is governed by the laws of India, including the
            Information Technology Act, 2000, the IT (Reasonable Security
            Practices) Rules, 2011, and the Consumer Protection Act, 2019. Any
            disputes shall be subject to the exclusive jurisdiction of the
            courts in Hyderabad, Telangana.
          </p>
        </div>

        {/* Contact box */}
        <div className="mt-10 rounded-2xl bg-forest p-6 text-white">
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-emerald">
            Grievance Officer
          </p>
          <p className="mt-1 font-heading text-lg font-bold">Nandu Boda</p>
          <p
            className="mt-0.5 text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Founder, Macra
          </p>
          <p
            className="mt-4 text-sm"
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
              nanduboda13@gmail.com
            </span>
            <br />
            Phone:{" "}
            <span className="font-semibold text-white">+91 83091 80145</span>
          </p>
          <p
            className="mt-3 rounded-xl px-4 py-2.5 text-xs leading-relaxed"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            We will acknowledge your grievance within{" "}
            <strong className="text-white">48 hours</strong> and resolve it
            within <strong className="text-white">30 days</strong> as per the
            Information Technology Act, 2000.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
