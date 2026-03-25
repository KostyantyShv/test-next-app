"use client";

import React from "react";
import Divider from "@/components/ui/form/divider/Divider";

interface CollectionsMobileActionsContentProps {
  onClose: () => void;
  onOpenCreateModal: () => void;
}

/**
 * Collection actions shown inside the mobile Options sheet (Vaul), matching ActionsDropdown behavior.
 */
export function CollectionsMobileActionsContent({
  onClose,
  onOpenCreateModal,
}: CollectionsMobileActionsContentProps) {
  const rowCls =
    "text-[#4A4A4A] flex flex-row gap-3 items-center px-4 py-3.5 active:bg-[#f5f5f7]";

  return (
    <div className="border-b border-[rgba(0,0,0,0.1)] py-1">
      <div className="px-2 pt-3 pb-1 text-base font-medium text-[#1B1B1B]">Collection</div>
      <div className="text-sm font-medium">
        <button
          type="button"
          className={`${rowCls} w-full text-left`}
          onClick={() => onClose()}
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="currentColor"
                d="M18.2929 5.70711C16.4743 3.88849 13.5257 3.88849 11.7071 5.7071L10.7071 6.70711C10.3166 7.09763 9.68341 7.09763 9.29289 6.70711C8.90236 6.31658 8.90236 5.68342 9.29289 5.29289L10.2929 4.29289C12.8926 1.69323 17.1074 1.69323 19.7071 4.29289C22.3068 6.89256 22.3068 11.1074 19.7071 13.7071L18.7071 14.7071C18.3166 15.0976 17.6834 15.0976 17.2929 14.7071C16.9024 14.3166 16.9024 13.6834 17.2929 13.2929L18.2929 12.2929C20.1115 10.4743 20.1115 7.52572 18.2929 5.70711Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <span>Copy Link</span>
        </button>
        <button type="button" className={`${rowCls} w-full text-left`} onClick={() => onClose()}>
          <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
            <path
              d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M7.5 12.5L3.75 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.084 3.33398L16.6673 7.91732" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Pin Collection</span>
        </button>
        <button type="button" className={`${rowCls} w-full text-left`} onClick={() => onClose()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
          <span>Edit Collection</span>
        </button>
        <button
          type="button"
          className={`${rowCls} w-full text-left`}
          onClick={() => {
            onClose();
            onOpenCreateModal();
          }}
        >
          <span>
            <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="nonzero"
                d="M16 9a7 7 0 1 1 0 14 7 7 0 1 1 0-14zm4-7a2 2 0 0 1 2 2v4h-1.5V3.5h-17v17H8V22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16zm-3 10h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
              />
            </svg>
          </span>
          <span>Create Collection</span>
        </button>
        <Divider />
        <button type="button" className={`${rowCls} w-full text-left text-[#f93a37]`} onClick={() => onClose()}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="currentColor"
                d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
