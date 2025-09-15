import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/solid';


export default function SelectState({ updateSelectedState }) {
    const [selectedState, setSelectedState] = useState('IOWA');
    const [showStates, setShowStates] = useState(false);
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // CLOSE DROPDOWN WITH CLICK OUTSIDE
        const handleClickOutside = (event) => {
            if(showStates && !event.target.closest(".states")) {
                setShowStates(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // calculate space for dropdown selection
        if (showStates && triggerRef.current && dropdownRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - triggerRect.bottom - 25; // 25px padding

            dropdownRef.current.style.maxHeight = `${spaceBelow}px`;
            dropdownRef.current.style.overflowY = 'auto';
        }

        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [showStates]);



    // sending the district value to the parent component
    useEffect(() => {
        if (selectedState) {
            updateSelectedState(selectedState);
        }
    }, [selectedState]);



    const usStates = [
        'ALABAMA', 'ALASKA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA', 'COLORADO', 'CONNECTICUT',
        'DELAWARE', 'FLORIDA', 'GEORGIA', 'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA',
        'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARYLAND', 'MASSACHUSETTS', 'MICHIGAN',
        'MINNESOTA', 'MISSISSIPPI', 'MISSOURI', 'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW HAMPSHIRE',
        'NEW JERSEY', 'NEW MEXICO', 'NEW YORK', 'NORTH CAROLINA', 'NORTH DAKOTA', 'OHIO',
        'OKLAHOMA', 'OREGON', 'PENNSYLVANIA', 'RHODE ISLAND', 'SOUTH CAROLINA', 'SOUTH DAKOTA',
        'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT', 'VIRGINIA', 'WASHINGTON', 'WEST VIRGINIA',
        'WISCONSIN', 'WYOMING'
    ];


    return (
        <div className="relative flex w-full md:w-[250px]">
            <div className="flex flex-col-reverse w-full">
                <button
                    ref={triggerRef}
                    className="flex justify-between peer p-2 cursor-pointer outline-none border-2 border-gray-600 font-bold group hover:text-tfl-green hover:border-tfl-green focus:text-tfl-green focus:border-tfl-green"
                    onClick={() => setShowStates(true)}
                >
                    <span className="text-xs md:text-sm font-bold group-hover:text-tfl-green">{selectedState || 'SELECT STATE'}</span>
                    <ChevronDownIcon className="h-5 text-gray-600 group-hover:text-tfl-green" />
                </button>
                <p className="text-xs font-medium peer-focus:text-tfl-green peer-hover:text-tfl-green">STATE</p>
            </div>


            {/* <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
                    <input 
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green'
                    />
                    <label
                        htmlFor="city"
                        className="text-xs font-medium peer-focus:text-tfl-green"
                    >CITY<span className='text-red-600'>*</span></label>
                </div> */}

            {showStates && (
            <div
                className="states absolute top-15 p-1 flex flex-col border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 max-h-[200px] overflow-y-auto custom-scroll"
                ref={dropdownRef}
            >
                <p className="p-2 font-black bg-slate-600">SELECT STATE</p>
                {usStates.map((stateName) => (
                <button
                    key={stateName}
                    className="p-1 font-bold hover:bg-slate-600 cursor-pointer"
                    onClick={() => {
                        setSelectedState(stateName);
                        setShowStates(false);
                    }}
                >
                    {stateName}
                </button>
                ))}
            </div>
            )}
        </div>
    );

}