import React, { useMemo, useState } from "react";
import { School } from "../../types";
import { SchoolCardIcons } from "../../SchoolCardIcons";
import { SchoolCardContextMenu } from "../../SchoolCardContextMenu";

type Props = {
  school: School;
};

const getSpecialtyMeta = (
  specialty: School["specialty"]
): { icon: React.ReactNode; text: string; className: string } | null => {
  if (!specialty) return null;
  if (specialty === "hot")
    return {
      icon: <SchoolCardIcons.Hot />,
      text: "Hot",
      className: "mh-specialty-hot",
    };
  if (specialty === "instant-book")
    return {
      icon: <SchoolCardIcons.InstantBook />,
      text: "Book",
      className: "mh-specialty-instant-book",
    };
  return {
    icon: <SchoolCardIcons.Sponsored />,
    text: "Ad",
    className: "mh-specialty-sponsored",
  };
};

const parseRatingValue = (rating: string): number => {
  const value = Number.parseFloat(rating);
  return Number.isFinite(value) ? value : 0;
};

const MobileHybridSchoolCard: React.FC<Props> = ({ school }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const ratingValue = useMemo(() => parseRatingValue(school.rating), [school.rating]);
  const specialtyMeta = useMemo(
    () => getSpecialtyMeta(school.specialty),
    [school.specialty]
  );

  return (
    <div className="mh-school-card" role="article">
      <div className="mh-school-header">
        <div className="mh-school-type-label">{school.schoolType}</div>

        <div className={`mh-image-container ${school.specialty ? "mh-has-specialty" : ""}`}>
          <img src={school.image} alt={school.name} className="mh-school-image" />
          {specialtyMeta && (
            <div className={`mh-specialty-footer ${specialtyMeta.className}`}>
              {specialtyMeta.icon}
              {specialtyMeta.text}
            </div>
          )}
        </div>

        <div className="mh-school-title-container">
          {school.ranking ? <div className="mh-ranking-text">{school.ranking}</div> : null}
          <h3 className="mh-school-name">
            {school.name}
            {school.verified ? (
              <span className="mh-verified-badge-title" aria-label="Verified">
                <SchoolCardIcons.Verified />
              </span>
            ) : null}
          </h3>
        </div>

        <div className="mh-more-options" aria-label="More options">
          <SchoolCardContextMenu
            schoolName={school.name}
            buttonClassName="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-[#464646] bg-transparent border-none pointer-events-auto relative z-50"
          />
        </div>
      </div>

      <div className="mh-school-stats">
        <div className="mh-stat" data-tooltip="Location">
          <SchoolCardIcons.Location />
          <span>{school.location}</span>
        </div>
        <div className="mh-stat" data-tooltip="Student-Teacher Ratio">
          <SchoolCardIcons.Ratio />
          <span className="stat-prefix">Ratio: </span>
          <span className="mh-stat-strong">{school.ratio}</span>
        </div>
        <div className="mh-stat" data-tooltip="Students">
          <SchoolCardIcons.Students />
          <span className="stat-prefix">Students: </span>
          <span className="mh-stat-strong">{school.students}</span>
        </div>
        <div className="mh-stat" data-tooltip="Tuition">
          <SchoolCardIcons.Tuition />
          <span>{school.price}</span>
        </div>
      </div>

      <div className="mh-school-description">
        <div className={`mh-description-text ${isDescriptionExpanded ? "expanded" : ""}`}>
          <span className="mh-truncated-text">{school.description}</span>{" "}
          <a href="#" className="mh-review-link" onClick={(e) => e.preventDefault()}>
            Read {school.reviews} reviews
          </a>
        </div>
        <button
          type="button"
          className="mh-view-more-description"
          onClick={() => setIsDescriptionExpanded((v) => !v)}
        >
          {isDescriptionExpanded ? "View Less" : "View More"}
        </button>
      </div>

      <div className="mh-school-footer">
        <div className="mh-metrics">
          <div className="mh-grade">
            <div className="mh-grade-circle">{school.grade}</div>
          </div>

          <div className="mh-reviews">
            <div className="mh-star-rating">
              <SchoolCardIcons.Star />
              <span className="mh-rating-value">{ratingValue.toFixed(1)}</span>
              <span className="mh-review-count">({school.reviews})</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={`mh-btn-like ${isLiked ? "liked" : ""}`}
          onClick={() => setIsLiked((v) => !v)}
        >
          <SchoolCardIcons.Heart filled={isLiked} />
          {isLiked ? "Liked" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default MobileHybridSchoolCard;

