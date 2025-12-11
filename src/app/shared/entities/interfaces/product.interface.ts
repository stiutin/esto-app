export interface IResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IProduct {
  category: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  thumbnail: string;
  title: string;
}
