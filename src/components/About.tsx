import { Heart, Leaf, Award, Users } from 'lucide-react';

const pillars = [
  { icon: Leaf, title: 'Fresh Ingredients', desc: 'Sourced daily from local markets for maximum freshness and flavour.' },
  { icon: Award, title: 'Premium Quality', desc: 'Every dish is prepared with care following our chef\'s signature recipes.' },
  { icon: Heart, title: 'Made with Love', desc: 'Passion for food drives everything we do at Sizzling Restaurant.' },
  { icon: Users, title: 'Community First', desc: 'Serving students, families, and food lovers around JNTU Hyderabad.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <div className="relative h-[500px] hidden lg:block">
            <div className="absolute top-0 left-0 w-64 h-72 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
              <img
                src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Biryani"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-12 right-0 w-56 h-64 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
              <img
                src="https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Shawarma"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-0 left-20 w-60 h-56 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
              <img
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Burger"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-24 right-4 bg-gradient-to-br from-[#FF6B00] to-[#8B0000] rounded-2xl p-4 shadow-2xl text-center animate-float">
              <div className="text-3xl font-black text-white">5+</div>
              <div className="text-xs text-white/80">Years of</div>
              <div className="text-xs text-white font-semibold">Excellence</div>
            </div>
            {/* Decorative glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-[#FF6B00]/10 blur-2xl" />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#FF6B00] text-sm font-semibold">Our Story</span>
            </div>

            <h2 className="section-title text-white mb-6">
              Born From a{' '}
              <span className="text-gradient">Passion</span>{' '}
              for Great Food
            </h2>

            <p className="text-white/60 text-base leading-relaxed mb-6">
              Sizzling was started with a mission to bring authentic Hyderabad flavors and delicious fast food to students, families, and food lovers around JNTU Hyderabad. We focus on fresh ingredients, quality, affordability, and exceptional taste.
            </p>

            <p className="text-white/60 text-base leading-relaxed mb-10">
              From our signature slow-cooked Dum Biryani to crispy Zinger Burgers and flavorful Shawarmas, every dish is crafted with love. Located just near JNTU, we've become the go-to food destination for over 500 students and families every single day.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="bg-glass rounded-2xl p-4 glow-border group hover:bg-white/5 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 flex items-center justify-center mb-3 group-hover:bg-[#FF6B00]/25 transition-colors duration-200">
                    <p.icon size={18} className="text-[#FF6B00]" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">{p.title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
