import Image from "next/image";
import { useEffect, useState } from "react";
import { Checkbox } from "../Checkbox";
import { TeamMember } from "../types";
import { StatusBadge } from "../StatusBadge";

interface MemberRowProps {
  member: TeamMember;
  isSelected: boolean;
  onToggleSelect: (id: number, selected: boolean) => void;
  onManageClick: (id: number) => void;
  isDropdownOpen: number | null;
  openModal: (type: string, id?: number) => void;
  availableListings: TeamMember["listings"];
  onResendInvitation: (id: number) => void;
  onUpdateListings: (id: number, listingIds: number[]) => void;
}

export const MemberRow: React.FC<MemberRowProps> = ({
  member,
  isSelected,
  onToggleSelect,
  onManageClick,
  isDropdownOpen,
  openModal,
  availableListings,
  onResendInvitation,
  onUpdateListings,
}) => {
  const [selectedListingIds, setSelectedListingIds] = useState<number[]>(
    member.listings.map((l) => l.id)
  );

  useEffect(() => {
    setSelectedListingIds(member.listings.map((l) => l.id));
  }, [member.listings, member.id]);

  const toggleListing = (id: number) => {
    setSelectedListingIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSaveListings = () => {
    onUpdateListings(member.id, selectedListingIds);
  };

  const firstListingName = member.listings[0]?.name || "";
  const listingNameWords = firstListingName
    ? firstListingName.split(/\s+/).filter(Boolean)
    : [];
  const listingBadgeLabel = listingNameWords.slice(0, 2).join(" ");
  const listingBadgeText =
    listingNameWords.length > 2
      ? `${listingBadgeLabel}...`
      : listingBadgeLabel;

  return (
    <tr key={member.id}>
      <td className="p-4 border-b border-gray-200">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onToggleSelect(member.id, e.target.checked)}
        />
      </td>
      <td className="p-4 border-b border-gray-200">
        <div className="member-info flex items-center gap-4">
          <div className="avatar w-10 h-10 rounded-full flex-shrink-0">
            <Image
              width={720}
              height={720}
              src={member.avatar}
              alt={`${member.firstName} ${member.lastName}`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="member-details flex flex-col gap-1">
            <div className="name-section flex items-center gap-3">
              <span className="member-name text-base font-semibold text-[#464646]">{`${member.firstName} ${member.lastName}`}</span>
              {member.isAdmin ? (
                <span className="badge badge-admin max-w-[160px] truncate inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#dbeafe] text-[#142E53]">
                  Admin
                </span>
              ) : member.listings.length > 0 ? (
                <>
                  <span className="badge badge-listing  max-w-[160px] truncate inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#e4e4e4] text-[#343332]">
                    {listingBadgeText}
                  </span>
                  {member.listings.length > 1 && (
                    <span className="multiple-badge inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#d6d6d6] text-[#343332] text-xs font-semibold ml-2">
                      +{member.listings.length - 1}
                    </span>
                  )}
                </>
              ) : null}
            </div>
            <span className="member-email text-sm text-gray-500">
              {member.email}
            </span>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-gray-200">
        <StatusBadge status={member.status} />
      </td>
      <td className="p-4 border-b border-gray-200">{member.lastActive}</td>
      <td className="p-4 border-b border-gray-200">
        <button
          onClick={() => openModal("activity", member.id)}
          className="view-btn px-4 py-2 border border-gray-200 bg-white rounded-md text-sm text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          View
        </button>
      </td>
      <td className="p-4 border-b border-gray-200">
        <div className="manage-wrapper relative">
          <button
            onClick={() => onManageClick(member.id)}
            className="manage-btn px-4 py-2 border border-gray-200 bg-white rounded-md text-sm text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Manage ▾
          </button>
          <div
            className={`dropdown absolute right-0 top-full mt-2 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border border-gray-200 min-w-[175px] z-10 ${
              isDropdownOpen === member.id ? "block" : "hidden"
            }`}
          >
            <button
              className="flex w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              onClick={() => openModal("edit", member.id)}
            >
              Edit
            </button>
            <button
              className="flex w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              onClick={() => openModal("delete", member.id)}
            >
              Delete
            </button>
            {(member.status === "pending" || member.status === "rejected") && (
              <button
                onClick={() => onResendInvitation(member.id)}
                className="flex w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Resend Invitation
              </button>
            )}
            {(member.status === "accepted" || member.status === "pending") &&
              !member.isAdmin && (
                <div className="dropdown-item-with-arrow relative px-0 w-full group">
                  <button
                    type="button"
                    className="flex-grow w-full flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left"
                  >
                    Assign to Listing
                    <svg
                      className="bundle-arrow w-[10px] h-[10px] ml-2 fill-gray-500"
                      viewBox="0 0 25 40"
                    >
                      <path d="M0.494387 4.20556C0.221231 4.47872 0.22099 4.92152 0.493848 5.19497L14.7733 19.5056C15.0459 19.7788 15.0459 20.2212 14.7733 20.4944L0.493849 34.805C0.220991 35.0785 0.221231 35.5213 0.494388 35.7944L4.20498 39.505C4.47834 39.7784 4.92156 39.7784 5.19493 39.505L24.205 20.495C24.4783 20.2216 24.4783 19.7784 24.205 19.505L5.19493 0.494976C4.92156 0.221609 4.47834 0.221608 4.20498 0.494975L0.494387 4.20556Z"></path>
                    </svg>
                  </button>
                  <div className="nested-dropdown absolute left-full top-0 ml-2 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-2 min-w-[250px] opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible z-20">
                    {availableListings.map((listing) => {
                      const selected = selectedListingIds.includes(listing.id);
                      return (
                        <button
                          key={listing.id}
                          type="button"
                          onClick={() => toggleListing(listing.id)}
                          className="listing-item flex items-center gap-3 p-2.5 cursor-pointer hover:bg-gray-50 transition-colors w-full text-left"
                        >
                          <Image
                            width={32}
                            height={32}
                            src={listing.image}
                            alt={listing.name}
                            className="listing-thumbnail w-8 h-8 rounded object-cover"
                          />
                          <span className="listing-title text-sm text-[#464646]">
                            {listing.name}
                          </span>
                          <div className="listing-check w-4 h-4 ml-auto text-[#016853] flex items-center justify-center">
                            {selected && (
                              <svg
                                className="checkmark-icon w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M9 16.17L4.83 12 3.41 13.41 9 19 21 7 19.59 5.59z" />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                    <div className="listing-actions flex justify-end pt-2 border-t border-gray-200 mt-2">
                      <button
                        type="button"
                        onClick={handleSaveListings}
                        className="save-listings-btn py-1.5 px-3 bg-[#016853] text-white rounded text-xs font-medium hover:bg-[#0B6333] transition-colors w-full"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </td>
    </tr>
  );
};
