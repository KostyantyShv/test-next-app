import { memo } from "react";
import { Review } from "./types/review";

interface ReviewRowProps {
  review: Review;
  isExpanded: boolean;
  isDropdownActive: boolean;
  onToggleRow: (reviewId: string) => void;
  onToggleDropdown: (reviewId: string) => void;
  onReplyClick: (review: Review) => void;
  onDelete: (reviewId: string) => void;
  onToggleFeatured: (reviewId: string) => void;
}

const ICONS = {
  expandArrow: (
    <svg
      height="16"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19 9l-7 7-7-7"
        strokeLinejoin="round"
        strokeLinecap="round"
      ></path>
    </svg>
  ),
  thumbsUp: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width="18"
      height="18"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
  ),
  reply: (
    <svg viewBox="0 0 24 24" height="18" width="18" fill="currentColor">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path
        fillRule="nonzero"
        fill="currentColor"
        d="M19 1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1.263v4l-5.39-4H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h14zm0 1.5H5a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM16.25 12a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5zm0-3a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5zm0-3a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5z"
      ></path>
    </svg>
  ),
  view: (
    <svg fill="none" viewBox="0 0 20 20" width="18" height="18">
      <path
        fill="currentColor"
        d="M3.38189 10C5.24313 12.9154 7.45153 14.25 10 14.25C12.5485 14.25 14.7569 12.9154 16.6181 10C14.7569 7.0846 12.5485 5.75 10 5.75C7.45153 5.75 5.24313 7.0846 3.38189 10ZM1.85688 9.61413C3.94664 6.13119 6.65833 4.25 10 4.25C13.3417 4.25 16.0534 6.13119 18.1431 9.61413C18.2856 9.85164 18.2856 10.1484 18.1431 10.3859C16.0534 13.8688 13.3417 15.75 10 15.75C6.65833 15.75 3.94664 13.8688 1.85688 10.3859C1.71437 10.1484 1.71437 9.85164 1.85688 9.61413ZM8.29116 8.29116C8.74437 7.83795 9.35906 7.58333 10 7.58333C10.6409 7.58333 11.2556 7.83795 11.7088 8.29116C12.1621 8.74437 12.4167 9.35906 12.4167 10C12.4167 10.6409 12.1621 11.2556 11.7088 11.7088C11.2556 12.1621 10.6409 12.4167 10 12.4167C9.35906 12.4167 8.74437 12.1621 8.29116 11.7088C7.83795 11.2556 7.58333 10.6409 7.58333 10C7.58333 9.35906 7.83795 8.74437 8.29116 8.29116ZM10 9.08333C9.75689 9.08333 9.52373 9.17991 9.35182 9.35182C9.17991 9.52373 9.08333 9.75689 9.08333 10C9.08333 10.2431 9.17991 10.4763 9.35182 10.6482C9.52373 10.8201 9.75689 10.9167 10 10.9167C10.2431 10.9167 10.4763 10.8201 10.6482 10.6482C10.8201 10.4763 10.9167 10.2431 10.9167 10C10.9167 9.75689 10.8201 9.52373 10.6482 9.35182C10.4763 9.17991 10.2431 9.08333 10 9.08333Z"
      ></path>
    </svg>
  ),
  delete: (
    <svg viewBox="0 0 20 20" width="18" height="18">
      <g fillRule="nonzero" fill="#F44336">
        <path d="M11.429 2.357c1.014 0 1.845.783 1.922 1.778l.006.15v1.43a.5.5 0 0 1-.992.09l-.008-.09v-1.43a.93.93 0 0 0-.82-.922l-.108-.006H8.57a.93.93 0 0 0-.922.82l-.006.109v1.428a.5.5 0 0 1-.992.09l-.008-.09V4.286c0-1.015.783-1.846 1.778-1.923l.150-.006z"></path>
        <path d="M16.429 5.214a.5.5 0 0 1 .09.992l-.09.008H3.57a.5.5 0 0 1-.09-.992l.09-.008z"></path>
        <path d="M15 5.214H5a.5.5 0 0 0-.5.5v10c0 1.065.863 1.929 1.929 1.929h7.142a1.93 1.93 0 0 0 1.929-1.929v-10a.5.5 0 0 0-.5-.5m-9.5 1h9v9.5a.93.93 0 0 1-.929.929H6.43l-.109-.006a.93.93 0 0 1-.82-.923z"></path>
      </g>
    </svg>
  ),
};

function ReviewRow({
  review,
  isExpanded,
  isDropdownActive,
  onToggleRow,
  onToggleDropdown,
  onReplyClick,
  onDelete,
  onToggleFeatured,
}: ReviewRowProps) {
  return (
    <tr className={`main-row relative ${isExpanded ? "expanded" : ""}`}>
      <td className="p-4 bg-white border-b border-gray-200 align-middle">
        <button
          className="w-8 h-8 rounded-md bg-gray-100 border-none cursor-pointer flex items-center justify-center hover:bg-gray-200 transition-colors"
          onClick={() => onToggleRow(review.id)}
        >
          <span
            className={`${isExpanded ? "rotate-180" : ""} transition-transform`}
          >
            {ICONS.expandArrow}
          </span>
        </button>
      </td>
      <td className="p-4 bg-white border-b border-gray-200 align-middle">
        <div className="relative group">
          <span className="text-[0.95rem] font-semibold text-green-800 tracking-tight">
            {review.author.name}
          </span>
          <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-center rounded-md py-2 px-3 z-10 min-w-[120px] whitespace-nowrap text-xs font-normal transition-opacity">
            {review.author.fullName}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-t-gray-800 border-x-transparent border-b-transparent"></span>
          </span>
        </div>
      </td>
      <td className="p-4 bg-white border-b border-gray-200 align-middle">
        <div className="relative group">
          <span className="text-[0.95rem] text-gray-700 tracking-tight">
            {review.title.short}
          </span>
          <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-center rounded-md py-2 px-3 z-10 min-w-[120px] whitespace-nowrap text-xs font-normal transition-opacity">
            {review.title.full}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-t-gray-800 border-x-transparent border-b-transparent"></span>
          </span>
        </div>
      </td>
      <td className="p-4 bg-white border-b border-gray-200 align-middle">
        <div className="flex items-center gap-1 font-semibold text-green-600">
          <span className="text-green-400 pb-[5px]">★</span>
          <span>{review.rating}</span>
        </div>
      </td>
      <td className="p-4 bg-white border-b border-gray-200 align-middle">
        <div className="relative group">
          <span className="text-sm text-gray-600">
            {review.published.short}
          </span>
          <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-center rounded-md py-2 px-3 z-10 min-w-[120px] whitespace-nowrap text-xs font-normal transition-opacity">
            {review.published.full}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-t-gray-800 border-x-transparent border-b-transparent"></span>
          </span>
        </div>
      </td>
      <td className="p-4 bg-white border-b border-gray-200 align-middle">
        <div className="flex items-center gap-[6px] text-gray-600 font-medium">
          {ICONS.thumbsUp}
          {review.votes}
        </div>
      </td>
      <td className="p-4 bg-white border-b border-gray-200 align-middle">
        <label className="relative inline-block w-9 h-5">
          <input
            type="checkbox"
            checked={review.featured}
            onChange={() => onToggleFeatured(review.id)}
            className="opacity-0 w-0 h-0"
          />
          <span
            className={`absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-colors ${
              review.featured ? "bg-green-700" : ""
            }`}
          ></span>
          <span
            className={`absolute h-4 w-4 left-0.5 bottom-0.5 bg-white rounded-full transition-transform ${
              review.featured ? "translate-x-4" : ""
            }`}
          ></span>
        </label>
      </td>
      <td className="p-4 bg-white border-b border-gray-200 align-middle">
        <div className="relative">
          <div
            className="cursor-pointer p-2 rounded-md font-bold hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onToggleDropdown(review.id);
            }}
          >
            ⋮
          </div>
          <div
            className={`absolute right-0 top-full bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-[1000] ${
              isDropdownActive ? "block" : "hidden"
            }`}
          >
            <button
              className="w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 flex items-center gap-3"
              onClick={() => onReplyClick(review)}
            >
              {ICONS.reply}
              Reply to Review
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 flex items-center gap-3">
              {ICONS.view}
              View Review
            </button>
            {review.reply && (
              <>
                <div className="h-px bg-gray-200 my-2"></div>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 text-sm hover:bg-red-50 flex items-center gap-3"
                  onClick={() => onDelete(review.id)}
                >
                  {ICONS.delete}
                  Delete Reply
                </button>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default memo(ReviewRow);
