import { getFormByID } from "@/app/actions/forms/getFormByID";
import getAllLegislators from "@/app/actions/legislators/getAllLegislators";
import { getSelectedLegislators } from "@/app/actions/legislators/getSelectedLegislators";

export default async function getSuccessData(formID) {
        const [formData, allLegs, selectedLegIDs] = await Promise.all([
            getFormByID(formID),
            getAllLegislators(formID),
            getSelectedLegislators(formID)
        ])


        if (!formData || !allLegs.length || !selectedLegIDs.length) return null;

        const onlyIDs = new Set(selectedLegIDs.map(idObj => idObj.legislator_id));
        const selectedLegs = allLegs.filter(leg => onlyIDs.has(leg.ID));
    
        return {formData, selectedLegs};
}