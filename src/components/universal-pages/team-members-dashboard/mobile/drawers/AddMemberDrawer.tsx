import { useState } from "react";
import { useTeam } from "../hooks/useTeam";
import { useToast } from "../hooks/useToast";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

interface AddMemberDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMemberDrawer({ isOpen, onClose }: AddMemberDrawerProps) {
  const [email, setEmail] = useState("");
  const { setMembers } = useTeam();
  const { showToast } = useToast();

  const handleAddMember = () => {
    if (email.trim()) {
      setMembers((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          firstName: email.split("@")[0],
          lastName: "",
          email,
          avatar: "https://i.ibb.co/Df7nqk1/AVATAR-laurentfa.png",
          status: "pending",
          lastActive: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          isAdmin: false,
          listings: [],
        },
      ]);
      showToast(`Invitation sent to ${email}`, "success");
      setEmail("");
      onClose();
    } else {
      showToast("Please enter a valid email", "error");
    }
  };

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose}>
      <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-bold-text">
          Add Team Member
        </h2>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close Add Member"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="px-5 py-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-bold-text"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-text-default focus:border-active-green focus:outline-none focus:ring-2 focus:ring-active-green/10"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="sticky bottom-0 border-t border-gray-200 bg-white px-5 py-4">
        <button
          className="w-full rounded-lg bg-apply-button-bg px-4 py-2.5 text-sm font-semibold text-active-green transition-colors hover:bg-apply-button-hover"
          onClick={handleAddMember}
        >
          Send Invitation
        </button>
      </div>
    </MobileDrawer>
  );
}
