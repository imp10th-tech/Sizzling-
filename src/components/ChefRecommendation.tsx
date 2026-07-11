import { Award, ChevronRight } from 'lucide-react';

const chefPicks = [
  {
    rank: '01',
    name: 'Signature Chicken Biryani',
    tagline: 'The Crown Jewel of Hyderabad',
    description: 'Slow-cooked over 3 hours with aged basmati, whole spices, and our chef\'s secret dum marinade. The dish that started it all.',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=700',
    price: '₹180',
    badge: 'Chef\'s #1 Pick',
  },
  {
    rank: '02',
    name: 'Special Shawarma',
    tagline: 'Middle Eastern Magic, Hyderabad Style',
    description: 'Marinated for 12 hours, grilled on a vertical rotisserie, wrapped with hand-made garlic sauce. Every bite is an explosion of flavour.',
    image: 'https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=700',
    price: '₹120',
    badge: 'Must Try',
  },
  {
    rank: '03',
    name: 'Crispy Chicken Burger',
    tagline: 'The Crunch You\'ll Crave',
    description: 'Double-dipped in seasoned batter, fried to golden perfection. Stacked with fresh coleslaw and our signature zinger sauce.',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=700',
    price: '₹130',
    badge: 'Fan Favorite',
  },
];

export default function ChefRecommendation() {
  return (
    <section className="py-24 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-4">
            <Award size={14} className="text-[#FF6B00]" />
            <span className="text-[#FF6B00] text-sm font-semibold">Chef's Recommendations</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Chef's <span className="text-gradient">Top Picks</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Our head chef personally recommends these signature dishes — the best of Sizzling, curated with passion.
          </p>
        </div>

        {/* Picks */}
        <div className="space-y-8">
          {chefPicks.map((pick, i) => (
            <div
              key={i}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 rounded-3xl overflow-hidden glow-border group card-hover`}
            >
              {/* Image */}
              <div className="lg:w-1/2 h-64 lg:h-80 relative overflow-hidden">
                <img
                  src={pick.image}
                  alt={pick.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/40 to-transparent" />
                {/* Steam */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  {[1,2,3].map(j => (
                    <div key={j} className="steam-particle" style={{ left: `${(j-2)*15}px`, animationDelay: `${(j-1)*0.6}s` }} />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 bg-glass p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl font-black text-gradient opacity-30">{pick.rank}</span>
                  <span className="offer-badge">{pick.badge}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-1">{pick.name}</h3>
                <p className="text-[#FF6B00] text-sm font-semibold italic mb-4">{pick.tagline}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{pick.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-white">{pick.price}</span>
                  <button
                    onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary text-sm flex items-center gap-2"
                  >
                    Order Now <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
