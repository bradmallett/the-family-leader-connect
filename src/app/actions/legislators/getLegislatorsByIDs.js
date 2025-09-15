import { createClient } from "@/utils/supabase/server";

export default async function getLegislatorsByIDs(legislatorIDs) {
  // create client for every protected page
  const supabase = await createClient();

  const ids = legislatorIDs.map(item => item.legislator_id);

  const { data: legislators, error } = await supabase
    .from('legislators')
    .select('*')
    .in('id', ids);

    if (error || legislators.length === 0) {
        console.log("error fetching legislators:", error);
    }

//   const formattedLegislators = legislators.map((l) => ({
//     ID: l.id,
//     name: `${l.title ? l.title + " " : ""}${l.first_name} ${
//       l.middle_name ? l.middle_name + " " : ""
//     }${l.last_name}`,
//     title: l.title,
//     firstName: l.first_name,
//     middleName: l.middle_name,
//     lastName: l.last_name,
//     email: l.email,
//     district: l.district,
//     county: l.county,
//     party: l.party,
//     chamber: l.chamber,
//   }));

  return legislators;
}
