"use client";
import React from "react";
import { Modal } from "@/components/ui/Modal/Modal";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[400px]">
            <div style={{ padding: "0" }}>
                <div
                    style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#202124",
                        marginBottom: "12px",
                    }}
                >
                    Remove Event
                </div>
                <div
                    style={{
                        fontSize: "14px",
                        color: "#5F6368",
                        marginBottom: "24px",
                        lineHeight: 1.5,
                    }}
                >
                    Are you sure you want to remove this event?
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "flex-end",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: 500,
                            cursor: "pointer",
                            background: "#F1F3F4",
                            border: "none",
                            color: "#5F6368",
                            transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#E8EAED")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "#F1F3F4")
                        }
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: 500,
                            cursor: "pointer",
                            background: "#EA4335",
                            border: "none",
                            color: "white",
                            transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#D93025")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "#EA4335")
                        }
                    >
                        Yes
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmModal;
