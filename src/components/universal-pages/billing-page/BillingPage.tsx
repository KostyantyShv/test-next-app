"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import BillingInformation from "./BillingInformation";
import PastInvoicesModal from "./PastInvoicesModal";
import InvoiceDetailModal from "./InvoiceDetailModal";
import EditPaymentModal from "./EditPaymentModal";
import AddPaymentModal from "./AddPaymentModal";
import ConfirmationModal from "./ConfirmationModal";

// Components
const inter = Inter({ subsets: ["latin"] });

export default function BillingPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentBadge, setCurrentBadge] = useState<HTMLElement | null>(null);
  const [addonName, setAddonName] = useState<string>("");
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

  const handleRemoveBadge = (badge: HTMLElement | null) => {
    if (badge) {
      setCurrentBadge(badge);
      setConfirmationType("remove");
      openModal("confirmation");
    }
  };

  const handleAddBadge = (badge: HTMLElement | null, name: string) => {
    if (badge) {
      setCurrentBadge(badge);
      setAddonName(name);
      setConfirmationType("add");
      openModal("confirmation");
    }
  };

  const confirmRemove = () => {
    if (currentBadge) {
      currentBadge.classList.remove("active");
      // Logic to update UI would be handled by state in a real implementation
    }
    closeModal();
  };

  const confirmAdd = () => {
    if (currentBadge) {
      currentBadge.classList.add("active");
      // Logic to update UI would be handled by state in a real implementation
    }
    closeModal();
  };

  return (
    <div className={`${inter.className} text-[#4A4A4A]`}>
      <div className="max-w-[1055px] mx-auto my-5">
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
          openPastInvoices={() => openModal("past-invoices")}
          openEditPayment={() => openModal("edit-payment")}
        />

        {/* Modals */}
        {activeModal === "past-invoices" && (
          <PastInvoicesModal
            onClose={closeModal}
            onViewInvoice={() => {
              closeModal();
              openModal("invoice-detail");
            }}
          />
        )}

        {activeModal === "invoice-detail" && (
          <InvoiceDetailModal onClose={closeModal} />
        )}

        {activeModal === "edit-payment" && (
          <EditPaymentModal
            onClose={closeModal}
            onAddPayment={() => {
              closeModal();
              openModal("add-payment");
            }}
          />
        )}

        {activeModal === "add-payment" && (
          <AddPaymentModal onClose={closeModal} />
        )}

        {activeModal === "confirmation" && (
          <ConfirmationModal
            type={confirmationType}
            addonName={addonName}
            onCancel={closeModal}
            onConfirm={
              confirmationType === "remove" ? confirmRemove : confirmAdd
            }
          />
        )}
      </div>
    </div>
  );
}
