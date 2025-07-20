import { useState, useEffect } from "react";
import SelectAllDistrict from "./SelectAllDistrict";
import SelectAllCounty from "./SelectAllCounty";
import SelectAllParty from "./SelectAllParty";
import SelectAllChamber from "./SelectAllChamber";


export default function SelectLegislators({ legislators }) {
    const [selectedLegislators, setSelectedLegislators] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [selectedCounties, setSelectedCounties] = useState('');
    const [selectedParties, setSelectedParties] = useState('');
    const [selectedChambers, setSelectedChambers] = useState('');
    const [countOfSelectedLegislators, setCountOfSelectedLegislators] = useState(0);


    useEffect(() => {
        if (selectedDistricts.length > 0 || selectedCounties.length > 0 || selectedParties.length > 0 || selectedChambers.length > 0) {
            let filtered = legislators;

            if (selectedDistricts.length > 0) {
                filtered = filtered.filter((leg) => selectedDistricts.includes(leg.district));
            }

            if (selectedCounties.length > 0) {
                filtered = filtered.filter((leg) => selectedCounties.includes(leg.county));
            }

            if (selectedParties.length > 0) {
                filtered = filtered.filter((leg) => selectedParties.includes(leg.party));
            }

            if (selectedChambers.length > 0) {
                filtered = filtered.filter((leg) => selectedChambers.includes(leg.chamber));
            }

            setSelectedLegislators([...new Set([...filtered])]);
        }
       
    } ,[selectedDistricts, selectedCounties, selectedParties, selectedChambers, legislators]);


    useEffect(() => {
        setCountOfSelectedLegislators(selectedLegislators.length)
    } ,[selectedLegislators]);





    if (!legislators || legislators.length === 0) return <div>No legislators found.</div>;

    console.log("STATE: selectedLegislators: ", selectedLegislators)

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



    function handleCheckboxChange(leg, checked) {
        setSelectedLegislators((prev) => {
            if (checked) {
                return [...new Set([...prev, leg])];
            } else {
                return prev.filter((l) => l.ID !== leg.ID);
            }
        });
    }


    return (
        <div>
            <p>{countOfSelectedLegislators} LEGISLATORS SELECTED</p>
            <table className="w-full max-w-[1500px] text-center border-collapse mx-auto mb-10">
                <thead className="text-sm uppercase border-b-2">
                <tr>
                    <th className="p-2">Select</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">
                        <div className="flex items-center justify-center">
                            District
                            <SelectAllDistrict selectAllFromDistrict={selectAllFromDistrict}/>
                        </div>
                    </th>
                    <th className="p-2">
                        <div className="flex items-center justify-center">
                            County
                            <SelectAllCounty selectAllFromCounty={selectAllFromCounty}/>
                        </div>
                    </th>
                    <th className="p-2">
                        <div className="flex items-center justify-center">
                            Party
                            <SelectAllParty selectAllFromParty={selectAllFromParty}/>
                        </div>
                    </th>
                    <th className="p-2">
                        <div className="flex items-center justify-center">
                            Chamber
                            <SelectAllChamber selectAllFromChamber={selectAllFromChamber}/>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {legislators.map((leg, i) => (
                    <tr key={i} className=" border-b border-gray-400 text-xs">
                        <td className="p-2 border-r border-gray-400">
                            <input
                                type="checkbox"
                                onChange={(e) => handleCheckboxChange(leg, e.target.checked)}
                                checked={selectedLegislators.some(selectedLeg => selectedLeg.ID === leg.ID)}
                            />
                        </td>
                        <td className="p-2 border-r border-gray-400">{leg.name}</td>
                        <td className="p-2 font-bold border-r border-gray-400">
                            {leg.district}
                        </td>
                        <td className="p-2 border-r border-gray-400">{leg.county}</td>
                        <td className="p-2 border-r border-gray-400">{leg.party}</td>
                        <td className="p-2 ">{leg.chamber}</td>
                    </tr>
                ))}
                </tbody>
            </table>
    </div>
    );
}
