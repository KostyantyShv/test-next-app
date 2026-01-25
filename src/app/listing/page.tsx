import { Suspense } from "react";
import Listing from "@/components/school/listing/Listing";

export default function ListingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Listing />
    </Suspense>
  );
}

