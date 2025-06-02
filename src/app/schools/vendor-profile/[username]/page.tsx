import VendorProfile from "@/components/school/vendor-profile/VendorProfile";
import React from "react";

const page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  return (
    <>
      <VendorProfile />
    </>
  );
};

export default page;
