import Link from 'next/link';
import {  Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
             <Link href="/" className="flex items-center  shrink-0">
            <img
              src="/Images/logo.webp"
              alt="PaperBoat Web PDF"
              className="h-8 sm:h-10 md:h-12"
            />
            <span className="ml-2 sm:ml-3 font-bold text-lg sm:text-xl md:text-2xl tracking-wide">
              PAPER<span className="text-[#FACC15]">BOAT</span>
            </span>
          </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-4">
              Your ultimate destination for previous year competitive exam papers. Navigate your way to success with our comprehensive, state-wise question banks.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <Link href={"https://t.me/thepaperboat"} target='_blank' className="ml-4 flex items-center bg-[#FACC15] hover:bg-[#EAB308] text-[#1E3A8A] px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
              <Send size={18} className="mr-2" />
              Join us
            </Link>
            
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/paper" className="text-sm hover:text-blue-400 transition-colors">All Papers</Link>
              </li>
              <li>
                <Link href="/agencies" className="text-sm hover:text-blue-400 transition-colors">Exam Agencies</Link>
              </li>
              <li>
                <Link href="/states" className="text-sm hover:text-blue-400 transition-colors">State-wise Exams</Link>
              </li>
              <li>
                <Link href="/years" className="text-sm hover:text-blue-400 transition-colors">Browse by Year</Link>
              </li>
            </ul>
          </div>

          {/* Support / Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-blue-400 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-blue-400 transition-colors">Study Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-blue-400 transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <span>123 Education Hub, Knowledge Park,<br />New Delhi, 110001</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-blue-500 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-blue-500 flex-shrink-0" />
                <a href="mailto:support@paperboat.com" className="hover:text-blue-400 transition-colors">
                  support@paperboat.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} PaperBoat. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            {/* <Link href="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</Link> */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;