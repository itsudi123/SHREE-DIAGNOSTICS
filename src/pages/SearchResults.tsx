import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Star, Clock, ArrowRight } from "lucide-react";

// Mock Data
const MOCK_RESULTS = [
  {
    id: "t1",
    type: "test",
    name: "Complete Blood Count (CBC)",
    description: "Measures different components of blood to evaluate overall health.",
    price: 399,
    originalPrice: 500,
    labsCount: 12,
    fastingRequired: false,
    reportTime: "24 Hrs"
  },
  {
    id: "t2",
    type: "test",
    name: "Lipid Profile",
    description: "Measures cholesterol levels to assess risk of heart disease.",
    price: 599,
    originalPrice: 800,
    labsCount: 8,
    fastingRequired: true,
    reportTime: "24 Hrs"
  },
  {
    id: "p1",
    type: "package",
    name: "Comprehensive Full Body Checkup",
    description: "Includes 85 tests covering vital organs and health parameters.",
    price: 2499,
    originalPrice: 4999,
    labsCount: 5,
    fastingRequired: true,
    reportTime: "48 Hrs"
  }
];

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const typeFilter = searchParams.get("type") || "all";
  
  const [results, setResults] = useState(MOCK_RESULTS);
  const [searchTerm, setSearchTerm] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, fetch from API based on query and filters
    let filtered = MOCK_RESULTS;
    if (query) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter(item => item.type === typeFilter.replace('s', '')); // basic plural handling
    }
    setResults(filtered);
  }, [query, typeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm, type: typeFilter });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
              <Search className="h-5 w-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search for tests, packages..." 
                className="bg-transparent border-none outline-none w-full text-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-xl font-medium transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <div className="flex items-center gap-2 font-semibold text-slate-900 mb-6">
                <Filter className="h-5 w-5" />
                Filters
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Category</h3>
                  <div className="space-y-2">
                    {['all', 'tests', 'packages'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="type" 
                          checked={typeFilter === type}
                          onChange={() => setSearchParams({ q: query, type })}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-600 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Price Range</h3>
                  <input type="range" className="w-full accent-blue-600" />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>₹0</span>
                    <span>₹10,000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">
                {results.length} Results found {query && `for "${query}"`}
              </h2>
              <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="space-y-4">
              {results.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          item.type === 'package' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {item.type.toUpperCase()}
                        </span>
                        {item.fastingRequired && (
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                            Fasting Required
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                      <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Available in {item.labsCount} Labs
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Reports in {item.reportTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 min-w-[200px]">
                      <div className="mb-4 md:mb-0">
                        <div className="text-sm text-slate-500 mb-1">Starting from</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-slate-900">₹{item.price}</span>
                          <span className="text-sm text-slate-400 line-through">₹{item.originalPrice}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/book/${item.id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        Select Lab <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {results.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                  <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No results found</h3>
                  <p className="text-slate-500">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
