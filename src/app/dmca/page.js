'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import Link from 'next/link';
import { FiArrowLeft, FiShield } from 'react-icons/fi';
import { useAnalytics } from '@/lib/useAnalytics';
import Footer from '@/components/Footer';

export default function DMCAPage() {
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
        <div className="flex items-center gap-3 mb-2">
          <FiShield className="text-amber-500" size={28} />
          <h1 className="text-4xl font-bold">DMCA Policy</h1>
        </div>
        <p className="text-gray-500 mb-10">Last updated: March 18, 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white">1. Overview</h2>
            <p>Mahber, Inc. (&ldquo;Mahber&rdquo;) respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (&ldquo;DMCA&rdquo;), we will respond expeditiously to claims of copyright infringement committed using our platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. Reporting Copyright Infringement</h2>
            <p>If you believe that content on Mahber infringes your copyright, please send a DMCA takedown notice to our designated agent containing the following information:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.</li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the material that is claimed to be infringing, with information reasonably sufficient to permit us to locate the material (e.g., URL).</li>
              <li>Your contact information, including your address, telephone number, and email address.</li>
              <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.</li>
              <li>A statement, under penalty of perjury, that the information in the notification is accurate and that you are the copyright owner or authorized to act on the owner&apos;s behalf.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. Designated DMCA Agent</h2>
            <p>Please send DMCA takedown notices to:</p>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <p className="text-white font-medium">Mahber, Inc.</p>
              <p>DMCA Agent</p>
              <p>Seattle, Washington, USA</p>
              <p>Email: <a href="mailto:dmca@mahber.com" className="text-amber-400 hover:text-amber-300">dmca@mahber.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. Counter-Notification</h2>
            <p>If you believe that your content was removed or disabled by mistake or misidentification, you may submit a counter-notification containing the following:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Your physical or electronic signature.</li>
              <li>Identification of the material that has been removed or disabled and the location where it appeared before removal.</li>
              <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification.</li>
              <li>Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal court in King County, Washington.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. Repeat Infringers</h2>
            <p>Mahber will terminate, in appropriate circumstances, the accounts of users who are repeat infringers of copyright. We reserve the right to remove any content and terminate any account at our sole discretion, without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. Protecting Our IP</h2>
            <p>The Mahber platform, including all source code, designs, logos, trademarks, and original content, is the exclusive intellectual property of Mahber, Inc., protected under U.S. and international copyright law. Unauthorized reproduction, distribution, or creation of derivative works is strictly prohibited and will be pursued to the fullest extent of the law.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
