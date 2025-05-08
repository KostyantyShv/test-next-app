import { CaseStudy } from "./types/caseStudy";

interface TestimonialSectionProps {
  formData: Omit<CaseStudy, "id" | "pinned">;
  setFormData: React.Dispatch<
    React.SetStateAction<Omit<CaseStudy, "id" | "pinned">>
  >;
}

export default function TestimonialSection({
  formData,
  setFormData,
}: TestimonialSectionProps) {
  return (
    <div className="bg-[#f8f9fa] p-5 rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
          Section Label
        </label>
        <input
          type="text"
          value={formData.testimonial.label}
          onChange={(e) =>
            setFormData({
              ...formData,
              testimonial: { ...formData.testimonial, label: e.target.value },
            })
          }
          className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
          placeholder="e.g., TESTIMONIALS"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
          Section Title
        </label>
        <input
          type="text"
          value={formData.testimonial.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              testimonial: { ...formData.testimonial, title: e.target.value },
            })
          }
          className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
          placeholder="e.g., Client Feedback"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
          Testimonial Text
        </label>
        <textarea
          value={formData.testimonial.text}
          onChange={(e) =>
            setFormData({
              ...formData,
              testimonial: { ...formData.testimonial, text: e.target.value },
            })
          }
          className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
          rows={4}
          placeholder="Enter the testimonial text"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
          Author Name
        </label>
        <input
          type="text"
          value={formData.testimonial.author.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              testimonial: {
                ...formData.testimonial,
                author: {
                  ...formData.testimonial.author,
                  name: e.target.value,
                },
              },
            })
          }
          className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
          placeholder="e.g., John Doe"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
          Author Title
        </label>
        <input
          type="text"
          value={formData.testimonial.author.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              testimonial: {
                ...formData.testimonial,
                author: {
                  ...formData.testimonial.author,
                  title: e.target.value,
                },
              },
            })
          }
          className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
          placeholder="e.g., CEO, Company Name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
          Author Image
        </label>
        <div className="flex items-start gap-4 mt-2">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-[#E5E5E5]">
            <img
              src={formData.testimonial.author.image}
              alt="Author"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() =>
                document.getElementById("authorImageInput")?.click()
              }
              className="px-4 py-2 bg-[#f5f5f5] border border-[#ddd] rounded text-sm hover:bg-[#eee] transition-colors flex items-center gap-2"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711C16.6333 11.4616 17.2665 11.4616 17.657 11.0711C18.0475 10.6806 18.0475 10.0474 17.657 9.65692L12.7071 4.70701C12.3166 4.31649 11.6834 4.31649 11.2929 4.70701L6.34315 9.65692C5.95262 10.0474 5.95262 10.6806 6.34315 11.0711C6.73367 11.4616 7.36684 11.4616 7.75736 11.0711L11 7.82831V14.9861Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
                <path
                  fill="currentColor"
                  d="M3 14C3 13.4477 3.44772 13 4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
              Choose Image
            </button>
            <input
              id="authorImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () =>
                    setFormData({
                      ...formData,
                      testimonial: {
                        ...formData.testimonial,
                        author: {
                          ...formData.testimonial.author,
                          image: reader.result as string,
                        },
                      },
                    });
                  reader.readAsDataURL(file);
                }
              }}
            />
            <div className="mt-2 text-[#5F5F5F] text-xs">
              Recommended size: 80x80 pixels
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
          Video Button Text
        </label>
        <input
          type="text"
          value={formData.testimonial.video.buttonText}
          onChange={(e) =>
            setFormData({
              ...formData,
              testimonial: {
                ...formData.testimonial,
                video: {
                  ...formData.testimonial.video,
                  buttonText: e.target.value,
                },
              },
            })
          }
          className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
          placeholder="e.g., Watch Video"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
          Video Thumbnail
        </label>
        <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-dashed border-[#E5E5E5] bg-white">
          <img
            src={formData.testimonial.video.image}
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />
          <div
            onClick={() =>
              document.getElementById("videoThumbnailInput")?.click()
            }
            className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path
                d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711C16.6333 11.4616 17.2665 11.4616 17.657 11.0711C18.0475 10.6806 18.0475 10.0474 17.657 9.65692L12.7071 4.70701C12.3166 4.31649 11.6834 4.31649 11.2929 4.70701L6.34315 9.65692C5.95262 10.0474 5.95262 10.6806 6.34315 11.0711C6.73367 11.4616 7.36684 11.4616 7.75736 11.0711L11 7.82831V14.9861Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
              <path
                d="M3 14C3 13.4477 3.44772 13 4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <input
            id="videoThumbnailInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () =>
                  setFormData({
                    ...formData,
                    testimonial: {
                      ...formData.testimonial,
                      video: {
                        ...formData.testimonial.video,
                        image: reader.result as string,
                      },
                    },
                  });
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
