import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// A simple hook to trigger fade-in animations on scroll using Intersection Observer
const useFadeIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // Trigger visibility when element is in view
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 } // triggers when 10% of the element is visible
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  
  return { isVisible, domRef };
};

// Reusable animated wrapper for scroll-ins
const FadeInDiv = ({ children, delay = 0, className = '' }) => {
  const { isVisible, domRef } = useFadeIn();
  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Hero = () => (
  <section className="px-8 pt-40 pb-24 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden relative">
    {/* Animated background blobs for that rich feel without breaking the clean design */}
    <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute top-20 right-1/4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <FadeInDiv delay={100} className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8 hover:bg-blue-100 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      The Open-Source Collaboration Platform
    </FadeInDiv>
    
    <FadeInDiv delay={300} className="relative z-10">
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 max-w-4xl hover:scale-[1.01] transition-transform duration-500">
        Built Teams, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-700 relative inline-block group">
          Build Ideas.
          <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-200 -z-10 group-hover:h-full transition-all duration-500 opacity-30 group-hover:opacity-10 rounded"></span>
        </span>
      </h1>
    </FadeInDiv>

    <FadeInDiv delay={500} className="relative z-10 text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
      A minimalist developer community to post open-source project ideas, pitch to peers, and build the right teams to bring your code to life.
    </FadeInDiv>

    <FadeInDiv delay={700} className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <a href="/signup" className="group flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-1 active:scale-95 transition-all duration-300 text-lg">
        Join the Community
        <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </a>
      <a href="/projects" className="group flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-medium hover:border-blue-600 hover:text-blue-600 hover:-translate-y-1 active:scale-95 transition-all duration-300 text-lg">
        Explore Projects
        <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-600 group-hover:animate-ping transition-colors"></div>
      </a>
    </FadeInDiv>
  </section>
);

const FeatureCard = ({ icon, title, description, delay }) => (
  <FadeInDiv delay={delay} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 hover:border-blue-200 transition-all duration-500 group relative overflow-hidden">
    {/* Decorative background circle that scales intensely on hover */}
    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full group-hover:scale-[2.5] transition-transform duration-700 ease-out z-0 opacity-50"></div>
    
    <div className="relative z-10">
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-[0_2px_10px_rgba(37,99,235,0.1)] group-hover:shadow-[0_4px_15px_rgba(37,99,235,0.3)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
      <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">{description}</p>
    </div>
  </FadeInDiv>
);

const Features = () => (
  <section className="px-8 py-24 bg-slate-50 relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <FadeInDiv delay={100} className="mb-16 md:text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Everything you need to collaborate</h2>
        <p className="text-lg text-slate-600">Join specific hubs, pitch your ideas, and find the perfect developers to build with.</p>
      </FadeInDiv>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          delay={300}
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
          title="Join Communities"
          description="Find your tribe. Connect with developers in topic-based hubs like React, AI/ML, and UI/UX."
        />
        <FeatureCard 
          delay={500}
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>}
          title="Pitch Ideas"
          description="Post your open-source project ideas. Clearly state what you are building and the roles you need to fill."
        />
        <FeatureCard 
          delay={700}
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
          title="Build Teams"
          description="Accept applications from interested developers. Collaborate in real-time in private project workspaces."
        />
      </div>
    </div>
  </section>
);

const ProjectCard = ({ title, desc, tags, delay }) => (
  <FadeInDiv delay={delay} className="flex flex-col bg-white p-6 border border-slate-100 rounded-2xl hover:border-blue-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group">
    <div className="flex justify-between items-start mb-5">
      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">{title}</h4>
      <div className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-300 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-ping"></span>
        Open
      </div>
    </div>
    <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed group-hover:text-slate-700 transition-colors">{desc}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag, i) => (
        <span key={i} className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg group-hover:border-blue-100 group-hover:text-blue-700 group-hover:bg-blue-50/50 transition-colors duration-300" style={{ transitionDelay: `${i * 50}ms` }}>{tag}</span>
      ))}
    </div>
  </FadeInDiv>
);

const TrendingProjects = () => (
  <section className="px-8 py-24 max-w-7xl mx-auto">
    <FadeInDiv delay={100} className="flex justify-between items-end mb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Trending Projects</h2>
        <p className="text-slate-600 text-lg">Open-source ideas currently recruiting team members.</p>
      </div>
      <a href="/projects" className="hidden sm:flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 group transition-colors">
        View all <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </FadeInDiv>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard 
        delay={300}
        title="Modern Component Library" 
        desc="Building a headless, accessible component library for React using Tailwind CSS and Radix UI."
        tags={["Frontend", "React", "Accessible"]}
      />
      <ProjectCard 
        delay={500}
        title="AI Code Reviewer CLI" 
        desc="A lightweight CLI tool that uses local LLMs to review your git diffs before committing to your repo."
        tags={["Backend", "Python", "CLI"]}
      />
      <ProjectCard 
        delay={700}
        title="Dev Connect Platform" 
        desc="An open-source networking platform exclusively for developers to share resources and learn together."
        tags={["Full Stack", "Node.js", "MongoDB"]}
      />
    </div>
    <FadeInDiv delay={900} className="mt-8 text-center sm:hidden">
       <a href="/projects" className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold border-2 border-blue-100 px-6 py-3 rounded-xl w-full hover:bg-blue-50 active:scale-95 transition-all duration-300">
        View all projects
      </a>
    </FadeInDiv>
  </section>
);

// Inline global styles for background animated blobs (avoids modifying global index.css)
const GlobalStyles = () => (
  <style>{`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 8s infinite ease-in-out;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    html {
      scroll-behavior: smooth;
    }
  `}</style>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden pt-16">
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TrendingProjects />
      </main>
      <Footer />
    </div>
  );
}