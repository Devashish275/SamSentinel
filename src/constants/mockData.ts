import { Product, CartItem, Offer, AIMessage } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 2.99,
    originalPrice: 3.99,
    discount: 25,
    category: 'Produce',
  },
  {
    id: '2',
    name: 'Whole Milk 1L',
    price: 3.49,
    category: 'Dairy',
  },
  {
    id: '3',
    name: 'Chicken Breast 1lb',
    price: 8.99,
    originalPrice: 12.99,
    discount: 31,
    category: 'Meat',
  },
  {
    id: '4',
    name: 'Bread - Whole Wheat',
    price: 2.49,
    category: 'Bakery',
  },
  {
    id: '5',
    name: 'Coca Cola 12-pack',
    price: 5.99,
    originalPrice: 7.99,
    discount: 25,
    category: 'Beverages',
  },
];

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    product: MOCK_PRODUCTS[0],
    quantity: 2,
    total: 5.98,
  },
  {
    product: MOCK_PRODUCTS[1],
    quantity: 1,
    total: 3.49,
  },
  {
    product: MOCK_PRODUCTS[2],
    quantity: 1,
    total: 8.99,
  },
  {
    product: MOCK_PRODUCTS[4],
    quantity: 1,
    total: 5.99,
  },
];

export const MOCK_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Flash Sale: 25% Off Produce',
    description: 'All organic fruits and vegetables',
    discount: 25,
    expiryTime: '2 hours',
    isActive: true,
  },
  {
    id: '2',
    title: 'Beverage Bundle Deal',
    description: 'Buy 2 get 1 free on all sodas',
    discount: 33,
    expiryTime: '1 hour',
    isActive: true,
  },
  {
    id: '3',
    title: 'Dairy Clearance',
    description: '20% off all dairy products',
    discount: 20,
    expiryTime: '30 minutes',
    isActive: true,
  },
];

export const MOCK_AI_CONVERSATION: AIMessage[] = [
  {
    id: '1',
    text: "Hi! I'm Mr. Walt, your AI shopping assistant. How can I help you today?",
    isUser: false,
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: '2',
    text: "I'm looking for good deals on groceries",
    isUser: true,
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: '3',
    text: "Great! I can see you have organic bananas in your cart. There's a flash sale on all produce - 25% off! Also, if you add a second beverage, you'll get the third one free. Would you like me to show you more offers?",
    isUser: false,
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: '4',
    text: "What's the best deal right now?",
    isUser: true,
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: '5',
    text: "The best deal is the dairy clearance - 20% off all dairy products, but it expires in 30 minutes! Since you have milk in your cart, you could save $0.70. Also, the produce sale ends in 2 hours, so you have time to add more fruits and vegetables.",
    isUser: false,
    timestamp: new Date(Date.now() - 60000),
  },
];

export const MOCK_ML_WEIGHT_CHECK = {
  status: 'success' as const,
  message: 'Weight check passed! All items match expected weight.',
  weight: 2.45,
  expectedWeight: 2.43,
}; 