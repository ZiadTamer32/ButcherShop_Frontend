export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: "beef" | "lamb";
  image: File | null;
  isAvailable?: boolean;
}

export interface Cart {
  productId: string;
  quantity: number;
  price: number;
}
export interface CartItemLocalStorage {
  _id: string;
  name: string;
  description: string;
  image: string;
  imagePath: string;
  isAvailable: boolean;
  category: "beef" | "lamb";
  quantity: number;
  price: number;
}

export interface OrderItem {
  _id: string;
  productId: Product;
  name: string;
  quantity: number;
  price: number;
}
export interface Order {
  _id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  zone: string;
  address: string;
  orderState?: "new" | "seen" | "cancelled";
  additionalInfo: string;
  orderItem: OrderItem[];
  orderPrice: number;
  delivieryPrice: number;
  totalPrice: number;
  createdAt?: string;
}
