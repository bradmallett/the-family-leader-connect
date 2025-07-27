'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function deleteForm(formID) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('forms')
    .delete()
    .eq('id', formID);

  if (error) {
    console.error("Error deleting form:", error);
    redirect("/error"); // Optional: route for error feedback
  }

  revalidatePath("/all-forms");
  redirect("/all-forms");
}
