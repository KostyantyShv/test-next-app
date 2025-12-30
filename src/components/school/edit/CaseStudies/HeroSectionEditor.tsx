import { CaseStudy } from "./types/caseStudy";

interface HeroSectionProps {
  formData: Omit<CaseStudy, "id" | "pinned">;
  setFormData: React.Dispatch<
    React.SetStateAction<Omit<CaseStudy, "id" | "pinned">>
  >;
}

export default function HeroSection({
  formData,
  setFormData,
}: HeroSectionProps) {
  const handleAddListItem = (column: "column1" | "column2") => {
    if (formData.infoColumns[column].items.length >= 5) {
      alert("Maximum of 5 items per column allowed");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      infoColumns: {
        ...prev.infoColumns,
        [column]: {
          ...prev.infoColumns[column],
          items: [...prev.infoColumns[column].items, ""],
        },
      },
    }));
  };

  const handleRemoveListItem = (
    column: "column1" | "column2",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      infoColumns: {
        ...prev.infoColumns,
        [column]: {
          ...prev.infoColumns[column],
          items: prev.infoColumns[column].items.filter((_, i) => i !== index),
        },
      },
    }));
  };

  const columns: ("column1" | "column2")[] = ["column1", "column2"];

  return (
    <div>
      <div className="bg-surface-secondary p-5 rounded-lg mb-6">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-default mb-2">
            Hero Subtitle
          </label>
          <input
            type="text"
            value={formData.hero.subtitle}
            onChange={(e) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero, subtitle: e.target.value },
              })
            }
            className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
            }}
            placeholder="e.g., Web Design for Construction Firms"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-default mb-2">
            Hero Title
          </label>
          <input
            type="text"
            value={formData.hero.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero, title: e.target.value },
              })
            }
            className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
            }}
            placeholder="e.g., Aecon Green Energy Solutions"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-default mb-2">
            Button Text
          </label>
          <input
            type="text"
            value={formData.hero.buttonText}
            onChange={(e) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero, buttonText: e.target.value },
              })
            }
            className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
            }}
            placeholder="e.g., Launch Website"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-default mb-2">
            Button URL
          </label>
          <input
            type="text"
            value={formData.hero.buttonUrl}
            onChange={(e) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero, buttonUrl: e.target.value },
              })
            }
            className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
            }}
            placeholder="e.g., https://example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-default mb-2">
            Hero Image
          </label>
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-dashed border-theme bg-surface">
            <img
              src={formData.hero.image}
              alt="Hero Image"
              className="w-full h-full object-cover"
            />
            <div
              onClick={() => document.getElementById("heroImageInput")?.click()}
              className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711C16.6333 11.4616 17.2665 11.4616 17.657 11.0711C18.0475 10.6806 18.0475 10.0474 17.657 9.65692L12.7071 4.70701C12.3166 4.31649 11.6834 4.31649 11.2929 4.70701L6.34315 9.65692C5.95262 10.0474 5.95262 10.6806 6.34315 11.0711C6.73367 11.4616 7.36684 11.4616 7.75736 11.0711L11 7.82831V14.9861Z" />
              </svg>
            </div>
            <input
              id="heroImageInput"
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
                      hero: {
                        ...formData.hero,
                        image: reader.result as string,
                      },
                    });
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-6 max-md:flex-col mb-6">
        {columns.map((column) => (
          <div key={column} className="flex-1 bg-surface-secondary p-5 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-default mb-2">
                {column === "column1" ? "Column 1 Title" : "Column 2 Title"}
              </label>
              <input
                type="text"
                value={formData.infoColumns[column].title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    infoColumns: {
                      ...formData.infoColumns,
                      [column]: {
                        ...formData.infoColumns[column],
                        title: e.target.value,
                      },
                    },
                  })
                }
                className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none"
                style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
                }}
                placeholder={
                  column === "column1"
                    ? "e.g., Web Design Services"
                    : "e.g., Platform"
                }
              />
            </div>
            <label className="block text-sm font-semibold text-default mb-2">
              List Items (max 5)
            </label>
            <div className="mb-4">
              {formData.infoColumns[column].items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...formData.infoColumns[column].items];
                      newItems[index] = e.target.value;
                      setFormData({
                        ...formData,
                        infoColumns: {
                          ...formData.infoColumns,
                          [column]: {
                            ...formData.infoColumns[column],
                            items: newItems,
                          },
                        },
                      });
                    }}
                    className="flex-1 p-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
                    }}
                    placeholder="Enter list item"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveListItem(column, index)}
                    className="text-lg bg-transparent border-none"
                    style={{ color: '#f93a37' }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleAddListItem(column)}
              className="w-full py-2 bg-surface-secondary border border-dashed border-theme rounded text-sm text-default flex items-center justify-center gap-2 hover:bg-hover transition-colors"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
              Add List Item
            </button>
          </div>
        ))}
      </div>
      <div className="bg-header-green text-white p-5 rounded-lg">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-white mb-2">
            Overview Title
          </label>
          <input
            type="text"
            value={formData.overview.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                overview: { ...formData.overview, title: e.target.value },
              })
            }
            className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-[rgba(255,255,255,0.9)] focus:outline-none"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
            }}
            placeholder="e.g., Project Overview"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Overview Text
          </label>
          <textarea
            value={formData.overview.text}
            onChange={(e) =>
              setFormData({
                ...formData,
                overview: { ...formData.overview, text: e.target.value },
              })
            }
            className="w-full p-3 border border-theme rounded-lg text-sm text-default bg-[rgba(255,255,255,0.9)] focus:outline-none"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLTextAreaElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border-color)';
            }}
            rows={4}
            placeholder="Enter the project overview text"
          />
        </div>
      </div>
    </div>
  );
}
