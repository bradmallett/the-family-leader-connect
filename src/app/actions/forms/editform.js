'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// need to update to edit - not just create
export async function editForm({ IDofForm, formName, constituentDirection, emailBody, successMessage, selectedLegislatorIDs, selectionString}) {
    const supabase = await createClient();

    await updateForm();
    const groupID = await getGroupId();
    await removeGroupedLegislators(groupID);
    await insertGroupedLegislators(groupID);

    async function removeGroupedLegislators(groupID) {
        const { error } = await supabase
            .from('legislators_group_instances')
            .delete()
            .eq('group_id', groupID)

            if (error) {
                console.error("Error removing legislators_group_instances table from: ", error);
            redirect('/error')
        }
    }


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


    async function getGroupId() {
        const { data, error } = await supabase
            .from('groups')
            .select('id')
            .eq('form_id', IDofForm)
            
        if (error) {
            console.error("Error fetching group id from groups table: ", error);
            redirect('/error')
        }

        return data[0].id;
    }



    async function updateForm() {
        const { error } = await supabase
            .from('forms')
            .update({
                form_name: formName,
                constituent_direction: constituentDirection,
                constituent_email_prompt: emailBody,
                success_message: successMessage,
                selection_string: selectionString
            })
            .eq('id', IDofForm)

        if (error) {
            console.error("Error updating form in forms table: ", error);
            redirect('/error')
        }
    }
}


