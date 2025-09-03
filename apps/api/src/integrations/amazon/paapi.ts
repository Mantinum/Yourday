export interface SearchParams {
  query: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface Product {
  asin: string;
  title: string;
  url: string;
  image?: string;
  priceEur?: number;
}

export async function searchProducts(_: SearchParams): Promise<Product[]> {
  return [
    { asin: 'FAKE1', title: 'Produit 1', url: 'https://example.com/1', priceEur: 1000 },
    { asin: 'FAKE2', title: 'Produit 2', url: 'https://example.com/2', priceEur: 2000 },
    { asin: 'FAKE3', title: 'Produit 3', url: 'https://example.com/3', priceEur: 3000 }
  ];
}
