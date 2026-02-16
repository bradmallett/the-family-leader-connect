'use client';

import DeleteFormPopup from "./DeleteFormPopup";
import Link from "next/link";
import { PencilIcon, ShareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { setIsActive } from "@/app/actions/forms/setIsActive";
import { useRouter } from 'next/navigation';
import { useState } from "react";



export default function FormsTable({ allForms }) {
    const [pendingId, setPendingId] = useState(null);
    const router = useRouter();

    if (!allForms || !allForms.length) return <div>No forms found.</div>;


    async function handleToggle(id, formStatus) {
        if (!id || pendingId === id) return;
        setPendingId(id);

        try {
            const newFormStatus = !formStatus;
            const res = await setIsActive(id, newFormStatus);

            if (!res?.ok) {
                alert(res?.message ?? "Unable to update form status. Please try again.");
            return;
            }

            router.refresh();
        } finally {
            setPendingId(null);
        }
    }


    return (
        <div className="max-h-[calc(100vh-160px)] w-full max-w-[1000px] mx-auto">
            

            {/* Fixed table head */}
            <div className="pr-[11px]">
                <table className="w-full table-fixed border-collapse text-center">
                    <thead className="text-sm uppercase bg-paperSwatch z-10 text-gray-600">
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

                            {/* add new table head */}
                            <th className="p-2">
                                STATUS
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
            <div className="overflow-y-auto max-h-[calc(100vh-400px)] border-tfl-green border-t-3 border-b-3">
                <table className="w-full table-fixed text-xs text-center text-gray-600">
                    <tbody>
                        {allForms.map((form, i) => (
                            <tr key={i} className="border-b border-gray-400">
                                <td className="p-2 border-r border-gray-400">{form.form_name}</td>
                                <td className="p-2 font-bold border-r border-gray-400">{new Date(form.created_at).toLocaleDateString('en-US')}</td>
                                <td className="p-2 font-bold border-r border-gray-400 text-tfl-green">{form.submission_count.toLocaleString()}</td>

                                {/* STATUS TOGGLE */}
                                <td className="p-2 border-r border-gray-400">
                                    <button
                                        type="button"
                                        disabled={pendingId === form.id}
                                        onClick={() => handleToggle(form.id, form.is_active)}
                                        className={[
                                        "px-3 py-1 rounded-full font-semibold border transition cursor-pointer",
                                        form.is_active
                                            ? "text-tfl-green border-tfl-green hover:bg-tfl-green/10"
                                            : "text-red-500 border-red-400 hover:bg-red-200",
                                        ].join(" ")}
                                    >
                                        {pendingId === form.id ? "Saving..." : form.is_active ? "Active" : "Inactive"}
                                    </button>
                                </td>

                                <td className="p-2 flex justify-around items-center ">
                                    <Link href={`/connect/${form.id}`}>
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

