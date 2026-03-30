export function AddItemBtn({ text }: { text: string }) {
  // TODO: add functionality to open a modal for adding a new item
  return (
    <button className="bg-(--green) hover:bg-(--green)/80 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
      + Add {text}
    </button>
  );
}
