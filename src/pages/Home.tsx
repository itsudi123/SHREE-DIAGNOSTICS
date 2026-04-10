import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Shield, Clock, FileText, Star, ArrowRight, Activity, Sparkles, X, Upload, Home as HomeIcon, Heart, Droplet, Brain, Activity as ActivityIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAiSuggest = () => {
    // Basic mock logic for AI suggestion
    const lowerSymptoms = symptoms.toLowerCase();
    let suggestion = "Comprehensive Full Body Checkup";
    
    if (lowerSymptoms.includes("fever") || lowerSymptoms.includes("weakness")) {
      suggestion = "Complete Blood Count (CBC) & Dengue NS1";
    } else if (lowerSymptoms.includes("chest") || lowerSymptoms.includes("heart")) {
      suggestion = "Advanced Heart Care Package & Lipid Profile";
    } else if (lowerSymptoms.includes("stomach") || lowerSymptoms.includes("digestion")) {
      suggestion = "Liver Function Test (LFT) & Ultrasound";
    } else if (lowerSymptoms.includes("sugar") || lowerSymptoms.includes("thirst")) {
      suggestion = "HbA1c & Fasting Blood Sugar";
    }

    setAiSuggestion(suggestion);
  };

  const popularTests = [
    "Complete Blood Count (CBC)",
    "Lipid Profile",
    "Thyroid Profile (T3, T4, TSH)",
    "HbA1c",
    "Vitamin D",
    "Liver Function Test (LFT)"
  ];

  const featuredPackages = [
    {
      id: "pkg1",
      name: "Comprehensive Full Body Checkup",
      tests: 85,
      price: 2499,
      originalPrice: 4999,
      discount: "50% OFF",
      tags: ["Most Popular", "Fasting Required"]
    },
    {
      id: "pkg2",
      name: "Advanced Heart Care Package",
      tests: 42,
      price: 1999,
      originalPrice: 3500,
      discount: "42% OFF",
      tags: ["Cardiology"]
    },
    {
      id: "pkg3",
      name: "Women's Health & Wellness",
      tests: 64,
      price: 2999,
      originalPrice: 6000,
      discount: "50% OFF",
      tags: ["Women's Health"]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/medical/1920/1080')] bg-cover bg-center mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Your Health, <br/>
              <span className="text-blue-400">Accurately Diagnosed.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl"
            >
              Book lab tests, health packages, and scans from top-rated diagnostic centers near you. Get reports online.
            </motion.p>

            {/* Search Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <MapPin className="h-5 w-5 text-slate-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Your Location" 
                  className="bg-transparent border-none outline-none w-full text-slate-900 placeholder-slate-500"
                  defaultValue="Mumbai, Maharashtra"
                />
              </div>
              <div className="flex-[2] flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <Search className="h-5 w-5 text-slate-400 mr-3" />
                <form onSubmit={handleSearch} className="w-full">
                  <input 
                    type="text" 
                    placeholder="Search for tests, packages, or labs..." 
                    className="bg-transparent border-none outline-none w-full text-slate-900 placeholder-slate-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
              <button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors whitespace-nowrap"
              >
                Find Tests
              </button>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="mt-4"
            >
              <button 
                onClick={() => setShowAiModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/30"
              >
                <Sparkles className="h-5 w-5" />
                Not sure what to test? Ask AI
              </button>
            </motion.div>

            {/* Popular Searches */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center gap-2 text-sm"
            >
              <span className="text-blue-200">Popular:</span>
              {popularTests.slice(0, 4).map((test, idx) => (
                <button 
                  key={idx}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(test)}`)}
                  className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm transition-colors"
                >
                  {test}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions Bar */}
      <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-6 flex flex-col md:flex-row justify-around items-center gap-4 md:gap-8">
          <div 
            className="flex items-center gap-4 cursor-pointer group w-full md:w-auto justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="bg-blue-50 p-4 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Upload className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Upload Prescription</h3>
              <p className="text-sm text-slate-500">We will arrange the tests</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  alert(`Prescription ${e.target.files[0].name} uploaded successfully! Our team will contact you shortly.`);
                  e.target.value = '';
                }
              }}
            />
          </div>
          
          <div className="hidden md:block w-px h-12 bg-slate-200"></div>
          
          <div 
            className="flex items-center gap-4 cursor-pointer group w-full md:w-auto justify-center"
            onClick={() => navigate('/search?type=packages')}
          >
            <div className="bg-emerald-50 p-4 rounded-full text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <HomeIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Book Home Collection</h3>
              <p className="text-sm text-slate-500">Free sample collection</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-slate-200"></div>

          <div 
            className="flex items-center gap-4 cursor-pointer group w-full md:w-auto justify-center"
            onClick={() => navigate('/dashboard')}
          >
            <div className="bg-purple-50 p-4 rounded-full text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Download Reports</h3>
              <p className="text-sm text-slate-500">View your past results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">NABL Accredited Labs</h3>
                <p className="text-sm text-slate-600">Partnered with certified and trusted diagnostic centers.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Free Home Sample Collection</h3>
                <p className="text-sm text-slate-600">Get tested from the comfort of your home at your preferred time.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Digital Reports in 24 Hrs</h3>
                <p className="text-sm text-slate-600">Access your reports online quickly and securely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Featured Health Packages</h2>
              <p className="text-slate-600">Comprehensive checkups for you and your family.</p>
            </div>
            <button 
              onClick={() => navigate('/search?type=packages')}
              className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    {pkg.tags.map(tag => (
                      <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{pkg.name}</h3>
                <p className="text-sm text-slate-600 mb-6 flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Includes {pkg.tests} Tests
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-slate-900">₹{pkg.price}</span>
                      <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                    </div>
                    <span className="text-xs font-medium text-emerald-600">{pkg.discount}</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/book/${pkg.id}`)}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Partners */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-8">Our Franchise Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500">
            <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all">
              <img src="https://picsum.photos/seed/diagnopein/160/60" alt="Diagnopein" className="h-12 object-cover rounded-md shadow-sm" referrerPolicy="no-referrer" />
              <span className="text-sm font-bold text-slate-700">Diagnopein</span>
            </div>
            <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all">
              <img src="https://picsum.photos/seed/krsnaa/160/60" alt="Krsnaa Diagnostics" className="h-12 object-cover rounded-md shadow-sm" referrerPolicy="no-referrer" />
              <span className="text-sm font-bold text-slate-700">Krsnaa Diagnostics</span>
            </div>
            <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all">
              <img src="https://picsum.photos/seed/generaldiag/160/60" alt="General Diagnostics" className="h-12 object-cover rounded-md shadow-sm" referrerPolicy="no-referrer" />
              <span className="text-sm font-bold text-slate-700">General Diagnostics</span>
            </div>
            <div className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all">
              <img src="https://picsum.photos/seed/agilus/160/60" alt="Agilus Diagnostics" className="h-12 object-cover rounded-md shadow-sm" referrerPolicy="no-referrer" />
              <span className="text-sm font-bold text-slate-700">Agilus Diagnostics</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Suggestion Modal */}
      <AnimatePresence>
        {showAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg">
                  <Sparkles className="h-5 w-5" />
                  AI Health Assistant
                </div>
                <button onClick={() => { setShowAiModal(false); setAiSuggestion(null); setSymptoms(""); }} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-4">Describe your symptoms or health concerns, and our AI will suggest the most relevant diagnostic tests.</p>
                <textarea 
                  className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none mb-4"
                  rows={4}
                  placeholder="E.g., I have been feeling very tired lately and have a mild fever..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                ></textarea>
                
                {aiSuggestion && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-4"
                  >
                    <p className="text-sm text-indigo-900 font-medium mb-1">Recommended Test/Package:</p>
                    <p className="text-lg font-bold text-indigo-700">{aiSuggestion}</p>
                  </motion.div>
                )}

                <div className="flex justify-end gap-3">
                  {aiSuggestion ? (
                    <button 
                      onClick={() => {
                        setShowAiModal(false);
                        navigate(`/search?q=${encodeURIComponent(aiSuggestion)}`);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                    >
                      Search this Test
                    </button>
                  ) : (
                    <button 
                      onClick={handleAiSuggest}
                      disabled={!symptoms.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                    >
                      Get Suggestion
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
