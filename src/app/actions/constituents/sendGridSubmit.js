import { getSelectedLegislators } from "../legislators/getSelectedLegislators";
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
    // const legislators = await getLegislatorsByIDs(legislatorIDs);

    const legislatorIdObjects = await getSelectedLegislators(constituentData.formID);
    const legIDsArray = legislatorIdObjects.map(legID => legID.legislator_id);

    const selectedFakeLegislators = fakeLegislators.filter(fakeLeg => legIDsArray.includes(fakeLeg.ID));

    // {
    //     ID: '3bcadc85-0c65-4fe3-ac3a-353e024a5a63',
    //     name: 'Brian K. Lohse',
    //     title: null,
    //     firstName: 'Brian',
    //     middleName: 'K.',
    //     lastName: 'Lohse',
    //     email: 'brian.lohse@mailinator.com',
    //     district: '45',
    //     county: 'Polk',
    //     party: 'Republican',
    //     chamber: 'House'
    // }

    console.log(selectedFakeLegislators);

    const messages = selectedFakeLegislators.map(leg => ({
        to: leg.email,
        from: 'constituents@thefamilyleader.com',
        subject: `Constituent message for ${leg.title ? leg.title + ' ' : ''}${leg.name}`,
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
        replyTo: { email: constituentEmail, name: `${constituentFirstName} ${constituentLastName}` },
        
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