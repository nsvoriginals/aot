"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Settings, Twitter, Youtube, Play, ChevronRight, Sword, Shield, Eye, Users, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Character data
const characters = [
  { name: "Eren Yeager", role: "Attack Titan", color: "from-green-900/50" },
  { name: "Mikasa Ackerman", role: "Soldier", color: "from-red-900/50" },
  { name: "Armin Arlert", role: "Strategist", color: "from-blue-900/50" },
  { name: "Levi Ackerman", role: "Captain", color: "from-gray-900/50" },
  { name: "Erwin Smith", role: "Commander", color: "from-yellow-900/50" },
  { name: "Hange Zoë", role: "Scientist", color: "from-purple-900/50" },
  { name: "Jean Kirstein", role: "Soldier", color: "from-amber-900/50" },
  { name: "Historia Reiss", role: "Queen", color: "from-pink-900/50" }
];

// Story arcs data
const storyArcs = [
  { 
    title: "Fall of Wall Maria", 
    description: "The day humanity's peace was shattered", 
    type: "main" 
  },
  { 
    title: "Battle of Trost", 
    description: "First major victory against the Titans", 
    type: "side" 
  },
  { 
    title: "Female Titan Arc", 
    description: "Mysterious intelligent Titan appears", 
    type: "side" 
  }
];

export default function AttackOnTitanWebsite() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // GSAP animations
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.hero-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }
    );

    // Scroll animations
    gsap.fromTo(
      '.feature-card',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        },
      }
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" 
             style={{ 
               top: mousePosition.y - 192, 
               left: mousePosition.x - 192,
               transition: 'all 0.3s ease-out'
             }}></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-10 w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-bounce"></div>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/20' : 'bg-transparent'
      }`}>
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/titans.png"
            alt="Titans Background"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-between px-8 py-4">
          {/* Logo - Japanese Name Only */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400" style={{ fontFamily: 'Ditty, sans-serif' }}>
              進撃の巨人
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {['NEWS', 'WATCH', 'WIKI'].map((item, index) => (
              <button key={item} 
                      className="relative text-white hover:text-gray-300 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-500"></div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Video */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.9) contrast(1.2)' }}
          >
            <source src="/video.mp4" type="video/mp4" />
            <source src="/video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-float animation-delay-200"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-float animation-delay-400"></div>
          <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-white/10 rounded-full animate-float animation-delay-600"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center hero-content">
            <motion.h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold mb-8 gradient-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ fontFamily: 'Ditty, sans-serif' }}
            >
              ATTACK ON TITAN
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Experience the epic tale of humanity's struggle against the Titans in this breathtaking anime masterpiece
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover-glow flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Join Community
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Clean Unequal Bento Grid Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent" style={{ fontFamily: 'Ditty, sans-serif' }}>
              Explore the World
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the characters, locations, and moments that shaped the epic story
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 h-[1200px]">
            
            {/* Large Featured Image - 60% width (3/5 columns) */}
            <motion.div
              className="lg:col-span-3 bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/eren.png"
                  alt="Eren Yeager"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Ditty, sans-serif' }}>
                    Eren Yeager
                  </h3>
                  <p className="text-gray-300">The protagonist whose journey changes everything</p>
                </div>
              </div>
            </motion.div>

            {/* Medium Image - 40% width (2/5 columns) */}
            <motion.div
              className="lg:col-span-2 bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/mikasa.jpg"
                  alt="Mikasa"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Ditty, sans-serif' }}>
                    Mikasa
                  </h3>
                  <p className="text-gray-300 text-sm">The strongest soldier</p>
                </div>
              </div>
            </motion.div>

            {/* Second Row - Medium Image - 40% width */}
            <motion.div
              className="lg:col-span-2 bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/titans.png"
                  alt="Titans"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Ditty, sans-serif' }}>
                    The Titans
                  </h3>
                  <p className="text-gray-300 text-sm">Mysterious giants that threaten humanity</p>
                </div>
              </div>
            </motion.div>

            {/* Small Square Images - 60% width (3/5 columns) */}
            <div className="lg:col-span-3 grid grid-cols-4 gap-6">
              {[
                { name: "Armin", image: "/images/armin.png", delay: 0.3 },
                { name: "Erwin", image: "/images/erwin.png", delay: 0.4 },
                { name: "Hange", image: "/images/hange.png", delay: 0.5 },
                { name: "Jean", image: "/images/jean.png", delay: 0.6 }
              ].map((character, index) => (
                <motion.div
                  key={character.name}
                  className="bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: character.delay }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Ditty, sans-serif' }}>
                        {character.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Third Row - Large Image - 60% width (3/5 columns) */}
            <motion.div
              className="lg:col-span-3 bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/image.png"
                  alt="Levi"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Ditty, sans-serif' }}>
                    Levi Ackerman
                  </h3>
                  <p className="text-gray-300">Humanity's strongest soldier</p>
                </div>
              </div>
            </motion.div>

            {/* Third Row - Medium Image - 40% width (2/5 columns) */}
            <motion.div
              className="lg:col-span-2 bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/queen.png"
                  alt="Historia"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Ditty, sans-serif' }}>
                    Historia Reiss
                  </h3>
                  <p className="text-gray-300 text-sm">The true queen</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Visuals Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent" style={{ fontFamily: 'Ditty, sans-serif' }}>
              The Story Unfolds
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Witness the epic tale of humanity's struggle against the Titans
            </p>
          </motion.div>

          {/* Story Visuals Grid */}
          <div className="flex flex-col gap-8">
            
            {/* First Story Image */}
            <motion.div
              className="bg-gray-900 rounded-3xl overflow-hidden relative group cursor-pointer h-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/story1.png"
                  alt="The Fall of Wall Maria"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Ditty, sans-serif' }}>
                    The Fall of Wall Maria
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    The day humanity's peace was shattered. Titans breach the outer wall, forcing survivors to retreat behind Wall Rose.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Second Story Image */}
            <motion.div
              className="bg-gray-900 rounded-3xl overflow-hidden relative group cursor-pointer h-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/story2.png"
                  alt="The Battle of Trost"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Ditty, sans-serif' }}>
                    The Battle of Trost
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Humanity's first major victory against the Titans. Eren discovers his mysterious power to transform.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Third Story Image */}
            <motion.div
              className="bg-gray-900 rounded-3xl overflow-hidden relative group cursor-pointer h-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/story3.png"
                  alt="The Female Titan"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Ditty, sans-serif' }}>
                    The Female Titan
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    A mysterious intelligent Titan appears, targeting Eren. The truth about the Titans begins to unravel.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Fourth Story Image */}
            <motion.div
              className="bg-gray-900 rounded-3xl overflow-hidden relative group cursor-pointer h-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/titans.png"
                  alt="The Truth Revealed"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Ditty, sans-serif' }}>
                    The Truth Revealed
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    The shocking revelation about the Titans' true nature and humanity's hidden history comes to light.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clean Image-Based Footer */}
      <footer className="py-16 bg-black border-t border-gray-800 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/titans.png"
            alt="Titans Background"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Logo Section */}
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3" style={{ fontFamily: 'Ditty, sans-serif' }}>
                進撃の巨人
              </div>
              <p className="text-gray-300 text-lg">
                Attack on Titan
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Humanity's last stand against the Titans
              </p>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <div className="flex justify-center md:justify-end space-x-6 mb-4">
                {[Instagram, Twitter, Youtube].map((Icon, index) => (
                  <Icon key={index} className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12" />
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                © 2024 Attack on Titan • All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}