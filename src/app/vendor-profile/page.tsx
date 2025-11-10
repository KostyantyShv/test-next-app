import VendorProfile from "@/components/school/vendor-profile/VendorProfile";
import { Suspense } from "react";

export default function VendorPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <VendorProfile />
      </Suspense>
    </main>
  );
}