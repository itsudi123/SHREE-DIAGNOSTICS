import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Phone, Clock, Shield, CheckCircle2, ArrowRight } from "lucide-react";

// Mock Data
const MOCK_LAB = {
  id: "l1",
  name: "Diagnopein",
  rating: 4.8,
  reviews: 1240,
  address: "123 Health Avenue, Andheri East, Mumbai, Maharashtra 400069",
  phone: "+91 98765 43210",
  timings: "07:00 AM - 08:00 PM (Mon-Sun)",
  features: ["NABL Accredited", "ISO 9001:2015", "Home Collection Available", "E-Reports in 24 Hrs"],
  about: "Diagnopein is a leading diagnostic center offering a wide range of pathology and radiology services with state-of-the-art technology and highly trained professionals.",
  popularTests: [
    { id: "t1", name: "Complete Blood Count (CBC)", price: 399, originalPrice: 500 },
    { id: "t2", name: "Lipid Profile", price: 599, originalPrice: 800 },
    { id: "t3", name: "Thyroid Profile", price: 499, originalPrice: 700 }
  ]
};

export default function LabDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lab = MOCK_LAB; // In real app, fetch based on id

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lab Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{lab.name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                <div className="flex items-center text-amber-500 font-medium bg-amber-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-current mr-1" />
                  {lab.rating} ({lab.reviews} Reviews)
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                  {lab.address}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-slate-400" />
                  {lab.timings}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-slate-400" />
                  {lab.phone}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {lab.features.map(f => (
                  <span key={f} className="flex items-center text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                    <Shield className="h-4 w-4 mr-1.5" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About the Lab</h2>
              <p className="text-slate-600 leading-relaxed">{lab.about}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Available Tests & Packages</h2>
              <div className="space-y-4">
                {lab.popularTests.map(test => (
                  <div key={test.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900">{test.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-slate-900">₹{test.price}</span>
                        <span className="text-sm text-slate-400 line-through">₹{test.originalPrice}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/book/${test.id}`)}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  "100% Accurate Results",
                  "Trained Phlebotomists",
                  "Hygienic Sample Collection",
                  "Fastest Turnaround Time"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-4 text-center">Need help booking?</p>
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" /> Call Support
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
