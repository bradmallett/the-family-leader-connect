
import DeleteFormPopup from "./DeleteFormPopup";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";


export default function FormsTable({ allForms }) {
    if (!allForms || !allForms.length) return <div>No legislators found.</div>;


    return (
        <div className="max-h-[calc(100vh-160px)] w-full max-w-[1000px] mx-auto">
            

            {/* Fixed table head */}
            <div className="pr-[11px]">
                <table className="w-full table-fixed border-collapse text-center">
                    <thead className="text-sm uppercase border-b-2 bg-paperSwatch z-10">
                        <tr>
                            <th className="p-2">
                                FORM NAME
                            </th>
                            <th className="p-2">
                                DATE CREATED
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>

            {/* Scrollable table body */}
            <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
                <table className="w-full table-fixed text-xs text-center">
                    <tbody>
                        {allForms.map((form, i) => (
                            <tr key={i} className="border-b border-gray-400">
                                <td className="p-2 border-r border-gray-400">{form.form_name}</td>
                                <td className="p-2 font-bold border-r border-gray-400">{new Date(form.created_at).toLocaleDateString('en-US')}</td>
                                <td className="p-2">
                                    <Link href="#">
                                        <PencilIcon className="w-5 h-5 hover:text-amber-500 cursor-pointer"/>
                                    </Link>
                                </td>
                                <td>
                                    <DeleteFormPopup formID={form.id} formName={form.form_name}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
            
    );
}

