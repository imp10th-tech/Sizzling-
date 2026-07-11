import { useState, useEffect } from 'react';
import { ShoppingCart, Flame } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { DbMenuItem } from '../lib/supabase';
import { menuItems as staticMenuItems, menuCategories } from '../data/menuData';

const spiceColors: Record<string, string> = {
  mild: 'text-green-400',
  medium: 'text-yellow-400',
  hot: 'text-orange-500',
  'extra-hot': 'text-red-500',
};

const spiceLabels: Record<string, string> = {
  mild: 'Mild',
  medium: 'Medium',
  hot: 'Hot',
  'extra-hot': 'Extra Hot',
};

function dbItemToDisplay(item: DbMenuItem) {
  return {
    id: item.id,
    name: item.name,
    description: item.description ?? '',
    price: item.price,
    originalPrice: item.original_price ?? undefined,
    image: item.image_url ?? '',
    category: item.category,
    isVeg: item.is_veg,
    isSignature: item.is_signature,
    isBestseller: item.is_bestseller,
    spiceLevel: item.spice_level ?? undefined,
    tags: item.tags ?? undefined,
  };
}

type DisplayItem = ReturnType<typeof dbItemToDisplay>;

export default function Menu({ onAddToCart }: { onAddToCart: () => void }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedIds, setAddedIds] = useState<Set<string | number>>(new Set());
  const [items, setItems] = useState<DisplayItem[]>(staticMenuItems.map((m, i) => ({ ...m, id: i })) as unknown as DisplayItem[]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMenu() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_available', true)
          .order('display_order', { ascending: true })
          .abortSignal(controller.signal);

        if (!error && data && data.length > 0) {
          setItems(data.map(dbItemToDisplay));
        }
      } catch {
        // silently fall back to static data already displayed
      }
    }
    fetchMenu();
    return () => controller.abort();
  }, []);

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  const handleAdd = (id: string | number) => {
    setAddedIds(prev => new Set(prev).add(id));
    onAddToCart();
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#FF6B00] text-sm font-semibold">Our Menu</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Taste the <span className="text-gradient">Sizzle</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            From aromatic biryanis to crispy burgers — every dish is a masterpiece crafted with love and fresh ingredients.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-10 justify-start md:justify-center">
          {menuCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#8B0000] text-white shadow-lg shadow-[#FF6B00]/20'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <>
            {filtered.map(item => (
              <div
                key={String(item.id)}
                className="bg-glass rounded-3xl overflow-hidden glow-border card-hover group relative flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {item.isBestseller && <span className="offer-badge">Best Seller</span>}
                    {item.isSignature && !item.isBestseller && <span className="offer-badge">Signature</span>}
                  </div>

                  {/* Veg indicator */}
                  <div className="absolute top-3 right-3 bg-black/60 rounded-lg px-2 py-1 flex items-center gap-1">
                    <span className={item.isVeg ? 'veg-dot' : 'nonveg-dot'} />
                    <span className="text-white text-[10px] font-medium">
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-lg">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-white/50 text-sm line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-bold text-sm leading-tight">{item.name}</h3>
                    {item.spiceLevel && (
                      <div className={`flex items-center gap-0.5 flex-shrink-0 ${spiceColors[item.spiceLevel]}`}>
                        <Flame size={12} />
                        <span className="text-[10px] font-semibold">{spiceLabels[item.spiceLevel]}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-white/50 text-xs leading-relaxed mb-3 flex-1 line-clamp-3">{item.description}</p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => handleAdd(item.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      addedIds.has(item.id)
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-[#FF6B00]/15 text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white border border-[#FF6B00]/20 hover:border-[#FF6B00]'
                    }`}
                  >
                    {addedIds.has(item.id) ? <>✓ Added!</> : <><ShoppingCart size={14} />Add to Cart</>}
                  </button>
                </div>
              </div>
            ))}
          </>
        </div>

        {/* Order via apps */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm mb-4">View our full menu and place orders on</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer"
              className="swiggy-btn rounded-full px-6 py-2.5 font-semibold text-sm flex items-center gap-2">
              🛵 Swiggy
            </a>
            <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer"
              className="zomato-btn rounded-full px-6 py-2.5 font-semibold text-sm flex items-center gap-2">
              🍴 Zomato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
