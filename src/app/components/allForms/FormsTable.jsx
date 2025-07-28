
import DeleteFormPopup from "./DeleteFormPopup";
import Link from "next/link";
import { PencilIcon, ShareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";


export default function FormsTable({ allForms }) {
    if (!allForms || !allForms.length) return <div>No forms found.</div>;


    return (
        <div className="max-h-[calc(100vh-160px)] w-full max-w-[1000px] mx-auto">
            

            {/* Fixed table head */}
            <div className="pr-[11px]">
                <table className="w-full table-fixed border-collapse text-center">
                    <thead className="text-sm uppercase border-gray-600 border-b-2 bg-paperSwatch z-10 text-gray-600">
                        <tr>
                            <th className="p-2">
                                FORM NAME
                            </th>
                            <th className="p-2">
                                DATE CREATED
                            </th>
                            <th className="p-2">
                                #SUBMISSIONS
                            </th>
                            <th>
                                <Link href="/create-new-form" className="inline-block w-fit">
                                    <PlusCircleIcon className="w-8 h-8 hover:text-tfl-green"/>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>

            {/* Scrollable table body */}
            <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
                <table className="w-full table-fixed text-xs text-center text-gray-600">
                    <tbody>
                        {allForms.map((form, i) => (
                            <tr key={i} className="border-b border-gray-400">
                                <td className="p-2 border-r border-gray-400">{form.form_name}</td>
                                <td className="p-2 font-bold border-r border-gray-400">{new Date(form.created_at).toLocaleDateString('en-US')}</td>
                                <td className="p-2 font-bold border-r border-gray-400">27</td>
                                <td className="p-2 flex justify-around items-center ">
                                    <Link href="#" className="">
                                        <ShareIcon className="w-5 h-5 hover:text-tfl-green cursor-pointer"/>
                                    </Link>
                                     <Link href={`/edit-form/${form.id}`}>
                                        <PencilIcon className="w-5 h-5 hover:text-amber-500 cursor-pointer"/>
                                    </Link>
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

