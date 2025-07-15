import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';


export default function SelectDistrictInput({ updateDistrict }) {
    const [showDistricts, setShowDistricts] = useState(false);
    const [district, setDistrict] = useState('1');
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    
    useEffect(() => {
        // CLOSE DROPDOWN WITH CLICK OUTSIDE
        const handleClickOutside = (event) => {
            if(showDistricts && !event.target.closest(".districts")) {
                setShowDistricts(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // calculate space for dropdown selection
        if (showDistricts && triggerRef.current && dropdownRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - triggerRect.bottom - 16; // 16px padding

            dropdownRef.current.style.maxHeight = `${spaceBelow}px`;
            dropdownRef.current.style.overflowY = 'auto';
        }


        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [showDistricts]);



    // sending the district value to the parent component
    useEffect(() => {
        updateDistrict(district);
    }, [district]);

    // all iowa districts
    const iowaDistricts = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"];


    return (
        <div className="relative flex flex-col group">
            <p className='self-start text-xs font-medium group-hover:text-tfl-green'>DISTRICT</p>
            {/* Button to toggle district selection open and closed */}
                <button
                    ref={triggerRef}
                    className="p-2 outline-none border-2 border-gray-600 font-bold flex justify-between items-center cursor-pointer group-hover:border-tfl-green group-hover:text-tfl-green"
                    onClick={() => setShowDistricts(true)}
                >
                    {district}<ChevronDownIcon className="size-5 ml-1"/>
                </button>

            {/* Dropdown list of districts */}
            {showDistricts && 
                <div 
                    className='districts p-1 absolute flex flex-col top-4 -right-14 border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 custom-scroll'
                    ref={dropdownRef}
                >
                    {iowaDistricts.map((district) => (
                        <button
                            key={district}
                            className="p-1 hover:bg-slate-600 cursor-pointer"
                            onClick={() => {
                                setDistrict(district);
                                setShowDistricts(false);
                            }}
                        >
                            {district}
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}