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
            created_at,
            constituent_submissions(count)
        `
    )
    .order("created_at", { ascending: false });

  if (error || data.length === 0) {
    console.log("error fetching all forms:", error);
  }

    // unwrap submission count for easier use in UI
  return data.map(form => ({
    ...form,
    submission_count: form.constituent_submissions[0]?.count || 0
  }));
}
