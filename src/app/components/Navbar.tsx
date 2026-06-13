import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logoImage from "figma:asset/c99ae1da33620770f0b3857576d2e7512ef1ce15.png";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll-reveal state for mobile ham button
  const [hamVisible, setHamVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY < 60) {
            // Near top — always show
            setHamVisible(true);
          } else if (currentY < lastScrollY.current - 8) {
            // Scrolling up — reveal
            setHamVisible(true);
          } else if (currentY > lastScrollY.current + 8) {
            // Scrolling down — hide
            setHamVisible(false);
            setMobileMenuOpen(false);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── Desktop navbar ── always fixed, full-width */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[#0A0E27]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="Chola FC Logo"
                className="w-14 h-14 object-contain"
              />
              <div>
                <div className="text-xl font-bold text-white tracking-tight">Chola FC</div>
                <div className="text-[#FFB800] text-xs tracking-wider">EXCELLENCE IN SPORTS</div>
              </div>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-2 transition-colors ${
                    isActive(link.path) ? "text-[#FF6B35]" : "text-gray-300 hover:text-white"
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
                className="px-6 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-[#12172E] font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile: floating hamburger button (scroll-reveal) ── */}
      <div
        className={`md:hidden fixed top-4 left-4 z-50 transition-all duration-300 ${
          hamVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="w-11 h-11 flex items-center justify-center bg-[#0A0E27]/90 backdrop-blur-md border border-white/10 rounded-xl text-white shadow-lg shadow-black/30 hover:bg-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile: slide-down drawer ── */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-[#0A0E27]/98 backdrop-blur-md pt-20 pb-6 px-6 space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 text-base border-b border-white/5 transition-colors ${
                isActive(link.path) ? "text-[#FF6B35]" : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/join"
            onClick={() => setMobileMenuOpen(false)}
            className="block mt-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-[#12172E] font-semibold rounded-xl text-center"
          >
            Join Now
          </Link>
        </div>
      </div>
    </>
  );
}