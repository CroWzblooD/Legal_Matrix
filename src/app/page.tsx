'use client';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, useMatcapTexture } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import {
  DocumentTextIcon,
  LanguageIcon,
  ChatBubbleLeftEllipsisIcon,
  DevicePhoneMobileIcon,
  QrCodeIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ChartBarIcon,
  UsersIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { LineSegments, BufferGeometry, BufferAttribute } from 'three';

// Update color scheme
const colors = {
  primary: '#CCFF00',    // Cyber Yellow-Green
  secondary: '#FFFFFF',  // White
  dark: '#0A0A0A',      // Almost Black
  accent: '#00FFB2',    // Cyber Mint
  glow: '#CCFF0040'     // Yellow-Green with opacity
};

// Replace the existing 3D component with a more relevant visualization
const SchemeCard3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      setElapsedTime(state.clock.elapsedTime);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Platform - Golden Base */}
      <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2, 2.2, 0.1, 32]} />
        <meshPhysicalMaterial
          color="#FFD700"  // Golden color
          metalness={0.7}
          roughness={0.2}
          envMapIntensity={1.5}
          clearcoat={1}
        />
      </mesh>

      {/* Floating Document Holograms */}
      {[...Array(4)].map((_, i) => (
        <group key={i} position={[
          Math.cos(i * Math.PI/2) * 1.2,
          0.5 + Math.sin(elapsedTime + i) * 0.1,
          Math.sin(i * Math.PI/2) * 1.2
        ]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 1.2, 0.05]} />
            <meshPhysicalMaterial
              color="#87CEEB"  // Sky blue
              metalness={0.2}
              roughness={0.3}
              transparent
              opacity={0.7}
              envMapIntensity={1}
            />
          </mesh>
          {/* Document Lines */}
          {[...Array(3)].map((_, j) => (
            <mesh key={j} position={[0, 0.2 - j * 0.3, 0.03]}>
              <boxGeometry args={[0.5, 0.05, 0.01]} />
              <meshPhysicalMaterial 
                color="#2D9D3A"  // Green text
                emissive="#2D9D3A"
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Center Earth Sphere */}
      <group position={[0, 0.5, 0]}>
        {/* Ocean Layer */}
        <mesh castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhysicalMaterial
            color="#1E90FF"  // Dodger blue for oceans
            metalness={0.4}
            roughness={0.6}
            envMapIntensity={1.5}
            clearcoat={1}
          />
        </mesh>
        
        {/* Land Masses */}
        <mesh castShadow>
          <sphereGeometry args={[0.51, 32, 32]} />
          <meshPhysicalMaterial
            color="#8B4513"  // Saddle brown for land
            metalness={0.3}
            roughness={0.8}
            transparent
            opacity={0.7}
            envMapIntensity={1}
          />
        </mesh>

        {/* Atmosphere Glow */}
        <mesh scale={1.1}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhysicalMaterial
            color="#87CEEB"
            transparent
            opacity={0.2}
            envMapIntensity={1}
          />
        </mesh>
      </group>

      {/* Energy Rings - Different colors */}
      {[
        { radius: 0.8, color: "#FFD700" },  // Gold
        { radius: 1.2, color: "#FF4500" },  // Orange Red
        { radius: 1.6, color: "#9370DB" }   // Medium Purple
      ].map(({ radius, color }, index) => (
        <mesh key={index} position={[0, 0.1 + index * 0.1, 0]} castShadow>
          <torusGeometry args={[radius, 0.02, 16, 32]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.4}
            transparent
            opacity={0.8}
            envMapIntensity={1}
          />
        </mesh>
      ))}

      {/* Orbiting Stars */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI/4) * 1.8,
            0.5 + Math.sin(elapsedTime + i) * 0.2,
            Math.sin(i * Math.PI/4) * 1.8
          ]}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshPhysicalMaterial
            color="#FFFF00"  // Yellow
            emissive="#FFFF00"
            emissiveIntensity={2}
            metalness={0.1}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="p-6 rounded-xl bg-black/40 backdrop-blur-xl
               border border-[#CCFF00]/20 hover:border-[#CCFF00]/40
               group transition-all duration-300"
  >
    <div className="w-14 h-14 mb-6 rounded-lg bg-gradient-to-br 
                    from-[#CCFF00] to-[#00FFB2] 
                    flex items-center justify-center
                    group-hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]
                    transition-all">
      <div className="text-black w-6 h-6">
        {icon}
      </div>
    </div>
    <h3 className="text-2xl font-bold text-[#CCFF00] mb-3">{title}</h3>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </motion.div>
);

// Scheme Category Card
const SchemeCategory = ({ title, icon, count }: {
  title: string;
  icon: React.ReactNode;
  count: number;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative overflow-hidden rounded-xl p-6
               bg-black/40 backdrop-blur-xl
               border border-[#CCFF00]/20 hover:border-[#CCFF00]/40
               group transition-all"
  >
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-xl font-bold text-[#CCFF00] mb-2">{title}</h3>
        <p className="text-white/70">{count} Schemes Available</p>
      </div>
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br 
                      from-[#CCFF00] to-[#00FFB2]
                      flex items-center justify-center
                      group-hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]">
        <div className="text-black w-6 h-6">
          {icon}
        </div>
      </div>
    </div>
    
    {/* Cyber decorative elements */}
    <div className="absolute -bottom-4 -right-4 w-32 h-32
                    bg-[#CCFF00] opacity-5 blur-2xl rounded-full
                    group-hover:opacity-10 transition-opacity" />
  </motion.div>
);

// Step Card Component
const StepCard = ({ number, title, description, icon }: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <motion.div
    className="relative p-8 rounded-xl bg-gradient-to-br 
               from-black/40 to-black/20 backdrop-blur-xl
               border border-[#CCFF00]/20 hover:border-[#CCFF00]/40
               transition-all group"
  >
    {/* Cyber number indicator */}
    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl
                    bg-[#CCFF00] flex items-center justify-center
                    text-black font-mono font-bold text-xl
                    shadow-[0_0_15px_rgba(204,255,0,0.5)]">
      {number}
    </div>

    <div className="w-16 h-16 mb-6 rounded-xl bg-[#CCFF00]/10
                    group-hover:bg-[#CCFF00]/20 transition-all
                    flex items-center justify-center">
      {icon}
    </div>

    <h3 className="text-2xl font-bold text-[#CCFF00] mb-3">{title}</h3>
    <p className="text-white/70 leading-relaxed">{description}</p>

    {/* Cyber decorative line */}
    <motion.div
      className="absolute -right-8 top-1/2 w-16 h-[2px]
                 bg-gradient-to-r from-[#CCFF00]/50 to-transparent
                 hidden lg:block"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
    />
  </motion.div>
);

// Success Story Card
const SuccessStory = ({ name, location, story, icon }: {
  name: string;
  location: string;
  story: string;
  icon: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="p-6 rounded-xl bg-gradient-to-br from-black/50 to-black/30
               backdrop-blur-xl border border-[#CCFF00]/20
               hover:border-[#CCFF00]/40 transition-all group"
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-12 rounded-lg bg-[#CCFF00]/10 
                      flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-[#CCFF00]">{name}</h4>
        <p className="text-white/70">{location}</p>
      </div>
    </div>
    <p className="text-white/80 leading-relaxed">{story}</p>
    
    <div className="absolute -bottom-2 -right-2 w-24 h-24
                    bg-[#CCFF00] opacity-5 blur-2xl rounded-full
                    group-hover:opacity-10 transition-opacity" />
  </motion.div>
);

// Features Section
const FeaturesSection = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-[#2D3047] mb-4">
          Empowering Features
        </h2>
        <p className="text-xl text-[#5C6079]">
          Making government schemes accessible to everyone
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
          title="Smart Document Scanning"
          description="Instantly scan and verify documents with AI-powered recognition"
        />
        <FeatureCard
          icon={<LanguageIcon className="w-6 h-6 text-white" />}
          title="Multi-language Support"
          description="Access information in 10+ Indian languages"
        />
        <FeatureCard
          icon={<ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-white" />}
          title="Voice Assistant"
          description="Natural conversation interface for easy interaction"
        />
        <FeatureCard
          icon={<DevicePhoneMobileIcon className="w-6 h-6 text-white" />}
          title="Mobile First"
          description="Optimized for all mobile devices and networks"
        />
        <FeatureCard
          icon={<QrCodeIcon className="w-6 h-6 text-white" />}
          title="Quick Access"
          description="Scan QR codes for instant scheme information"
        />
        <FeatureCard
          icon={<ShieldCheckIcon className="w-6 h-6 text-white" />}
          title="Secure & Private"
          description="Bank-grade security for your personal information"
        />
      </div>
    </div>
  </section>
);

// Scheme Categories Section
const SchemeCategoriesSection = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-5xl font-bold text-[#2D3047] mb-4">
          Explore Schemes
        </h2>
        <p className="text-xl text-[#5C6079]">
          Find the right government schemes for your needs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SchemeCategory
          title="Education"
          icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
          count={24}
        />
        <SchemeCategory
          title="Healthcare"
          icon={<LanguageIcon className="w-6 h-6 text-white" />}
          count={18}
        />
        <SchemeCategory
          title="Agriculture"
          icon={<ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-white" />}
          count={32}
        />
        {/* Add more categories */}
      </div>
    </div>

    {/* Decorative Elements */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute -top-40 -right-40 w-96 h-96
                 bg-gradient-to-br from-[#F7C948]/10 to-transparent
                 rounded-full blur-3xl"
    />
  </section>
);

// How It Works Section
const HowItWorksSection = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl font-bold text-[#2D3047] mb-4">
          How सहायक AI Works
        </h2>
        <p className="text-xl text-[#5C6079]">
          Simple steps to access government schemes
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <StepCard
          number={1}
          icon={<DevicePhoneMobileIcon className="w-8 h-8 text-[#8C4B3C]" />}
          title="Download App"
          description="Get started with our easy-to-use mobile application"
        />
        <StepCard
          number={2}
          icon={<QrCodeIcon className="w-8 h-8 text-[#8C4B3C]" />}
          title="Scan Documents"
          description="Quick document scanning with instant verification"
        />
        <StepCard
          number={3}
          icon={<MagnifyingGlassIcon className="w-8 h-8 text-[#8C4B3C]" />}
          title="Find Schemes"
          description="AI matches you with relevant government schemes"
        />
        <StepCard
          number={4}
          icon={<CheckCircleIcon className="w-8 h-8 text-[#8C4B3C]" />}
          title="Get Benefits"
          description="Track applications and receive benefits easily"
        />
      </div>
    </div>
  </section>
);

// Success Stories Section
const SuccessStoriesSection = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-[#2D3047] mb-4">
          Success Stories
        </h2>
        <p className="text-xl text-[#5C6079]">
          Real people, real impact
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SuccessStory
          name="Savita Devi"
          location="Bihar"
          story="Thanks to सहायक, I easily applied for the Widow Pension Scheme and now receive regular benefits."
          icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
        />
        <SuccessStory
          name="Kishore Kumar"
          location="Madhya Pradesh"
          story="The app helped me discover and apply for agricultural subsidies I didn't know I was eligible for."
          icon={<ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-white" />}
        />
        <SuccessStory
          name="Lakshmi"
          location="Karnataka"
          story="Getting educational scholarships for my children was made simple with सहायक's guidance."
          icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
        />
      </div>
    </div>

    {/* Decorative Elements */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute -bottom-40 -left-40 w-96 h-96
                 bg-gradient-to-br from-[#8C4B3C]/10 to-transparent
                 rounded-full blur-3xl"
    />
  </section>
);

// Stat Card Component
const StatCard = ({ number, label, icon }: {
  number: string;
  label: string;
  icon: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="p-6 rounded-xl bg-black/40 backdrop-blur-xl
               border border-[#CCFF00]/20 hover:border-[#CCFF00]/40
               transition-all duration-300 group"
  >
    <div className="w-12 h-12 mb-4 rounded-lg bg-[#CCFF00]/10 
                    group-hover:bg-[#CCFF00]/20 transition-all
                    flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-4xl font-bold text-[#CCFF00] mb-2">{number}</h3>
    <p className="text-white/70">{label}</p>
  </motion.div>
);

// FAQ Item Component
const FAQItem = ({ question, answer }: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      className="border-b border-[#8C4B3C]/10 last:border-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="text-xl font-semibold text-[#2D3047]">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-[#8C4B3C] text-2xl"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-[#5C6079] leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

// Benefits Section
const BenefitsSection = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-[#2D3047] mb-4">
          Making an Impact
        </h2>
        <p className="text-xl text-[#5C6079]">
          Transforming lives across rural India
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          icon={<UsersIcon className="w-6 h-6 text-[#8C4B3C]" />}
          number="1M+"
          label="Active Users"
        />
        <StatCard
          icon={<GlobeAltIcon className="w-6 h-6 text-[#8C4B3C]" />}
          number="10+"
          label="Languages Supported"
        />
        <StatCard
          icon={<ChartBarIcon className="w-6 h-6 text-[#8C4B3C]" />}
          number="500+"
          label="Government Schemes"
        />
        <StatCard
          icon={<ShieldCheckIcon className="w-6 h-6 text-[#8C4B3C]" />}
          number="95%"
          label="Success Rate"
        />
      </div>
    </div>
  </section>
);

// FAQ Section
const FAQSection = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-6 relative z-10">
      <motion.div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-[#CCFF00] mb-4 tracking-tight">
          Common Questions
        </h2>
        <p className="text-xl text-white/80">
          Everything you need to know about सहायक
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        <FAQItem
          question="How does सहायक help me find schemes?"
          answer="Our AI-powered system analyzes your profile, documents, and eligibility criteria to match you with relevant government schemes."
        />
      </div>
    </div>
    {/* Cyber grid background */}
    <div className="absolute inset-0 bg-[linear-gradient(#CCFF0005_1px,transparent_1px),linear-gradient(90deg,#CCFF0005_1px,transparent_1px)] bg-[size:20px_20px]" />
  </section>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#F5FFE0] via-white to-[#EBFFD4]">
      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Content */}
            <motion.div className="lg:w-1/2 space-y-4">
              <h1 className="text-6xl font-bold leading-tight tracking-tighter">
                <span className="bg-gradient-to-r from-[#2D9D3A] to-[#1A5D1F] 
                               text-transparent bg-clip-text">
                  सहायक AI
                </span>
                <span className="block text-[#1A1A1A] mt-1">
                  Your Digital Guide to
                  <span className="block">Government Schemes</span>
                </span>
              </h1>
              <p className="text-lg text-[#374151] leading-relaxed max-w-xl">
                Empowering rural India with AI-powered assistance for government schemes, 
                making digital inclusion a reality.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-[#2D9D3A] to-[#1A5D1F]
                           text-white font-semibold rounded-lg shadow-lg"
                >
                  Start Your Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white/80 backdrop-blur-sm
                           text-[#2D9D3A] rounded-lg border border-[#2D9D3A]"
                >
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>

            {/* 3D Component Section */}
            <div className="lg:w-1/2 h-[350px] md:h-[400px] lg:h-[500px] w-full">
              <Canvas
                camera={{ position: [0, 2, 5], fov: 40 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%'
                }}
              >
                {/* Remove the color attach line since we're using the div background */}
                <ambientLight intensity={0.8} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  intensity={1.5}
                  castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <pointLight 
                  position={[5, 5, 5]} 
                  intensity={0.5}
                  color="#FFD700"
                />
                <Suspense fallback={null}>
                  <SchemeCard3D />
                </Suspense>
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 3}
                />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Updated background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,157,58,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,157,58,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(45,157,58,0.05) 0%, transparent 70%)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 40, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>

      <FeaturesSection />
      <SchemeCategoriesSection />
      <HowItWorksSection />
      <SuccessStoriesSection />
      <BenefitsSection />
      <FAQSection />
    </main>
  );
}