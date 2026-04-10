import { useState } from "react";
import { Users, Activity, Calendar, FileText, Settings, Plus, Edit2, Trash2, Search, Upload } from "lucide-react";

// Mock Data
const MOCK_STATS = [
  { label: "Total Bookings", value: "1,248", trend: "+12%" },
  { label: "Active Labs", value: "45", trend: "+3" },
  { label: "Total Tests", value: "320", trend: "0" },
  { label: "Revenue", value: "₹4.2L", trend: "+18%" }
];

const MOCK_RECENT_BOOKINGS = [
  { id: "BKG-1029", patient: "John Doe", test: "CBC", lab: "Diagnopein", status: "Completed", date: "2023-10-25" },
  { id: "BKG-1030", patient: "Jane Smith", test: "Lipid Profile", lab: "Krsnaa Diagnostics", status: "Pending", date: "2023-10-26" },
  { id: "BKG-1031", patient: "Rahul K", test: "Full Body Checkup", lab: "General Diagnostics", status: "Upcoming", date: "2023-10-27" }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleFileUpload = (bookingId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server here
      alert(`Uploading report "${file.name}" for booking ${bookingId}`);
      // Reset the input so the same file can be selected again if needed
      event.target.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Admin Portal</h2>
        </div>
        <nav className="mt-6">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "bookings", label: "Bookings", icon: Calendar },
            { id: "labs", label: "Partner Labs", icon: Users },
            { id: "tests", label: "Tests & Packages", icon: FileText },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? "bg-blue-600 text-white" 
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add New
            </button>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_STATS.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="text-sm font-medium text-slate-500 mb-2">{stat.label}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      {stat.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-6 py-3 font-medium">ID</th>
                      <th className="px-6 py-3 font-medium">Patient</th>
                      <th className="px-6 py-3 font-medium">Test/Package</th>
                      <th className="px-6 py-3 font-medium">Lab</th>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {MOCK_RECENT_BOOKINGS.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{booking.id}</td>
                        <td className="px-6 py-4 text-slate-600">{booking.patient}</td>
                        <td className="px-6 py-4 text-slate-600">{booking.test}</td>
                        <td className="px-6 py-4 text-slate-600">{booking.lab}</td>
                        <td className="px-6 py-4 text-slate-600">{booking.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                            booking.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                            'bg-blue-50 text-blue-700'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 text-slate-400">
                            <label className="cursor-pointer hover:text-emerald-600 transition-colors" title="Upload Report">
                              <Upload className="h-4 w-4" />
                              <input 
                                type="file" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(booking.id, e)}
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                            </label>
                            <button className="hover:text-blue-600 transition-colors" title="Edit Booking"><Edit2 className="h-4 w-4" /></button>
                            <button className="hover:text-red-600 transition-colors" title="Delete Booking"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
            <h2 className="text-lg font-medium text-slate-900 mb-2">{activeTab} Management</h2>
            <p className="text-slate-500">This section is under development.</p>
          </div>
        )}
      </main>
    </div>
  );
}
