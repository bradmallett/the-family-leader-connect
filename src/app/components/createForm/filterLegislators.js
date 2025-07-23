
export default function filterLegislators(legislators, selectedDistricts, selectedCounties, selectedParties, selectedChambers) {
    let filtered = legislators;
    let string = '';

    if (selectedDistricts.length) {
        const districtsString = 'Districts: ' + selectedDistricts.join(' or ');
        string += districtsString;
        
        if(selectedCounties.length || selectedParties.length || selectedChambers.length) {
            string += ' | '
        }

        filtered = filtered.filter((leg) => selectedDistricts.includes(leg.district));
    }

    if (selectedCounties.length) {
        const countiesString = 'Counties: ' + selectedCounties.join(' or ');
        string += countiesString;
        
        if(selectedParties.length || selectedChambers.length) {
            string += ' | '
        }

        filtered = filtered.filter((leg) => selectedCounties.includes(leg.county));
    }

    if (selectedParties.length) {
        const partiesString = 'Parties: ' + selectedParties.join(' or ');
        string += partiesString;
        
        if(selectedChambers.length) {
            string += ' | '
        }

        filtered = filtered.filter((leg) => selectedParties.includes(leg.party));
    }

    if (selectedChambers.length > 0) {
        const chambersString = 'Chambers: ' + selectedChambers.join(' or ');
        string += chambersString;

        filtered = filtered.filter((leg) => selectedChambers.includes(leg.chamber));
    }

    return {filtered, string};
}