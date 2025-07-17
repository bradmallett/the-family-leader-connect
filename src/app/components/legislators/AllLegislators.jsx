import { createClient } from "@/utils/supabase/server";
import LegislatorsTable from "./LegislatorsTable";

export default async function AllLegislators() {
  // create client for every protected page
  const supabase = await createClient();

  const { data: legislators, error } = await supabase
    .from("legislators")
    .select(
      `
        id,
        title,
        first_name,
        middle_name,
        last_name,
        email,
        district,
        county,
        party,
        chamber
        `
    )
    .order("last_name", { ascending: true });

  // if not authenticated, redirect to login
  if (error || legislators.length === 0) {
    console.log("eror fetching legislators:", error);
  }

  const formattedLegislators = legislators.map((l) => ({
    ID: l.id,
    name: `${l.title ? l.title + " " : ""}${l.first_name} ${
      l.middle_name ? l.middle_name + " " : ""
    }${l.last_name}`,
    title: l.title,
    firstName: l.first_name,
    middleName: l.middle_name,
    lastName: l.last_name,
    email: l.email,
    district: l.district,
    county: l.county,
    party: l.party,
    chamber: l.chamber,
  }));

  return (
    <div className="">
        <LegislatorsTable legislators={formattedLegislators} />
    </div>
  )
}
