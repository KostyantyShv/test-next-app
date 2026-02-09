"use client";

import { useState } from "react";
import { CaseStudy } from "./types/caseStudy";
import { initialCaseStudies } from "./mock/caseStudies";
import CaseStudyList from "./CaseStudiesList";
import CaseStudiesModal from "./CaseStudiesModal";

export default function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] =
    useState<CaseStudy[]>(initialCaseStudies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  const handleAddCaseStudy = () => {
    setCurrentEditId(null);
    setIsModalOpen(true);
  };

  const handleEditCaseStudy = (id: number) => {
    setCurrentEditId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEditId(null);
  };

  const handleSaveCaseStudy = (caseStudy: Omit<CaseStudy, "id" | "pinned">) => {
    if (currentEditId) {
      setCaseStudies((prev) =>
        prev.map((study) =>
          study.id === currentEditId
            ? { ...caseStudy, id: currentEditId, pinned: study.pinned }
            : study
        )
      );
    } else {
      if (caseStudies.length >= 10) {
        alert("Maximum number of case studies (10) reached.");
        return;
      }
      setCaseStudies((prev) => [
        ...prev,
        { ...caseStudy, id: Date.now(), pinned: false },
      ]);
    }
    handleCloseModal();
  };

  const handleDeleteCaseStudy = () => {
    if (
      currentEditId &&
      confirm("Are you sure you want to delete this case study?")
    ) {
      setCaseStudies((prev) =>
        prev.filter((study) => study.id !== currentEditId)
      );
      handleCloseModal();
    }
  };

  const handleTogglePin = (id: number) => {
    setCaseStudies((prev) =>
      prev.map((study) => ({
        ...study,
        pinned: study.id === id ? !study.pinned : false,
      }))
    );
  };

  return (
    <>
      <div className="max-w-[1150px] mx-auto flex gap-[25px] max-md:flex-col">
        {/* Desktop Header */}
        <div className="w-[375px] max-md:hidden max-md:w-full max-md:pt-6 max-md:pb-6 max-md:pr-6">
          <h1 className="text-[#1a1a19] text-2xl font-semibold mb-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
            Case Studies
          </h1>
          <p className="text-[#5F5F5F] text-base leading-[1.6]">
            Create and manage detailed case studies to showcase your best work,
            highlight successful projects, and demonstrate your expertise.
          </p>
        </div>

        {/* Mobile Header */}
        <div className="hidden max-md:block px-4 pt-4 pb-4">
          <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: 'var(--bold-text)' }}>
            Case Studies
          </h1>
          <p className="text-base leading-6" style={{ color: 'var(--subtle-text)' }}>
            Create and manage detailed case studies to showcase your best work,
            highlight successful projects, and demonstrate your expertise.
          </p>
        </div>

        <div className="relative w-[750px] bg-white p-[24px] rounded-[8px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] font-sans max-md:w-full max-md:bg-transparent max-md:p-0 max-md:rounded-none max-md:shadow-none">
          <div className="relative max-md:bg-white max-md:rounded-lg max-md:shadow-[0_1px_3px_rgba(0,0,0,0.1)] max-md:p-4 max-md:mx-4 max-md:mb-4">
            <div className="case-studies-count-wrapper">
              <div className="case-studies-count">
                {caseStudies.length}/10
              </div>
            </div>
            <CaseStudyList
              caseStudies={[...caseStudies].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))}
              onEdit={handleEditCaseStudy}
              onTogglePin={handleTogglePin}
            />
            <button
              onClick={handleAddCaseStudy}
              className="bg-[var(--brand-teal)] max-md:bg-[#02C5AF] text-white px-6 max-md:px-0 py-3 max-md:py-3 rounded-lg max-md:rounded-lg text-sm max-md:text-sm font-semibold max-md:font-semibold hover:opacity-90 max-md:hover:opacity-90 transition-opacity max-md:w-full max-md:mt-[18px]"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            >
              Add Case Study
            </button>
          </div>
        </div>
      </div>
      <CaseStudiesModal
        isOpen={isModalOpen}
        caseStudy={caseStudies.find((study) => study.id === currentEditId)}
        onSave={handleSaveCaseStudy}
        onDelete={handleDeleteCaseStudy}
        onClose={handleCloseModal}
      />
    </>
  );
}
