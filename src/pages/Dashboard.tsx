import { FileText, Calendar, MapPin, Download, ChevronRight } from "lucide-react";

// Mock Data
const MOCK_BOOKINGS = [
  {
    id: "BKG-1029",
    testName: "Comprehensive Full Body Checkup",
    labName: "Diagnopein",
    date: "2023-10-25",
    time: "09:00 AM",
    status: "Completed",
    amount: 2499,
    reportAvailable: true
  },
  {
    id: "BKG-1030",
    testName: "Lipid Profile",
    labName: "General Diagnostics",
    date: "2023-11-05",
    time: "08:30 AM",
    status: "Upcoming",
    amount: 599,
    reportAvailable: false
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-slate-600">Manage your bookings and reports</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  JD
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">John Doe</h2>
                  <p className="text-sm text-slate-500">+91 9876543210</p>
                </div>
              </div>
              <nav className="space-y-2">
                <a href="#" className="flex items-center justify-between px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
                  My Bookings
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a href="#" className="flex items-center justify-between px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                  My Reports
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a href="#" className="flex items-center justify-between px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                  Profile Settings
                  <ChevronRight className="h-4 w-4" />
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
            
            {MOCK_BOOKINGS.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-500">{booking.id}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{booking.testName}</h3>
                    <p className="text-sm text-slate-600">{booking.labName}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-lg font-bold text-slate-900">₹{booking.amount}</div>
                    <div className="text-sm text-slate-500">Paid Online</div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      {booking.date} at {booking.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      Home Collection
                    </div>
                  </div>
                  
                  {booking.reportAvailable ? (
                    <button className="flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      <Download className="h-4 w-4" /> Download Report
                    </button>
                  ) : (
                    <button className="flex items-center gap-2 bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                      <FileText className="h-4 w-4" /> Report Pending
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
