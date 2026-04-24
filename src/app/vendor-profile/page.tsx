import VendorProfile from "@/components/school/vendor-profile/VendorProfile";
import { Suspense } from "react";

export default function VendorPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <VendorProfile />
      </Suspense>
    </main>
  );
}