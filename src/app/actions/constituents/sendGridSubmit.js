// import { getSelectedLegislators } from "../legislators/getSelectedLegislators";
// import getLegislatorsByIDs from "../legislators/getLegislatorsByIDs";
import fakeLegislators from "../legislators/fakeLegislators";
import sgMail from '@sendgrid/mail';
import { escapeHtml } from "./escapeHtml";


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// this will be where we use sendGrid to programatically send the emails to the legislators..
export async function sendGridSubmit( constituentID, normalizedConstituentSubmissionData ) {
    if(!constituentID) return false;

    let { 
        constituentFirstName, 
        constituentLastName, 
        constituentEmail,
        constituentEmailBody
    }  = normalizedConstituentSubmissionData;

    if (!isValidEmailServer(constituentEmail)) {
        console.error("Invalid email format, skipping send.");
        return false;
    }

    // Strip CRLF from email to block header injection
    const cleanEmail = (constituentEmail || "").replace(/[\r\n]/g, "")

    // Escape only for HTML output
    const safeFirstName = escapeHtml(constituentFirstName);
    const safeLastName = escapeHtml(constituentLastName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeBody = escapeHtml((constituentEmailBody || "").trim());

    if (!safeBody) {
        console.error("Empty body, skipping send.");
        return false;
    }


    // not going to use real legislators yet
    // const legislatorIDs = await getSelectedLegislators(normalizedConstituentSubmissionData.formID);
    // const legislators = await getLegislatorsByIDs(legislatorIDs);

    const messages = fakeLegislators.map(leg => ({
        to: leg.email,
        from: 'test@thefamilyleader.com',
        subject: `Message for ${leg.first_name} ${leg.last_name}`,
        text: `${constituentFirstName} ${constituentLastName} (${cleanEmail}) wrote:\n\n${constituentEmailBody}`,
        html: `
        <p><strong>From:</strong> ${safeFirstName} ${safeLastName} (${safeEmail})</p>
        <p><strong>Message:</strong></p>
        <p>${safeBody.replace(/\n/g, "<br>")}</p>
        `,
        replyTo: { email: cleanEmail, name: `${constituentFirstName} ${constituentLastName}` }
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



function isValidEmailServer(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
}