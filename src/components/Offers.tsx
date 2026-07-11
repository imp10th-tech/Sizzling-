import { dailyOffers, studentCombos } from '../data/menuData';
import { Tag, ArrowRight } from 'lucide-react';

export default function Offers() {
  return (
    <>
      {/* Daily Offers */}
      <section className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-4">
              <Tag size={14} className="text-[#FF6B00]" />
              <span className="text-[#FF6B00] text-sm font-semibold">Daily Offers</span>
            </div>
            <h2 className="section-title text-white mb-4">
              Today's <span className="text-gradient">Hot Deals</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {dailyOffers.map(offer => (
              <div
                key={offer.id}
                className={`relative rounded-3xl p-7 bg-gradient-to-br ${offer.color} overflow-hidden group card-hover`}
              >
                {/* Decorative circle */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 group-hover:bg-white/8 transition-colors duration-300" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-black/10" />

                <div className="relative z-10">
                  <div className="text-4xl mb-4">{offer.icon}</div>
                  <h3 className="text-white font-black text-lg mb-2">{offer.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{offer.description}</p>
                  <button className="mt-5 flex items-center gap-1 text-white/80 hover:text-white text-sm font-semibold transition-colors duration-200">
                    Claim Offer <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Combos */}
      <section className="py-20 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#FF6B00] text-sm font-semibold">🎓 Student Specials</span>
            </div>
            <h2 className="section-title text-white mb-4">
              Student <span className="text-gradient">Combos</span>
            </h2>
            <p className="text-white/50 max-w-md mx-auto">
              Big flavors, small prices. Designed especially for the JNTU community.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {studentCombos.map(combo => (
              <div
                key={combo.id}
                className="bg-glass rounded-3xl overflow-hidden glow-border card-hover group"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="offer-badge">{combo.badge}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-bold mb-2">{combo.name}</h3>
                  <ul className="space-y-1 mb-4">
                    {combo.items.map((item, i) => (
                      <li key={i} className="text-white/60 text-xs flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#FF6B00]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-white">₹{combo.price}</span>
                      <span className="text-white/40 text-sm line-through ml-2">₹{combo.originalPrice}</span>
                    </div>
                    <button
                      onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn-primary text-xs py-2 px-4"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
