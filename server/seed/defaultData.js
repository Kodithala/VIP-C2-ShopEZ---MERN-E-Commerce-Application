import Product from '../models/Product.js';
import User from '../models/User.js';

export const defaultUsers = [
  { name: 'ShopEZ Admin', email: 'admin@shopez.com', password: 'password123', role: 'ADMIN' },
  { name: 'Demo User', email: 'user@shopez.com', password: 'password123', role: 'USER' }
];

export const defaultProducts = [
  ['OnePlus Nord CE 5G', 'Slim 5G phone with AMOLED display, fast charging, and 128GB storage.', 'Electronics', 'OnePlus', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900', 24999, 35, 4.6],
  ['boAt Rockerz Headphones', 'Wireless over-ear headphones with punchy bass and long battery life.', 'Electronics', 'boAt', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900', 2499, 80, 4.4],
  ['Lenovo IdeaPad 14', 'Everyday laptop with Ryzen processor, 16GB RAM, and SSD storage.', 'Electronics', 'Lenovo', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900', 58990, 18, 4.7],
  ['Mi Smart Speaker', 'Voice assistant speaker for music, routines, and connected home devices.', 'Electronics', 'Xiaomi', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900', 3999, 60, 4.2],
  ['Roadster Denim Jacket', 'Washed denim jacket with a relaxed everyday fit.', 'Fashion', 'Roadster', 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=900', 2299, 45, 4.5],
  ['HRX Cotton Hoodie', 'Soft fleece hoodie with ribbed cuffs and front pocket.', 'Fashion', 'HRX', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900', 1499, 70, 4.3],
  ['Campus Running Shoes', 'Cushioned mesh sneakers built for daily runs and city walks.', 'Fashion', 'Campus', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900', 2799, 50, 4.6],
  ['Hidesign Leather Wallet', 'Slim leather wallet with neat card slots and durable stitching.', 'Fashion', 'Hidesign', 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=900', 1899, 90, 4.1],
  ['LaOpala Dinner Set', 'Premium glazed dinner set for family meals and festive tables.', 'Home', 'LaOpala', 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=900', 3499, 32, 4.4],
  ['Bamboo Desk Organizer', 'Compact organizer with compartments for stationery, phone, and notes.', 'Home', 'HomeTown', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900', 899, 65, 4.0],
  ['Bombay Dyeing Bedsheet', 'Breathable queen bedsheet set with soft cotton finish.', 'Home', 'Bombay Dyeing', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900', 2199, 41, 4.5],
  ['Wipro LED Floor Lamp', 'Adjustable warm LED floor lamp for bedrooms and reading corners.', 'Home', 'Wipro', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900', 2999, 26, 4.2],
  ['Atomic Habits', 'A practical guide to building better habits through small daily systems.', 'Books', 'Penguin', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900', 499, 100, 4.8],
  ['The Psychology of Money', 'Timeless lessons on wealth, behaviour, and financial decision making.', 'Books', 'Harriman House', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=900', 399, 52, 4.6],
  ['Ikigai', 'A thoughtful book about purpose, routine, and living with more intention.', 'Books', 'Penguin', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900', 350, 75, 4.1],
  ['JavaScript: The Good Parts', 'A concise programming classic for writing cleaner JavaScript.', 'Books', 'OReilly', 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900', 799, 88, 4.3],
  ['Boldfit Yoga Mat', 'Non-slip cushioned yoga mat for home workouts and studio sessions.', 'Sports', 'Boldfit', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900', 1199, 55, 4.7],
  ['Kore Adjustable Dumbbells', 'Space-saving dumbbell pair with quick weight changes.', 'Sports', 'Kore', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900', 6999, 20, 4.5],
  ['Milton Steel Bottle', 'Insulated stainless steel bottle that keeps drinks cold for hours.', 'Sports', 'Milton', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900', 799, 120, 4.2],
  ['Wildcraft Trail Backpack 30L', 'Weather-resistant hiking backpack with breathable support.', 'Sports', 'Wildcraft', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900', 2499, 38, 4.4],
  ['Samsung Frost Free Refrigerator', 'Convertible double-door refrigerator with stabilizer-free operation.', 'Appliances', 'Samsung', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=900', 32990, 16, 4.5],
  ['Prestige Induction Cooktop', 'Compact induction cooktop with preset Indian cooking modes.', 'Appliances', 'Prestige', 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=900', 2499, 44, 4.2],
  ['Philips Steam Iron', 'Lightweight steam iron with non-stick soleplate and quick heat-up.', 'Appliances', 'Philips', 'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=900', 1899, 52, 4.1],
  ['Eureka Forbes Vacuum Cleaner', 'Bagless vacuum cleaner for daily dust, sofa, and floor cleaning.', 'Appliances', 'Eureka Forbes', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=900', 6499, 22, 4.3],
  ['Lakme Matte Lipstick', 'Long-wear matte lipstick with rich colour payoff.', 'Beauty', 'Lakme', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900', 349, 95, 4.2],
  ['Mamaearth Vitamin C Face Wash', 'Gentle daily cleanser with vitamin C and turmeric.', 'Beauty', 'Mamaearth', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900', 299, 110, 4.4],
  ['Nivea Body Lotion 400ml', 'Deep moisturising lotion for smooth everyday skin care.', 'Beauty', 'Nivea', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900', 425, 84, 4.5],
  ['Beardo Beard Oil', 'Nourishing beard oil with a light non-sticky finish.', 'Beauty', 'Beardo', 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=900', 499, 68, 4.1],
  ['India Gate Basmati Rice 5kg', 'Aged basmati rice with long grains and fragrant aroma.', 'Grocery', 'India Gate', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900', 899, 72, 4.6],
  ['Tata Tea Premium 1kg', 'Full-bodied tea blend crafted for Indian milk tea.', 'Grocery', 'Tata Tea', 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=900', 520, 90, 4.5],
  ['Aashirvaad Atta 10kg', 'Whole wheat atta for soft rotis and everyday meals.', 'Grocery', 'Aashirvaad', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=900', 540, 60, 4.4],
  ['Fortune Sunflower Oil 5L', 'Refined sunflower oil for light everyday cooking.', 'Grocery', 'Fortune', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900', 780, 48, 4.3]
].map(([name, description, category, brand, image, price, stock, rating]) => ({
  name,
  description,
  category,
  brand,
  image,
  price,
  stock,
  rating,
  reviews: []
}));

export const ensureDefaultData = async ({ onlyIfNoProducts = false } = {}) => {
  let seededUsers = 0;
  for (const user of defaultUsers) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      await User.create(user);
      seededUsers += 1;
    }
  }

  const productCount = await Product.countDocuments();

  if (onlyIfNoProducts && productCount > 0) {
    return { seededProducts: 0, seededUsers };
  }

  const productsResult = await Product.bulkWrite(
    defaultProducts.map((product) => ({
      updateOne: {
        filter: { name: product.name },
        update: { $set: product },
        upsert: true
      }
    }))
  );

  return {
    seededProducts: productsResult.upsertedCount || 0,
    seededUsers
  };
};
