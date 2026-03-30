import Image from "next/image";

type Props = {
  imgUrl: string;
  qty: number;
};

export function OrderItems({ imgUrl, qty }: Props) {
  console.log(imgUrl, qty);

  return (
    <div className="relative w-20 h-24 ">
      <Image src={imgUrl} alt="Product Photo" fill />
      <div className="w-8 h-8 bg-(--primary) flex items-center justify-center absolute -top-4 -right-4 rounded-full">
        <p className="font-semibold text-white leading-6">{qty}</p>
      </div>
    </div>
  );
}
