import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Clock, CheckCircle2, Calendar as CalendarIcon } from "lucide-react";

// Mock Data
const MOCK_LABS = [
  {
    id: "l1",
    name: "Diagnopein",
    rating: 4.8,
    reviews: 1240,
    distance: "2.5 km",
    address: "Andheri East, Mumbai",
    price: 399,
    features: ["NABL Accredited", "Home Collection", "E-Reports"]
  },
  {
    id: "l2",
    name: "Krsnaa Diagnostics",
    rating: 4.6,
    reviews: 850,
    distance: "3.1 km",
    address: "Powai, Mumbai",
    price: 450,
    features: ["NABL Accredited", "Home Collection"]
  },
  {
    id: "l3",
    name: "General Diagnostics",
    rating: 4.7,
    reviews: 2100,
    distance: "4.0 km",
    address: "Goregaon, Mumbai",
    price: 420,
    features: ["NABL Accredited", "E-Reports"]
  }
];

export default function Booking() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    address: ""
  });

  const handleLabSelect = (labId: string) => {
    setSelectedLab(labId);
    setStep(2);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePayment = () => {
    // Mock payment success
    alert("Payment Successful! Booking Confirmed.");
    navigate("/dashboard");
  };

  const selectedLabData = MOCK_LABS.find(l => l.id === selectedLab);

  const isSeniorCitizen = parseInt(bookingDetails.age) >= 60;
  const discount = isSeniorCitizen && selectedLabData ? selectedLabData.price * 0.1 : 0;
  const finalPrice = selectedLabData ? selectedLabData.price - discount : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-50 transition-colors ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > num ? <CheckCircle2 className="h-5 w-5" /> : num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-slate-500 px-2">
            <span>Select Lab</span>
            <span>Details & Slot</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Step 1: Select Lab */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Select a Partner Lab</h2>
            {MOCK_LABS.map((lab) => (
              <div key={lab.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-blue-500 transition-colors cursor-pointer" onClick={() => handleLabSelect(lab.id)}>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{lab.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                      <div className="flex items-center text-amber-500 font-medium">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        {lab.rating} ({lab.reviews})
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {lab.distance} &bull; {lab.address}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {lab.features.map(f => (
                        <span key={f} className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                    <div className="text-2xl font-bold text-slate-900 mb-2">₹{lab.price}</div>
                    <button className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-6 py-2 rounded-xl font-medium transition-colors w-full md:w-auto">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Details & Slot */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">Patient Details & Time Slot</h2>
              <button onClick={() => setStep(1)} className="text-sm text-blue-600 font-medium">Change Lab</button>
            </div>

            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={bookingDetails.date}
                    onChange={e => setBookingDetails({...bookingDetails, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Time Slot</label>
                  <select 
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={bookingDetails.time}
                    onChange={e => setBookingDetails({...bookingDetails, time: e.target.value})}
                  >
                    <option value="">Choose a slot</option>
                    <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
                    <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" required placeholder="John Doe"
                      className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={bookingDetails.patientName}
                      onChange={e => setBookingDetails({...bookingDetails, patientName: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                      <input 
                        type="number" required placeholder="30"
                        className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={bookingDetails.age}
                        onChange={e => setBookingDetails({...bookingDetails, age: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                      <select 
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={bookingDetails.gender}
                        onChange={e => setBookingDetails({...bookingDetails, gender: e.target.value})}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" required placeholder="+91 9876543210"
                      className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={bookingDetails.phone}
                      onChange={e => setBookingDetails({...bookingDetails, phone: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Collection Address</label>
                    <textarea 
                      required rows={3} placeholder="Full address for home collection"
                      className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      value={bookingDetails.address}
                      onChange={e => setBookingDetails({...bookingDetails, address: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && selectedLabData && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Order Summary</h2>
            
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <div className="flex justify-between mb-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-semibold text-slate-900">Complete Blood Count (CBC)</h3>
                  <p className="text-sm text-slate-500">by {selectedLabData.name}</p>
                </div>
                <div className="font-semibold text-slate-900">₹{selectedLabData.price}</div>
              </div>
              
              <div className="space-y-2 text-sm text-slate-600 mb-4 pb-4 border-b border-slate-200">
                <div className="flex justify-between">
                  <span>Patient Name</span>
                  <span className="font-medium text-slate-900">{bookingDetails.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time</span>
                  <span className="font-medium text-slate-900">{bookingDetails.date} | {bookingDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Home Collection Fee</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
                {isSeniorCitizen && (
                  <div className="flex justify-between">
                    <span>Senior Citizen Discount (10%)</span>
                    <span className="font-medium text-emerald-600">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-lg font-bold text-slate-900">
                <span>Total Amount Payable</span>
                <span>₹{finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex justify-center items-center gap-2"
            >
              Pay ₹{finalPrice.toFixed(2)} Securely
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              By proceeding, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
