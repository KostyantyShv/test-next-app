import { useState } from "react";
import { CaseStudy } from "./types/caseStudy";

interface ContentSectionsProps {
  formData: Omit<CaseStudy, "id" | "pinned">;
  setFormData: React.Dispatch<
    React.SetStateAction<Omit<CaseStudy, "id" | "pinned">>
  >;
}

export default function ContentSections({
  formData,
  setFormData,
}: ContentSectionsProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const handleAddSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          label: "",
          title: "",
          description: "",
          features: [],
          buttonText: "",
          image: "https://i.ibb.co/GvnKvp2Z/image1.png",
        },
      ],
    }));
    setExpandedSections((prev) => [...prev, formData.sections.length + 1]);
  };

  const handleRemoveSection = (index: number) => {
    if (confirm("Are you sure you want to remove this section?")) {
      setFormData((prev) => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index),
      }));
      setExpandedSections((prev) => prev.filter((id) => id !== index + 1));
    }
  };

  const handleToggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index + 1)
        ? prev.filter((id) => id !== index + 1)
        : [...prev, index + 1]
    );
  };

  const handleAddFeature = (sectionIndex: number) => {
    if (formData.sections[sectionIndex].features.length >= 5) {
      alert("Maximum of 5 features allowed");
      return;
    }
    setFormData((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        features: [...newSections[sectionIndex].features, ""],
      };
      return { ...prev, sections: newSections };
    });
  };

  const handleRemoveFeature = (sectionIndex: number, featureIndex: number) => {
    setFormData((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        features: newSections[sectionIndex].features.filter(
          (_, i) => i !== featureIndex
        ),
      };
      return { ...prev, sections: newSections };
    });
  };

  const handleAddFeatureBox = () => {
    if (formData.keyFeatures.features.length >= 4) {
      alert("Maximum of 4 features allowed");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      keyFeatures: {
        ...prev.keyFeatures,
        features: [
          ...prev.keyFeatures.features,
          { icon: "grid", title: "", description: "" },
        ],
      },
    }));
  };

  const handleRemoveFeatureBox = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: {
        ...prev.keyFeatures,
        features: prev.keyFeatures.features.filter((_, i) => i !== index),
      },
    }));
  };

  const gridIcon = (
    <svg
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M4 4h6v6h-6z" />
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6h-6z" />
      <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    </svg>
  );

  return (
    <div>
      <div className="mb-6">
        {formData.sections.map((section, index) => (
          <div
            key={index}
            className="bg-surface-secondary p-5 rounded-lg mb-4 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-base font-semibold text-[#262B3D]">
                Section {index + 1}
              </div>
              <div className="flex gap-2">
                <span
                  onClick={() => handleToggleSection(index)}
                  className="cursor-pointer text-[#5F5F5F]"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6L3 10.5 3 9.5 10 5 17 9.5 17 10.5z" />
                    <path d="M5 12h10v1H5z" />
                    <path d="M5 15h10v1H5z" />
                  </svg>
                </span>
                <span
                  onClick={() => handleRemoveSection(index)}
                  className="cursor-pointer text-[#f93a37]"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                  </svg>
                </span>
              </div>
            </div>
            <div
              className={
                expandedSections.includes(index + 1) ? "block" : "hidden"
              }
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold text-default mb-2">
                  Section Label
                </label>
                <input
                  type="text"
                  value={section.label}
                  onChange={(e) => {
                    const newSections = [...formData.sections];
                    newSections[index] = {
                      ...newSections[index],
                      label: e.target.value,
                    };
                    setFormData({ ...formData, sections: newSections });
                  }}
                  className="w-full px-3 py-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none focus:border-[var(--brand-teal)]"
                  placeholder="e.g., Web Design Process"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-default mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => {
                    const newSections = [...formData.sections];
                    newSections[index] = {
                      ...newSections[index],
                      title: e.target.value,
                    };
                    setFormData({ ...formData, sections: newSections });
                  }}
                  className="w-full px-3 py-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none focus:border-[var(--brand-teal)]"
                  placeholder="e.g., Building a Sustainable Digital Presence"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-default mb-2">
                  Section Description
                </label>
                <textarea
                  value={section.description}
                  onChange={(e) => {
                    const newSections = [...formData.sections];
                    newSections[index] = {
                      ...newSections[index],
                      description: e.target.value,
                    };
                    setFormData({ ...formData, sections: newSections });
                  }}
                  className="w-full px-3 py-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none focus:border-[var(--brand-teal)]"
                  rows={3}
                  placeholder="Enter section description"
                />
              </div>
              <label className="block text-sm font-semibold text-default mb-2">
                Features List (max 5)
              </label>
              <div className="mb-4">
                {section.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex gap-3 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newSections = [...formData.sections];
                        newSections[index].features[fIndex] = e.target.value;
                        setFormData({ ...formData, sections: newSections });
                      }}
                      className="flex-1 px-3 py-2 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none focus:border-[var(--brand-teal)]"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index, fIndex)}
                      className="text-[#f93a37] text-lg bg-transparent border-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleAddFeature(index)}
                className="w-full py-2 bg-surface-secondary border border-dashed border-theme rounded text-sm text-default flex items-center justify-center gap-2 hover:bg-hover transition-colors mb-4"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
                Add Feature
              </button>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-default mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={section.buttonText}
                  onChange={(e) => {
                    const newSections = [...formData.sections];
                    newSections[index] = {
                      ...newSections[index],
                      buttonText: e.target.value,
                    };
                    setFormData({ ...formData, sections: newSections });
                  }}
                  className="w-full px-3 py-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none focus:border-[var(--brand-teal)]"
                  placeholder="e.g., View Technical Details"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-default mb-2">
                  Section Image
                </label>
                <div className="relative w-full h-[120px] rounded-lg overflow-hidden border border-dashed border-theme bg-surface">
                  <img
                    src={section.image}
                    alt="Section Image"
                    className="w-full h-full object-cover"
                  />
                  <div
                    onClick={() =>
                      document
                        .getElementById(`sectionImageInput-${index}`)
                        ?.click()
                    }
                    className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711C16.6333 11.4616 17.2665 11.4616 17.657 11.0711C18.0475 10.6806 18.0475 10.0474 17.657 9.65692L12.7071 4.70701C12.3166 4.31649 11.6834 4.31649 11.2929 4.70701L6.34315 9.65692C5.95262 10.0474 5.95262 10.6806 6.34315 11.0711C6.73367 11.4616 7.36684 11.4616 7.75736 11.0711L11 7.82831V14.9861Z" />
                    </svg>
                  </div>
                  <input
                    id={`sectionImageInput-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          const newSections = [...formData.sections];
                          newSections[index] = {
                            ...newSections[index],
                            image: reader.result as string,
                          };
                          setFormData({ ...formData, sections: newSections });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSection}
          className="w-full py-3 bg-surface-secondary border border-dashed border-theme rounded-lg text-sm text-default flex items-center justify-center gap-2 hover:bg-hover transition-colors"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
          Add Content Section
        </button>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#262B3D] mb-4">
          Key Features Section
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-default mb-2">
            Section Label
          </label>
          <input
            type="text"
            value={formData.keyFeatures.label}
            onChange={(e) =>
              setFormData({
                ...formData,
                keyFeatures: { ...formData.keyFeatures, label: e.target.value },
              })
            }
            className="w-full p-3 border border-theme rounded-lg text-sm text-default focus:outline-none focus:border-[var(--brand-teal)]"
            placeholder="e.g., Key Features"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-default mb-2">
            Section Title
          </label>
          <input
            type="text"
            value={formData.keyFeatures.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                keyFeatures: { ...formData.keyFeatures, title: e.target.value },
              })
            }
            className="w-full p-3 border border-theme rounded-lg text-sm text-default focus:outline-none focus:border-[var(--brand-teal)]"
            placeholder="e.g., Advanced Functionality"
          />
        </div>
        <label className="block text-sm font-semibold text-default mb-2">
          Feature Boxes
        </label>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-4">
          {formData.keyFeatures.features.map((feature, index) => (
            <div
              key={index}
              className="bg-surface p-5 rounded-lg border border-theme relative"
            >
              <button
                type="button"
                onClick={() => handleRemoveFeatureBox(index)}
                className="absolute top-2 right-2 text-[#f93a37] text-lg bg-transparent border-none"
              >
                ×
              </button>
              <div className="w-10 h-10 mb-4 flex items-center justify-center text-[#02C5AF]">
                {gridIcon}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const newFeatures = [...formData.keyFeatures.features];
                    newFeatures[index] = {
                      ...newFeatures[index],
                      title: e.target.value,
                    };
                    setFormData({
                      ...formData,
                      keyFeatures: {
                        ...formData.keyFeatures,
                        features: newFeatures,
                      },
                    });
                  }}
                  className="w-full px-3 py-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none focus:border-[var(--brand-teal)]"
                  placeholder="Feature Title"
                />
              </div>
              <div>
                <textarea
                  value={feature.description}
                  onChange={(e) => {
                    const newFeatures = [...formData.keyFeatures.features];
                    newFeatures[index] = {
                      ...newFeatures[index],
                      description: e.target.value,
                    };
                    setFormData({
                      ...formData,
                      keyFeatures: {
                        ...formData.keyFeatures,
                        features: newFeatures,
                      },
                    });
                  }}
                  className="w-full px-3 py-3 border border-theme rounded-lg text-sm text-default bg-surface focus:outline-none focus:border-[var(--brand-teal)]"
                  rows={2}
                  placeholder="Feature Description"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddFeatureBox}
          className="w-full py-3 bg-surface-secondary border border-dashed border-theme rounded-lg text-sm text-default flex items-center justify-center gap-2 hover:bg-hover transition-colors"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
          Add Feature Box
        </button>
      </div>
    </div>
  );
}
