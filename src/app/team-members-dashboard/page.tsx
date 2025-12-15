import TeamMembersDashboard from "@/components/universal-pages/team-members-dashboard/TeamMembersDashboard";
import { TeamMember } from "@/components/universal-pages/team-members-dashboard/types";
import { createClient } from "@/lib/supabase_utils/server";
import { redirect } from "next/navigation";
import React from "react";

const formatLastActive = (value: string | null): string => {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
};

const splitName = (fullName: string | null, emailFallback: string) => {
  const base = (fullName && fullName.trim().length > 0)
    ? fullName
    : emailFallback.split("@")[0] || "Member";
  const parts = base.trim().split(" ");
  const firstName = parts[0] || "Member";
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName };
};

const page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: teamMembersData, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("team_owner_id", user.id);

  if (error) {
    // If there's an error, fall back to mocked data inside the component
    console.error("Failed to load team members from Supabase:", error.message);
  }

  const initialMembers: TeamMember[] | undefined = teamMembersData?.map(
    (member, index) => {
      const { firstName, lastName } = splitName(member.name, member.email);

      const rawListings = (member as any).permissions;
      const listings: TeamMember["listings"] = Array.isArray(rawListings)
        ? rawListings.map((l: any) => ({
            id: typeof l.id === "number" ? l.id : Number(l.id) || 0,
            name: String(l.name ?? ""),
            image: String(
              l.image ??
                "https://via.placeholder.com/80?text=Listing"
            ),
          }))
        : [];

      return {
        id: index + 1,
        firstName,
        lastName,
        email: member.email,
        avatar: "https://via.placeholder.com/80",
        status:
          member.status === "accepted" ||
          member.status === "pending" ||
          member.status === "rejected"
            ? (member.status as TeamMember["status"])
            : "pending",
        lastActive: formatLastActive(member.updated_at || member.created_at),
        isAdmin: member.role === "owner" || member.role === "admin",
        listings,
      };
    }
  );

  return (
    <div className="font-inter">
      <TeamMembersDashboard initialMembers={initialMembers} ownerId={user.id} />
    </div>
  );
};

export default page;
