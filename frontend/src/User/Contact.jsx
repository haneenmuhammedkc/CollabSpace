import React, { useState } from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 pt-20 transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4 drop-shadow-sm">Get in touch</h1>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.</p>
          </div>

          <div className="flex flex-col gap-6">
             <div className="flex items-center gap-4 bg-[#E5E1DA] p-4 rounded-2xl border border-[#B3C8CF]/30 shadow-sm">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#89A8B2] shadow-sm">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
               </div>
               <div>
                 <h4 className="font-bold text-slate-800">Email Us</h4>
                 <p className="text-slate-500 font-medium text-sm">support@collabspace.dev</p>
               </div>
             </div>
             
             <div className="flex items-center gap-4 bg-[#E5E1DA] p-4 rounded-2xl border border-[#B3C8CF]/30 shadow-sm">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#89A8B2] shadow-sm">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
               </div>
               <div>
                 <h4 className="font-bold text-slate-800">Twitter / X</h4>
                 <p className="text-slate-500 font-medium text-sm">@collabspacedev</p>
               </div>
             </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#E5E1DA] rounded-[2rem] p-8 md:p-12 border border-[#B3C8CF]/40 shadow-sm relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#B3C8CF]/20 rounded-full blur-3xl pointer-events-none z-0"></div>
          
          <div className="relative z-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                <div className="w-20 h-20 bg-[#89A8B2] text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                   <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-600 font-medium">Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-sm font-bold text-[#89A8B2] hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Full Name <span className="text-rose-500">*</span></label>
                  <input required type="text" placeholder="Alex Developer" className="px-5 py-3.5 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Email Address <span className="text-rose-500">*</span></label>
                  <input required type="email" placeholder="alex@example.com" className="px-5 py-3.5 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Your Message <span className="text-rose-500">*</span></label>
                  <textarea required rows="5" placeholder="How can we help?" className="px-5 py-3.5 bg-[#F1F0E8] border border-[#B3C8CF]/50 rounded-xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#89A8B2]/20 focus:border-[#89A8B2] transition font-medium resize-none"></textarea>
                </div>

                <button 
                  disabled={submitting} 
                  type="submit" 
                  className="w-full bg-[#89A8B2] text-white py-4 rounded-xl font-bold shadow-md hover:bg-[#7896a0] hover:-translate-y-0.5 transition active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
