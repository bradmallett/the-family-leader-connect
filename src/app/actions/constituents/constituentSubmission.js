'use server';

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { sendGridSubmit } from "./sendGridSubmit";


export async function constituentSubmission( constituentSubmissionData ) {
    const supabase = await createClient();

    const normalizedConstituentSubmissionData = {
        // Normalize inputs
        constituentFirstName: constituentSubmissionData?.constituentFirstName?.trim(),
        constituentLastName: constituentSubmissionData?.constituentLastName?.trim(),
        constituentEmail: constituentSubmissionData?.constituentEmail?.trim().toLowerCase(),
        constituentPhone: constituentSubmissionData?.constituentPhone?.trim(),
        constituentAddress: constituentSubmissionData?.constituentAddress?.trim(),
        constituentAddressTwo: constituentSubmissionData?.constituentAddressTwo?.trim(),
        constituentCity: constituentSubmissionData?.constituentCity?.trim(),
        constituentState: constituentSubmissionData?.constituentState?.trim(),
        constituentZip: constituentSubmissionData?.constituentZip?.trim(),
        constituentEmailBody: constituentSubmissionData?.constituentEmailBody?.trim(),
        formID: constituentSubmissionData?.formID
    }

    const constituentID = await upsertConstituent();
    const messageSentToLegislators = await sendGridSubmit(constituentID, normalizedConstituentSubmissionData);
    await insertConstituentSubmission();


    async function insertConstituentSubmission() {
        if(messageSentToLegislators) {
            const { error } = await supabase
                .from('constituent_submissions')
                .insert({
                    constituent_id: constituentID,
                    form_id: normalizedConstituentSubmissionData.formID,
                    email_body: normalizedConstituentSubmissionData.constituentEmailBody
                })
    
            if (error) {
                console.error("Error inserting record into DB: ", error);
                redirect('/error');
            }
            
            redirect(`/connect/success/${normalizedConstituentSubmissionData.formID}`);
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
                email: normalizedConstituentSubmissionData.constituentEmail,
                first_name: normalizedConstituentSubmissionData.constituentFirstName,
                last_name: normalizedConstituentSubmissionData.constituentLastName,
                phone: normalizedConstituentSubmissionData.constituentPhone,
                address_1: normalizedConstituentSubmissionData.constituentAddress,
                address_2: normalizedConstituentSubmissionData.constituentAddressTwo,
                city: normalizedConstituentSubmissionData.constituentCity,
                state: normalizedConstituentSubmissionData.constituentState,
                zip: normalizedConstituentSubmissionData.constituentZip
            }, { onConflict: 'email' })
            .select('id')


        if (error) {
            console.error("Error upserting constituent: ", error);
            redirect('/error');
        }

        if (!data || !data.length) {
            console.error("No data returned from upsert.");
            redirect('/error');
        }
        return data[0].id;
    }
}
