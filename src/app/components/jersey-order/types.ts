export type OrderType = "full" | "custom";
export type PaymentMethod = "cashfree" | "manual_upi";

export interface SelectedItems {
  jersey: boolean;
  shorts: boolean;
  shockings: boolean;
}

export interface FeeDetails {
  unitPrice: number;
  total: number;
  itemsList: string[];
}

export interface OrderSuccessData {
  orderId: string;
  total: number;
}

export const FULL_KIT_PRICE = 1199;

export const SEPARATE_PRICES = {
  jersey: 485,
  shorts: 445,
  shockings: 285,
} as const;
