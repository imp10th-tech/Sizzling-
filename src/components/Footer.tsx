import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Order Online', href: '#order' },
  { label: 'Events & Parties', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400', href: '#' },
  { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-400', href: '#' },
  { icon: Youtube, label: 'YouTube', color: 'hover:text-red-400', href: '#' },
  { icon: Twitter, label: 'Twitter', color: 'hover:text-sky-400', href: '#' },
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      {/* Top CTA strip */}
      <div className="bg-gradient-to-r from-[#8B0000] via-[#cc3300] to-[#FF6B00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">Ready to order? 🍛</p>
            <p className="text-white/80 text-sm">Get it delivered in minutes via Swiggy or Zomato.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer"
              className="bg-white text-[#fc8019] font-bold px-5 py-2 rounded-full text-sm hover:bg-white/90 transition-colors duration-200">
              🛵 Swiggy
            </a>
            <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer"
              className="bg-white/20 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-white/30 border border-white/30 transition-colors duration-200">
              🍴 Zomato
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#8B0000] flex items-center justify-center text-xl shadow-lg">
                🔥
              </div>
              <div>
                <div className="font-black text-xl text-white tracking-wide">SIZZLING</div>
                <div className="text-[10px] text-[#FF6B00] tracking-widest -mt-0.5">RESTAURANT</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              "Where Every Bite Sizzles!" — Hyderabad's favorite biryani and fast food restaurant near JNTU.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className={`w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 ${s.color} transition-all duration-200 hover:scale-110`}
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-white/50 hover:text-[#FF6B00] text-sm transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Online */}
          <div>
            <h4 className="text-white font-bold mb-5">Order Online</h4>
            <div className="space-y-3">
              <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-[#fc8019] text-sm transition-colors duration-200">
                🛵 Order on Swiggy
              </a>
              <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-[#e23744] text-sm transition-colors duration-200">
                🍴 Order on Zomato
              </a>
              <a href="tel:+919876543210"
                className="flex items-center gap-2 text-white/50 hover:text-[#FF6B00] text-sm transition-colors duration-200">
                📞 Call to Order
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/50 hover:text-green-400 text-sm transition-colors duration-200">
                💬 WhatsApp Order
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#FF6B00] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/50 text-sm">Near JNTU, Kukatpally,</p>
                  <p className="text-white/50 text-sm">Hyderabad, Telangana – 500085</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-[#FF6B00] flex-shrink-0" />
                <a href="tel:+919876543210" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#FF6B00] flex-shrink-0" />
                <a href="mailto:contact@sizzlingrestaurant.in" className="text-white/50 hover:text-white text-sm transition-colors duration-200 break-all">
                  contact@sizzlingrestaurant.in
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={15} className="text-[#FF6B00] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/50 text-sm">Mon – Sun</p>
                  <p className="text-white/70 text-sm font-semibold">11:00 AM – 11:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-white/30">
            © 2026 Sizzling Restaurant. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 text-white/30">
            <span>Made with</span>
            <span className="text-red-500">♥</span>
            <span>in Hyderabad</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/30 hover:text-white/60 cursor-pointer text-xs transition-colors">Privacy Policy</span>
            <span className="text-white/30 hover:text-white/60 cursor-pointer text-xs transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
