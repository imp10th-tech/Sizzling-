import { ChevronDown, Star, Package, Zap, Award } from 'lucide-react';

const stats = [
  { icon: Star, value: '4.8+', label: 'Customer Rating', color: '#FF6B00' },
  { icon: Package, value: '500+', label: 'Orders Daily', color: '#FF6B00' },
  { icon: Zap, value: 'Fast', label: 'Delivery', color: '#FF6B00' },
  { icon: Award, value: '#1', label: "JNTU Students' Fav", color: '#FF6B00' },
];

export default function Hero() {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Sizzling Chicken Biryani"
          className="w-full h-full object-cover object-center scale-105"
          style={{ animation: 'float 12s ease-in-out infinite' }}
        />
        <div className="absolute inset-0 hero-overlay" />
        {/* Gradient fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#121212] to-transparent" />
      </div>

      {/* Steam particles over image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
          {[1,2,3,4,5].map(i => (
            <div
              key={i}
              className="steam-particle"
              style={{ left: `${(i - 3) * 20}px`, animationDelay: `${(i - 1) * 0.5}s` }}
            />
          ))}
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#FF6B00]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-10 w-48 h-48 rounded-full bg-[#8B0000]/10 blur-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/15 border border-[#FF6B00]/30 rounded-full px-4 py-1.5 mb-6 animate-fadeInUp">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span className="text-[#FF6B00] text-sm font-semibold tracking-wide">Open Now · 11AM – 11:30PM</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fadeInUp"
            style={{ animationDelay: '0.1s' }}
          >
            Hyderabad's{' '}
            <span className="text-gradient">Favorite</span>
            <br />
            Biryani &{' '}
            <span className="text-gradient">Fast Food</span>
            <br />
            <span className="text-white/90 text-3xl sm:text-4xl md:text-5xl">Spot Near JNTU</span>
          </h1>

          <p
            className="text-white/70 text-base sm:text-lg max-w-xl mb-8 leading-relaxed animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
          >
            Serving delicious Chicken Biryani, Shawarmas, Burgers, and Fast Food with quick delivery across JNTU and nearby areas.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-3 mb-12 animate-fadeInUp"
            style={{ animationDelay: '0.3s' }}
          >
            <button
              onClick={scrollToMenu}
              className="btn-primary text-sm sm:text-base"
            >
              🍽️ View Menu
            </button>
            <a
              href="https://www.swiggy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="swiggy-btn rounded-full px-5 py-3 font-semibold text-sm sm:text-base flex items-center gap-2"
            >
              🛵 Order on Swiggy
            </a>
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              className="zomato-btn rounded-full px-5 py-3 font-semibold text-sm sm:text-base flex items-center gap-2"
            >
              🍴 Order on Zomato
            </a>
            <button
              onClick={scrollToContact}
              className="btn-outline text-sm sm:text-base"
            >
              📞 Contact Us
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 animate-fadeInUp"
            style={{ animationDelay: '0.4s' }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-glass rounded-2xl p-4 flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <stat.icon size={20} className="mb-1" style={{ color: stat.color }} />
                <div className="text-xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-200 animate-bounce-subtle"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
