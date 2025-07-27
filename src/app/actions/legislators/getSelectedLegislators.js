import { createClient } from "@/utils/supabase/server";

export async function getSelectedLegislators(formID) {
    // create client for every protected page
    const supabase = await createClient();

    const groupID = await getGroupID(formID);
    const legislatorIDs = await getAllSelectedLegislators(groupID);

    async function getAllSelectedLegislators(group_id) {
        const { data, error } = await supabase
            .from("legislators_group_instances")
            .select(
                `
                legislator_id
                `
            )
            .eq('group_id', group_id);

        if (error || data.length === 0) {
            console.log("error fetching legislators:", error);
        }

        return data;
    }


    async function getGroupID(formID) {
        const { data, error } = await supabase
            .from("groups")
            .select(
                `
                id
                `
            )
            .eq('form_id', formID);

        if (error || data.length === 0) {
            console.log("error fetching group ID:", error);
        }
        return data[0].id;

    }

    return legislatorIDs;
}
