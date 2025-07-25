import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';


export default function SelectAllChamber({ selectAllFromChamber }) {
    const [showChambers, setShowChambers] = useState(false);
    const [chamber, setChamber] = useState('');
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
            const spaceBelow = window.innerHeight - triggerRect.bottom - 25; // 25px padding

            dropdownRef.current.style.maxHeight = `${spaceBelow}px`;
            dropdownRef.current.style.overflowY = 'auto';
        }


        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [showChambers]);


    // sending the party value to the parent component
    useEffect(() => {
        if (chamber) {
            selectAllFromChamber(chamber);
            setChamber(''); // reset after sending to parent
        }
    }, [chamber]);

    // all iowa chambers
    const chambers = ["House", "Senate",];

    return (
        <div className="relative flex">
            {/* Button to toggle district selection open and closed */}
                <button
                    ref={triggerRef}
                    className="p-1 outline-none cursor-pointer border-2 flex group hover:border-tfl-green"
                    onClick={() => setShowChambers(true)}
                >
                   <span className="font-medium group-hover:text-tfl-green">SELECT</span><ChevronDownIcon className="h-5 text-gray-600 cursor-pointer group-hover:text-tfl-green"/>
                </button>

            {/* Dropdown list of parties */}
            {showChambers && 
                <div 
                    className='chambers p-1 absolute flex flex-col top-8 border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 custom-scroll'
                    ref={dropdownRef}
                >
                    <p className='p-2 font-black bg-slate-600'>CHAMBERS</p>
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