import { useState, useEffect, useRef } from 'react';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';


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
                    className="outline-none cursor-pointer"
                    onClick={() => setShowParties(true)}
                >
                    <ArrowDownCircleIcon className="h-5 text-gray-600 cursor-pointer hover:text-tfl-green"/>
                </button>

            {/* Dropdown list of parties */}
            {showParties && 
                <div 
                    className='parties p-1 absolute flex flex-col top-5 right-0 border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 custom-scroll'
                    ref={dropdownRef}
                >
                    <p className='p-2'>SELECT FROM PARTY</p>
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