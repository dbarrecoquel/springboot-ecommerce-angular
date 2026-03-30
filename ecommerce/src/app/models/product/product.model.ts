export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    sku: string;
    imageUrl?: string;
    enabled: boolean;
  }