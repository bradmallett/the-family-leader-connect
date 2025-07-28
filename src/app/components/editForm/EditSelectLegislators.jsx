import { useState, useEffect } from "react";
import SelectAllDistrict from "../createForm/SelectAllDistrict";
import SelectAllCounty from "../createForm/SelectAllCounty";
import SelectAllParty from "../createForm/SelectAllParty";
import SelectAllChamber from "../createForm/SelectAllChamber";
import filterLegislators from "../createForm/filterLegislators";


export default function EditSelectLegislators({ legislators, updateSelectedLegislators, selectedLegislatorIDs, updateSelectionString, previousSelectionString }) {
    const [selectedLegislators, setSelectedLegislators] = useState(() => setDefaultSelectedLegislators());
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [selectedCounties, setSelectedCounties] = useState([]);
    const [selectedParties, setSelectedParties] = useState([]);
    const [selectedChambers, setSelectedChambers] = useState([]);
    const [countOfSelectedLegislators, setCountOfSelectedLegislators] = useState(selectedLegislatorIDs.length);
    const [selectionString, setSelectionString] = useState(previousSelectionString || '');


    // First way to update the selected legislators - via the filtering buttons
    useEffect(() => {
        if (selectedDistricts.length || selectedCounties.length || selectedParties.length || selectedChambers.length) {
            const { filtered, string } = filterLegislators(legislators, selectedDistricts, selectedCounties, selectedParties, selectedChambers)

            setSelectionString(string);
            setSelectedLegislators([...new Set([...filtered])]);
        }
       
    } ,[selectedDistricts, selectedCounties, selectedParties, selectedChambers, legislators]);


    // when the selectedLegislators state changes, update the count and send the state to the parent component
    useEffect(() => {
        setCountOfSelectedLegislators(selectedLegislators.length)
        updateSelectedLegislators(selectedLegislators)
    } ,[selectedLegislators]);


    useEffect(() => {
        updateSelectionString(selectionString)
    } ,[selectionString]);


    if (!legislators || legislators.length === 0) return <div>No legislators found.</div>;



    function setDefaultSelectedLegislators() {
        return legislators.filter(leg => selectedLegislatorIDs.some((selected) => selected.legislator_id === leg.ID));
    }


    function selectAllFromDistrict(district) {
        setSelectedDistricts((prev) => [...new Set([...prev, district])]);
    }

    function selectAllFromCounty(county) {
        setSelectedCounties((prev) => [...new Set([...prev, county])]);  
    }

    function selectAllFromParty(party) {
        setSelectedParties((prev) => [...new Set([...prev, party])]);      
    }

    function selectAllFromChamber(chamber) {
        setSelectedChambers((prev) => [...new Set([...prev, chamber])]);   
    }


    // 2nd way to update the selected legislators - manually via checkboxes
    function handleCheckboxChange(leg, checked) {
        setSelectedLegislators((prev) => {
            if (checked) {
                return [...new Set([...prev, leg])];
            } else {
                return prev.filter((l) => l.ID !== leg.ID);
            }
        });
    }

    // 3rd way to update the selected legislators - select all checkbox
    function handleSelectAllChange(checked) {
        if (checked) {
            setSelectedLegislators([...new Set([...legislators])]);
            setSelectionString('ALL LEGISLATORS SELECTED');
        }
        else {
            setSelectedLegislators([]);
            emptySelectedColumns();
        }
    }

    function emptySelectedColumns() {
        setSelectedDistricts([]);
        setSelectedCounties([]);
        setSelectedParties([]);
        setSelectedChambers([]);
        setSelectionString('');
    }


    return (
        <div className="max-h-[calc(100vh-160px)] w-full max-w-[1500px] mx-auto relative">
            {(previousSelectionString.length && previousSelectionString !== selectionString) ?
                <p className="text-center font-medium text-gray-600 py-1 text-xs absolute -top-6">Previous Filters: {previousSelectionString}</p> : 
                <p className=""></p>
            }


            <p className="text-center font-bold text-paperSwatch p-2 bg-tfl-green">{countOfSelectedLegislators} LEGISLATORS SELECTED</p>

            {selectionString.length ?
                <p className="text-center font-bold text-tfl-green py-2 text-sm bg-paperSwatch">{selectionString}</p> :
                <p className="text-center font-bold text-tfl-green py-2 text-sm bg-paperSwatch">SELECT LEGISLATORS</p>
            }
            
            {/* Fixed table head */}
            <div className="pr-[11px]">
                <table className="w-full table-fixed border-collapse text-center">
                    <thead className="text-sm uppercase border-b-2 bg-paperSwatch z-10">
                        <tr>
                            <th className="p-2">
                                <div className="flex flex-col">
                                    Select
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleSelectAllChange(e.target.checked)}
                                    />
                                </div>
                            </th>
                            <th className="p-2">NAME</th>
                            <th className="p-2">
                                <div className="flex flex-col items-center justify-center">
                                    District
                                    <SelectAllDistrict selectAllFromDistrict={selectAllFromDistrict} />
                                </div>
                            </th>
                            <th className="p-2">
                                <div className="flex flex-col items-center justify-center">
                                    County
                                    <SelectAllCounty selectAllFromCounty={selectAllFromCounty} />
                                </div>
                            </th>
                            <th className="p-2">
                                <div className="flex flex-col items-center justify-center">
                                    Party
                                    <SelectAllParty selectAllFromParty={selectAllFromParty} />
                                </div>
                            </th>
                            <th className="p-2">
                                <div className="flex flex-col items-center justify-center">
                                    Chamber
                                    <SelectAllChamber selectAllFromChamber={selectAllFromChamber} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>

            {/* Scrollable table body */}
            <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
                <table className="w-full table-fixed text-xs text-center">
                    <tbody>
                        {legislators.map((leg, i) => (
                            <tr key={i} className="border-b border-gray-400">
                                <td className="p-2 border-r border-gray-400">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleCheckboxChange(leg, e.target.checked)}
                                        checked={selectedLegislators.some(selectedLeg => selectedLeg.ID === leg.ID)}
                                    />
                                </td>
                                <td className="p-2 border-r border-gray-400">{leg.name}</td>
                                <td className="p-2 font-bold border-r border-gray-400">{leg.district}</td>
                                <td className="p-2 border-r border-gray-400">{leg.county}</td>
                                <td className="p-2 border-r border-gray-400">{leg.party}</td>
                                <td className="p-2">{leg.chamber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
