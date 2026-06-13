import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImage from "figma:asset/c99ae1da33620770f0b3857576d2e7512ef1ce15.png";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E27]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="Chola FC Logo" 
              className="w-14 h-14 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-white tracking-tight">Chola FC</div>
              <div className="text-xs text-[#FFB800] tracking-wider">EXCELLENCE IN SPORTS</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 transition-colors ${
                  isActive(link.path)
                    ? "text-[#FF6B35]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FFB800]" />
                )}
              </Link>
            ))}
            <Link
              to="/join"
              className="px-6 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12172E] border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 transition-colors ${
                  isActive(link.path)
                    ? "text-[#FF6B35]"
                    : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/join"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-lg text-center"
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}