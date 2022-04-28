declare namespace Backend.Models {
  export interface Chain {
    id: number;
    chain_id: string;
    name: string;
    image: string;
    is_mainnet: number;
    is_active: number;
    sort_order: number;
    created_at: Date;
    updated_at: Date;
  }
}
