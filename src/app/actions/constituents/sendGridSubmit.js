import { getSelectedLegislators } from "../legislators/getSelectedLegislators";
// import fakeLegislators from "../legislators/fakeLegislators";
import getAllLegislators from "../legislators/getAllLegislators";
import sgMail from '@sendgrid/mail';
import { escapeHtml } from "./escapeHtml";
import { Truculenta } from "next/font/google";

if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY is not set in environment variables");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// this will be where we use sendGrid to programatically send the emails to the legislators..
export async function sendGridSubmit( constituentID, constituentData ) {
    if(!constituentID) {
        console.error("constituentID missing -- skipping sending email via sendGrid.")
        return false;
    }

    const allLegislators = await getAllLegislators();

    let { 
        constituentFirstName, 
        constituentLastName, 
        constituentEmail,
        constituentEmailBody,
        constituentCity,
        constituentState
    }  = constituentData;

    // Escape only for HTML output
    const safeFirstName = escapeHtml(constituentFirstName);
    const safeLastName = escapeHtml(constituentLastName);
    const safeEmail = escapeHtml(constituentEmail);
    const safeBody = escapeHtml(constituentEmailBody).replace(/\n/g, "<br>");
    const safeCity = escapeHtml(constituentCity);
    const safeState = escapeHtml(constituentState);



    const legislatorIdObjects = await getSelectedLegislators(constituentData.formID);
    const legIDsArray = legislatorIdObjects.map(legID => legID.legislator_id);

    // USING FAKE LEGISLATORS HERE:
    // const selectedFakeLegislators = fakeLegislators.filter(fakeLeg => legIDsArray.includes(fakeLeg.ID));

    // USING REAL LEGISLATORS !!!!!
    const selectedLegislators = allLegislators.filter(legislator => legIDsArray.includes(legislator.ID));
    console.log(selectedLegislators);


    const messages = selectedLegislators.map(leg => ({
        // will use leg.email for "to" ---
        to: leg.email,
        from: 'constituents@thefamilyleader.com',
        subject: `Constituent message for ${leg.name}`,
        text: `${constituentFirstName} ${constituentLastName} (${constituentEmail})
            ${constituentCity}, ${constituentState}

            Wrote:
            ${constituentEmailBody}

            ---
            This message was delivered via The FAMiLY Leader constituent outreach platform on behalf of an Iowa resident. 
            To ensure you continue receiving constituent communications, please consider adding constituents@thefamilyleader.com to your address book.`,
        html: `
            <p><strong>From:</strong> ${safeFirstName} ${safeLastName} (${safeEmail})</p>
            <p>${safeCity}, ${safeState}</p>
            <br />
            <p><strong>Message:</strong></p>
            <p>${safeBody}</p>
            <br />
            <hr />
            <p style="font-size:12px; color:#555;">
            This message was delivered via <strong>The FAMiLY Leader</strong> constituent outreach platform on behalf of an Iowa resident.  
            To ensure you continue receiving constituent communications, please consider adding constituents@thefamilyleader.com to your address book.
            </p>
        `,
        replyTo: { email: "info@thefamilyleader.com", name: 'The FAMiLY Leader Constituents' },
        
        // Disable click tracking but keep open tracking -- if emails are being spam filtered consider setting openTracking to false
        trackingSettings: {
            clickTracking: { enable: false },
            openTracking: { enable: true },
        }
    }));

    try {
        await sgMail.send(messages);
        console.log("Emails sent successfully");
        return true;
    } catch (error) {
        console.error("SendGrid error:", error.response?.body?.errors || error);
        return false;
    }
}