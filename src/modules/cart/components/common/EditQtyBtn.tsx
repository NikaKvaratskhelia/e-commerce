"use client";

import { useUpdateCartMutation } from "../../hooks/mutations/use-update-cartitem";

type Props = {
  id: number;
  qty: number;
};

export function EditQtyBtn({ id, qty }: Props) {
  const { mutate, isPending } = useUpdateCartMutation();  

  function handleDecrease() {
    if (qty <= 0) return;

    mutate({
      id,
      qty: qty - 1,
    });
  }

  function handleIncrease() {
    mutate({
      id,
      qty: qty + 1,
    });
  }

  return (
    <div className="flex h-8 w-20 items-center justify-between rounded-sm border border-(--primary) px-2">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isPending || qty <= 1}
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        -
      </button>

      <span>{qty}</span>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={isPending}
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}
