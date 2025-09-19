'use server';

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { sendGridSubmit } from "./sendGridSubmit";
import normalizeConstituentData from "./normalizeConstituentData";


export async function constituentSubmission( constituentSubmissionData ) {
    const supabase = await createClient();

    const constituentData = normalizeConstituentData(constituentSubmissionData);
    await validateFormID();
    const constituentID = await upsertConstituent();
    const messageSentToLegislators = await sendGridSubmit(constituentID, constituentData);
    await insertConstituentSubmission();


    async function validateFormID() {
        const { data: formExists, error: formError } = await supabase
            .from("forms")
            .select("id")
            .eq("id", constituentData.formID)
            .maybeSingle();

        if (formError || !formExists) {
            console.error("Invalid form ID submitted:", constituentData.formID);
            return redirect("/error");
        }
    }


    async function insertConstituentSubmission() {
        if(messageSentToLegislators) {
            const { error } = await supabase
                .from('constituent_submissions')
                .insert({
                    constituent_id: constituentID,
                    form_id: constituentData.formID,
                    email_body: constituentData.constituentEmailBody
                })
    
            if (error) {
                console.error("Error inserting record into DB: ", error);
                return redirect('/error');
            }
            
            return redirect(`/connect/success/${constituentData.formID}`);
        }
        else {
            console.error("SendGrid failed. Not inserting submission.");
            return redirect('/error');
        }
    }


    async function upsertConstituent() {
        const { data, error } = await supabase
            .from('constituents')
            .upsert({
                email: constituentData.constituentEmail,
                first_name: constituentData.constituentFirstName,
                last_name: constituentData.constituentLastName,
                phone: constituentData.constituentPhone,
                address_1: constituentData.constituentAddress,
                address_2: constituentData.constituentAddressTwo,
                city: constituentData.constituentCity,
                state: constituentData.constituentState,
                zip: constituentData.constituentZip
            }, { onConflict: 'email' })
            .select('id')


        if (error) {
            console.error("Error upserting constituent: ", error);
            return redirect('/error');
        }

        if (!data || !data.length) {
            console.error("No data returned from upsert.");
            return redirect('/error');
        }
        return data[0].id;
    }
}
