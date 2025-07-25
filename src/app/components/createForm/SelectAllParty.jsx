import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';


export default function SelectAllParty({ selectAllFromParty }) {
    const [showParties, setShowParties] = useState(false);
    const [party, setParty] = useState('');
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


    // sending the party value to the parent component
    useEffect(() => {
        if (party) {
            selectAllFromParty(party);
            setParty(''); // reset after sending to parent
        }
    }, [party]);

    // all parties
    const parties = ["Democrat", "Republican", "Independent", "Libertarian", "Nonpartisan", "Green", "Other"];

    return (
        <div className="relative flex">
            {/* Button to toggle district selection open and closed */}
                <button
                    ref={triggerRef}
                    className="p-1 outline-none cursor-pointer border-2 flex group hover:border-tfl-green"
                    onClick={() => setShowParties(true)}
                >
                   <span className="font-medium group-hover:text-tfl-green">SELECT</span><ChevronDownIcon className="h-5 text-gray-600 cursor-pointer group-hover:text-tfl-green"/>
                </button>

            {/* Dropdown list of parties */}
            {showParties && 
                <div 
                    className='parties p-1 absolute flex flex-col top-8 border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 custom-scroll'
                    ref={dropdownRef}
                >
                    <p className='p-2 font-black bg-slate-600'>PARTIES</p>
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