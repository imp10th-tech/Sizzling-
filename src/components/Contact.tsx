import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ContactMessageInsert } from '../lib/supabase';

export default function Contact() {
  const [form, setForm] = useState<ContactMessageInsert>({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: form.name.trim(),
        phone: form.phone?.trim() || null,
        email: form.email?.trim() || null,
        message: form.message.trim(),
      });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or call us directly.');
      return;
    }

    setStatus('success');
    setForm({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#FF6B00] text-sm font-semibold">Contact Us</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Find Us <span className="text-gradient">Near JNTU</span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            We'd love to hear from you. Drop us a message or visit us at our location near JNTU, Hyderabad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Info + Map */}
          <div className="space-y-5">
            {[
              {
                icon: MapPin,
                title: 'Our Location',
                lines: ['Near JNTU, Kukatpally,', 'Hyderabad, Telangana – 500085'],
                color: 'text-[#FF6B00]',
                bg: 'bg-[#FF6B00]/10',
              },
              {
                icon: Phone,
                title: 'Phone & WhatsApp',
                lines: ['+91 98765 43210', '+91 91234 56789'],
                color: 'text-green-400',
                bg: 'bg-green-500/10',
              },
              {
                icon: Mail,
                title: 'Email',
                lines: ['contact@sizzlingrestaurant.in', 'orders@sizzlingrestaurant.in'],
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
              },
              {
                icon: Clock,
                title: 'Business Hours',
                lines: ['Monday – Sunday', '11:00 AM – 11:30 PM'],
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
              },
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-4 bg-glass rounded-2xl p-5 glow-border hover:bg-white/5 transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl ${info.bg} flex items-center justify-center flex-shrink-0`}>
                  <info.icon size={18} className={info.color} />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{info.title}</div>
                  {info.lines.map((line, j) => (
                    <div key={j} className="text-white/60 text-sm">{line}</div>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="tel:+919876543210" className="btn-primary text-sm py-2.5 px-5">
                <Phone size={14} /> Call Now
              </a>
              <a
                href="https://wa.me/919876543210?text=Hi%20Sizzling!%20I%20have%20a%20question."
                target="_blank" rel="noopener noreferrer"
                className="whatsapp-btn rounded-full px-5 py-2.5 font-semibold text-sm flex items-center gap-2"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href="https://maps.google.com/?q=JNTU+Hyderabad"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline text-sm py-2.5 px-5"
              >
                <MapPin size={14} /> Get Directions
              </a>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-48 mt-2">
              <iframe
                title="Sizzling Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.14791671042!2d78.36682931083983!3d17.49416890000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91b4c3d7e4e5%3A0x3d0f25b64f4c1d3!2sJNTU%20Hyderabad!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-glass rounded-3xl p-8 glow-border">
            <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Message Sent!</h4>
                <p className="text-white/60 text-sm max-w-xs">
                  Thanks for reaching out! Our team will get back to you within 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-1.5 block">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-medium mb-1.5 block">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/50 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-medium mb-1.5 block">Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you today?"
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
                  className="btn-primary w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
