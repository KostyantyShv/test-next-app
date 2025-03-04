// components/StudentModal.tsx
import { useEffect } from "react";

interface StudentModalProps {
  closeModal: () => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[1000] overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="relative w-[90%] max-w-[800px] mx-auto my-10 bg-white rounded-xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.1)] animate-[fadeIn_0.3s_ease]">
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center text-[#5F5F5F] hover:bg-[#EEEEEE] transition-colors"
          aria-label="Close popup"
        >
          ✕
        </button>

        <div className="mb-8">
          <h1 className="text-[#016853] text-[28px] font-semibold">Students</h1>
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-2 gap-0">
            <div className="pr-8 border-r border-[rgba(0,0,0,0.1)]">
              <div className="text-[#1B1B1B] text-[48px] font-bold mb-6">
                335
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[rgba(0,0,0,0.1)]">
                <span className="text-[#4A4A4A] text-[15px] font-medium">
                  Gifted Students
                </span>
                <span className="text-[#089E68] text-[15px] font-semibold">
                  10%
                </span>
              </div>
              <div className="mt-6">
                <h3 className="text-[#4A4A4A] text-[15px] font-medium mb-4">
                  Gender
                </h3>
                <div className="h-8 bg-[#EBFCF4] rounded-md mb-3 relative overflow-hidden">
                  <div className="h-full bg-[#D7F7E9] w-[52%]" />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] text-sm font-medium">
                    Female
                  </span>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#089E68] text-sm font-semibold">
                    52%
                  </span>
                </div>
                <div className="h-8 bg-[#EBFCF4] rounded-md relative overflow-hidden">
                  <div className="h-full bg-[#D7F7E9] w-[48%]" />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] text-sm font-medium">
                    Male
                  </span>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#089E68] text-sm font-semibold">
                    48%
                  </span>
                </div>
              </div>
            </div>

            <div className="pl-8">
              <h3 className="text-[#4A4A4A] text-[15px] font-medium mb-6">
                Student Diversity
              </h3>
              <div className="space-y-3">
                {[
                  { label: "White", value: "33.4%" },
                  { label: "African American", value: "24.5%" },
                  { label: "International", value: "17.9%" },
                  { label: "Hispanic", value: "9%" },
                  { label: "Asian", value: "6%" },
                  { label: "Multiracial", value: "6%" },
                  { label: "Native American", value: "3%" },
                  { label: "Pacific Islander", value: "0.3%" },
                  { label: "Unknown", value: "0%" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="h-8 bg-[#F5F5F5] rounded-md relative overflow-hidden"
                  >
                    <div
                      className="h-full bg-[#D7F7E9]"
                      style={{ width: item.value }}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] text-sm font-medium">
                      {item.label}
                    </span>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#089E68] text-sm font-semibold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-[rgba(0,0,0,0.1)]">
          <h2 className="text-[#016853] text-2xl font-semibold mb-8">
            What Students Say
          </h2>
          <div className="grid grid-cols-2 gap-0">
            <div className="pr-8 border-r border-[rgba(0,0,0,0.1)]">
              {[
                {
                  percentage: 88,
                  desc: "of students say kids at this school are friendly.",
                  responses: 16,
                },
                {
                  percentage: 81,
                  desc: "of students say kids at this school are involved in school activities.",
                  responses: 16,
                },
                {
                  percentage: 88,
                  desc: "of students say kids are hardworking.",
                  responses: 16,
                },
              ].map((poll, idx) => (
                <div key={idx} className="mb-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="relative h-4 w-4 before:content-[''] before:absolute before:top-[2px] before:left-2 before:w-[3px] before:h-[10px] before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,0_0_0_transparent,-4px_2px_0_#6bbef2] before:clip-[rect(0,8px,10px,-10px)]"></div>
                    <div className="text-[#1D77BD] text-[13px] font-semibold uppercase tracking-wider">
                      POLL
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mb-4">
                    <div
                      className="w-[60px] h-[60px] rounded-full relative"
                      style={{
                        background: `conic-gradient(#77d3fa ${poll.percentage}%, #e8f4fc 0)`,
                      }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-white rounded-full" />
                    </div>
                    <div className="text-[#1B1B1B] text-[36px] font-bold leading-none">
                      {poll.percentage}
                      <span className="text-[#666] text-lg font-semibold">
                        %
                      </span>
                    </div>
                  </div>
                  <div className="text-[#4A4A4A] text-sm leading-6 mb-2">
                    {poll.desc}
                  </div>
                  <div className="text-[#5F5F5F] text-[13px]">
                    {poll.responses} responses
                  </div>
                </div>
              ))}
            </div>

            <div className="pl-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="relative h-4 w-4 before:content-[''] before:absolute before:top-[2px] before:left-2 before:w-[3px] before:h-[10px] before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,0_0_0_transparent,-4px_2px_0_#6bbef2] before:clip-[rect(0,8px,10px,-10px)]"></div>
                <div className="text-[#1D77BD] text-[13px] font-semibold uppercase tracking-wider">
                  POLL
                </div>
              </div>
              <div className="text-[#1B1B1B] text-base font-semibold mb-6">
                What one word or phrase best describes the typical student at
                this school?
              </div>
              <div className="space-y-3">
                {[
                  { label: "Intelligent", value: "31%" },
                  { label: "smart, friendly, diverse", value: "25%" },
                  { label: "Diverse", value: "19%" },
                  { label: "Outgoing", value: "13%" },
                  { label: "Lazy", value: "6%" },
                  { label: "Unique", value: "6%" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="h-8 bg-[#EBFCF4] rounded-md relative overflow-hidden"
                  >
                    <div
                      className="h-full bg-[#D7F7E9]"
                      style={{ width: item.value }}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] text-sm font-medium">
                      {item.label}
                    </span>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#089E68] text-sm font-semibold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-[#5F5F5F] text-[13px] mt-4">
                Based on 16 responses
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
