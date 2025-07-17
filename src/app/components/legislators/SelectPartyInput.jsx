import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function SelectPartyInput({ prevParty, updateParty }) {
    const [showParties, setShowParties] = useState(false);
    const [party, setParty] = useState(() => prevParty === '' ? 'Democrat' : prevParty);
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // CLOSE DROPDOWN WITH CLICK OUTSIDE
        const handleClickOutside = (event) => {
            if(showParties && !event.target.closest(".parties")) {
                setShowParties(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // calculate space for dropdown selection
        if (showParties && triggerRef.current && dropdownRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - triggerRect.bottom - 25; // 25px padding

            dropdownRef.current.style.maxHeight = `${spaceBelow}px`;
            dropdownRef.current.style.overflowY = 'auto';
        }

        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [showParties]);


    // sending the district value to the parent component
    useEffect(() => {
        updateParty(party);
    }, [party]);

    // all iowa districts
    const parties = ["Democrat", "Republican", "Independent", "Libertarian", "Nonpartisan", "Green", "Other"];


    return (
        <div className="relative flex flex-col group">
            <p className='self-start text-xs font-medium group-hover:text-tfl-green'>PARTY</p>
            {/* Button to toggle district selection open and closed */}
                <button
                    ref={triggerRef}
                    className="p-2 outline-none border-2 border-gray-600 font-bold flex justify-between items-center cursor-pointer group-hover:border-tfl-green group-hover:text-tfl-green"
                    onClick={() => setShowParties(true)}
                >
                    {party}<ChevronDownIcon className="size-5 ml-1"/>
                </button>

            {/* Dropdown list of districts */}
            {showParties && 
                <div 
                    className='parties p-1 absolute flex flex-col top-15 right-0 border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 custom-scroll'
                    ref={dropdownRef}
                >
                    {parties.map((party) => (
                        <button
                            key={party}
                            className="p-1 hover:bg-slate-600 cursor-pointer"
                            onClick={() => {
                                setParty(party);
                                setShowParties(false);
                            }}
                        >
                            {party}
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}