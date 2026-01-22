import TeamMembersDashboard from "@/components/universal-pages/team-members-dashboard/TeamMembersDashboard";
import { TeamMember } from "@/components/universal-pages/team-members-dashboard/types";
import { createClient } from "@/lib/supabase_utils/server";
import { redirect } from "next/navigation";
import React from "react";
import { mockTeamMembers } from "@/components/universal-pages/team-members-dashboard/data/mockTeamMembers";

const formatLastActive = (value: string | null): string => {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const splitName = (fullName: string | null, emailFallback: string) => {
  // Normalize input: handle null, undefined, and empty strings
  const normalizedInput = fullName ? String(fullName).trim() : "";
  const base = normalizedInput.length > 0
    ? normalizedInput
    : (emailFallback ? String(emailFallback).split("@")[0] : "").trim() || "Member";
  
  // Split by whitespace and filter out empty strings
  const parts = base.split(/\s+/).filter(Boolean);
  
  // Extract firstName and lastName, ensuring they're trimmed
  const firstName = (parts[0] || "Member").trim();
  const lastName = parts.slice(1).join(" ").trim();
  
  return { 
    firstName: firstName || "Member", 
    lastName: lastName || "" 
  };
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

  // Map database members to TeamMember format
  const dbMembers: TeamMember[] = teamMembersData?.map(
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

      // Ensure firstName and lastName are normalized (no extra whitespace)
      const normalizedFirstName = firstName.trim();
      const normalizedLastName = lastName.trim();

      return {
        id: index + 1,
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
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
  ) || [];

  // Merge database members with mock members
  // Database members come first, then mock members
  const initialMembers: TeamMember[] = [...dbMembers, ...mockTeamMembers];

  return (
    <div className="font-inter">
      <TeamMembersDashboard initialMembers={initialMembers} ownerId={user.id} />
    </div>
  );
};

export default page;
