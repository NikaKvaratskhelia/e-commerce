type ProductColorDto = {
  id: number;
  has3D:boolean,
  color: string;
  photos: { id: number; url: string }[];
  product: CartItemProductDTO;
};

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
  productColor: ProductColorDto;
};
