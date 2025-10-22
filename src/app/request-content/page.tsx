"use client";

import RequestContent from "@/components/ui/RequestContent/RequestContent";
import React, { useState } from "react";

export default function RequestContentPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // Temporary button to check if the RequestContent component is working
        <div className="p-6 flex justify-end">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-[#016853] text-white rounded hover:bg-[#015443] transition-colors"
            >
                + Add Request
            </button>

            <RequestContent isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}