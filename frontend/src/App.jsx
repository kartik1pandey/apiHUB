import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  Bot, 
  Sparkles, 
  MessageCircle, 
  Zap, 
  Shield, 
  Clock,
  Menu,
  X,
  Github,
  Twitter,
  Mail
} from 'lucide-react';
import Chatbot from './components/Chatbot';
import './App.css';

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Intelligent Conversations",
      description: "Natural language processing for seamless API assistance"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get instant responses to your API questions and documentation"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your API integration needs"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  APIhub Support
                </h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Powered by AI
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`hover:text-blue-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Home
              </Link>
              <a href="#features" className={`hover:text-blue-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Features
              </a>
              <a href="#docs" className={`hover:text-blue-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Documentation
              </a>
              <a href="#contact" className={`hover:text-blue-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Contact
              </a>
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 text-yellow-400 hover:bg-white/20' 
                    : 'bg-black/10 border-black/20 text-purple-600 hover:bg-black/20'
                }`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-full backdrop-blur-xl border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                    : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'
                }`}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/20 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              <Link to="/" className={`block hover:text-blue-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <a href="#features" className={`block hover:text-blue-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>
                Features
              </a>
              <a href="#docs" className={`block hover:text-blue-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>
                Documentation
              </a>
              <a href="#contact" className={`block hover:text-blue-400 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-xl rounded-full px-4 py-2 mb-8 border border-blue-500/30">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              Next-Generation API Assistant
            </span>
          </div>

          {/* Hero Title */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Smart API
            </span>
            <br />
            Support Chat
          </h1>

          {/* Hero Description */}
          <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience the future of API support with our AI-powered chatbot. 
            Get instant answers, seamless integration help, and expert guidance 24/7.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => navigate('/chat')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Chatting Now
            </button>
            <button className={`backdrop-blur-xl border px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20'
            }`}>
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose Our
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> AI Assistant</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover the powerful features that make our API support chatbot the perfect companion for developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  darkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white/50 border-white/50 hover:bg-white/70'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 border-t ${
        darkMode ? 'border-white/10' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  APIhub Support
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  AI-Powered API Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className={`hover:text-blue-400 transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className={`hover:text-blue-400 transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`hover:text-blue-400 transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className={`mt-8 pt-8 border-t text-center text-sm ${
            darkMode ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            <p>© 2025 APIhub Support. All rights reserved. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;