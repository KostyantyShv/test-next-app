"use client";
import React from "react";
import styles from "./MobileSchoolCardList.module.css";

interface SchoolData {
  name: string;
  schoolType: string;
  location: string;
  rating: string;
  image: string;
  ranking?: string;
  grade?: string;
  sat?: string;
  price?: string;
  acceptance?: string;
  specialty?: "hot" | "instant-book" | "sponsored";
  students?: string;
  ratio?: string;
  grades?: string;
  totalSchools?: string;
  duration?: string;
  medianSalary?: string;
}

interface MobileSchoolCardListProps {
  schools: SchoolData[];
  establishment: string;
}

const MobileSchoolCardList: React.FC<MobileSchoolCardListProps> = ({
  schools,
  establishment,
}) => {
  const getSpecialtyLabel = (specialty?: string) => {
    if (!specialty) return null;

    const labels = {
      hot: {
        text: "High demand",
        icon: (
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ),
        className: "hot"
      },
      "instant-book": {
        text: "Instant book",
        icon: (
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ),
        className: "instant-book"
      },
      sponsored: {
        text: "Sponsored",
        icon: (
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ),
        className: "sponsored"
      }
    };

    const label = labels[specialty as keyof typeof labels];
    if (!label) return null;

         return (
       <div className={`${styles.specialtyLabel} ${styles[label.className]}`}>
         <span className={styles.specialtyIcon}>
           {label.icon}
         </span>
         {label.text}
       </div>
     );
  };

  const getStats = (school: SchoolData) => {
    switch (establishment) {
      case "K-12":
        return (
          <>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span>{school.grade}</span>
            </div>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8M16 4V2H8V4M16 4H8M12 6V14M9 11L12 14L15 11" />
              </svg>
              <span>{school.sat}</span>
            </div>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span>{school.price}</span>
            </div>
          </>
        );
      case "Colleges":
        return (
          <>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span>{school.grade}</span>
            </div>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8M16 4V2H8V4M16 4H8M12 6V14M9 11L12 14L15 11" />
              </svg>
              <span>{school.sat}</span>
            </div>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span>{school.price}</span>
            </div>
          </>
        );
      case "Graduates":
        return (
          <>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span>{school.grade}</span>
            </div>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8M16 4V2H8V4M16 4H8M12 6V14M9 11L12 14L15 11" />
              </svg>
              <span>{school.students}</span>
            </div>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span>{school.price}</span>
            </div>
          </>
        );
      case "District":
        return (
          <>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span>{school.grade}</span>
            </div>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8M16 4V2H8V4M16 4H8M12 6V14M9 11L12 14L15 11" />
              </svg>
              <span>{school.students}</span>
            </div>
            <div className={styles.stat}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span>{school.ratio}</span>
            </div>
          </>
        );
      default:
        return null;
    }
  };

     return (
     <div className="space-y-4 p-3">
       {schools.map((school, index) => (
         <div key={index} className={styles.schoolCard}>
           <div className={styles.cardMain}>
             {/* Image Section */}
             <div className={styles.imageWrapper}>
               <img
                 src={school.image}
                 alt={school.name}
                 className={styles.schoolThumbnail}
               />
               <div className={styles.schoolTypeFooter}>
                 {school.schoolType}
               </div>
               
               {/* Options Button */}
               <button className={styles.optionsButton}>
                 <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                   <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" />
                   <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" />
                   <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" />
                 </svg>
               </button>
               
               {/* Specialty Label */}
               {getSpecialtyLabel(school.specialty)}
             </div>
             
             {/* Content Section */}
             <div className={styles.schoolContent}>
               {school.ranking && (
                 <div className={styles.rankingText}>{school.ranking}</div>
               )}
               
               <h3 className={styles.schoolName}>{school.name}</h3>
               
               <div className={styles.schoolLocation}>{school.location}</div>
               
               <div className={styles.statsRow}>
                 {getStats(school)}
               </div>
             </div>
           </div>
         </div>
       ))}
     </div>
   );
};

export default MobileSchoolCardList; 