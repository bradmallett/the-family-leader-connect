import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';


export default function SelectCountyInput({ updateCounty }) {
    const [showCounties, setShowCounties] = useState(false);
    const [county, setCounty] = useState('Adair');
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    
    useEffect(() => {
        // CLOSE DROPDOWN WITH CLICK OUTSIDE
        const handleClickOutside = (event) => {
            if(showCounties && !event.target.closest(".counties")) {
                setShowCounties(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // calculate space for dropdown selection
        if (showCounties && triggerRef.current && dropdownRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - triggerRect.bottom - 16; // 16px padding

            dropdownRef.current.style.maxHeight = `${spaceBelow}px`;
            dropdownRef.current.style.overflowY = 'auto';
        }


        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [showCounties]);



    // sending the district value to the parent component
    useEffect(() => {
        updateCounty(county);
    }, [county]);

    // all iowa districts
    const iowaCounties = ["Adair", "Adams", "Allamakee", "Appanoose", "Audubon", "Benton", "Black Hawk", "Boone", "Bremer", "Buchanan", "Buena Vista", "Butler", "Calhoun", "Carroll", "Cass", "Cedar", "Cerro Gordo", "Cherokee", "Chickasaw", "Clarke", "Clay", "Clayton", "Clinton", "Crawford", "Dallas", "Davis", "Decatur", "Delaware", "Des Moines", "Dickinson", "Dubuque", "Emmet", "Fayette", "Floyd", "Franklin", "Fremont", "Greene", "Grundy", "Guthrie", "Hamilton", "Hancock", "Hardin", "Harrison", "Henry", "Howard", "Humboldt", "Ida", "Iowa", "Jackson", "Jasper", "Jefferson", "Johnson", "Jones", "Keokuk", "Kossuth", "Lee", "Linn", "Louisa", "Lucas", "Lyon", "Madison", "Mahaska", "Marion", "Marshall", "Mills", "Mitchell", "Monona", "Monroe", "Montgomery", "Muscatine", "O’Brien", "Osceola", "Page", "Palo Alto", "Plymouth", "Pocahontas", "Polk", "Pottawattamie", "Poweshiek", "Ringgold", "Sac", "Scott", "Shelby", "Sioux", "Story", "Tama", "Taylor", "Union", "Van Buren", "Wapello", "Warren", "Washington", "Wayne", "Webster", "Winnebago", "Winneshiek", "Woodbury", "Worth", "Wright"];



    return (
        <div className="relative flex flex-col group">
            <p className='self-start text-xs font-medium group-hover:text-tfl-green'>COUNTY</p>
            {/* Button to toggle district selection open and closed */}
                <button
                    ref={triggerRef}
                    className="p-2 outline-none border-2 border-gray-600 font-bold flex justify-between items-center cursor-pointer group-hover:border-tfl-green group-hover:text-tfl-green"
                    onClick={() => setShowCounties(true)}
                >
                    {county}<ChevronDownIcon className="size-5 ml-1"/>
                </button>

            {/* Dropdown list of districts */}
            {showCounties && 
                <div 
                    className='counties p-1 absolute flex flex-col top-4 -right-30 border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 custom-scroll'
                    ref={dropdownRef}
                >
                    {iowaCounties.map((county) => (
                        <button
                            key={county}
                            className="p-1 hover:bg-slate-600 cursor-pointer"
                            onClick={() => {
                                setCounty(county);
                                setShowCounties(false);
                            }}
                        >
                            {county}
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}