export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  message?: string;
};

export enum EOrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}
