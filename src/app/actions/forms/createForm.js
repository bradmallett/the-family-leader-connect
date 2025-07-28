'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";


export async function createForm({ formName, constituentDirection, emailBody, successMessage, selectedLegislatorIDs, selectionString}) {
    const supabase = await createClient();

    const formData = await insertForm();
    const formID = formData[0].id;
    const groupData = await insertGroup(formID);
    const groupID = groupData[0].id;
    await insertGroupedLegislators(groupID);


    async function insertGroupedLegislators(groupID) {
        const groupedInstances = selectedLegislatorIDs.map(leg => {
            return {
                legislator_id: leg,
                group_id: groupID
            }
        })

        const { error } = await supabase
            .from('legislators_group_instances')
            .insert(groupedInstances)

        if (error) {
            console.error("Error inserting into legislators_group_instances table: ", error);
            redirect('/error')
        }

        revalidatePath("/all-forms");
        redirect("/all-forms");
    }




    async function insertGroup(id) {
        const { data, error } = await supabase
            .from('groups')
            .insert({
                form_id: id,
            })
            .select('id')

        if (error) {
            console.error("Error inserting into groups table: ", error);
            redirect('/error')
        }

        return data;
    }



    async function insertForm() {
        const { data, error } = await supabase
            .from('forms')
            .insert({
                form_name: formName,
                constituent_direction: constituentDirection,
                constituent_email_prompt: emailBody,
                success_message: successMessage,
                selection_string: selectionString
            })
            .select('id')

        if (error) {
            console.error("Error inserting into forms table: ", error);
            redirect('/error')
        }

        return data;
    }
}
