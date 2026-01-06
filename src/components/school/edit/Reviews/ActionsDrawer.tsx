import { Review } from "./types/review";

interface ActionsDrawerProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
  onReply: () => void;
  onView: () => void;
  onDelete: () => void;
}

export default function ActionsDrawer({
  review,
  isOpen,
  onClose,
  onReply,
  onView,
  onDelete,
}: ActionsDrawerProps) {
  if (!review) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[100] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] max-h-[70vh] overflow-y-auto transition-transform duration-300 z-[101] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center">
          <div className="text-lg font-semibold text-[#016853]">Review Actions</div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-none border-none cursor-pointer text-[#5F5F5F] rounded-full active:bg-[#F3F4F6]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="py-2">
          <button
            className="w-full flex items-center gap-3 px-4 py-4 cursor-pointer border-b border-[#F3F4F6] text-[#4A4A4A] active:bg-[#F3F4F6]"
            onClick={() => {
              onReply();
              onClose();
            }}
          >
            <svg viewBox="0 0 24 24" height="20" width="20" fill="currentColor" className="text-[#5F5F5F]">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path fillRule="nonzero" fill="currentColor" d="M19 1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1.263v4l-5.39-4H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h14zm0 1.5H5a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM16.25 12a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5zm0-3a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5zm0-3a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5z"></path>
            </svg>
            <span className="text-base flex-grow">Reply to Review</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-4 cursor-pointer border-b border-[#F3F4F6] text-[#4A4A4A] active:bg-[#F3F4F6]"
            onClick={() => {
              onView();
              onClose();
            }}
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20" className="text-[#5F5F5F]">
              <path fill="currentColor" d="M3.38189 10C5.24313 12.9154 7.45153 14.25 10 14.25C12.5485 14.25 14.7569 12.9154 16.6181 10C14.7569 7.0846 12.5485 5.75 10 5.75C7.45153 5.75 5.24313 7.0846 3.38189 10ZM1.85688 9.61413C3.94664 6.13119 6.65833 4.25 10 4.25C13.3417 4.25 16.0534 6.13119 18.1431 9.61413C18.2856 9.85164 18.2856 10.1484 18.1431 10.3859C16.0534 13.8688 13.3417 15.75 10 15.75C6.65833 15.75 3.94664 13.8688 1.85688 10.3859C1.71437 10.1484 1.71437 9.85164 1.85688 9.61413ZM8.29116 8.29116C8.74437 7.83795 9.35906 7.58333 10 7.58333C10.6409 7.58333 11.2556 7.83795 11.7088 8.29116C12.1621 8.74437 12.4167 9.35906 12.4167 10C12.4167 10.6409 12.1621 11.2556 11.7088 11.7088C11.2556 12.1621 10.6409 12.4167 10 12.4167C9.35906 12.4167 8.74437 12.1621 8.29116 11.7088C7.83795 11.2556 7.58333 10.6409 7.58333 10C7.58333 9.35906 7.83795 8.74437 8.29116 8.29116ZM10 9.08333C9.75689 9.08333 9.52373 9.17991 9.35182 9.35182C9.17991 9.52373 9.08333 9.75689 9.08333 10C9.08333 10.2431 9.17991 10.4763 9.35182 10.6482C9.52373 10.8201 9.75689 10.9167 10 10.9167C10.2431 10.9167 10.4763 10.8201 10.6482 10.6482C10.8201 10.4763 10.9167 10.2431 10.9167 10C10.9167 9.75689 10.8201 9.52373 10.6482 9.35182C10.4763 9.17991 10.2431 9.08333 10 9.08333Z"></path>
            </svg>
            <span className="text-base flex-grow">View Review</span>
          </button>
          {review.reply && (
            <>
              <div className="h-2 bg-[#F3F4F6]"></div>
              <button
                className="w-full flex items-center gap-3 px-4 py-4 cursor-pointer text-[#FF4D4D] active:bg-[#FFF1F1]"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
              >
                <svg viewBox="0 0 20 20" width="20" height="20">
                  <g fillRule="nonzero" fill="#FF4D4D">
                    <path d="M11.429 2.357c1.014 0 1.845.783 1.922 1.778l.006.15v1.43a.5.5 0 0 1-.992.09l-.008-.09v-1.43a.93.93 0 0 0-.82-.922l-.108-.006H8.57a.93.93 0 0 0-.922.82l-.006.109v1.428a.5.5 0 0 1-.992.09l-.008-.09V4.286c0-1.015.783-1.846 1.778-1.923l.15-.006z"></path>
                    <path d="M16.429 5.214a.5.5 0 0 1 .09.992l-.09.008H3.57a.5.5 0 0 1-.09-.992l.09-.008z"></path>
                    <path d="M15 5.214H5a.5.5 0 0 0-.5.5v10c0 1.065.863 1.929 1.929 1.929h7.142a1.93 1.93 0 0 0 1.929-1.929v-10a.5.5 0 0 0-.5-.5m-9.5 1h9v9.5a.93.93 0 0 1-.929.929H6.43l-.109-.006a.93.93 0 0 1-.82-.923z"></path>
                  </g>
                </svg>
                <span className="text-base flex-grow">Delete Reply</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

