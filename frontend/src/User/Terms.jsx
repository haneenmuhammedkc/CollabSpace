import React from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-16">
        
        <div className="mb-12">
           <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4 drop-shadow-sm">Terms of Service</h1>
           <p className="text-lg text-slate-500 font-semibold">Effective date: <span className="text-slate-700">August 24, 2026</span></p>
        </div>

        <div className="bg-[#E5E1DA] rounded-3xl p-8 md:p-12 border border-[#B3C8CF]/40 shadow-sm prose prose-slate prose-headings:text-slate-800 prose-a:text-[#89A8B2] max-w-none text-slate-600 font-medium leading-relaxed">
          
          <h2 className="text-2xl font-bold border-b border-[#B3C8CF]/30 pb-2 mb-6">1. Acceptance of Terms</h2>
          <p>
            By accessing or using CollabSpace (the "Service"), you agree to be bound by these Terms. 
            If you disagree with any part of the terms then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <h2 className="text-2xl font-bold border-b border-[#B3C8CF]/30 pb-2 mb-6 mt-10">2. User Responsibilities</h2>
          <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-[#89A8B2]">
            <li>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</li>
            <li>You agree not to disclose your password to any third party.</li>
            <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
          </ul>

          <h2 className="text-2xl font-bold border-b border-[#B3C8CF]/30 pb-2 mb-6 mt-10">3. Platform Rules and Content</h2>
          <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>
          <p>We reserve the right to remove any content that violates our community standards, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-[#89A8B2]">
            <li>Hate speech or discriminatory language.</li>
            <li>Malicious code or spam.</li>
            <li>Copyrighted material without explicit permission.</li>
            <li>Misleading or fraudulent project applications.</li>
          </ul>

          <h2 className="text-2xl font-bold border-b border-[#B3C8CF]/30 pb-2 mb-6 mt-10">4. Limitations & Disclaimer</h2>
          <p>
            In no event shall CollabSpace, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
          <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.</p>

        </div>

      </main>

      <Footer />
    </div>
  );
}
