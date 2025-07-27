import { createClient } from "@/utils/supabase/server";

export async function getFormByID(formID) {
//   create client for every protected page
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("forms")
    .select(
        `
            id,
            form_name,
            created_at,
            constituent_direction,
            constituent_email_prompt,
            success_message
        `
    )
    .eq('id', formID);

  if (error || data.length === 0) {
    console.log("error fetching all forms:", error);
  }

  return data[0];
}
