"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import BillingInformation from "./BillingInformation";
import AddPaymentModal from "./modals/add-payment/AddPaymentModal";
import EditPaymentModal from "./modals/edit-payment/EditPaymentModal";
import InvoiceDetailModal from "./modals/invoice-detail/InvoiceDetailModal";
import PastInvoicesModal from "./modals/past-invoices/PastInvoicesModal";
import ConfirmationModal from "./modals/confirmation/ConfirmationModal";

// Components
const inter = Inter({ subsets: ["latin"] });

export default function BillingPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeBadges, setActiveBadges] = useState<string[]>([
    "Analytics",
    "Reporting",
  ]);
  const [pendingAddonName, setPendingAddonName] = useState<string | null>(null);
  const [confirmationType, setConfirmationType] = useState<
    "add" | "remove" | null
  >(null);

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = ""; // Restore scrolling
  };

  const requestRemoveAddon = (name: string) => {
    setPendingAddonName(name);
    setConfirmationType("remove");
    openModal("confirmation");
  };

  const requestAddAddon = (name: string) => {
    // Додаємо аддон одразу, без модального підтвердження
    setActiveBadges((prev) =>
      prev.includes(name) ? prev : [...prev, name]
    );
  };

  const handleConfirmAddonChange = () => {
    if (!pendingAddonName || !confirmationType) {
      closeModal();
      return;
    }

    if (confirmationType === "remove") {
      setActiveBadges((prev) =>
        prev.filter((badge) => badge !== pendingAddonName)
      );
    } else if (confirmationType === "add") {
      setActiveBadges((prev) =>
        prev.includes(pendingAddonName) ? prev : [...prev, pendingAddonName]
      );
    }

    setPendingAddonName(null);
    setConfirmationType(null);
    closeModal();
  };

  return (
    <div className={`${inter.className} text-[#4A4A4A]`}>
      <div className="max-w-[1055px] mx-auto my-5 max-md:mx-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#464646] font-semibold text-2xl flex items-center gap-2">
            Billing
            <span className="w-[18px] h-[18px] border border-[#5F5F5F] rounded-full flex items-center justify-center text-xs text-[#5F5F5F] cursor-pointer">
              ?
            </span>
          </h1>
          <button className="bg-[#1B1B1B] text-white border-none rounded px-4 py-2 font-medium text-sm">
            Save
          </button>
        </div>

        {/* Billing Information Section */}
        <BillingInformation
          activeBadges={activeBadges}
          onRequestAddAddon={requestAddAddon}
          onRequestRemoveAddon={requestRemoveAddon}
          openPastInvoices={() => openModal("past-invoices")}
          openEditPayment={() => openModal("edit-payment")}
        />

        {/* Modals */}
        <PastInvoicesModal
          isOpen={activeModal === "past-invoices"}
          onClose={closeModal}
          onViewInvoice={() => {
            closeModal();
            openModal("invoice-detail");
          }}
        />

        <InvoiceDetailModal
          isOpen={activeModal === "invoice-detail"}
          onClose={closeModal}
        />

        <EditPaymentModal
          isOpen={activeModal === "edit-payment"}
          onClose={closeModal}
          onAddPayment={() => {
            closeModal();
            openModal("add-payment");
          }}
        />

        <AddPaymentModal
          isOpen={activeModal === "add-payment"}
          onClose={closeModal}
        />

        {activeModal === "confirmation" && (
          <ConfirmationModal
            isOpen={activeModal === "confirmation"}
            type={confirmationType}
            addonName={pendingAddonName || ""}
            onCancel={closeModal}
            onConfirm={handleConfirmAddonChange}
          />
        )}
      </div>
    </div>
  );
}
