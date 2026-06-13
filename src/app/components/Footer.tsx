import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import logoImage from "figma:asset/c99ae1da33620770f0b3857576d2e7512ef1ce15.png";

export function Footer() {
  return (
    <footer className="bg-[#05070F] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoImage} 
                alt="Chola FC Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <div className="text-lg font-bold text-white">Chola FC</div>
                <div className="text-xs text-[#FFB800]">EXCELLENCE IN SPORTS</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Building champions on and off the field. Join India's premier football club
              dedicated to nurturing young talent through world-class training.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/chola_football_club/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-white/5 hover:bg-[#FF6B35] rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail size={20} className="text-[#FF6B35] mt-0.5 flex-shrink-0" />
                <a href="mailto:cholafootballclub@gmail.com" className="hover:text-[#FF6B35] transition-colors">cholafootballclub@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone size={20} className="text-[#FF6B35] mt-0.5 flex-shrink-0" />
                <a href="tel:+918925518891" className="hover:text-[#FF6B35] transition-colors">+91 89255 18891</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-[#FF6B35] mt-0.5 flex-shrink-0" />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Chola FC. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}