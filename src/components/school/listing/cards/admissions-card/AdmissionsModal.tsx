"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import AdmissionsModalDesktop from "./AdmissionsModalDesktop";
import AdmissionsModalMobile from "./AdmissionsModalMobile";

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdmissionsModal: React.FC<AdmissionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return isMobile ? (
    <AdmissionsModalMobile isOpen={isOpen} onClose={onClose} />
  ) : (
    <AdmissionsModalDesktop isOpen={isOpen} onClose={onClose} />
  );
};

export default AdmissionsModal;
