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
    <div className="border-b border-[#eee] max-md:border-[#eee] pb-6 max-md:pb-5 mb-6 max-md:mb-5">
      <h3 className="text-lg max-md:text-base font-semibold text-[#262B3D] max-md:text-[#262B3D] mb-4 max-md:mb-4">
        Contact Section
      </h3>
      <div className="flex gap-3 max-md:gap-3 max-md:flex-col max-md:items-start bg-[#F8F9FD] max-md:bg-[#F8F9FD] rounded-lg max-md:rounded-lg p-3 max-md:p-3 mb-4 max-md:mb-4">
        <div className="w-12 h-12 max-md:w-12 max-md:h-12 rounded-lg max-md:rounded-lg overflow-hidden relative flex-shrink-0">
          <img
            src={logo}
            alt="Vendor Logo"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-black/50 max-md:bg-black/50 flex items-center justify-center opacity-0 max-md:opacity-0 hover:opacity-100 max-md:hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24" className="max-md:w-5 max-md:h-5">
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
        <div className="flex-1 max-md:flex-1 max-md:w-full">
          <div className="mb-2 max-md:mb-2">
            <label className="block font-semibold max-md:font-medium text-[#4A4A4A] max-md:text-[#4A4A4A] mb-2 max-md:mb-1.5 text-sm max-md:text-sm">
              Contact Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 max-md:px-3 py-3 max-md:py-3 border border-[#E5E5E5] max-md:border-[#E5E5E5] rounded-lg max-md:rounded-lg text-sm max-md:text-sm text-[#4A4A4A] max-md:text-[#4A4A4A] bg-white max-md:bg-white focus:outline-none"
              onFocus={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = '#02C5AF';
              }}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = '#E5E5E5';
              }}
              placeholder="e.g., Contact EduTech Solutions"
            />
          </div>
          <div>
            <label className="block font-semibold max-md:font-medium text-[#4A4A4A] max-md:text-[#4A4A4A] mb-2 max-md:mb-1.5 text-sm max-md:text-sm">
              Contact Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 max-md:px-3 py-3 max-md:py-3 border border-[#E5E5E5] max-md:border-[#E5E5E5] rounded-lg max-md:rounded-lg text-sm max-md:text-sm text-[#4A4A4A] max-md:text-[#4A4A4A] bg-white max-md:bg-white focus:outline-none"
              onFocus={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = '#02C5AF';
              }}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = '#E5E5E5';
              }}
              placeholder="e.g., Ready to transform your educational institution?"
            />
          </div>
        </div>
      </div>
      <div className="max-md:mt-3">
        <label className="block font-semibold max-md:font-medium text-[#4A4A4A] max-md:text-[#4A4A4A] mb-2 max-md:mb-1.5 text-sm max-md:text-sm">
          Button Text
        </label>
        <input
          type="text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          className="w-full px-3 max-md:px-3 py-3 max-md:py-3 border border-[#E5E5E5] max-md:border-[#E5E5E5] rounded-lg max-md:rounded-lg text-sm max-md:text-sm text-[#4A4A4A] max-md:text-[#4A4A4A] bg-white max-md:bg-white focus:outline-none"
          onFocus={(e) => {
            const target = e.target as HTMLInputElement;
            target.style.borderColor = '#02C5AF';
          }}
          onBlur={(e) => {
            const target = e.target as HTMLInputElement;
            target.style.borderColor = '#E5E5E5';
          }}
          placeholder="e.g., Send Message"
        />
      </div>
    </div>
  );
}
