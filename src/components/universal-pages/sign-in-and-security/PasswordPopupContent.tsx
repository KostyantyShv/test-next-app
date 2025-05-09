import React, { useState } from "react";

interface PasswordPopupContentProps {
  onClose: () => void;
}

const PasswordPopupContent: React.FC<PasswordPopupContentProps> = ({
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    alert("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <div className="max-md:m-5">
      <div className="flex justify-between items-center mb-5 pb-[15px] border-b border-[#EBEDF0]">
        <h3 className="text-xl font-semibold text-[#1B1B1B]">
          Set New Password
        </h3>
        <button
          className="w-[30px] h-[30px] bg-[#E4E6EB] rounded-full text-[#5F5F5F] text-xl flex items-center justify-center cursor-pointer hover:bg-[#D8DADF] transition-colors duration-200"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="mb-6">
        <div className="mb-[15px]">
          <input
            type="password"
            className="w-full p-[12px_15px] border border-[#DFDDDB] rounded-md text-base text-[#4A4A4A] bg-[#F5F6F7] focus:outline-none focus:border-[#346DC2] focus:bg-white focus:shadow-[0_0_0_2px_rgba(52,109,194,0.2)] transition-all duration-150"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-[15px]">
          <input
            type="password"
            className="w-full p-[12px_15px] border border-[#DFDDDB] rounded-md text-base text-[#4A4A4A] bg-[#F5F6F7] focus:outline-none focus:border-[#346DC2] focus:bg-white focus:shadow-[0_0_0_2px_rgba(52,109,194,0.2)] transition-all duration-150"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            className="w-full p-[12px_15px] border border-[#DFDDDB] rounded-md text-base text-[#4A4A4A] bg-[#F5F6F7] focus:outline-none focus:border-[#346DC2] focus:bg-white focus:shadow-[0_0_0_2px_rgba(52,109,194,0.2)] transition-all duration-150"
            placeholder="Retype new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2.5">
        <button
          className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer border border-[#E4E6EB] bg-[#E4E6EB] text-[#050505] hover:bg-[#D8DADF] transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer border border-[#1B1B1B] bg-[#1B1B1B] text-white hover:bg-black transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap"
          onClick={handleSave}
        >
          Save Password
        </button>
      </div>
    </div>
  );
};

export default PasswordPopupContent;
