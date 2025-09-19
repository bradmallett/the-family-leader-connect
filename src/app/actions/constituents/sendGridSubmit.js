// import { getSelectedLegislators } from "../legislators/getSelectedLegislators";
// import getLegislatorsByIDs from "../legislators/getLegislatorsByIDs";
import fakeLegislators from "../legislators/fakeLegislators";
import sgMail from '@sendgrid/mail';
import { escapeHtml } from "./escapeHtml";


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

    // not going to use real legislators yet
    // const legislatorIDs = await getSelectedLegislators(constituentData.formID);
    // const legislators = await getLegislatorsByIDs(legislatorIDs);

    const messages = fakeLegislators.map(leg => ({
        to: leg.email,
        from: 'test@thefamilyleader.com',
        subject: `Message for ${leg.first_name} ${leg.last_name}`,
        text: `${constituentFirstName} ${constituentLastName} (${constituentEmail})\n${constituentCity}, ${constituentState}\n\nWrote:\n${constituentEmailBody}`,
        html: `
            <p><strong>From:</strong> ${safeFirstName} ${safeLastName} (${safeEmail})</p>
            <p>${safeCity}, ${safeState}</p>
            <br />
            <p><strong>Message:</strong></p>
            <p>${safeBody}</p>
        `,
        replyTo: { email: constituentEmail, name: `${constituentFirstName} ${constituentLastName}` }
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
