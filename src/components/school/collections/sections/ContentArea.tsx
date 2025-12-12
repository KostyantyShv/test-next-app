import React, { useState } from "react";
import {
  CollectionsSchool,
  ConfirmModal,
  NoteModal,
  SchoolCard,
  schools,
} from "../components/Card/Card";
import MapContainer from "../../explore/main-content/MapContainer";
import { School } from "../../explore/types";
import { CardList } from "../components/Card/card-layouts/CardList";
import { CardGrid } from "../components/Card/card-layouts/CardGrid";
import { CardHybrid } from "../components/Card/card-layouts/CardHybrid";
import { CardTable } from "../components/Card/card-layouts/CardTable";
import { CardCard } from "../components/Card/card-layouts/CardCard";
import { CardClassic } from "../components/Card/card-layouts/CardClassic";

interface ContentAreaProps {
  isMapActive: boolean;
  layout: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ isMapActive, layout }) => {
  const [schoolData, setSchoolData] = useState<CollectionsSchool[]>(schools);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState("");

  const handleRatingChange = (index: number, rating: number) => {
    setSchoolData((prev) => {
      const newData = [...prev];
      newData[index].myRating = rating;
      return newData;
    });
  };

  const handleStatusChange = (index: number, status: string) => {
    setSchoolData((prev) => {
      const newData = [...prev];
      newData[index].status = status;
      return newData;
    });
  };

  const handleCreateNote = (index: number) => {
    setCurrentSchoolId(index);
    setIsEditing(false);
    setNoteText("");
    setIsNoteModalOpen(true);
  };

  const handleEditNote = (index: number, noteId: number) => {
    const note = schoolData[index].notes.find((note) => note.id === noteId);
    if (note) {
      setCurrentSchoolId(index);
      setCurrentNoteId(noteId);
      setIsEditing(true);
      setNoteText(note.content);
      setIsNoteModalOpen(true);
    }
  };

  const handleDeleteNote = (index: number, noteId: number) => {
    setCurrentSchoolId(index);
    setCurrentNoteId(noteId);
    setIsConfirmModalOpen(true);
  };

  const handleSaveNote = (text: string) => {
    if (text.trim() !== "" && currentSchoolId !== null) {
      setSchoolData((prev) => {
        const newData = [...prev];
        if (isEditing && currentNoteId !== null) {
          const noteIndex = newData[currentSchoolId].notes.findIndex(
            (note) => note.id === currentNoteId
          );
          if (noteIndex !== -1) {
            newData[currentSchoolId].notes[noteIndex] = {
              ...newData[currentSchoolId].notes[noteIndex],
              content: text.trim(),
              timestamp: "Just now",
            };
          }
        } else {
          const newId =
            newData[currentSchoolId].notes.length > 0
              ? Math.max(
                  ...newData[currentSchoolId].notes.map((note) => note.id)
                ) + 1
              : 1;
          newData[currentSchoolId].notes.push({
            id: newId,
            author: "You",
            content: text.trim(),
            timestamp: "Just now",
            time: "0:00",
          });
        }
        return newData;
      });
      closeNoteModal();
    }
  };

  const handleConfirmDelete = () => {
    if (currentSchoolId !== null && currentNoteId !== null) {
      setSchoolData((prev) => {
        const newData = [...prev];
        newData[currentSchoolId].notes = newData[currentSchoolId].notes.filter(
          (note) => note.id !== currentNoteId
        );
        return newData;
      });
      closeConfirmModal();
    }
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
    setNoteText("");
    setCurrentSchoolId(null);
    setCurrentNoteId(null);
    setIsEditing(false);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setCurrentSchoolId(null);
    setCurrentNoteId(null);
  };

  const cardCounts = {
    grid: 6,
    list: 4,
    hybrid: 4,
    classic: 8,
  };

  return (
    <div className="flex flex-col md:flex-row p-3 sm:p-4 md:p-6 min-h-[400px]">
      <div className="flex-1 transition-all duration-300">
        <div
          className={`grid gap-3 sm:gap-4 md:gap-6 ${
            layout === "card" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "hidden"
          } ${isMapActive ? "grid-cols-1 md:grid-cols-2" : ""}`}
        >
          {schoolData
            .slice(0, cardCounts.grid)
            .map((school: CollectionsSchool, i: number) => (
              <CardGrid
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`flex flex-col gap-3 sm:gap-4 ${
            layout === "list" ? "block" : "hidden"
          }`}
        >
          {schools
            .slice(0, cardCounts.list)
            .map((school: CollectionsSchool, i: number) => (
              <CardList
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`grid gap-3 sm:gap-4 md:gap-6 ${
            layout === "hybrid" ? "grid-cols-1 sm:grid-cols-2" : "hidden"
          } ${isMapActive ? "grid-cols-1" : ""}`}
        >
          {schools
            .slice(0, cardCounts.hybrid)
            .map((school: CollectionsSchool, i: number) => (
              <CardHybrid
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`grid gap-3 sm:gap-4 md:gap-6 ${
            layout === "table" ? "grid-cols-1" : "hidden"
          } ${isMapActive ? "grid-cols-1" : ""}`}
        >
          {schools
            .slice(0, cardCounts.classic)
            .map((school: CollectionsSchool, i: number) => (
              <CardTable
                key={i}
                school={school}
                index={i}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`grid gap-3 sm:gap-4 md:gap-6 ${
            layout === "classic" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "hidden"
          } ${isMapActive ? "grid-cols-2 sm:grid-cols-3" : ""}`}
        >
          {schools
            .slice(0, cardCounts.classic)
            .map((school: CollectionsSchool, i: number) => (
              <CardClassic
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
        <div
          className={`grid gap-3 sm:gap-4 md:gap-6 ${
            layout === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "hidden"
          } ${isMapActive ? "grid-cols-1 md:grid-cols-2" : ""}`}
        >
          {schools
            .slice(0, cardCounts.classic)
            .map((school: CollectionsSchool, i: number) => (
              <CardCard
                key={i}
                school={school}
                index={i}
                layout={layout}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            ))}
        </div>
      </div>
      {isMapActive && (
        <div className="hidden md:block w-full md:w-1/3 lg:w-1/4">
          <MapContainer
            isMapActive={isMapActive}
            schools={schoolData.map((school) => ({
              name: school.name,
              schoolType: school.schoolType,
              location: school.location,
              ratio: "",
              rating: school.rating,
              image: school.image,
              avatar: school.avatar,
              ranking: school.ranking || "",
              grade: school.grade,
              students: school.students,
              price: "",
              grades: school.grades,
              specialty: school.specialty as "hot" | "instant-book" | "sponsored" | undefined,
              specialtyLabel: school.specialty,
              description: school.description,
              reviews: school.reviews,
            }))}
          />
        </div>
      )}
      <NoteModal
        isOpen={isNoteModalOpen}
        title={isEditing ? "Edit Note" : "Create Note"}
        noteText={noteText}
        onClose={closeNoteModal}
        onSave={handleSaveNote}
        onChange={setNoteText}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ContentArea;
