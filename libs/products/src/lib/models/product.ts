import { Category } from './category';

export class Product {
  id?: string;
  name?: string;
  image?: string;
  countInStock?: number;
  brand?: string;
  category?: Category;
  description?: string;
  images?: [string];
  numReviews?: number;
  price?: number;
  rating?: number;
  richDescription?: string;
  isFeatured?: boolean;
  dateCreated?: string;
}
