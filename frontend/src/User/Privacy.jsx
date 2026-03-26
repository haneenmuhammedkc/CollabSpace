import React from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-8 py-16">
        
        <div className="mb-12">
           <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4 drop-shadow-sm">Privacy Policy</h1>
           <p className="text-lg text-slate-500 font-semibold">Last updated: <span className="text-slate-700">August 24, 2026</span></p>
        </div>

        <div className="bg-[#E5E1DA] rounded-3xl p-8 md:p-12 border border-[#B3C8CF]/40 shadow-sm prose prose-slate prose-headings:text-slate-800 prose-a:text-[#89A8B2] max-w-none text-slate-600 font-medium leading-relaxed">
          
          <h2 className="text-2xl font-bold border-b border-[#B3C8CF]/30 pb-2 mb-6">1. Introduction</h2>
          <p>
            Welcome to CollabSpace ("Company", "we", "our", "us"). We respect your privacy and are committed to protecting it through our compliance with this policy.
            This policy describes the types of information we may collect from you or that you may provide when you visit the website collabspace.dev (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>

          <h2 className="text-2xl font-bold border-b border-[#B3C8CF]/30 pb-2 mb-6 mt-10">2. Data We Collect</h2>
          <p>We collect several types of information from and about users of our Website, including information:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-[#89A8B2]">
            <li><strong>Personal Data:</strong> Email address, first name and last name, GitHub or LinkedIn profile URLs, cookies, and usage data.</li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
          </ul>

          <h2 className="text-2xl font-bold border-b border-[#B3C8CF]/30 pb-2 mb-6 mt-10">3. Usage of Data</h2>
          <p>CollabSpace uses the collected data for various purposes:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-[#89A8B2]">
            <li>To provide and maintain our Service.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so (like open source projects and communities).</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our Service.</li>
            <li>To monitor the usage of our Service and detect, prevent and address technical issues.</li>
          </ul>

          <h2 className="text-2xl font-bold border-b border-[#B3C8CF]/30 pb-2 mb-6 mt-10">4. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. 
            While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. We encrypt passwords and use standard OAuth routines for optimal security.
          </p>

          <h2 className="text-2xl font-bold border-b border-[#B3C8CF]/30 pb-2 mb-6 mt-10">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us by visiting the <a href="/contact" className="font-bold hover:underline transition">Contact Page</a> on our website.</p>

        </div>

      </main>

      <Footer />
    </div>
  );
}
