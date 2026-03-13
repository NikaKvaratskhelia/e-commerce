export type ProductDTO = {
  id: number;
  price: number;
  title: string;
  description: string;
  thumbnail: string;
  stock: number;
  createdAt: string;
  productCategoryId: number;
  colors: {
    id: number,
    color: string,
    productId:number,
    has3D: boolean,
    photos: { id: number; url: string }[];
  }[];
  discounts: {
    id: number;
    discountPercentage: number;
    productId: number;
    discountEndDate: string;
  }[];
};
