import { Instagram } from 'lucide-react';

const posts = [
  { img: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 842 },
  { img: 'https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 631 },
  { img: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 517 },
  { img: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 389 },
  { img: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 712 },
  { img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', likes: 956 },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-[#0e0e0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/20 rounded-full px-5 py-2 mb-4 hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-200"
          >
            <Instagram size={16} className="text-pink-400" />
            <span className="text-pink-400 text-sm font-semibold">@SizzlingHyd</span>
          </a>
          <h2 className="section-title text-white mb-3">
            Follow Us on <span className="text-gradient">Instagram</span>
          </h2>
          <p className="text-white/50 text-sm">Daily food drops, behind-the-scenes & customer moments</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {posts.map((post, i) => (
            <a
              key={i}
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden group"
            >
              <img
                src={post.img}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-white text-xs font-semibold">
                  <span>♥</span>
                  <span>{post.likes}</span>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram size={14} className="text-white drop-shadow-lg" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/20"
          >
            <Instagram size={15} />
            Follow @SizzlingHyd
          </a>
        </div>
      </div>
    </section>
  );
}
