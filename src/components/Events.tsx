import { useState } from 'react';
import { PartyPopper, Building2, Users, Utensils, Phone, MessageCircle, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const eventTypes = [
  { icon: PartyPopper, title: 'Birthday Parties', desc: 'Make birthdays special with our exclusive party packages and custom cake additions.' },
  { icon: Building2, title: 'Corporate Events', desc: 'Professional catering for office parties, meetings, and corporate get-togethers.' },
  { icon: Users, title: 'College Events', desc: 'Bulk food orders for fests, cultural nights, and college gatherings at JNTU.' },
  { icon: Utensils, title: 'Family Gatherings', desc: 'Celebrate festivals and family reunions with our generous family meal packages.' },
];

const packages = [
  {
    name: 'Mini Pack',
    people: '10–20 people',
    price: '₹1,800',
    items: ['Biryani (5 portions)', 'Shawarma (10 pcs)', 'Fries × 3', 'Soft Drinks × 10'],
    highlight: false,
  },
  {
    name: 'Party Pack',
    people: '20–50 people',
    price: '₹3,999',
    items: ['Biryani (15 portions)', 'Shawarma (30 pcs)', 'Burgers × 20', 'Fries × 10', 'Beverages × 30'],
    highlight: true,
  },
  {
    name: 'Mega Pack',
    people: '50–100 people',
    price: '₹7,999',
    items: ['Biryani (40 portions)', 'Shawarma (80 pcs)', 'Burgers × 50', 'Nuggets × 60', 'Fries × 20', 'Ice Creams × 50', 'Beverages × 100'],
    highlight: false,
  },
];

interface InquiryForm {
  name: string;
  phone: string;
  date: string;
  event: string;
  guests: string;
  message: string;
}

export default function Events() {
  const [form, setForm] = useState<InquiryForm>({ name: '', phone: '', date: '', event: '', guests: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('event_inquiries')
      .insert({
        name: form.name.trim(),
        phone: form.phone.trim(),
        event_date: form.date || null,
        event_type: form.event || null,
        guests: form.guests ? parseInt(form.guests, 10) : null,
        message: form.message.trim() || null,
      });

    if (error) {
      setStatus('error');
      setErrorMsg('Could not submit inquiry. Please call us directly at +91 98765 43210.');
      return;
    }

    setStatus('success');
    setForm({ name: '', phone: '', date: '', event: '', guests: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="events" className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#FF6B00] text-sm font-semibold">🎉 Party & Events</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Celebrate With <span className="text-gradient">Sizzling</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Special discounts on bulk and event orders. Let us handle the food so you can enjoy the moment!
          </p>
        </div>

        {/* Event types */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {eventTypes.map((e, i) => (
            <div key={i} className="bg-glass rounded-3xl p-6 glow-border card-hover text-center group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B00]/20 to-[#8B0000]/20 flex items-center justify-center mx-auto mb-4 group-hover:from-[#FF6B00]/30 group-hover:to-[#8B0000]/30 transition-all duration-200">
                <e.icon size={24} className="text-[#FF6B00]" />
              </div>
              <h3 className="text-white font-bold mb-2">{e.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>

        {/* Catering packages */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-10">Catering Packages</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-3xl p-7 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                  pkg.highlight
                    ? 'bg-gradient-to-br from-[#8B0000]/60 to-[#FF6B00]/20 border border-[#FF6B00]/40 shadow-2xl shadow-[#FF6B00]/10'
                    : 'bg-glass glow-border'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute top-4 right-4 offer-badge">Most Popular</div>
                )}
                <div>
                  <h4 className="text-2xl font-black text-white mb-1">{pkg.name}</h4>
                  <p className="text-[#FF6B00] text-sm font-semibold mb-4">{pkg.people}</p>
                  <div className="text-4xl font-black text-white mb-6">{pkg.price}</div>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {pkg.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle size={14} className="text-[#FF6B00] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20the%20catering%20package%20for%20my%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    pkg.highlight
                      ? 'bg-[#FF6B00] text-white hover:bg-[#cc5500]'
                      : 'bg-[#FF6B00]/15 text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white border border-[#FF6B00]/20'
                  }`}
                >
                  Book Now <ChevronRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry form + contact */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-glass rounded-3xl p-8 glow-border">
            <h3 className="text-xl font-bold text-white mb-6">Event Inquiry Form</h3>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                <CheckCircle size={48} className="text-green-400 mb-4" />
                <h4 className="text-white font-bold text-lg mb-2">Inquiry Submitted!</h4>
                <p className="text-white/60 text-sm">Our team will contact you within 30 minutes to discuss your event.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-1.5 block">Your Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Rahul Sharma"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-1.5 block">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-1.5 block">Event Date *</label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50 transition-all duration-200 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-1.5 block">Number of Guests *</label>
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="e.g. 50"
                      value={form.guests}
                      onChange={e => setForm({ ...form, guests: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-medium mb-1.5 block">Event Type</label>
                  <select
                    value={form.event}
                    onChange={e => setForm({ ...form, event: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50 transition-all duration-200"
                  >
                    <option value="" className="bg-[#121212]">Select event type</option>
                    <option value="birthday" className="bg-[#121212]">Birthday Party</option>
                    <option value="college" className="bg-[#121212]">College Event</option>
                    <option value="corporate" className="bg-[#121212]">Corporate Event</option>
                    <option value="family" className="bg-[#121212]">Family Gathering</option>
                    <option value="bulk" className="bg-[#121212]">Bulk Food Order</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-medium mb-1.5 block">Message / Special Requests</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your event..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-all duration-200 resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                  ) : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>

          {/* Contact options */}
          <div className="flex flex-col gap-5">
            <div className="bg-glass rounded-3xl p-6 glow-border">
              <h3 className="text-white font-bold mb-4">Get in Touch Directly</h3>
              <div className="space-y-3">
                <a href="tel:+919876543210" className="flex items-center gap-4 p-4 rounded-2xl bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 transition-colors duration-200 group">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 flex items-center justify-center group-hover:bg-[#FF6B00]/30 transition-colors">
                    <Phone size={18} className="text-[#FF6B00]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">Call Us</div>
                    <div className="text-white/50 text-xs">+91 98765 43210</div>
                  </div>
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hi!%20I%27d%20like%20to%20enquire%20about%20a%20party%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                    <MessageCircle size={18} className="text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">WhatsApp</div>
                    <div className="text-white/50 text-xs">Chat for instant quotes</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#8B0000]/40 to-[#FF6B00]/10 rounded-3xl p-6 border border-[#FF6B00]/20">
              <div className="text-4xl mb-3">🎉</div>
              <h4 className="text-white font-bold text-lg mb-2">Special Event Discounts</h4>
              <ul className="space-y-2">
                {['Up to 20% off on orders above ₹5,000', 'Free delivery for bulk orders', 'Complimentary desserts for birthday events', 'Dedicated event coordinator assigned'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle size={14} className="text-[#FF6B00] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
