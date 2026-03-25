import React, { useEffect, useState } from "react";
import {
  CollectionsSchool,
  ConfirmModal,
  NoteModal,
  schools,
} from "../components/Card/Card";
import MapContainer from "../../explore/main-content/MapContainer";
import { School } from "../../explore/types";
import { CardGrid } from "../components/Card/card-layouts/CardGrid";
import { CardGridMobile } from "../components/Card/card-layouts/CardGridMobile";
import { CardList } from "../components/Card/card-layouts/CardList";
import { CardListMobile } from "../components/Card/card-layouts/CardListMobile";
import { CardHybrid } from "../components/Card/card-layouts/CardHybrid";
import { CardClassic } from "../components/Card/card-layouts/CardClassic";
import { CardTable } from "../components/Card/card-layouts/CardTable";
import { CardTableMobile } from "../components/Card/card-layouts/CardTableMobile";
import { CardCard } from "../components/Card/card-layouts/CardCard";
import { CardMagazine } from "../components/Card/card-layouts/CardMagazine";
import { CardMagazineMobile } from "../components/Card/card-layouts/CardMagazineMobile";

interface ContentAreaProps {
  isMapActive: boolean;
  layout?: string;
}

const GRID_ITEM_LIMIT = 8;

const ContentArea: React.FC<ContentAreaProps> = ({ isMapActive, layout = "grid" }) => {
  const [schoolData, setSchoolData] = useState<CollectionsSchool[]>(schools);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isMapExpanded, setIsMapExpanded] = useState(false);

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

  const visibleSchools = schoolData.slice(0, GRID_ITEM_LIMIT);

  const mobileBottomNavOffsetClass =
    "pb-[calc(56px+env(safe-area-inset-bottom)+16px)]";

  const mobileLayoutContainerClass =
    layout === "list"
      ? `min-w-0 flex flex-col gap-4 ${mobileBottomNavOffsetClass}`
      : layout === "hybrid"
      ? `min-w-0 grid grid-cols-1 gap-3 ${mobileBottomNavOffsetClass}`
      : layout === "magazine"
      ? "min-w-0 flex flex-col gap-4"
      : "min-w-0 grid grid-cols-1 gap-3";

  const desktopLayoutContainerClass =
    layout === "list" || layout === "magazine"
      ? "hidden min-w-0 md:flex md:flex-col md:gap-4"
      : layout === "hybrid"
      ? "hidden min-w-0 md:grid md:grid-cols-1 xl:grid-cols-2 md:gap-4"
      : layout === "classic"
      ? "hidden min-w-0 md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-5"
      : "hidden min-w-0 md:grid md:[grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] md:gap-6";

  /** Modal handlers (desktop-style cards) — used for hybrid/classic/card/magazine on narrow viewports so layouts don’t all collapse to the same grid tile. */
  const modalCardProps = (school: CollectionsSchool, i: number) => ({
    school,
    index: i,
    layout,
    onRatingChange: handleRatingChange,
    onStatusChange: handleStatusChange,
    onCreateNote: handleCreateNote,
    onEditNote: handleEditNote,
    onDeleteNote: handleDeleteNote,
  });

  const renderMobileCard = (school: CollectionsSchool, i: number) => {
    const direct = {
      school,
      index: i,
      onRatingChange: handleRatingChange,
      onStatusChange: handleStatusChange,
      onCreateNoteDirect: handleCreateNoteDirect,
      onEditNoteDirect: handleEditNoteDirect,
      onDeleteNoteDirect: handleDeleteNoteDirect,
    };
    switch (layout) {
      case "list":
        return <CardListMobile {...direct} />;
      case "magazine":
        return <CardMagazineMobile {...direct} />;
      case "hybrid":
        return <CardHybrid {...modalCardProps(school, i)} />;
      case "classic":
        return <CardClassic {...modalCardProps(school, i)} />;
      case "card":
        return <CardCard {...modalCardProps(school, i)} />;
      case "grid":
      default:
        return <CardGridMobile {...direct} />;
    }
  };

  const renderDesktopCard = (school: CollectionsSchool, i: number) => {
    const d = {
      school,
      index: i,
      layout,
      onRatingChange: handleRatingChange,
      onStatusChange: handleStatusChange,
      onCreateNote: handleCreateNote,
      onEditNote: handleEditNote,
      onDeleteNote: handleDeleteNote,
    };
    switch (layout) {
      case "list":
        return <CardList {...d} />;
      case "magazine":
        return <CardMagazine {...d} />;
      case "hybrid":
        return <CardHybrid {...d} />;
      case "classic":
        return <CardClassic {...d} />;
      case "table":
        return <CardTable {...d} />;
      case "card":
        return <CardCard {...d} />;
      default:
        return <CardGrid {...d} />;
    }
  };

  return (
    <div className="flex min-h-[400px] min-w-0 flex-col items-stretch md:flex-row md:items-start">
      <div
        className={`min-w-0 flex-1 p-0 transition-all duration-300 ${isMapExpanded ? "hidden" : ""
          }`}
        aria-hidden={isMapExpanded}
      >
        {layout === "table" ? (
          <div className="w-full md:hidden">
            <CardTableMobile
              schools={visibleSchools}
              onRatingChange={handleRatingChange}
              onStatusChange={handleStatusChange}
              onCreateNote={handleCreateNote}
              onEditNote={handleEditNote}
              onDeleteNote={handleDeleteNote}
            />
          </div>
        ) : (
          <div className={`md:hidden ${mobileLayoutContainerClass}`}>
            {visibleSchools.map((school: CollectionsSchool, i: number) => (
              <React.Fragment key={`mobile-${i}`}>
                {renderMobileCard(school, i)}
              </React.Fragment>
            ))}
          </div>
        )}

        {layout === "table" ? (
          <div className="hidden min-w-0 md:flex md:flex-col md:gap-4">
            {visibleSchools.map((school: CollectionsSchool, i: number) => (
              <React.Fragment key={`desktop-table-${i}`}>
                {renderDesktopCard(school, i)}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className={desktopLayoutContainerClass}>
            {visibleSchools.map((school: CollectionsSchool, i: number) => (
              <React.Fragment key={`desktop-${i}`}>
                {renderDesktopCard(school, i)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      <MapContainer
        isMapActive={isMapActive}
        layout={layout}
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
