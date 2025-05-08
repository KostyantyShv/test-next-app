import { CtaRow } from "./types";

interface CtaRowsSectionProps {
  ctaRows: CtaRow[];
  setCtaRows: (ctaRows: CtaRow[]) => void;
}

export default function CtaRowsSection({
  ctaRows,
  setCtaRows,
}: CtaRowsSectionProps) {
  const addCtaRow = () => {
    setCtaRows([...ctaRows, { text: "", buttonText: "" }]);
  };

  const updateCtaRow = (
    index: number,
    field: "text" | "buttonText",
    value: string
  ) => {
    const newCtaRows = [...ctaRows];
    newCtaRows[index] = { ...newCtaRows[index], [field]: value };
    setCtaRows(newCtaRows);
  };

  const removeCtaRow = (index: number) => {
    setCtaRows(ctaRows.filter((_, i) => i !== index));
  };

  return (
    <div className="border-b border-[#eee] pb-6 mb-6">
      <h3 className="text-lg font-semibold text-[#262B3D] mb-4">
        Call to Action Rows
      </h3>
      <div className="flex flex-col gap-4 mb-4">
        {ctaRows.map((cta, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border border-[#E5E5E5] rounded-lg relative"
          >
            <button
              type="button"
              onClick={() => removeCtaRow(index)}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#f8f9fa] border border-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#e9ecef] hover:text-[#333]"
            >
              ×
            </button>
            <div className="flex-1">
              <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
                CTA Text
              </label>
              <input
                type="text"
                value={cta.text}
                onChange={(e) => updateCtaRow(index, "text", e.target.value)}
                className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                placeholder="e.g., Schedule a Demo Session"
              />
            </div>
            <div className="w-[150px]">
              <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
                Button Text
              </label>
              <input
                type="text"
                value={cta.buttonText}
                onChange={(e) =>
                  updateCtaRow(index, "buttonText", e.target.value)
                }
                className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                placeholder="e.g., Book Now"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addCtaRow}
        className="w-full p-3 bg-[#f8f9fa] border border-dashed border-[#E5E5E5] rounded-lg flex items-center justify-center gap-2 text-sm text-[#262B3D] hover:bg-[#e9ecef]"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </svg>
        Add CTA Row
      </button>
    </div>
  );
}
