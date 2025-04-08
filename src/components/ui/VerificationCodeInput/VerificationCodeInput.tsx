import { useRef, ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";

interface VerificationCodeInputProps {
  codeInputs: string[];
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
}

const VerificationCodeInput = ({
  codeInputs,
  onChange,
  onKeyDown,
  onPaste,
}: VerificationCodeInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <div className="flex justify-between gap-2 mb-6 w-full">
      {codeInputs.map((value, index) => (
        <input
          key={index}
          type="text"
          className="w-[45px] h-[45px] border border-[#ddd] rounded-md text-center text-lg font-semibold text-[#333] focus:outline-none focus:border-[#0066b2] transition-colors duration-200"
          maxLength={1}
          inputMode="numeric"
          pattern="[0-9]"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(index, e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            onKeyDown(index, e)
          }
          onPaste={index === 0 ? onPaste : undefined}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
