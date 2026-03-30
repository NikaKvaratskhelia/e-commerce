import { Plus } from "lucide-react";

type AddItemBtnProps = {
  text: string;
  onClick: () => void;
};

export function AddItemBtn({ text, onClick }: AddItemBtnProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all hover:bg-black/80 active:scale-95"
      onClick={onClick}
    >
      <Plus size={18} />
      Add {text}
    </button>
  );
}
