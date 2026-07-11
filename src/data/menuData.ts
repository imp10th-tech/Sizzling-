export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isVeg: boolean;
  isSignature?: boolean;
  isBestseller?: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'extra-hot';
  tags?: string[];
}

export interface Combo {
  id: number;
  name: string;
  items: string[];
  price: number;
  originalPrice: number;
  image: string;
  badge: string;
}

export const menuCategories = [
  'All',
  'Biryani',
  'Shawarma',
  'Burgers',
  'Sides',
  'Desserts',
  'Beverages',
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Signature Chicken Biryani',
    description: 'Aromatic basmati rice slow-cooked with tender chicken, saffron, and a secret blend of 25 spices. A taste of authentic Hyderabadi dum biryani.',
    price: 180,
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Biryani',
    isVeg: false,
    isSignature: true,
    isBestseller: true,
    spiceLevel: 'medium',
    tags: ['Chef\'s Pick', 'Best Seller'],
  },
  {
    id: 2,
    name: 'Special Shawarma',
    description: 'Juicy marinated chicken strips, fresh veggies, garlic sauce and hot sauce wrapped in a warm pita bread. Grilled to perfection.',
    price: 120,
    image: 'https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Shawarma',
    isVeg: false,
    isSignature: true,
    isBestseller: true,
    spiceLevel: 'hot',
    tags: ['Spicy', 'Popular'],
  },
  {
    id: 3,
    name: 'Kubus',
    description: 'Soft Arabic flatbread filled with marinated grilled chicken, fresh salad, tahini and our signature sauce. A Middle Eastern delight.',
    price: 90,
    image: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Shawarma',
    isVeg: false,
    spiceLevel: 'mild',
    tags: ['Must Try'],
  },
  {
    id: 4,
    name: 'Zinger Burger',
    description: 'Crispy fried chicken fillet with coleslaw, fresh lettuce, tomato and our house zinger sauce in a toasted sesame bun.',
    price: 130,
    originalPrice: 160,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Burgers',
    isVeg: false,
    isBestseller: true,
    spiceLevel: 'medium',
    tags: ['Crispy', 'Hot Deal'],
  },
  {
    id: 5,
    name: 'Crispy French Fries',
    description: 'Golden crispy fries seasoned with our special spice blend. Served with ketchup and garlic mayo dip.',
    price: 70,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Sides',
    isVeg: true,
    spiceLevel: 'mild',
    tags: ['Vegetarian'],
  },
  {
    id: 6,
    name: 'Chicken Nuggets (6 pcs)',
    description: 'Tender chicken pieces coated in a seasoned crispy breadcrumb crust. Served with dipping sauces.',
    price: 110,
    image: 'https://images.pexels.com/photos/5407030/pexels-photo-5407030.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Sides',
    isVeg: false,
    spiceLevel: 'mild',
    tags: ['Kid Friendly'],
  },
  {
    id: 7,
    name: 'Soft Serve Ice Cream',
    description: 'Creamy vanilla soft-serve swirled in a cone or cup. Available with chocolate or strawberry topping.',
    price: 60,
    image: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Desserts',
    isVeg: true,
    tags: ['Sweet', 'Refreshing'],
  },
  {
    id: 8,
    name: 'Cold Beverages',
    description: 'Chilled Coke, Pepsi, Sprite, Mango Juice, Lassi and fresh lime soda. Perfect pair for every meal.',
    price: 40,
    image: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Beverages',
    isVeg: true,
    tags: ['Refreshing'],
  },
  {
    id: 9,
    name: 'Double Patty Burger',
    description: 'Two juicy chicken patties, double cheese, caramelized onions and smoky BBQ sauce. The ultimate indulgence.',
    price: 170,
    originalPrice: 200,
    image: 'https://images.pexels.com/photos/1431315/pexels-photo-1431315.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Burgers',
    isVeg: false,
    spiceLevel: 'medium',
    tags: ['Loaded', 'Value'],
  },
  {
    id: 10,
    name: 'Half Chicken Biryani',
    description: 'Half portion of our classic Hyderabadi dum biryani — perfect for a solo meal or a light appetite.',
    price: 120,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Biryani',
    isVeg: false,
    spiceLevel: 'medium',
    tags: ['Value'],
  },
];

export const studentCombos: Combo[] = [
  {
    id: 1,
    name: 'Biryani Blast Combo',
    items: ['Chicken Biryani', 'Coke 300ml', 'Raita'],
    price: 210,
    originalPrice: 260,
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'Save ₹50',
  },
  {
    id: 2,
    name: 'Burger Meal Deal',
    items: ['Zinger Burger', 'French Fries', 'Pepsi 300ml'],
    price: 220,
    originalPrice: 270,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'Save ₹50',
  },
  {
    id: 3,
    name: 'Shawarma Fiesta',
    items: ['Special Shawarma', 'Crispy Fries', 'Garlic Sauce'],
    price: 180,
    originalPrice: 220,
    image: 'https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=600',
    badge: 'Save ₹40',
  },
];

export const dailyOffers = [
  {
    id: 1,
    title: 'Buy 1 Get 1 Shawarma',
    description: 'Order any shawarma and get the second one free. Valid Monday–Wednesday.',
    icon: '🌯',
    color: 'from-orange-600 to-red-700',
  },
  {
    id: 2,
    title: 'Family Biryani Pack',
    description: 'Free Coke 2L with every Family Biryani Pack (4 portions). Weekends only.',
    icon: '🍛',
    color: 'from-red-800 to-orange-700',
  },
  {
    id: 3,
    title: 'Student Discount',
    description: '10% off on all orders above ₹200 with valid student ID. Every day!',
    icon: '🎓',
    color: 'from-orange-700 to-red-900',
  },
];

export const reviews = [
  {
    id: 1,
    name: 'Arjun Reddy',
    role: 'JNTU Student',
    rating: 5,
    comment: 'The chicken biryani here is absolutely incredible! Reminds me of my mom\'s cooking but even more aromatic. The portions are generous and the price is student-friendly. My go-to spot near college!',
    avatar: 'AR',
    date: '2 days ago',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Software Engineer',
    rating: 5,
    comment: 'Ordered shawarma and zinger burger for my team. Everyone loved it! The delivery was super fast and the food was still hot. Sizzling has become our office party go-to place.',
    avatar: 'PS',
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'Mohammed Irfan',
    role: 'JNTU Alumni',
    rating: 5,
    comment: 'Been eating here since my college days. The quality has only gotten better. The special shawarma with extra garlic sauce is to die for. Highly recommend to everyone near JNTU!',
    avatar: 'MI',
    date: '2 weeks ago',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    role: 'Homemaker',
    rating: 4,
    comment: 'Ordered for my son\'s birthday party. The bulk order service was seamless, food was fresh and delicious. All the kids and adults loved every dish. Will definitely order again!',
    avatar: 'SP',
    date: '3 weeks ago',
  },
  {
    id: 5,
    name: 'Ravi Kumar',
    role: 'College Professor',
    rating: 5,
    comment: 'The Sizzlebot on their website is brilliant — it helped me plan the perfect meal for my department event. The food was exceptional and arrived on time. 10/10 would recommend.',
    avatar: 'RK',
    date: '1 month ago',
  },
  {
    id: 6,
    name: 'Fatima Begum',
    role: 'Local Resident',
    rating: 5,
    comment: 'The chicken nuggets and fries are my kids\' absolute favorite. Crispy, juicy and perfectly seasoned. The soft serve ice cream is also amazing. Great family restaurant near JNTU!',
    avatar: 'FB',
    date: '1 month ago',
  },
];
