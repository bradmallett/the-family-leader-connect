import { createClient } from "@/utils/supabase/server";

export default async function getAllForms() {
  // create client for every protected page
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("forms")
    .select(
        `
            id,
            form_name,
            created_at
        `
    )
    .order("created_at", { ascending: false });

  if (error || data.length === 0) {
    console.log("error fetching all forms:", error);
  }

  return data;
}
