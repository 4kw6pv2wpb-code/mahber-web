'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';
import Footer from '@/components/Footer';

export default function TermsPage() {
  useAnalytics();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex h-1">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-red-600" />
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm">
          <FiArrowLeft /> Back to Mahber
        </Link>
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-10">Last updated: March 15, 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>By accessing or using Mahber (&ldquo;the Platform&rdquo;), operated by Mahber, Inc. (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to all of these Terms, you may not access or use the Platform. These Terms constitute a legally binding agreement between you and the Company.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. Eligibility</h2>
            <p>You must be at least 18 years of age to use the Platform. By using the Platform, you represent and warrant that you are at least 18 years old, have the legal capacity to enter into these Terms, and are not prohibited from using the Platform under applicable law. Accounts registered by automated means or by bots are not permitted.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. Account Registration</h2>
            <p>To access certain features, you must create an account. You agree to provide accurate, current, and complete information, maintain the security of your password and account, promptly update any changes to your information, and accept responsibility for all activities that occur under your account. You may not use another person&apos;s account without permission. We reserve the right to suspend or terminate accounts that violate these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. Platform Services</h2>
            <p>Mahber provides the following services, subject to these Terms:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-gray-200">Jobs Board:</strong> Job listing and application platform for community-relevant employment</li>
              <li><strong className="text-gray-200">Housing:</strong> Rental and housing listing marketplace</li>
              <li><strong className="text-gray-200">Events:</strong> Event discovery, listing, and ticketing</li>
              <li><strong className="text-gray-200">Marketplace:</strong> Peer-to-peer buying and selling of goods</li>
              <li><strong className="text-gray-200">Dating (HabeshaMatch):</strong> Social matching and dating service</li>
              <li><strong className="text-gray-200">Remittance:</strong> International money transfer services (subject to additional terms and regulatory requirements)</li>
              <li><strong className="text-gray-200">Community:</strong> Discussion forums and social features</li>
              <li><strong className="text-gray-200">Immigration Resources:</strong> Informational resources (not legal advice)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. User Content</h2>
            <p>You retain ownership of content you create and post on the Platform (&ldquo;User Content&rdquo;). By posting User Content, you grant Mahber a worldwide, non-exclusive, royalty-free, transferable license to use, display, reproduce, modify, and distribute your User Content in connection with operating and improving the Platform.</p>
            <p>You are solely responsible for your User Content. You agree not to post content that is illegal, fraudulent, defamatory, threatening, or harassing; infringes on intellectual property rights; contains malware, spam, or deceptive information; violates any person&apos;s privacy rights; or promotes discrimination, hatred, or violence against any individual or group.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. Prohibited Conduct</h2>
            <p>You agree not to: use the Platform for any unlawful purpose; impersonate any person or entity; interfere with or disrupt the Platform&apos;s operation; attempt to gain unauthorized access to any part of the Platform; scrape, crawl, or use automated means to collect data; post fraudulent listings, scams, or misleading content; harass, bully, or intimidate other users; circumvent any content filtering or security features; use the Platform to send unsolicited communications (spam); or engage in any activity that could damage, disable, or impair the Platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">7. Financial Services</h2>
            <p>Remittance and payment services are subject to additional terms and conditions, applicable anti-money laundering (AML) and know-your-customer (KYC) regulations, transaction limits and verification requirements, and licensing requirements in applicable jurisdictions. Mahber partners with licensed money service businesses (MSBs) to facilitate remittance transfers. Transfer availability, fees, and exchange rates are subject to change. We are not a bank and do not hold deposits.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">8. Subscription Services</h2>
            <p>Paid subscriptions (Pro and Business plans) are billed monthly or annually. You may cancel at any time; cancellation takes effect at the end of the current billing period. Refunds are provided on a pro-rata basis for annual plans only. We reserve the right to change subscription prices with 30 days&apos; notice. Free trial periods may be offered at our discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">9. Intellectual Property</h2>
            <p>The Platform, including its design, code, logos, trademarks, and content (excluding User Content), is owned by Mahber, Inc. and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works based on the Platform without our express written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">10. Disclaimers</h2>
            <p>THE PLATFORM IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. We do not guarantee the accuracy of user-posted content including job listings, housing availability, or marketplace items. We do not endorse or verify the identity of any user. Immigration resources are informational only and do not constitute legal advice. We are not responsible for transactions between users.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">11. Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, MAHBER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF THE PLATFORM. Our total liability for any claim arising from these Terms or the Platform shall not exceed the amount you paid to us in the 12 months preceding the claim, or $100, whichever is greater.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">12. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless Mahber, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the Platform, your User Content, your violation of these Terms, or your violation of any rights of another party.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">13. Dispute Resolution</h2>
            <p>Any disputes arising from these Terms or the Platform shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules. Arbitration shall take place in King County, Washington. You agree to waive any right to participate in a class action lawsuit or class-wide arbitration against Mahber.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">14. Termination</h2>
            <p>We may terminate or suspend your account and access to the Platform at any time, with or without cause, with or without notice. Upon termination, your right to use the Platform immediately ceases. Provisions that by their nature should survive termination shall survive, including ownership, disclaimers, indemnification, and limitations of liability.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">15. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of Washington, without regard to its conflict of law provisions. Any legal proceedings not subject to arbitration shall be brought in the state or federal courts located in King County, Washington.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">16. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the revised Terms on the Platform and updating the &ldquo;Last updated&rdquo; date. Your continued use of the Platform after changes constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">17. Contact</h2>
            <p>For questions about these Terms, contact us at:</p>
            <p>Mahber, Inc.<br />Seattle, Washington<br />Email: legal@mahber.com</p>
          </section>
        </div>
      </div>
          <Footer />
    </div>
  );
}
