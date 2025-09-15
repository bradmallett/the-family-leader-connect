import { getSelectedLegislators } from "../legislators/getSelectedLegislators";
import getLegislatorsByIDs from "../legislators/getLegislatorsByIDs";

// this will be where we use sendGrid to programatically send the emails to the legislators..
export async function sendGridSubmit( constituentID, constituentSubmissionData ) {
    if(!constituentID) return false;

    const legislatorIDs = await getSelectedLegislators(constituentSubmissionData.formID);
    const legislators = await getLegislatorsByIDs(legislatorIDs);

    console.log(legislators);

    return true;
}