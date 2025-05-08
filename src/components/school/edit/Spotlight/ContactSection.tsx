import { RefObject } from "react";

interface ContactSectionProps {
  logo: string;
  title: string;
  description: string;
  buttonText: string;
  setLogo: (logo: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setButtonText: (buttonText: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactSection({
  logo,
  title,
  description,
  buttonText,
  setTitle,
  setDescription,
  setButtonText,
  inputRef,
  onLogoUpload,
}: ContactSectionProps) {
  return (
    <div className="border-b border-[#eee] pb-6 mb-6">
      <h3 className="text-lg font-semibold text-[#262B3D] mb-4">
        Contact Section
      </h3>
      <div className="flex gap-4 items-center bg-[#F8F9FD] rounded-lg p-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden relative">
          <img
            src={logo}
            alt="Vendor Logo"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711C16.6333 11.4616 17.2665 11.4616 17.657 11.0711C18.0475 10.6806 18.0475 10.0474 17.657 9.65692L12.7071 4.70701C12.3166 4.31649 11.6834 4.31649 11.2929 4.70701L6.34315 9.65692C5.95262 10.0474 5.95262 10.6806 6.34315 11.0711C6.73367 11.4616 7.36684 11.4616 7.75736 11.0711L11 7.82831V14.9861Z" />
            </svg>
          </div>
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            accept="image/*"
            onChange={onLogoUpload}
          />
        </div>
        <div className="flex-1">
          <div className="mb-3">
            <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
              Contact Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
              placeholder="e.g., Contact EduTech Solutions"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
              Contact Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
              placeholder="e.g., Ready to transform your educational institution?"
            />
          </div>
        </div>
        <div className="w-[150px]">
          <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
            Button Text
          </label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
            placeholder="e.g., Send Message"
          />
        </div>
      </div>
    </div>
  );
}
