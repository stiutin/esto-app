export interface IResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IProduct {
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
