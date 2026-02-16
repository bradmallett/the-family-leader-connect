'use server';

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function setIsActive(id, newFormStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('forms')
    .update({is_active: newFormStatus})
    .eq('id', id);

  if (error) {
    console.error("Error setting the active state of the form:", error);
    return { ok: false, message: "Failed to update form status." };
  }

  revalidatePath("/all-forms");
  return { ok: true };
}
