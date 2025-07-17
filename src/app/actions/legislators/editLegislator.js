'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";


export async function editLegislator(legislator) {
  const {legislatorID, title, firstName, middleName, lastName, email, district, county, party, chamber } = legislator;
  const supabase = await createClient();

  const { error } = await supabase
    .from('legislators')
    .update({
      title,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email,
      district,
      county,
      party,
      chamber
      })
      .eq('id', legislatorID)

  if (error) {
    console.error("Error editing legislator: ", error);
    redirect('/error')
  }

  revalidatePath("/manage-legislators");
  redirect("/manage-legislators");
}
