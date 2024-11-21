import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-[#2D9D3A] to-[#1A5D1F] 
                           text-transparent bg-clip-text">सहायक AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Nav Links */}
            <NavLink href="/schemes" icon={<DocumentTextIcon className="w-4 h-4" />}>
              Schemes
            </NavLink>
            <NavDropdown 
              title="Services" 
              items={[
                { label: 'Document Verification', href: '/services/verification' },
                { label: 'Eligibility Check', href: '/services/eligibility' },
                { label: 'Application Support', href: '/services/support' },
              ]} 
            />
            <NavLink href="/about" icon={<UserGroupIcon className="w-4 h-4" />}>
              About Us
            </NavLink>
            <NavLink href="/contact" icon={<PhoneIcon className="w-4 h-4" />}>
              Contact
            </NavLink>

            {/* Language Selector */}
            <select className="bg-transparent border border-[#2D9D3A]/20 rounded-lg 
                             px-3 py-2 text-sm text-gray-600 hover:border-[#2D9D3A]
                             focus:outline-none focus:border-[#2D9D3A] transition-colors">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="bn">বাংলা</option>
            </select>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-[#2D9D3A] hover:text-[#1A5D1F]
                         transition-colors"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-gradient-to-r from-[#2D9D3A] to-[#1A5D1F]
                         text-white rounded-lg shadow-md hover:shadow-lg
                         transition-all"
              >
                Sign Up
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0,
        }}
        className="md:hidden bg-white border-t"
      >
        <div className="px-4 py-6 space-y-4">
          <MobileNavLink href="/schemes">Schemes</MobileNavLink>
          <MobileNavLink href="/services">Services</MobileNavLink>
          <MobileNavLink href="/about">About Us</MobileNavLink>
          <MobileNavLink href="/contact">Contact</MobileNavLink>
          
          <div className="pt-4 border-t border-gray-200">
            <select className="w-full bg-transparent border border-[#2D9D3A]/20 
                             rounded-lg px-3 py-2 text-sm text-gray-600">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button className="w-full px-4 py-2 text-[#2D9D3A] border border-[#2D9D3A]
                             rounded-lg hover:bg-[#2D9D3A]/5 transition-colors">
              Login
            </button>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-[#2D9D3A] to-[#1A5D1F]
                             text-white rounded-lg shadow-md hover:shadow-lg
                             transition-all">
              Sign Up
            </button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

// Helper Components
const NavLink = ({ href, children, icon }) => (
  <Link
    href={href}
    className="flex items-center space-x-1 text-gray-600 hover:text-[#2D9D3A]
               transition-colors"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const NavDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-1 text-gray-600 hover:text-[#2D9D3A]
                   transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
        className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg
                   border border-gray-100 py-2 hidden group-hover:block"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 text-gray-600 hover:text-[#2D9D3A]
                     hover:bg-gray-50 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

const MobileNavLink = ({ href, children }) => (
  <Link
    href={href}
    className="block text-gray-600 hover:text-[#2D9D3A] transition-colors"
  >
    {children}
  </Link>
);

export default Navbar; 