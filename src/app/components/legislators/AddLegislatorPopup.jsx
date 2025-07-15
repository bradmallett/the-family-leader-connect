'use client';

import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import AddLegislatorForm from '@/app/components/legislators/AddLegislatorForm';


export default function AddLegislatorPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // CLOSE DROPDOWN WITH CLICK OUTSIDE
        const handleClickOutside = (event) => {
            if(isOpen && !event.target.closest(".addLegsPopup")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [isOpen]);

    return (
        <div className="mx-auto text-center my-8 font-inter font-bold text-gray-600">
            <h3>ADD LEGISLATOR</h3>
            <button
                onClick={() => setIsOpen(true)}
            >
                <PlusCircleIcon className="w-10 h-10 text-gray-600 inline mr-2 cursor-pointer hover:text-tfl-green" />
            </button>

            {/* POPUP */}
            {isOpen && (
                <div className="fixed inset-0 flex items-start justify-center z-50">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-gray-900 opacity-75"/>

                    {/* Popup content */}
                    <div className="addLegsPopup mt-20 z-10 bg-paperSwatch p-6 shadow-lg w-11/12 max-w-[600px]">

                        {/* form header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">ADD NEW LEGISLATOR</h2>
                                <XCircleIcon 
                                    className="h-8 inline text-gray-600 cursor-pointer hover:text-tfl-green"
                                    onClick={() => setIsOpen(false)}
                                />
                        </div>
                        <AddLegislatorForm />
                    </div>
                </div>
            )}
        </div>
    );
}