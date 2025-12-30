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
      <div className="w-full mx-auto flex max-md:flex-col gap-[25px]">
        <div className="max-w-[350px] w-full max-md:p-6">
          <h1 className="text-[#1a1a19] text-2xl font-semibold mb-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
            Case Studies
          </h1>
          <p className="text-[#5F5F5F] text-base leading-[1.6]">
            Create and manage detailed case studies to showcase your best work,
            highlight successful projects, and demonstrate your expertise.
          </p>
        </div>
        <div className="w-full bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative">
          <CaseStudyList
            caseStudies={caseStudies}
            onEdit={handleEditCaseStudy}
            onTogglePin={handleTogglePin}
          />
          <button
            onClick={handleAddCaseStudy}
            className="bg-[#02C5AF] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Add Case Study
          </button>
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
