"use client";

interface ConfirmationModalContentProps {
  type: "add" | "remove" | null;
  addonName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModalContent({
  type,
  addonName,
  onCancel,
  onConfirm,
}: ConfirmationModalContentProps) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg w-[320px] text-center">
      <div className="text-base font-semibold mb-4 text-[#464646]">
        {type === "remove"
          ? "Are you sure you want to remove this addon?"
          : `Add addon ${addonName} to cart?`}
      </div>
      <div className="flex justify-center gap-2 mt-5">
        <button
          className="px-4 py-2 rounded text-sm font-medium bg-white text-[#4A4A4A] border border-[#E5E7EB]"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded text-sm font-medium bg-[#1D77BD] text-white border-none"
          onClick={onConfirm}
        >
          {type === "remove" ? "Remove" : "Add"}
        </button>
      </div>
    </div>
  );
}
