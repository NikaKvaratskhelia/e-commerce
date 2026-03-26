export type ProductDTO = {
  id: number;
  price: number;
  title: string;
  description: string;
  thumbnail: string;
  stock: number;
  createdAt: string;
  productCategoryId: number;
  discounts: {
    id: number;
    discountPercentage: number;
    productId: number;
    discountEndDate: string;
  }[];
};
