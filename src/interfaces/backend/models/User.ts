export interface User {
  id: number;
  eth_address: string;
  email?: string;
  email_verified_at?: Date;
  created_at: Date;
  updated_at: Date;
}
