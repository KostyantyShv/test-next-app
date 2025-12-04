import { useState } from "react";
import Modal from "./AfterCollegeModal";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import styles from "./AfterCollegeCard.module.css";

const AfterCollege: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CardWrapper id={id}>
        <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-[-0.02em]">
          After College
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="md:pr-8 max-md:pb-8 max-md:border-b md:border-r border-[rgba(0,0,0,0.1)]">
            <div className="text-[#4A4A4A] text-[15px] font-medium mb-3">
              Median Earnings 6 Years After Graduation
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-[#1B1B1B] text-5xl font-bold tracking-[-0.03em]">
                $56,000
              </div>
              <div className="text-[#5F5F5F] text-sm font-medium">per year</div>
            </div>
            <div className="text-[#5F5F5F] text-[13px] mt-2">
              National $33,028
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-[#4A4A4A] text-[15px] font-medium">
                Graduation Rate
              </span>
              <div className="flex flex-col items-end">
                <span className="text-[#089E68] text-xl font-semibold">
                  90%
                </span>
                <span className="text-[#5F5F5F] text-xs">Natl. 49%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4A4A4A] text-[15px] font-medium">
                Employed 2 Years After Graduation
              </span>
              <div className="flex flex-col items-end">
                <span className="text-[#089E68] text-xl font-semibold">
                  92%
                </span>
                <span className="text-[#5F5F5F] text-xs">Natl. 83%</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.pollSection}>
          <div className={styles.pollContent}>
            <div className={styles.pollHeader}>
              <div className={styles.pollIcon}></div>
              <div className={styles.pollTitle}>POLL</div>
            </div>
            <div className={styles.pollStat}>87%</div>
          </div>
          <div className={styles.pollDescription}>
            of students feel confident they will find a job in their field after
            graduation.
          </div>
          <div className={styles.pollResponses}>282 responses</div>
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          className="flex items-center md:text-[#346DC2] max-md:text-[#016853] max-md:p-4 max-md:bg-[#EBFCF4] rounded-lg text-sm font-medium gap-1 justify-end hover:underline"
        >
          Read More About Life After Graduation
          <svg
            className="w-4 h-4 text-[#565656] transition-transform hover:translate-x-[2px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </CardWrapper>
      <div className="hidden md:block">
        <DesktopModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Modal onClose={() => setIsModalOpen(false)} />
        </DesktopModal>
      </div>
      <div className="block md:hidden">
        <MobileDrawer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Modal onClose={() => setIsModalOpen(false)} />
        </MobileDrawer>
      </div>
    </>
  );
};

export default AfterCollege;
