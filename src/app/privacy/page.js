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

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: March 15, 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p>Mahber, Inc. (&ldquo;Mahber,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy of our users. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and related services (collectively, the &ldquo;Platform&rdquo;).</p>
            <p>By accessing or using the Platform, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the Platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <h3 className="text-lg font-semibold text-gray-200">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Account information: name, email address, phone number, password</li>
              <li>Profile information: biography, profile photo, location, languages spoken, occupation</li>
              <li>Content you create: job listings, housing posts, marketplace items, community posts, messages</li>
              <li>Financial information: payment details for subscriptions and remittance services (processed by third-party payment processors)</li>
              <li>Communications: messages you send through the Platform, support inquiries, feedback</li>
              <li>Dating profile: preferences, interests, and information you share on HabeshaMatch</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-200 mt-4">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Device information: device type, operating system, browser type, unique device identifiers</li>
              <li>Usage data: pages viewed, features used, click patterns, search queries, time spent</li>
              <li>Location data: IP-based approximate location (precise location only with your consent)</li>
              <li>Cookies and tracking technologies: session cookies, analytics cookies, preference cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide, maintain, and improve the Platform and its features</li>
              <li>Process transactions including remittance transfers and subscription payments</li>
              <li>Match users for dating, jobs, housing, and community connections</li>
              <li>Send service-related communications (account verification, security alerts, updates)</li>
              <li>Personalize your experience and provide relevant content and recommendations</li>
              <li>Detect, investigate, and prevent fraudulent transactions and unauthorized access</li>
              <li>Comply with legal obligations and enforce our Terms of Service</li>
              <li>Aggregate and anonymize data for analytics and platform improvement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-gray-200">With other users:</strong> Profile information, listings, and posts are visible to other Platform users as intended by the feature</li>
              <li><strong className="text-gray-200">Service providers:</strong> Third-party vendors who assist with payment processing, email delivery, analytics, cloud hosting, and customer support</li>
              <li><strong className="text-gray-200">Financial partners:</strong> Licensed money transfer partners for remittance services, subject to their own privacy policies</li>
              <li><strong className="text-gray-200">Legal requirements:</strong> When required by law, court order, or government request</li>
              <li><strong className="text-gray-200">Safety:</strong> When we believe disclosure is necessary to protect the safety of our users or the public</li>
              <li><strong className="text-gray-200">Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. Data Security</h2>
            <p>We implement industry-standard security measures including encryption in transit (TLS 1.3), encryption at rest (AES-256), secure authentication, regular security audits, and access controls. Financial data is processed through PCI-DSS compliant payment processors and is never stored on our servers.</p>
            <p>However, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security of your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. Data Retention</h2>
            <p>We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time through Settings or by contacting us. Some information may be retained as required by law (e.g., financial transaction records).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-gray-200">Access:</strong> Request a copy of your personal data</li>
              <li><strong className="text-gray-200">Correction:</strong> Request correction of inaccurate data</li>
              <li><strong className="text-gray-200">Deletion:</strong> Request deletion of your personal data</li>
              <li><strong className="text-gray-200">Portability:</strong> Request your data in a portable format</li>
              <li><strong className="text-gray-200">Opt-out:</strong> Opt out of marketing communications at any time</li>
              <li><strong className="text-gray-200">Restrict processing:</strong> Request limitation of how we use your data</li>
            </ul>
            <p>To exercise these rights, contact us at privacy@mahber.com or through your account Settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">8. California Privacy Rights (CCPA)</h2>
            <p>California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, the right to opt-out of the sale of personal information (we do not sell personal data), and the right to non-discrimination for exercising privacy rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">9. International Data Transfers</h2>
            <p>Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction. If you are located outside the United States, please be aware that information is processed in the US where data protection laws may differ.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">10. Children&apos;s Privacy</h2>
            <p>The Platform is not intended for users under 18 years of age. We do not knowingly collect personal information from children under 18. If we learn that we have collected information from a child under 18, we will take steps to delete such information promptly.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on the Platform and updating the &ldquo;Last updated&rdquo; date. Your continued use of the Platform after changes constitutes acceptance of the revised policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">12. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, contact us at:</p>
            <p>Mahber, Inc.<br />Seattle, Washington<br />Email: privacy@mahber.com</p>
          </section>
        </div>
      </div>
          <Footer />
    </div>
  );
}
