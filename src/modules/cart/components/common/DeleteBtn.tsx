import Image from "next/image";
import { useDeleteCartMutation } from "../../hooks/mutations/use-delete-cartitem";

export function DeleteBtn({ id }: { id: number }) {
  const { mutate } = useDeleteCartMutation();
  return (
    <Image
      src={"/X.svg"}
      alt="X btn"
      width={14}
      height={14}
      className="cursor-pointer"
      onClick={() => mutate({ id })}
    />
  );
}
