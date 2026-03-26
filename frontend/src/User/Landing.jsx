import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../UserComponents/Navbar';
import Footer from '../UserComponents/Footer';

const useFadeIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return { isVisible, domRef };
};

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
  <section className="relative px-8 pt-25 pb-38 max-w-7xl mx-auto flex flex-col items-center text-center overflow-visible">
    <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#B3C8CF] rounded-full mix-blend-multiply filter blur-[100px] translate-x-[-50%] animate-blob z-0 opacity-40"></div>
    <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-[#E5E1DA] rounded-full mix-blend-multiply filter blur-[100px] translate-x-[50%] animate-blob animation-delay-2000 z-0 opacity-60"></div>
    <div className="absolute -bottom-10 left-1/2 w-[600px] h-[600px] bg-[#89A8B2] rounded-full mix-blend-multiply filter blur-[120px] translate-x-[-50%] animate-blob animation-delay-4000 z-0 opacity-30"></div>

    {/* Floating Developer Symbols */}
    <div className="absolute top-40 left-[10%] text-[#89A8B2]/20 font-mono text-6xl md:text-8xl font-black z-0 pointer-events-none animate-pulse -rotate-12 select-none">&lt;&gt;</div>
    <div className="absolute bottom-10 left-[20%] text-[#B3C8CF]/30 font-mono text-7xl md:text-9xl font-black z-0 pointer-events-none animate-pulse delay-700 rotate-12 select-none">&#123; &#125;</div>
    <div className="absolute top-20 right-[15%] text-[#89A8B2]/20 font-mono text-6xl md:text-8xl font-black z-0 pointer-events-none animate-pulse delay-500 rotate-12 select-none">&lt;/&gt;</div>
    <div className="absolute bottom-20 right-[20%] text-[#B3C8CF]/20 font-mono text-7xl md:text-9xl font-black z-0 pointer-events-none animate-pulse delay-1000 -rotate-6 select-none">#</div>

    <FadeInDiv delay={300} className="relative z-10">
      <h1 className="text-6xl md:text-8xl font-black text-slate-800 tracking-tight mb-8 max-w-5xl hover:scale-[1.01] transition-transform duration-500 leading-none">
        Code Alone, <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6e8a93] via-[#89A8B2] to-[#B3C8CF] hover:from-[#B3C8CF] hover:to-[#6e8a93] transition-all duration-700 relative inline-block group pb-2">
          Build Together.
          <span className="absolute bottom-1 left-0 w-full h-3 bg-[#89A8B2]/20 -z-10 group-hover:h-full transition-all duration-500 opacity-30 group-hover:opacity-10 rounded-lg"></span>
        </span>
      </h1>
    </FadeInDiv>

    <FadeInDiv delay={500} className="relative z-10 text-lg md:text-xl text-slate-600 mb-12 max-w-3xl leading-relaxed font-medium">
      A minimalist developer community to post open-source project ideas, pitch to peers, and build the right teams to bring your code to life.
    </FadeInDiv>

    <FadeInDiv delay={700} className="relative z-10 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
      <a href="/signup" className="group flex items-center justify-center gap-2 bg-[#89A8B2] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#7896a0] shadow-lg hover:shadow-xl hover:-translate-y-1.5 active:scale-95 transition-all duration-300 text-lg sm:text-lg">
        Join the Community
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </a>
      <a href="/projects" className="group flex items-center justify-center gap-3 bg-[#F1F0E8]/80 backdrop-blur-sm text-slate-700 border-2 border-[#B3C8CF] px-8 py-4 rounded-2xl font-semibold hover:border-[#89A8B2] hover:text-[#5e7780] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 text-lg shadow-sm hover:shadow-md hover:bg-[#F1F0E8]">
        Explore Projects
        <div className="w-2.5 h-2.5 rounded-full bg-[#B3C8CF] group-hover:bg-[#89A8B2] group-hover:animate-ping transition-colors"></div>
      </a>
    </FadeInDiv>
  </section>
);

const FeatureCard = ({ icon, title, description, delay }) => (
  <FadeInDiv delay={delay} className="bg-[#E5E1DA] p-8 md:p-10 rounded-[2rem] border border-[#B3C8CF]/30 shadow-sm hover:shadow-xl hover:-translate-y-3 hover:border-[#89A8B2]/50 transition-all duration-700 group relative overflow-hidden flex flex-col h-full cursor-pointer">
    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#B3C8CF]/30 via-[#F1F0E8]/40 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000 ease-out z-0 opacity-80"></div>

    <div className="relative z-10 flex flex-col h-full">
      <div className="w-16 h-16 bg-[#F1F0E8] rounded-2xl flex items-center justify-center text-[#89A8B2] mb-8 group-hover:bg-[#89A8B2] group-hover:text-white group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500 shadow-sm ring-1 ring-[#B3C8CF]/50 group-hover:ring-0">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-[#5e7780] transition-colors duration-300">{title}</h3>
      <p className="text-slate-600 text-lg leading-relaxed group-hover:text-slate-800 transition-colors duration-300 flex-grow">{description}</p>
    </div>
  </FadeInDiv>
);

const Features = () => (
  <section className="px-8 py-32 bg-[#E5E1DA]/50 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.025] mix-blend-overlay"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <FadeInDiv delay={100} className="mb-20 md:text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6e8a93] to-[#B3C8CF]">collaborate</span></h2>
        <p className="text-lg text-slate-600 font-medium">Join specific hubs, pitch your ideas, and find the perfect developers to build with.</p>
      </FadeInDiv>
      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        <FeatureCard
          delay={200}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
          title="Join Communities"
          description="Find your tribe. Connect with passionate developers in specific, topic-based hubs like React, AI/ML, and UI/UX."
        />
        <FeatureCard
          delay={400}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
          title="Pitch Ideas"
          description="Got an open-source vision? Post your project ideas clearly stating what you are building and the roles you need filled."
        />
        <FeatureCard
          delay={600}
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
          title="Build Teams"
          description="Accept applications from interested peers and collaborate in real-time in secure, private project workspaces."
        />
      </div>
    </div>
  </section>
);

const ProjectCard = ({ title, desc, tags, delay }) => (
  <FadeInDiv delay={delay} className="flex flex-col bg-[#E5E1DA] p-8 border border-[#B3C8CF]/30 rounded-3xl hover:border-[#89A8B2] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group relative">
    <div className="absolute inset-0 bg-gradient-to-br from-[#F1F0E8]/50 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none"></div>
    <div className="relative z-10 flex-grow flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-xl font-bold text-slate-800 group-hover:text-[#5e7780] transition-colors duration-300 leading-snug">{title}</h4>
        <div className="bg-[#B3C8CF]/30 text-[#4c626a] text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-[#89A8B2]/20 group-hover:text-[#384a51] group-hover:scale-105 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ring-1 ring-[#89A8B2]/20">
          <span className="w-2 h-2 rounded-full bg-[#89A8B2] group-hover:animate-ping shadow-[0_0_8px_rgba(137,168,178,0.8)]"></span>
          Open
        </div>
      </div>
      <p className="text-slate-600 text-[15px] mb-8 flex-grow leading-relaxed group-hover:text-slate-700 transition-colors">{desc}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs font-semibold text-[#5e7780] bg-[#F1F0E8] border border-[#B3C8CF]/40 px-3 py-1.5 rounded-xl group-hover:border-[#89A8B2] group-hover:text-white group-hover:bg-[#89A8B2] transition-colors duration-300" style={{ transitionDelay: `${i * 30}ms` }}>{tag}</span>
        ))}
      </div>
    </div>
  </FadeInDiv>
);

const TrendingProjects = () => (
  <section className="px-8 py-32 max-w-7xl mx-auto relative">
    <FadeInDiv delay={100} className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Trending Open-Source</h2>
        <p className="text-slate-600 text-xl font-medium">Discover open-source ideas currently recruiting passionate team members.</p>
      </div>
      <a href="/projects" className="hidden sm:flex items-center gap-2 text-[#6e8a93] font-bold hover:text-[#4c626a] group transition-colors px-4 py-2 rounded-xl hover:bg-[#E5E1DA]">
        View all projects <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
      </a>
    </FadeInDiv>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard
        delay={200}
        title="Modern Component Library"
        desc="Building a headless, accessible component library for React using Tailwind CSS and Radix UI. Seeking designers and frontend engineers."
        tags={["Frontend", "React", "Accessible"]}
      />
      <ProjectCard
        delay={400}
        title="AI Code Reviewer CLI"
        desc="A lightweight CLI tool that uses local LLMs to review your git diffs before committing to your repo. Looking for Python experts."
        tags={["Backend", "Python", "CLI"]}
      />
      <ProjectCard
        delay={600}
        title="Dev Connect Platform"
        desc="An open-source networking platform exclusively for developers to share resources and learn together."
        tags={["Full Stack", "Node.js", "MongoDB"]}
      />
    </div>
    <FadeInDiv delay={800} className="mt-12 text-center sm:hidden">
      <a href="/projects" className="inline-flex items-center justify-center gap-2 bg-[#E5E1DA] text-[#6e8a93] font-bold border-2 border-[#B3C8CF] px-8 py-4 rounded-2xl w-full hover:bg-[#B3C8CF]/30 hover:border-[#89A8B2] active:scale-95 transition-all duration-300 text-lg">
        Explore all projects
      </a>
    </FadeInDiv>
  </section>
);

const GlobalStyles = () => (
  <style>{`
    @keyframes blob {
      0% { transform: translate(-50%, 0px) scale(1); }
      33% { transform: translate(-30%, -50px) scale(1.1); }
      66% { transform: translate(-70%, 20px) scale(0.9); }
      100% { transform: translate(-50%, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 10s infinite alternate ease-in-out;
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
    <div className="min-h-screen flex flex-col bg-[#F1F0E8] font-sans text-slate-800 selection:bg-[#B3C8CF]/50 selection:text-[#384a51] overflow-x-hidden pt-16 transition-colors duration-500">
      <GlobalStyles />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <TrendingProjects />
      </main>
      <Footer />
    </div>
  );
}