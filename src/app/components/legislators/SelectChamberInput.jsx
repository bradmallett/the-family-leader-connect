import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function SelectChamberInput({ prevChamber, updateChamber }) {
    const [showChambers, setShowChambers] = useState(false);
    const [chamber, setChamber] = useState(() => prevChamber === '' ? 'House' : prevChamber);
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // CLOSE DROPDOWN WITH CLICK OUTSIDE
        const handleClickOutside = (event) => {
            if(showChambers && !event.target.closest(".chambers")) {
                setShowChambers(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // calculate space for dropdown selection
        if (showChambers && triggerRef.current && dropdownRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - triggerRect.bottom - 16; // 16px padding

            dropdownRef.current.style.maxHeight = `${spaceBelow}px`;
            dropdownRef.current.style.overflowY = 'auto';
        }

        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [showChambers]);


    // sending the district value to the parent component
    useEffect(() => {
        updateChamber(chamber);
    }, [chamber]);

    // all iowa districts
    const chambers = ["House", "Senate",];


    return (
        <div className="relative flex flex-col group">
            <p className='self-start text-xs font-medium group-hover:text-tfl-green'>CHAMBER</p>
            {/* Button to toggle district selection open and closed */}
                <button
                    ref={triggerRef}
                    className="p-2 outline-none border-2 border-gray-600 font-bold flex justify-between items-center cursor-pointer group-hover:border-tfl-green group-hover:text-tfl-green"
                    onClick={() => setShowChambers(true)}
                >
                    {chamber}<ChevronDownIcon className="size-5 ml-1"/>
                </button>

            {/* Dropdown list of districts */}
            {showChambers && 
                <div 
                    className='chambers p-1 absolute flex flex-col top-15 right-0 border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 custom-scroll'
                    ref={dropdownRef}
                >
                    {chambers.map((chamber) => (
                        <button
                            key={chamber}
                            className="p-1 hover:bg-slate-600 cursor-pointer"
                            onClick={() => {
                                setChamber(chamber);
                                setShowChambers(false);
                            }}
                        >
                            {chamber}
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}