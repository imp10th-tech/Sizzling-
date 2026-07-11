import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, PenLine, CheckCircle, Loader2, AlertCircle, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { DbReview } from '../lib/supabase';
import { reviews as staticReviews } from '../data/menuData';

function StarRating({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          onClick={() => interactive && onRate?.(i)}
          onMouseEnter={() => interactive && setHovered(i)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            size={interactive ? 22 : 14}
            className={i <= (interactive ? hovered || rating : rating) ? 'star-filled fill-current' : 'star-empty'}
          />
        </button>
      ))}
    </div>
  );
}

function dbToReview(r: DbReview) {
  return {
    id: r.id,
    name: r.name,
    role: r.role ?? '',
    rating: r.rating,
    comment: r.comment,
    avatar: r.avatar ?? r.name.slice(0, 2).toUpperCase(),
    date: new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
}

type DisplayReview = ReturnType<typeof dbToReview>;

interface ReviewForm {
  name: string;
  role: string;
  rating: number;
  comment: string;
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [reviews, setReviews] = useState<DisplayReview[]>(staticReviews.map(r => ({ ...r, date: r.date })));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ReviewForm>({ name: '', role: '', rating: 0, comment: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false })
          .abortSignal(controller.signal);

        if (!error && data && data.length > 0) {
          setReviews(data.map(dbToReview));
        }
      } catch {
        // silently keep static reviews already displayed
      }
    }
    fetchReviews();
    return () => controller.abort();
  }, []);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
    }, 4500);
  };

  useEffect(() => {
    if (reviews.length === 0) return;
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [reviews.length]);

  const navigate = (dir: 'prev' | 'next') => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrent(prev => dir === 'next' ? (prev + 1) % reviews.length : (prev - 1 + reviews.length) % reviews.length);
    startInterval();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) {
      setErrorMsg('Please select a star rating.');
      return;
    }
    setSubmitStatus('loading');
    setErrorMsg('');

    const avatar = form.name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const { error } = await supabase.from('reviews').insert({
      name: form.name.trim(),
      role: form.role.trim() || null,
      rating: form.rating,
      comment: form.comment.trim(),
      avatar,
    });

    if (error) {
      setSubmitStatus('error');
      setErrorMsg('Could not submit your review. Please try again.');
      return;
    }

    setSubmitStatus('success');
    setForm({ name: '', role: '', rating: 0, comment: '' });
    setTimeout(() => {
      setSubmitStatus('idle');
      setShowForm(false);
    }, 3500);
  };

  return (
    <section className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#FF6B00] text-sm font-semibold">Customer Reviews</span>
          </div>
          <h2 className="section-title text-white mb-4">
            What Our <span className="text-gradient">Customers</span> Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="star-filled fill-current" />)}
            </div>
            <span className="text-white font-bold text-lg">4.8</span>
            <span className="text-white/50 text-sm">from 500+ reviews</span>
          </div>
        </div>

        {/* Carousel */}
        {reviews.length > 0 && (
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {reviews.map(review => (
                  <div key={review.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-glass rounded-3xl p-8 glow-border text-center relative">
                      <Quote size={32} className="text-[#FF6B00]/30 mx-auto mb-4" />
                      <p className="text-white/80 text-base leading-relaxed mb-6 italic">
                        "{review.comment}"
                      </p>
                      <StarRating rating={review.rating} />
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#8B0000] flex items-center justify-center text-white text-sm font-bold">
                          {review.avatar}
                        </div>
                        <div className="text-left">
                          <div className="text-white font-semibold text-sm">{review.name}</div>
                          <div className="text-white/40 text-xs">{review.role}{review.role && ' · '}{review.date}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('prev')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF6B00]/30 flex items-center justify-center transition-colors duration-200 hidden sm:flex"
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={() => navigate('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF6B00]/30 flex items-center justify-center transition-colors duration-200 hidden sm:flex"
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        )}

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-6 h-2 bg-[#FF6B00]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Desktop mini-grid */}
        <div className="hidden lg:grid grid-cols-3 gap-5 mt-12">
          {reviews.slice(0, 3).map(review => (
            <div key={review.id} className="bg-glass rounded-2xl p-5 glow-border hover:bg-white/5 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={review.rating} />
                <span className="text-white/30 text-xs">{review.date}</span>
              </div>
              <p className="text-white/70 text-xs leading-relaxed mb-4 line-clamp-3">"{review.comment}"</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#8B0000] flex items-center justify-center text-white text-[10px] font-bold">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">{review.name}</div>
                  <div className="text-white/40 text-[10px]">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a review CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 btn-outline text-sm"
          >
            <PenLine size={15} />
            Leave a Review
          </button>
        </div>

        {/* Review submission modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setShowForm(false)}>
            <div
              className="bg-[#1a1a1a] rounded-3xl p-8 w-full max-w-md border border-white/10 shadow-2xl animate-scale-in"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Share Your Experience</h3>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="flex flex-col items-center py-8 text-center animate-scale-in">
                  <CheckCircle size={44} className="text-green-400 mb-3" />
                  <h4 className="text-white font-bold mb-2">Thank You!</h4>
                  <p className="text-white/60 text-sm">Your review has been submitted and will appear after approval.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs font-medium mb-1.5 block">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Arjun Reddy"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs font-medium mb-1.5 block">Your Role</label>
                      <input
                        type="text"
                        placeholder="JNTU Student"
                        value={form.role}
                        onChange={e => setForm({ ...form, role: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/60 text-xs font-medium mb-2 block">Rating *</label>
                    <StarRating rating={form.rating} interactive onRate={r => setForm({ ...form, rating: r })} />
                  </div>

                  <div>
                    <label className="text-white/60 text-xs font-medium mb-1.5 block">Your Review *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your experience at Sizzling..."
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-all resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
                      <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-xs">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="btn-primary w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'loading' ? (
                      <><Loader2 size={15} className="animate-spin" /> Submitting...</>
                    ) : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
