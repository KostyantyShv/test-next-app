import React, { useEffect, useState } from "react";
import {
  CollectionsSchool,
  ConfirmModal,
  NoteModal,
  schools,
} from "../components/Card/Card";
import MapContainer from "../../explore/main-content/MapContainer";
import { School } from "../../explore/types";
import { CardList } from "../components/Card/card-layouts/CardList";
import { CardHybrid } from "../components/Card/card-layouts/CardHybrid";
import { CardTable } from "../components/Card/card-layouts/CardTable";
import { CardGrid } from "../components/Card/card-layouts/CardGrid";
import { CardCard } from "../components/Card/card-layouts/CardCard";
import { CardClassic } from "../components/Card/card-layouts/CardClassic";
import { CardGridMobile } from "../components/Card/card-layouts/CardGridMobile";
import { CardListMobile } from "../components/Card/card-layouts/CardListMobile";
import { CardMagazine } from "../components/Card/card-layouts/CardMagazine";
import { CardMagazineMobile } from "../components/Card/card-layouts/CardMagazineMobile";
import { CardTableMobile } from "../components/Card/card-layouts/CardTableMobile";

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
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Keep behavior identical to Explore: if the map panel is closed, ensure we exit expanded mode.
  useEffect(() => {
    if (!isMapActive) setIsMapExpanded(false);
  }, [isMapActive]);

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
    magazine: 4,
  };

  // Match Explore behavior: grid columns change when map is open (and "card" behaves like grid for sizing).
  const effectiveLayoutForMap = layout === "card" ? "grid" : layout;

  const getExploreLikeGridCols = (variant: "grid" | "hybrid" | "classic") => {
    if (variant === "grid") {
      // Keep cards readable on narrower viewports (avoid overlap).
      return isMapActive
        ? "grid-cols-2 max-[900px]:grid-cols-1"
        : "grid-cols-3 max-[1200px]:grid-cols-2 max-[900px]:grid-cols-1";
    }
    if (variant === "hybrid") {
      return isMapActive ? "grid-cols-1" : "grid-cols-2 max-[900px]:grid-cols-1";
    }
    // classic
    return isMapActive
      ? "grid-cols-2 max-[900px]:grid-cols-1"
      : "grid-cols-4 max-[1200px]:grid-cols-3 max-[1000px]:grid-cols-2 max-[800px]:grid-cols-1";
  };

  const handleCreateNoteDirect = (schoolIndex: number, text: string) => {
    if (!text.trim()) return;
    setSchoolData((prev) => {
      const next = [...prev];
      const notes = next[schoolIndex].notes ?? [];
      const newId =
        notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 1;
      notes.push({
        id: newId,
        author: "You",
        content: text.trim(),
        timestamp: "Just now",
        time: "0:00",
      });
      next[schoolIndex].notes = notes;
      return next;
    });
  };

  const handleEditNoteDirect = (
    schoolIndex: number,
    noteId: number,
    text: string
  ) => {
    if (!text.trim()) return;
    setSchoolData((prev) => {
      const next = [...prev];
      const idx = next[schoolIndex].notes.findIndex((note) => note.id === noteId);
      if (idx !== -1) {
        next[schoolIndex].notes[idx] = {
          ...next[schoolIndex].notes[idx],
          content: text.trim(),
          timestamp: "Just now",
        };
      }
      return next;
    });
  };

  const handleDeleteNoteDirect = (schoolIndex: number, noteId: number) => {
    setSchoolData((prev) => {
      const next = [...prev];
      next[schoolIndex].notes = next[schoolIndex].notes.filter(
        (note) => note.id !== noteId
      );
      return next;
    });
  };

  // Keep map prop shape identical to Explore map component (even though we render collections cards).
  const mapSchools: School[] = schoolData.map((school) => ({
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
  }));

  return (
    <div className="flex min-h-[400px] min-w-0 flex-col items-stretch md:flex-row md:items-start">
      <div
        className={`min-w-0 flex-1 p-0 transition-all duration-300 md:p-6 ${isMapExpanded ? "hidden" : ""
          }`}
        aria-hidden={isMapExpanded}
      >
        <div
          className={`min-w-0 ${layout === "card"
              ? "flex flex-col gap-4 py-4 px-3 md:grid md:gap-6 md:px-0 md:py-0 md:[grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]"
              : "hidden"
            }`}
        >
          {schoolData
            .slice(0, cardCounts.classic)
            .map((school: CollectionsSchool, i: number) => (
              <React.Fragment key={i}>
                <div className="w-full md:hidden">
                  <CardGridMobile
                    school={school}
                    index={i}
                    onRatingChange={handleRatingChange}
                    onStatusChange={handleStatusChange}
                    onCreateNoteDirect={handleCreateNoteDirect}
                    onEditNoteDirect={handleEditNoteDirect}
                    onDeleteNoteDirect={handleDeleteNoteDirect}
                  />
                </div>
                <div className="hidden h-full md:block">
                  <CardCard
                    school={school}
                    index={i}
                    layout="card"
                    onRatingChange={handleRatingChange}
                    onStatusChange={handleStatusChange}
                    onCreateNote={handleCreateNote}
                    onEditNote={handleEditNote}
                    onDeleteNote={handleDeleteNote}
                  />
                </div>
              </React.Fragment>
            ))}
        </div>
        <div
          className={`flex flex-col gap-4 min-w-0 ${layout === "list" ? "py-4 pl-4 pr-5 md:py-0 md:pl-0 md:pr-0 block" : "hidden"
            }`}
        >
          {schoolData
            .slice(0, cardCounts.list)
            .map((school: CollectionsSchool, i: number) => (
              <React.Fragment key={i}>
                <div className="w-full md:hidden">
                  <CardListMobile
                    school={school}
                    index={i}
                    onRatingChange={handleRatingChange}
                    onStatusChange={handleStatusChange}
                    onCreateNoteDirect={handleCreateNoteDirect}
                    onEditNoteDirect={handleEditNoteDirect}
                    onDeleteNoteDirect={handleDeleteNoteDirect}
                  />
                </div>
                <div className="hidden md:block">
                  <CardList
                    school={school}
                    index={i}
                    layout={layout}
                    onRatingChange={handleRatingChange}
                    onStatusChange={handleStatusChange}
                    onCreateNote={handleCreateNote}
                    onEditNote={handleEditNote}
                    onDeleteNote={handleDeleteNote}
                  />
                </div>
              </React.Fragment>
            ))}
        </div>
        <div
          className={`flex flex-col gap-4 min-w-0 ${layout === "magazine" ? "py-4 pl-4 pr-5 md:py-0 md:pl-0 md:pr-0 block" : "hidden"
            }`}
        >
          {schoolData
            .slice(0, cardCounts.magazine)
            .map((school: CollectionsSchool, i: number) => (
              <React.Fragment key={i}>
                <div className="w-full md:hidden">
                  <CardMagazineMobile
                    school={school}
                    index={i}
                    onRatingChange={handleRatingChange}
                    onStatusChange={handleStatusChange}
                    onCreateNoteDirect={handleCreateNoteDirect}
                    onEditNoteDirect={handleEditNoteDirect}
                    onDeleteNoteDirect={handleDeleteNoteDirect}
                  />
                </div>
                <div className="hidden md:block">
                  <CardMagazine
                    school={school}
                    index={i}
                    layout={layout}
                    onRatingChange={handleRatingChange}
                    onStatusChange={handleStatusChange}
                    onCreateNote={handleCreateNote}
                    onEditNote={handleEditNote}
                    onDeleteNote={handleDeleteNote}
                  />
                </div>
              </React.Fragment>
            ))}
        </div>
        <div
          className={`grid gap-6 min-w-0 ${layout === "hybrid" ? getExploreLikeGridCols("hybrid") : "hidden"
            }`}
        >
          {schoolData
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
        {/* Table layout: mobile = table-list body (CardTableMobile); desktop = existing table rows (CardTable). Header unchanged. */}
        {layout === "table" ? (
          <>
            <div className="min-w-0 md:hidden">
              <CardTableMobile
                schools={schoolData.slice(0, cardCounts.classic)}
                onRatingChange={handleRatingChange}
                onStatusChange={handleStatusChange}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            </div>
            <div
              className={`grid gap-6 min-w-0 hidden md:grid grid-cols-1`}
            >
              {schoolData
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
          </>
        ) : null}
        <div
          className={`grid gap-6 min-w-0 ${layout === "classic" ? getExploreLikeGridCols("classic") : "hidden"
            }`}
        >
          {schoolData
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
          className={`min-w-0 ${layout === "grid"
              ? "flex flex-col gap-4 py-4 px-3 md:grid md:gap-6 md:px-0 md:py-0 md:[grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]"
              : "hidden"
            }`}
        >
          {schoolData
            .slice(0, cardCounts.classic)
            .map((school: CollectionsSchool, i: number) => (
              <React.Fragment key={i}>
                <div className="w-full md:hidden">
                  <CardGridMobile
                    school={school}
                    index={i}
                    onRatingChange={handleRatingChange}
                    onStatusChange={handleStatusChange}
                    onCreateNoteDirect={handleCreateNoteDirect}
                    onEditNoteDirect={handleEditNoteDirect}
                    onDeleteNoteDirect={handleDeleteNoteDirect}
                  />
                </div>
                <div className="hidden h-full md:block">
                  <CardGrid
                    school={school}
                    index={i}
                    layout={layout}
                    onRatingChange={handleRatingChange}
                    onStatusChange={handleStatusChange}
                    onCreateNote={handleCreateNote}
                    onEditNote={handleEditNote}
                    onDeleteNote={handleDeleteNote}
                  />
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
      {/* Use the same MapContainer behavior as Explore (expand/collapse, sizing by layout, reset on close). */}
      <MapContainer
        isMapActive={isMapActive}
        layout={effectiveLayoutForMap}
        onExpandedChange={setIsMapExpanded}
        schools={mapSchools}
      />
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
