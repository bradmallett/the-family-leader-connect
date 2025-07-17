'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function deleteLegislator(legislatorID) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('legislators')
    .delete()
    .eq('id', legislatorID);

  if (error) {
    console.error("Error deleting legislator:", error);
    redirect("/error"); // Optional: route for error feedback
  }

  revalidatePath("/manage-legislators");
  redirect("/manage-legislators");
}
