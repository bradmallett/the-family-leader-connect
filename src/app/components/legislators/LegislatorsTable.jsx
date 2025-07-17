import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import DeleteLegislatorPopup from "./DeleteLegislatorPopup";
import EditLegislatorPopup from "./EditLegislatorPopup";


export default function LegislatorsTable({ legislators }) {
    if (!legislators || legislators.length === 0) return <div>No legislators found.</div>;


  return (
    <table className="w-11/12 max-w-[1500px] text-left border-collapse mx-auto mb-10">
        <thead className="bg-tfl-green text-paperSwatch text-sm uppercase">
            <tr>
                <th className="p-2">Name</th>
                <th className="p-2">District</th>
                <th className="p-2">County</th>
                <th className="p-2">Party</th>
                <th className="p-2">Chamber</th>
                <th className="p-2">Email</th>
                <th className="p-2"></th>
                <th className="p-2"></th>
            </tr>
        </thead>
        <tbody>
            {legislators.map((leg, i) => (
            <tr key={i} className=" border-b border-gray-400 text-xs">
                <td className="p-2 border-r border-gray-400">{leg.name}</td>
                <td className="p-2 font-bold border-r border-gray-400">{leg.district}</td>
                <td className="p-2 border-r border-gray-400">{leg.county}</td>
                <td className="p-2 border-r border-gray-400">{leg.party}</td>
                <td className="p-2 border-r border-gray-400">{leg.chamber}</td>
                <td className="p-2 border-gray-400">{leg.email}</td>
                <td className="p-2 text-right">
                    <EditLegislatorPopup legislator={leg}/>
                </td>
                <td className="p-2 text-right">
                    <DeleteLegislatorPopup legislatorID={leg.ID} legislatorName={leg.name}/>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
  );
}


// hidden peer-hover:block