'use client';

import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiBook, FiMap, FiAward, FiArrowRight, FiCode, FiDatabase, FiHexagon } from "react-icons/fi";
import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';

// Add NavLink interface
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

// NavLink component with proper typing
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="relative group text-gray-400 hover:text-pink-500 transition-colors"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
};

// Add StatCardProps interface
interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  sublabel: string;
}

// EnhancedStatCard component with proper typing
const EnhancedStatCard: React.FC<StatCardProps> = ({ 
  icon, 
  number, 
  label, 
  sublabel 
}) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
      <div className="relative p-8 rounded-lg bg-black/60 border border-pink-500/30 hover:border-pink-500/50 transition-all">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <div className="text-pink-500 text-2xl group-hover:animate-pulse">
              {icon}
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white group-hover:text-pink-500 transition-colors">
              {number}
            </div>
            <div className="text-gray-400">{label}</div>
          </div>
        </div>
        <div className="text-sm text-pink-500/70 bg-pink-500/10 rounded px-3 py-1 inline-block">
          {sublabel}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-hidden font-cyber">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1C1C1C,transparent)]" />

      {/* Navigation - Updated */}
      <nav className="fixed w-full z-50 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-black/80 border border-[#333] rounded-sm px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo - Made smaller on mobile */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-white/10 
                              [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]">
                  <FiHexagon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white font-tech tracking-wider">
                  LEGAL<span className="text-[#0FF]">/MATRIX</span>
                </span>
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#0FF]"
              >
                <div className="space-y-2">
                  <span className={`block w-8 h-0.5 bg-current transform transition duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  <span className={`block w-8 h-0.5 bg-current transition duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-8 h-0.5 bg-current transform transition duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <CyberNavLink href="/search">SEARCH_CASES</CyberNavLink>
                <CyberNavLink href="/states">BROWSE_STATES</CyberNavLink>
                <CyberNavLink href="/ai-summary">AI_SUMMARY</CyberNavLink>
                <CyberNavLink href="/about">ABOUT</CyberNavLink>
              </div>
              
              {/* Login Button - Hidden on mobile */}
              <button className="hidden md:block px-8 py-2 bg-[#0FF]/10 text-[#0FF] hover:bg-[#0FF]/20 
                               transition-colors font-tech tracking-wider
                               [clip-path:polygon(0_0,100%_0,95%_100%,5%_100%)]">
                LOGIN &gt;&gt;
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 border border-[#333] p-4">
                <div className="flex flex-col space-y-4">
                  <CyberNavLink href="/search">SEARCH_CASES</CyberNavLink>
                  <CyberNavLink href="/states">BROWSE_STATES</CyberNavLink>
                  <CyberNavLink href="/ai-summary">AI_SUMMARY</CyberNavLink>
                  <CyberNavLink href="/about">ABOUT</CyberNavLink>
                  <button className="w-full px-8 py-2 bg-[#0FF]/10 text-[#0FF] hover:bg-[#0FF]/20 
                                   transition-colors font-tech tracking-wider
                                   [clip-path:polygon(0_0,100%_0,95%_100%,5%_100%)]">
                    LOGIN &gt;&gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content - Updated */}
      <div className="relative pt-32 sm:pt-40 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Text - Updated */}
          <div className="text-center mb-12 sm:mb-20">
            <h1 className="text-4xl sm:text-7xl font-tech tracking-wider text-white mb-2 sm:mb-4">
              NEXT<span className="text-[#0FF]">_INDIAN</span>
            </h1>
            <h2 className="text-4xl sm:text-7xl font-tech tracking-wider text-[#0FF] mb-4 sm:mb-6">
              LEGAL_INTELLIGENCE
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 font-mono px-4">
              &lt;Navigate the legal matrix with quantum-powered AI insights&gt;
            </p>
          </div>

          {/* Search Section - Updated */}
          <div className="max-w-4xl mx-auto space-y-6 mb-16 sm:mb-24">
            <SearchBar />
            
            {/* Filters - Updated */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[#0FF]/70 text-sm font-tech mb-2 block">CASE_TYPE</label>
                <select className="w-full bg-black/80 border border-[#0FF]/30 text-white px-4 py-2 
                                font-tech [clip-path:polygon(0_0,100%_0,95%_100%,5%_100%)]">
                  <option>ALL_CASES</option>
                  <option>CRIMINAL</option>
                  <option>CIVIL</option>
                </select>
              </div>
              
              <div>
                <label className="text-[#0FF]/70 text-sm font-tech mb-2 block">STATE</label>
                <select className="w-full bg-black/80 border border-[#0FF]/30 text-white px-4 py-2 
                                font-tech [clip-path:polygon(0_0,100%_0,95%_100%,5%_100%)]">
                  <option>ALL_STATES</option>
                  <option>MAHARASHTRA</option>
                  <option>DELHI</option>
                </select>
              </div>
              
              <div>
                <label className="text-[#0FF]/70 text-sm font-tech mb-2 block">DATE_RANGE</label>
                <select className="w-full bg-black/80 border border-[#0FF]/30 text-white px-4 py-2 
                                font-tech [clip-path:polygon(0_0,100%_0,95%_100%,5%_100%)]">
                  <option>ALL_TIME</option>
                  <option>LAST_YEAR</option>
                  <option>LAST_5_YEARS</option>
                </select>
              </div>
              
              <div>
                <label className="text-[#0FF]/70 text-sm font-tech mb-2 block">COURT</label>
                <select className="w-full bg-black/80 border border-[#0FF]/30 text-white px-4 py-2 
                                font-tech [clip-path:polygon(0_0,100%_0,95%_100%,5%_100%)]">
                  <option>ALL_COURTS</option>
                  <option>SUPREME</option>
                  <option>HIGH_COURT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Cards - Updated */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-20">
            <CyberStatCard 
              icon={<FiDatabase />}
              number="1M+" 
              label="LEGAL_CASES" 
              sublabel="PROCESSED_DAILY"
            />
            <CyberStatCard 
              icon={<FiMap />}
              number="28" 
              label="STATES_COVERED" 
              sublabel="REAL_TIME_UPDATES"
            />
            <CyberStatCard 
              icon={<FiAward />}
              number="99%" 
              label="ACCURACY" 
              sublabel="AI_POWERED"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// New styled components
const CyberNavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="relative group text-gray-400 hover:text-[#0FF] transition-colors font-tech tracking-wider"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#0FF] group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
};

const CyberSelect: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  return (
    <div className="space-y-1">
      <label className="text-[#0FF]/70 text-sm font-tech">{label}</label>
      <select className="w-full bg-black/80 border border-[#0FF]/30 text-white px-4 py-2 
                       [clip-path:polygon(0_0,100%_0,95%_100%,5%_100%)]
                       focus:border-[#0FF] focus:outline-none font-tech">
        {children}
      </select>
    </div>
  );
};

const CyberStatCard: React.FC<StatCardProps> = ({ icon, number, label, sublabel }) => {
  return (
    <div className="relative group">
      <div className="relative p-6 bg-black/80 border border-[#0FF]/30 
                    [clip-path:polygon(0_0,100%_0,98%_98%,2%_98%)]">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center border border-[#0FF]/30 
                        [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]">
            <div className="text-[#0FF]">{icon}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white font-tech">{number}</div>
            <div className="text-[#0FF]/70 font-tech text-sm">{label}</div>
          </div>
        </div>
        <div className="mt-4 text-xs text-[#0FF] bg-[#0FF]/10 px-3 py-1 inline-block font-mono">
          {sublabel}
        </div>
      </div>
    </div>
  );
};
