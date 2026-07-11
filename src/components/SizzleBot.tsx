import { useState, useRef, useEffect } from 'react';
import { X, Send, ChevronDown, RotateCcw } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const quickReplies = [
  "What's your best dish?",
  "Meal under ₹300?",
  "Party order help",
  "Delivery timing?",
  "Are you open now?",
  "Spicy shawarma?",
];

function getBotResponse(input: string): string {
  const q = input.toLowerCase().trim();

  if (/^(hi|hello|hey|namaste|helo|hii)/i.test(q)) {
    return "Hey there! 👋 Welcome to Sizzling Restaurant! I'm SizzleBot 🍗 — your personal food assistant. I can help you with our menu, combos, party orders, delivery info and more. What can I get sizzling for you today? 🔥";
  }

  if (/best.*(dish|food|item|sell)|what.*special|top.*dish|recommend/i.test(q)) {
    return "🏆 Our best-selling dish is the **Signature Chicken Biryani** (₹180)! Slow-cooked for 3 hours with Hyderabadi dum spices — it's the reason people keep coming back.\n\nAlso trending:\n• Special Shawarma – ₹120 🌯\n• Zinger Burger – ₹130 🍔\n\nWant to order one? Visit Swiggy or Zomato! 🛵";
  }

  if (/biryani/i.test(q)) {
    return "🍛 Our Biryani is the star of Sizzling!\n\n• **Signature Chicken Biryani** – ₹180 (Full)\n• **Half Chicken Biryani** – ₹120\n\nSlow-cooked with aged basmati rice, whole spices & our secret dum marinade. Medium spice level. Served with raita & salan.\n\nWant to try it? 😋 Order via Swiggy or Zomato!";
  }

  if (/shawarma/i.test(q)) {
    return "🌯 Our Special Shawarma (₹120) is a crowd favorite!\n\nGrilled on a vertical rotisserie, marinated for 12 hours, wrapped with fresh veggies and our house garlic sauce.\n\n🌶️ Spice Level: Hot — yes, it's spicier than our regular items! If you prefer mild, just let us know when ordering.\n\nAlso try our **Kubus** (₹90) — a milder Arabic flatbread wrap!";
  }

  if (/spicy.*shawarma|shawarma.*spicy/i.test(q)) {
    return "🌶️🔥 Yes! Our Special Shawarma is rated **HOT** on our spice scale!\n\nIt has a bold garlic-chili marinade. If you want it extra spicy, ask for extra hot sauce on the side.\n\nPrefer milder? Try our **Kubus** (₹90) — same great chicken, milder flavor profile! 😊";
  }

  if (/burger/i.test(q)) {
    return "🍔 Burger lovers, listen up!\n\n• **Zinger Burger** – ₹130 (Crispy, hot & juicy — our #1 burger!)\n• **Double Patty Burger** – ₹170 (Two patties, double cheese, BBQ sauce)\n\nBoth come with lettuce, tomato, and our signature sauce in a toasted sesame bun. 🤤";
  }

  if (/fries|nugget|side/i.test(q)) {
    return "🍟 Our side dishes:\n\n• **Crispy French Fries** – ₹70 (Veg) 🥔\n• **Chicken Nuggets (6 pcs)** – ₹110\n\nFries are seasoned with our special spice blend. Nuggets are golden & crispy — perfect for sharing! Great with garlic mayo dip.";
  }

  if (/ice.?cream|dessert|sweet/i.test(q)) {
    return "🍦 For dessert, we have our **Soft Serve Ice Cream** (₹60)!\n\nCreamy vanilla soft-serve available in cone or cup. Choose from chocolate, strawberry, or mixed topping.\n\nThe perfect cool finish after your spicy biryani! 😄";
  }

  if (/drink|beverage|coke|pepsi|juice|lassi/i.test(q)) {
    return "🥤 We serve a variety of cold beverages (₹40 each):\n\n• Coca-Cola / Pepsi / Sprite\n• Mango Juice\n• Fresh Lime Soda\n• Lassi (sweet/salted)\n\nPerfect pair for any meal! 🍹";
  }

  if (/under.*₹?300|budget|cheap|affordable|₹?300/i.test(q)) {
    return "💰 Great budget meals under ₹300:\n\n1. **Biryani Blast Combo** – ₹210\n   (Biryani + Coke + Raita)\n\n2. **Burger Meal Deal** – ₹220\n   (Burger + Fries + Pepsi)\n\n3. **Shawarma Fiesta** – ₹180\n   (Shawarma + Fries + Garlic Sauce)\n\n4. Half Biryani + Coke – ₹160\n\nAll are hearty, filling meals that won't break the bank! 😊";
  }

  if (/combo|meal deal|student/i.test(q)) {
    return "🎓 Our Student Combos — big meals, small prices!\n\n• **Biryani Blast** – ₹210 (was ₹260) — Biryani + Coke + Raita\n• **Burger Meal Deal** – ₹220 (was ₹270) — Burger + Fries + Pepsi\n• **Shawarma Fiesta** – ₹180 (was ₹220) — Shawarma + Fries + Sauce\n\n🎓 Show your JNTU student ID for an extra 10% off on orders above ₹200!";
  }

  if (/party|birthday|event|catering|bulk|wedding|corporate|college.*fest/i.test(q)) {
    return "🎉 We love catering for parties and events!\n\n**Our packages:**\n• Mini Pack (10–20 people) – ₹1,800\n• Party Pack (20–50 people) – ₹3,999 ⭐ Most Popular\n• Mega Pack (50–100 people) – ₹7,999\n\n✅ Up to 20% off on bulk orders above ₹5,000\n✅ Free delivery for events\n✅ Custom menu options available\n\n📞 Call us: +91 98765 43210\n💬 WhatsApp: wa.me/919876543210\n\nOr fill our inquiry form in the Events section!";
  }

  if (/delivery|deliver|order online|swiggy|zomato/i.test(q)) {
    return "🛵 You can order online via:\n\n• **Swiggy** – swiggy.com\n• **Zomato** – zomato.com\n• **Direct Call** – +91 98765 43210\n• **WhatsApp** – wa.me/919876543210\n\nWe deliver across JNTU, Kukatpally, and nearby areas. Delivery is fast — usually within 30-45 minutes! 🚀";
  }

  if (/time|hour|open|close|timing|when/i.test(q)) {
    return "🕐 Sizzling is open every day!\n\n**Hours: 11:00 AM – 11:30 PM**\n📅 Monday through Sunday (no holidays!)\n\nWe're currently open for dine-in and takeaway. Orders via Swiggy/Zomato are accepted during operating hours. 😊";
  }

  if (/location|address|where|find|near|jntu|kukatpally/i.test(q)) {
    return "📍 Find us near JNTU!\n\n**Sizzling Restaurant**\nNear JNTU, Kukatpally,\nHyderabad, Telangana – 500085\n\n🗺️ We're popular with JNTU students, faculty, and nearby residents. Easy to find — just ask any JNTU student! 😄\n\nOpen: 11 AM – 11:30 PM daily.";
  }

  if (/price|cost|how much|rate|menu price/i.test(q)) {
    return "💰 Our menu prices:\n\n🍛 Biryani – ₹120–₹180\n🌯 Shawarma – ₹120 | Kubus – ₹90\n🍔 Burgers – ₹130–₹170\n🍟 Fries – ₹70 | Nuggets – ₹110\n🍦 Ice Cream – ₹60\n🥤 Beverages – ₹40\n\n🎓 Student combos from ₹180!\n\nAll prices are inclusive of taxes. No hidden charges! 😊";
  }

  if (/veg|vegetarian|non.*veg|meat/i.test(q)) {
    return "🥗 Vegetarian options at Sizzling:\n\n• Crispy French Fries – ₹70\n• Soft Serve Ice Cream – ₹60\n• Cold Beverages – ₹40\n\n🍗 Non-Vegetarian (our specialty):\n• Chicken Biryani, Shawarma, Kubus\n• Zinger Burger, Double Patty Burger\n• Chicken Nuggets\n\nAll meat is halal-certified and freshly sourced daily!";
  }

  if (/halal|fresh|ingredient|quality/i.test(q)) {
    return "✅ Food safety and quality is our top priority!\n\n• All chicken is **100% Halal certified**\n• Ingredients sourced fresh **daily** from local markets\n• No artificial preservatives\n• Cooked in clean kitchen with high hygiene standards\n\nYour health & satisfaction matters to us! 💚";
  }

  if (/spice|hot|mild|level/i.test(q)) {
    return "🌶️ Spice levels at Sizzling:\n\n• **Mild** – French Fries, Nuggets, Kubus, Ice Cream\n• **Medium** – Chicken Biryani, Zinger Burger\n• **Hot** – Special Shawarma 🔥\n• **Extra Hot** – Available on request!\n\nYou can always ask for more or less spice when ordering through WhatsApp or phone! 😊";
  }

  if (/discount|offer|deal|coupon|promo/i.test(q)) {
    return "🎁 Current offers at Sizzling:\n\n🌯 **Buy 1 Get 1 Shawarma** — Mon–Wed\n🍛 **Free Coke 2L** with Family Biryani Pack — Weekends\n🎓 **10% Student Discount** — Show JNTU ID, orders above ₹200\n🎉 **Up to 20% off** on event/bulk orders above ₹5,000\n\nFollow us on Instagram for daily flash deals! 📱";
  }

  if (/instagram|social|follow/i.test(q)) {
    return "📱 Follow us on social media for food photos, deals & updates!\n\n• Instagram: @SizzlingHyd\n• Facebook: Sizzling Restaurant JNTU\n• YouTube: Sizzling Kitchen\n\nTag us in your food photos and we'll feature you! 📸🍛";
  }

  if (/thank|thanks|great|awesome|nice|good/i.test(q)) {
    return "Thank you so much! 😊🙏 We love happy customers!\n\nIf you enjoyed your experience, please leave us a review on Zomato or Google — it really helps us grow!\n\n⭐⭐⭐⭐⭐\n\nAnything else I can help with?";
  }

  if (/bye|goodbye|see you|cya|exit/i.test(q)) {
    return "Goodbye! 👋😄 Hope to see you at Sizzling soon!\n\n🍛 Come hungry, leave happy!\n\nRemember: Open daily 11 AM – 11:30 PM near JNTU Hyderabad. 🔥";
  }

  return "Hmm, I didn't quite catch that! 😅 I'm best at answering questions about:\n\n• 🍛 Menu items & prices\n• 🎉 Party orders & catering\n• 🛵 Delivery & ordering\n• ⏰ Timings & location\n• 🌶️ Spice levels & ingredients\n• 💰 Deals & student combos\n\nTry asking: *\"What's your best dish?\"* or *\"Do you deliver near JNTU?\"* 😊";
}

export default function SizzleBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: "Hi! 👋 I'm SizzleBot 🍗 — your personal Sizzling food assistant!\n\nI can help you with:\n• Menu recommendations\n• Party & bulk orders\n• Deals & student combos\n• Delivery info & timings\n\nWhat would you like to know? 🔥",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let nextId = useRef(1);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextId.current++, role: 'user', text: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const delay = 700 + Math.random() * 600;
    setTimeout(() => {
      const botMsg: Message = {
        id: nextId.current++,
        role: 'bot',
        text: getBotResponse(text.trim()),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const reset = () => {
    setMessages([{
      id: 0,
      role: 'bot',
      text: "Chat reset! 🔄 Hi again! I'm SizzleBot 🍗 — how can I help you today?",
      timestamp: new Date(),
    }]);
    nextId.current = 1;
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#8B0000] shadow-2xl shadow-[#FF6B00]/30 flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open SizzleBot"
      >
        🍗
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-black/60 transition-all duration-400 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        } ${isMinimized ? 'h-auto' : 'h-[560px] max-h-[80vh]'}`}
        style={{ border: '1px solid rgba(255,107,0,0.3)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B0000] to-[#FF6B00] px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl">🍗</div>
          <div className="flex-1">
            <div className="text-white font-bold text-sm">SizzleBot</div>
            <div className="text-white/70 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online · Usually replies instantly
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <ChevronDown size={18} className={`transition-transform duration-200 ${isMinimized ? 'rotate-180' : ''}`} />
          </button>
          <button onClick={reset} className="text-white/70 hover:text-white transition-colors p-1" title="Reset chat">
            <RotateCcw size={15} />
          </button>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-[#0e0e0e] p-4 space-y-3 scrollbar-hide">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#8B0000] flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-1">
                      🍗
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-3 text-xs leading-relaxed ${
                      msg.role === 'user' ? 'chat-bubble-user text-white' : 'chat-bubble-bot text-white/80'
                    }`}
                  >
                    {formatText(msg.text)}
                    <div className="text-[10px] opacity-40 mt-1 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#8B0000] flex items-center justify-center text-sm flex-shrink-0">
                    🍗
                  </div>
                  <div className="chat-bubble-bot px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      {[0,1,2].map(i => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full bg-[#FF6B00]/60 typing-dot`} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="bg-[#0e0e0e] px-3 py-2 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-hide">
              {quickReplies.map(reply => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="flex-shrink-0 text-[10px] bg-white/5 hover:bg-[#FF6B00]/20 text-white/60 hover:text-[#FF6B00] border border-white/10 hover:border-[#FF6B00]/30 rounded-full px-3 py-1.5 transition-all duration-200 whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="bg-[#111] border-t border-white/5 p-3 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#FF6B00]/40 transition-all duration-200"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#8B0000] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30 flex-shrink-0"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
