import { useState, useEffect, useRef } from 'react';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';


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
                    className="outline-none cursor-pointer"
                    onClick={() => setShowChambers(true)}
                >
                    <ArrowDownCircleIcon className="h-5 text-gray-600 cursor-pointer hover:text-tfl-green"/>
                </button>

            {/* Dropdown list of parties */}
            {showChambers && 
                <div 
                    className='chambers p-1 absolute flex flex-col top-5 right-0 border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 custom-scroll'
                    ref={dropdownRef}
                >
                    <p className='p-2'>SELECT FROM CHAMBER</p>
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