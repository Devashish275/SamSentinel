export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image?: string;
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
  expiryTime?: string;
  isActive: boolean;
}

export interface AIMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface MLWeightCheck {
  status: 'success' | 'error';
  message: string;
  weight: number;
  expectedWeight: number;
}

export type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  FinalBill: undefined;
  MrWalt: undefined;
}; 