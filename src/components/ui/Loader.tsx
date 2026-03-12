import { Loader } from "lucide-react";

export function CustomLoader() {
  return (
    <div className="fixed inset-0 bg-[#00000043] flex items-center justify-center">
      <Loader className="animate-spin w-10 h-10" />
    </div>
  );
}
