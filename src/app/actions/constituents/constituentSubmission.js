'use server';

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { sendGridSubmit } from "./sendGridSubmit";


export async function constituentSubmission( constituentSubmissionData ) {
    const supabase = await createClient();

    const { constituentFirstName,
            constituentLastName,
            constituentEmail,
            constituentPhone,
            constituentAddress,
            constituentAddressTwo,
            constituentCity,
            constituentState,
            constituentZip,
            constituentEmailBody,
            formID
        } = constituentSubmissionData;

    const constituentID = await upsertConstituent();
    const messageSentToLegislators = await sendGridSubmit(constituentID, constituentSubmissionData);
    await insertConstituentSubmission();


    async function insertConstituentSubmission() {
        if(messageSentToLegislators) {
            const { error } = await supabase
                .from('constituent_submissions')
                .insert({
                    constituent_id: constituentID,
                    form_id: formID,
                    email_body: constituentEmailBody
                })
    
            if (error) {
                console.error("Error inserting record into DB: ", error);
                redirect('/error');
            }
    
            redirect(`/connect/success/${formID}`);
        }
        else {
            console.error("SendGrid failed. Not inserting submission.");
            redirect('/error');
        }
    }


    async function upsertConstituent() {
        const { data, error } = await supabase
            .from('constituents')
            .upsert({
                email: constituentEmail,
                first_name: constituentFirstName,
                last_name: constituentLastName,
                phone: constituentPhone,
                address_1: constituentAddress,
                address_2: constituentAddressTwo,
                city: constituentCity,
                state: constituentState,
                zip: constituentZip
            }, { onConflict: 'email' })
            .select('id')


        if (error) {
            console.error("Error upserting constituent: ", error);
            redirect('/error');
        }

        const id = data[0].id;
        return id;
    }
}
