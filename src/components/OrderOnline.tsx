import { Phone, MessageCircle, Clock, MapPin } from 'lucide-react';

export default function OrderOnline() {
  return (
    <section id="order" className="py-24 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#FF6B00] text-sm font-semibold">Order Online</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Get It <span className="text-gradient">Delivered</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Get your favorite Sizzling dishes delivered to your doorstep in minutes.
          </p>
        </div>

        {/* Delivery platforms */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {/* Swiggy */}
          <a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-glass rounded-3xl p-6 flex flex-col items-center text-center glow-border hover:bg-white/8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#fc8019]/15 flex items-center justify-center mb-4 group-hover:bg-[#fc8019]/25 transition-colors duration-200 text-3xl">
              🛵
            </div>
            <h3 className="text-white font-bold mb-1">Swiggy</h3>
            <p className="text-white/50 text-xs mb-4">Fast delivery to your door</p>
            <span className="swiggy-btn rounded-full px-4 py-1.5 text-sm font-semibold">Order Now</span>
          </a>

          {/* Zomato */}
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-glass rounded-3xl p-6 flex flex-col items-center text-center glow-border hover:bg-white/8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#e23744]/15 flex items-center justify-center mb-4 group-hover:bg-[#e23744]/25 transition-colors duration-200 text-3xl">
              🍴
            </div>
            <h3 className="text-white font-bold mb-1">Zomato</h3>
            <p className="text-white/50 text-xs mb-4">Rated 4.8 ★ on Zomato</p>
            <span className="zomato-btn rounded-full px-4 py-1.5 text-sm font-semibold">Order Now</span>
          </a>

          {/* Direct call */}
          <a
            href="tel:+919876543210"
            className="group bg-glass rounded-3xl p-6 flex flex-col items-center text-center glow-border hover:bg-white/8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF6B00]/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/15 flex items-center justify-center mb-4 group-hover:bg-[#FF6B00]/25 transition-colors duration-200">
              <Phone size={28} className="text-[#FF6B00]" />
            </div>
            <h3 className="text-white font-bold mb-1">Call to Order</h3>
            <p className="text-white/50 text-xs mb-4">+91 98765 43210</p>
            <span className="btn-outline text-sm py-1.5 px-4">Call Now</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20order%20from%20Sizzling%20Restaurant."
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-glass rounded-3xl p-6 flex flex-col items-center text-center glow-border hover:bg-white/8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#25D366]/15 flex items-center justify-center mb-4 group-hover:bg-[#25D366]/25 transition-colors duration-200 text-3xl">
              💬
            </div>
            <h3 className="text-white font-bold mb-1">WhatsApp</h3>
            <p className="text-white/50 text-xs mb-4">Order via chat instantly</p>
            <span className="whatsapp-btn rounded-full px-4 py-1.5 text-sm font-semibold">Chat Now</span>
          </a>
        </div>

        {/* Info strip */}
        <div className="bg-gradient-to-r from-[#8B0000]/30 via-[#FF6B00]/10 to-[#8B0000]/30 rounded-3xl border border-[#FF6B00]/15 p-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock size={24} className="text-[#FF6B00]" />
              <h4 className="text-white font-bold">Business Hours</h4>
              <p className="text-white/60 text-sm">Mon – Sun: 11:00 AM – 11:30 PM</p>
              <span className="text-xs text-green-400 font-semibold">• Open Now</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin size={24} className="text-[#FF6B00]" />
              <h4 className="text-white font-bold">Location</h4>
              <p className="text-white/60 text-sm">Near JNTU, Kukatpally,<br />Hyderabad, Telangana</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MessageCircle size={24} className="text-[#FF6B00]" />
              <h4 className="text-white font-bold">Support</h4>
              <p className="text-white/60 text-sm">Available on WhatsApp<br />and phone 7 days a week</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
