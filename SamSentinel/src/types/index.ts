// src/types.ts

export type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  FinalBill: undefined;
  MrWalt: undefined;
};

// Optional: Add Product, CartItem, Offer, AIMessage, etc., here for centralized typing

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  total: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  expiryTime: string;
  isActive: boolean;
}

export interface AIMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}
