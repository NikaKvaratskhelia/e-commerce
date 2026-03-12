type CartItemProductDTO = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  stock: number;
  createdAt: string;
  productCategoryId: number;
};

export type CartItemDTO = {
  id: number;
  quantity: number;
  productId: number;
  cartId: string;
  product: CartItemProductDTO;
};
