import VendorProfile from "@/components/school/vendor-profile/VendorProfile";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  return (
    <>
      <Suspense fallback={null}>
        <VendorProfile />
      </Suspense>
    </>
  );
};

export default page;
