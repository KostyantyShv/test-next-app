import AccountDetails from "@/components/universal-pages/account-details/AccountDetails";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase_utils/server";

const page = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return (
    <div>
      <AccountDetails />
    </div>
  );
};

export default page;
