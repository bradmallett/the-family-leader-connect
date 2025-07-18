import { useState, useEffect } from "react";
import SelectAllDistrict from "./SelectAllDistrict";
import SelectAllCounty from "./SelectAllCounty";
import SelectAllParty from "./SelectAllParty";
import SelectAllChamber from "./SelectAllChamber";


export default function SelectLegislators({ legislators }) {
    const [selectedLegislators, setSelectedLegislators] = useState([]);


    if (!legislators || legislators.length === 0)
    return <div>No legislators found.</div>;



    function selectAllFromDistrict(newDistrict) {
        const districtLegIDs = legislators.filter((leg) => leg.district === newDistrict).map((l) => l.ID);
        setSelectedLegislators((prev) => [...new Set([...prev, ...districtLegIDs])]);
    }

    function selectAllFromCounty(newCounty) {
        const countyLegIDs = legislators.filter((leg) => leg.county === newCounty).map((l) => l.ID);
        setSelectedLegislators((prev) => [...new Set([...prev, ...countyLegIDs])]);
    }

    function selectAllFromParty(newParty) {
        const partyLegIDs = legislators.filter((leg) => leg.party === newParty).map((l) => l.ID);
        setSelectedLegislators((prev) => [...new Set([...prev, ...partyLegIDs])]);
    }

    function selectAllFromChamber(newChamber) {
        const chamberLegIDs = legislators.filter((leg) => leg.chamber === newChamber).map((l) => l.ID);
        setSelectedLegislators((prev) => [...new Set([...prev, ...chamberLegIDs])]);
    }


    function handleCheckboxChange(e) {
        const { value, checked } = e.target;

        setSelectedLegislators((prev) => {
            if (checked) {
                return [...new Set([...prev, value])];
            } else {
                return prev.filter((id) => id !== value);
            }
        });
    }


    return (
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
                        value={leg.ID}
                        onChange={(e) => handleCheckboxChange(e)}
                        checked={selectedLegislators.includes(leg.ID)}
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
    );
}
