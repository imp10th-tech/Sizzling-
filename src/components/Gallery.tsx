import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Signature Chicken Biryani',
    category: 'Biryani',
  },
  {
    src: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Half Biryani Bowl',
    category: 'Biryani',
  },
  {
    src: 'https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb: 'https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Special Shawarma',
    category: 'Shawarma',
  },
  {
    src: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Zinger Burger',
    category: 'Burgers',
  },
  {
    src: 'https://images.pexels.com/photos/1431315/pexels-photo-1431315.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb: 'https://images.pexels.com/photos/1431315/pexels-photo-1431315.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Double Patty Burger',
    category: 'Burgers',
  },
  {
    src: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Crispy French Fries',
    category: 'Sides',
  },
  {
    src: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Soft Serve Ice Cream',
    category: 'Desserts',
  },
  {
    src: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Cold Beverages',
    category: 'Beverages',
  },
  {
    src: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumb: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Restaurant Ambiance',
    category: 'Interior',
  },
];

const galleryCategories = ['All', 'Biryani', 'Shawarma', 'Burgers', 'Sides', 'Desserts', 'Interior'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'All' ? galleryImages : galleryImages.filter(img => img.category === filter);

  const navigate = (dir: 'prev' | 'next') => {
    if (lightbox === null) return;
    const total = filtered.length;
    setLightbox(dir === 'next' ? (lightbox + 1) % total : (lightbox - 1 + total) % total);
  };

  return (
    <section id="gallery" className="py-24 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#FF6B00] text-sm font-semibold">Gallery</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Food That <span className="text-gradient">Speaks</span> for Itself
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            A visual feast of our most loved dishes, prepared fresh every day.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8 justify-start md:justify-center">
          {galleryCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#8B0000] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setLightbox(i)}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                i === 0 || i === 4 ? 'col-span-2 row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 || i === 4 ? '1/1' : '4/3' }}
            >
              <img
                src={img.thumb}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-semibold">{img.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={e => { e.stopPropagation(); navigate('prev'); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 z-10"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          <div className="relative max-w-4xl w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].caption}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                {filtered[lightbox].caption}
              </span>
            </div>
          </div>

          <button
            onClick={e => { e.stopPropagation(); navigate('next'); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 z-10"
          >
            <ChevronRight size={20} className="text-white" />
          </button>

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      )}
    </section>
  );
}
