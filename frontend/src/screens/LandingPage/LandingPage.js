import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
// Custom SVG Icons
const ShieldCheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const CloudIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
  </svg>
);

const BoltIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

const SparklesIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const PlayIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-theme overflow-hidden">

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 mb-8">
                <SparklesIcon className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-purple-600 text-sm font-medium">Trusted by 50,000+ professionals worldwide</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                The Future of
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Intelligent Note-Taking
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-theme-muted mb-8 max-w-4xl mx-auto leading-relaxed">
                Transform your thoughts into actionable insights with AI-powered organization,
                enterprise-grade security, and seamless collaboration tools.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/register">
                  <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center">
                    Start Free Trial
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button 
                  onClick={openVideoModal}
                  className="group px-8 py-4 border-2 border-purple-500 text-purple-600 text-lg font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 flex items-center"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <p className="text-gray-500 text-sm mt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </motion.div>

            {/* Hero Image/Dashboard Preview */}
            <motion.div
              variants={itemVariants}
              className="relative max-w-6xl mx-auto"
            >
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                <div className="relative p-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-4 rounded-lg border border-purple-500/30">
                      <div className="h-4 bg-purple-400/50 rounded mb-2"></div>
                      <div className="h-3 bg-purple-300/30 rounded mb-1"></div>
                      <div className="h-3 bg-purple-300/30 rounded w-2/3"></div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 p-4 rounded-lg border border-cyan-500/30">
                      <div className="h-4 bg-cyan-400/50 rounded mb-2"></div>
                      <div className="h-3 bg-cyan-300/30 rounded mb-1"></div>
                      <div className="h-3 bg-cyan-300/30 rounded w-3/4"></div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 p-4 rounded-lg border border-emerald-500/30">
                      <div className="h-4 bg-emerald-400/50 rounded mb-2"></div>
                      <div className="h-3 bg-emerald-300/30 rounded mb-1"></div>
                      <div className="h-3 bg-emerald-300/30 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 bg-theme-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Features
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-theme-muted max-w-3xl mx-auto">
              Built for professionals who demand the best. Every feature designed with security, performance, and user experience in mind.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                icon: ShieldCheckIcon,
                title: "Enterprise Security",
                desc: "Bank-grade encryption with SOC 2 compliance. Your data is protected with military-grade security protocols.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: CloudIcon,
                title: "Global Cloud Sync",
                desc: "Real-time synchronization across all devices with 99.9% uptime SLA and global CDN distribution.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: BoltIcon,
                title: "Lightning Performance",
                desc: "Sub-second load times with advanced caching and optimized infrastructure for maximum productivity.",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: SparklesIcon,
                title: "AI-Powered Intelligence",
                desc: "Smart categorization, content suggestions, and automated organization powered by machine learning.",
                color: "from-emerald-500 to-teal-500"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    

      {/* CTA Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-12 border border-purple-200"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the productivity revolution. Start your free trial today and experience the future of note-taking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Start Free Trial
                </button>
              </Link>
              <Link to="/login">
                <button className="px-8 py-4 border-2 border-purple-500 text-purple-600 text-lg font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300">
                  Sign In
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Satyam's NoteZipper Demo</h3>
              <p className="text-purple-100">See how Satyam organizes his startup ideas and notes with NoteZipper's powerful features</p>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100">
              {/* Custom Demo Animation - Simulating NoteZipper App */}
              <div className="w-full h-full flex flex-col">
                {/* App Header Simulation */}
                <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <SparklesIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      NoteZipper
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Satyam Sawant</span>
                  </div>
                </div>

                {/* Main Demo Content */}
                <div className="flex-1 flex">
                  {/* Sidebar */}
                  <div className="w-64 bg-white border-r border-gray-200 p-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">My Notes</h3>
                      <div className="space-y-2">
                        {[
                          { title: "Project Ideas", category: "Work", color: "bg-blue-100 text-blue-800" },
                          { title: "Meeting Notes", category: "Business", color: "bg-green-100 text-green-800" },
                          { title: "Personal Goals", category: "Life", color: "bg-purple-100 text-purple-800" },
                          { title: "Code Snippets", category: "Tech", color: "bg-orange-100 text-orange-800" }
                        ].map((note, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + index * 0.2 }}
                            className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                          >
                            <div className="font-medium text-gray-900 text-sm">{note.title}</div>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${note.color}`}>
                              {note.category}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 p-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      {/* Note Editor Header */}
                      <div className="mb-6">
                        <motion.input
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.5 }}
                          className="text-2xl font-bold text-gray-900 border-none outline-none bg-transparent w-full"
                          value="My Startup Ideas 💡"
                          readOnly
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3 }}
                          className="flex items-center space-x-4 mt-2 text-sm text-gray-500"
                        >
                          <span>Created by Satyam Sawant</span>
                          <span>•</span>
                          <span>Last edited 2 minutes ago</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            Work
                          </span>
                        </motion.div>
                      </div>

                      {/* Note Content with Typing Animation */}
                      <div className="prose max-w-none">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3.5 }}
                          className="space-y-4"
                        >
                          <div className="text-gray-700 leading-relaxed">
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 4 }}
                            >
                              <strong>🚀 NoteZipper - The Ultimate Note-Taking Platform</strong>
                            </motion.p>
                            
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 4.5 }}
                              className="mt-4"
                            >
                              <p className="mb-2"><strong>Key Features:</strong></p>
                              <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <motion.li
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 5 }}
                                >
                                  ✨ AI-powered organization and categorization
                                </motion.li>
                                <motion.li
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 5.5 }}
                                >
                                  🔒 Enterprise-grade security with end-to-end encryption
                                </motion.li>
                                <motion.li
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 6 }}
                                >
                                  ☁️ Real-time sync across all devices
                                </motion.li>
                                <motion.li
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 6.5 }}
                                >
                                  👥 Seamless team collaboration features
                                </motion.li>
                              </ul>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 7 }}
                              className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                            >
                              <p className="text-purple-800 font-medium">💰 Revenue Model:</p>
                              <p className="text-purple-700 mt-1">
                                Freemium SaaS with enterprise plans starting at $12/month
                              </p>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 7.5 }}
                              className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                            >
                              <p className="text-green-800 font-medium">🎯 Target Market:</p>
                              <p className="text-green-700 mt-1">
                                Professionals, students, and enterprise teams in the US market
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Toolbar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 8 }}
                  className="bg-white border-t border-gray-200 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add Note</span>
                    </button>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Auto-saved</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Words: 127 • Characters: 892
                  </div>
                </motion.div>
              </div>

              {/* Video Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none">
                <div className="absolute bottom-6 left-6 text-gray-800 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h4 className="text-lg font-semibold mb-2">Satyam's NoteZipper Demo</h4>
                  <p className="text-gray-600 text-sm">Watch how easy it is to create, organize, and manage your startup ideas and notes</p>
                </div>
              </div>

              {/* Floating Feature Highlights */}
              <div className="absolute top-6 left-6 space-y-3 pointer-events-none">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Real-time Sync</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">AI Organization</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Enterprise Security</span>
                  </div>
                </motion.div>
              </div>

              {/* Demo Stats */}
              <div className="absolute top-6 right-6 space-y-3 pointer-events-none">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-lg px-4 py-3 text-white shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-xs opacity-90">Active Users</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 3 }}
                  className="bg-gradient-to-r from-cyan-600/90 to-blue-600/90 backdrop-blur-sm rounded-lg px-4 py-3 text-white shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="text-xs opacity-90">Uptime</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Video Footer */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ready to get started?</h4>
                  <p className="text-gray-600 text-sm">Join thousands of professionals already using NoteZipper</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={closeVideoModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                  <Link to="/register">
                    <button
                      onClick={closeVideoModal}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      Start Free Trial
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;
