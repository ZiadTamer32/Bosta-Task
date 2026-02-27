import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#e30613] to-[#a8040e] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* About Us Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <span className="font-black text-2xl tracking-tight text-white">
                Bosta Store
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Bosta Store is your curated destination for premium products. We
              focus on quality, originality, and providing an exceptional
              shopping experience for our community.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white text-sm">
                <MapPin size={18} className="text-white mt-0.5 shrink-0" />
                <span>123 Commerce Avenue, Digital City, 54321</span>
              </li>
              <li className="flex items-center gap-3 text-white text-sm">
                <Phone size={18} className="text-white shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3 text-white text-sm">
                <Mail size={18} className="text-white shrink-0" />
                <span>support@bostastore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
          <p className="text-white text-xs text-center mx-auto">
            &copy; {currentYear} Bosta Store. All rights reserved. Designed with
            passion for better shopping.
          </p>
        </div>
      </div>
    </footer>
  );
}
