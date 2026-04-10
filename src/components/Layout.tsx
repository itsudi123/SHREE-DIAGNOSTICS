import { Outlet, Link, useNavigate } from "react-router-dom";
import { Activity, User, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  // Mock auth state
  const isAuthenticated = true;
  const isAdmin = true;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">Shree Diagnostics</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/search" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Find Tests</Link>
              <Link to="/search?type=packages" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Health Packages</Link>
              <Link to="/search?type=labs" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Partner Labs</Link>
              
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md">
                        Admin
                      </Link>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors">
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/search" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Find Tests</Link>
              <Link to="/search?type=packages" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Health Packages</Link>
              <Link to="/search?type=labs" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Partner Labs</Link>
              
              <div className="pt-4 pb-2 border-t border-slate-200">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Dashboard</Link>
                    {isAdmin && (
                      <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50">Admin Panel</Link>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50">Login / Sign Up</Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-6 w-6 text-blue-500" />
                <span className="text-xl font-bold text-white">Shree Diagnostics</span>
              </div>
              <p className="text-sm text-slate-400">
                Your trusted partner for accurate and timely diagnostic services. Aggregating the best labs for your health.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm hover:text-white transition-colors">Blood Tests</Link></li>
                <li><Link to="#" className="text-sm hover:text-white transition-colors">MRI & CT Scans</Link></li>
                <li><Link to="#" className="text-sm hover:text-white transition-colors">Health Packages</Link></li>
                <li><Link to="#" className="text-sm hover:text-white transition-colors">Home Collection</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="#" className="text-sm hover:text-white transition-colors">Partner Labs</Link></li>
                <li><Link to="#" className="text-sm hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="text-sm hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="text-sm hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-center">
            &copy; {new Date().getFullYear()} Shree Diagnostics. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
