'use client';

import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
// import DeleteLegislatorForm from './DeleteLegislatorForm';
import DeleteFormForm from "./DeleteFormForm";


export default function DeleteFormPopup({ formID, formName }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // CLOSE DROPDOWN WITH CLICK OUTSIDE
        const handleClickOutside = (event) => {
            if(isOpen && !event.target.closest(".deleteFormPopup")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [isOpen]);

    function closeDeleteFormPopup() {
        setIsOpen(false);
    }

    return (
        <div>
            <button 
                className="hover:text-red-500 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <TrashIcon className="w-5 h-5" />
            </button>

            {/* POPUP */}
            {isOpen && (
                <div className="fixed inset-0 flex items-start justify-center z-50 font-inter font-bold text-gray-600">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-gray-900 opacity-75"/>

                    {/* Popup content */}
                    <div className="deleteFormPopup mt-20 z-10 bg-paperSwatch p-6 shadow-lg w-11/12 max-w-[580px]">

                        {/* form header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-black text-tfl-green">DELETE FORM</h2>
                            <XCircleIcon 
                                className="h-8 inline text-gray-600 cursor-pointer hover:text-tfl-green"
                                onClick={() => setIsOpen(false)}
                            />
                        </div>
                        <DeleteFormForm 
                            formID={formID} 
                            formName={formName} 
                            closeDeleteFormPopup={closeDeleteFormPopup}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}