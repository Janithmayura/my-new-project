import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArrowRight, Check, Menu, X, Zap, Shield, Sparkles, ChevronDown, Loader2 } from 'lucide-react';

export default function TechLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Smooth scroll handler
  const handleSmoothScroll = useCallback((e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Form validation
  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.company.trim()) {
      errors.company = 'Company name is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Analytics hook placeholder
      if (window.dataLayer) {
        window.dataLayer.push({ 
          event: 'form_submit', 
          formData: { ...formData } 
        });
      }
      
      setFormSubmitted(true);
      setFormData({ name: '', email: '', company: '' });
      
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      setFormErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  // Memoized opacity calculations
  const heroOpacity = useMemo(() => Math.max(1 - scrollY / 500, 0), [scrollY]);
  const subtitleOpacity = useMemo(() => Math.max(1 - scrollY / 400, 0), [scrollY]);

  // Feature data
  const features = useMemo(() => [
    { icon: <Zap className="w-8 h-8" aria-hidden="true" />, title: "Lightning Fast", desc: "Blazing performance optimized for modern workflows" },
    { icon: <Shield className="w-8 h-8" aria-hidden="true" />, title: "Enterprise Security", desc: "Bank-level encryption and compliance built-in" },
    { icon: <Sparkles className="w-8 h-8" aria-hidden="true" />, title: "AI-Powered", desc: "Smart automation that learns from your patterns" }
  ], []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50" role="status" aria-label="Loading">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-400 w-8 h-8 animate-pulse" aria-hidden="true" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav 
        ref={navRef}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/20' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group cursor-pointer" aria-label="NexaTech Home">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold">NexaTech</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              onClick={(e) => handleSmoothScroll(e, 'features')}
              className="hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              Features
            </a>
            <a 
              href="#benefits" 
              onClick={(e) => handleSmoothScroll(e, 'benefits')}
              className="hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              Benefits
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleSmoothScroll(e, 'pricing')}
              className="hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              Pricing
            </a>
            <a 
              href="#demo" 
              onClick={(e) => handleSmoothScroll(e, 'demo')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Get Started
            </a>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-purple-500/20 px-6 py-4 space-y-4" role="menu">
            <a 
              href="#features" 
              onClick={(e) => handleSmoothScroll(e, 'features')}
              className="block hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2"
              role="menuitem"
            >
              Features
            </a>
            <a 
              href="#benefits" 
              onClick={(e) => handleSmoothScroll(e, 'benefits')}
              className="block hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2"
              role="menuitem"
            >
              Benefits
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleSmoothScroll(e, 'pricing')}
              className="block hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-2"
              role="menuitem"
            >
              Pricing
            </a>
            <a 
              href="#demo" 
              onClick={(e) => handleSmoothScroll(e, 'demo')}
              className="block bg-purple-600 px-6 py-2 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
              role="menuitem"
            >
              Get Started
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="top" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
            <span className="text-purple-400">🚀 Now in Public Beta</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight" style={{opacity: heroOpacity}}>
            Transform Your Workflow
            <br />
            <span className="text-purple-400">10x Faster</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto" style={{opacity: subtitleOpacity}}>
            The next-generation platform that helps teams ship products faster with AI-powered automation and intelligent insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#demo" 
              onClick={(e) => handleSmoothScroll(e, 'demo')}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
            <a 
              href="#demo" 
              onClick={(e) => handleSmoothScroll(e, 'demo')}
              className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Watch Demo
            </a>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
              <span>14-day free trial</span>
            </div>
          </div>

          <div className="mt-12 animate-bounce" aria-hidden="true">
            <ChevronDown className="w-8 h-8 mx-auto text-purple-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-400">Everything you need to accelerate your product development</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 focus-within:ring-2 focus-within:ring-purple-500"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section id="demo" className="py-32 px-6 bg-gradient-to-br from-slate-900 to-purple-900/20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-3xl border border-purple-500/30 shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 text-center">Start Your Free Trial</h2>
            <p className="text-slate-400 text-center mb-8">Join 10,000+ teams already accelerating their workflow</p>

            {formSubmitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center" role="alert" aria-live="polite">
                <Check className="w-12 h-12 text-green-400 mx-auto mb-3" aria-hidden="true" />
                <p className="text-green-400 font-semibold">Thanks! Check your email for next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {formErrors.submit && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm" role="alert">
                    {formErrors.submit}
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (formErrors.name) setFormErrors({...formErrors, name: ''});
                    }}
                    className={`w-full bg-slate-800/50 border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                      formErrors.name ? 'border-red-500/50' : 'border-purple-500/30 focus:border-purple-500'
                    }`}
                    required
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="sr-only">Work Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (formErrors.email) setFormErrors({...formErrors, email: ''});
                    }}
                    className={`w-full bg-slate-800/50 border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                      formErrors.email ? 'border-red-500/50' : 'border-purple-500/30 focus:border-purple-500'
                    }`}
                    required
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="company" className="sr-only">Company Name</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({...formData, company: e.target.value});
                      if (formErrors.company) setFormErrors({...formErrors, company: ''});
                    }}
                    className={`w-full bg-slate-800/50 border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                      formErrors.company ? 'border-red-500/50' : 'border-purple-500/30 focus:border-purple-500'
                    }`}
                    required
                    aria-invalid={!!formErrors.company}
                    aria-describedby={formErrors.company ? 'company-error' : undefined}
                  />
                  {formErrors.company && (
                    <p id="company-error" className="mt-1 text-sm text-red-400" role="alert">
                      {formErrors.company}
                    </p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      Get Started Free
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-500 text-center">By signing up, you agree to our Terms of Service and Privacy Policy</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} NexaTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}