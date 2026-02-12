"use client";
/* eslint-disable @next/next/no-img-element */

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
  const sortedCaseStudies = [...caseStudies].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned)
  );

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
          <div className="hidden max-md:block relative bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-4 mx-4 mb-4">
            <div className="absolute top-4 right-4 text-[13px] font-semibold text-[#4A4A4A] px-3 py-1 bg-[#F8F9FA] rounded-2xl">
              {caseStudies.length}/10
            </div>

            <div className="pt-[10px]">
              {sortedCaseStudies.map((study) => {
                const statusClass =
                  study.status === "published"
                    ? "text-[#0B6333]"
                    : "text-[#5F5F5F]";
                const statusText =
                  study.status === "published" ? "Published" : "Draft";

                return (
                  <div
                    key={study.id}
                    className={`rounded-lg p-4 mb-3 flex items-start gap-3 ${
                      study.pinned
                        ? "bg-[#EBFCF4] border border-[#D7F7E9]"
                        : "bg-[#F8F9FA]"
                    }`}
                  >
                    <div className="w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={study.thumbnail}
                        alt={study.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[13px] font-semibold text-[#262B3D] truncate">
                            {study.category}
                          </span>
                          <div className="text-xs">
                            <span className={`font-medium ${statusClass}`}>
                              {statusText}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 items-center">
                          <button
                            type="button"
                            onClick={() => handleTogglePin(study.id)}
                            className="w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center"
                          >
                            <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
                              <path d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M7.5 12.5L3.75 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M12.084 3.33398L16.6673 7.91732" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditCaseStudy(study.id)}
                            className="w-8 h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center"
                          >
                            <svg fill="none" viewBox="0 0 24 24" width="20" height="20">
                              <path fill="currentColor" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" clipRule="evenodd" fillRule="evenodd"></path>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <h3 className="text-base font-semibold text-[#262B3D] mb-[6px] line-clamp-2 max-h-[44px]">
                        {study.title}
                      </h3>
                      <p className="text-[13px] leading-[1.5] text-[#4A4A4A] line-clamp-2">
                        {study.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleAddCaseStudy}
              className="w-full mt-[18px] bg-[#02C5AF] text-white py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
            >
              Add Case Study
            </button>
          </div>

          <div className="max-md:hidden">
            <div className="case-studies-count-wrapper">
              <div className="case-studies-count">{caseStudies.length}/10</div>
            </div>
            <CaseStudyList
              caseStudies={sortedCaseStudies}
              onEdit={handleEditCaseStudy}
              onTogglePin={handleTogglePin}
            />
            <button
              onClick={handleAddCaseStudy}
              className="bg-[var(--brand-teal)] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
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
