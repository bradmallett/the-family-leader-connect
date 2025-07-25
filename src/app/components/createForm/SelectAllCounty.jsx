import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';



export default function SelectAllCounty({ selectAllFromCounty }) {
    const [showCounties, setShowCounties] = useState(false);
    const [county, setCounty] = useState('');
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
            const spaceBelow = window.innerHeight - triggerRect.bottom - 25; // 25px padding

            dropdownRef.current.style.maxHeight = `${spaceBelow}px`;
            dropdownRef.current.style.overflowY = 'auto';
        }


        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [showCounties]);


    // sending the district value to the parent component
    useEffect(() => {
    if (county) {
        selectAllFromCounty(county);
        setCounty(''); // reset after sending to parent
    }
    }, [county]);

    // all iowa districts
    const iowaCounties = ["Adair", "Adams", "Allamakee", "Appanoose", "Audubon", "Benton", "Black Hawk", "Boone", "Bremer", "Buchanan", "Buena Vista", "Butler", "Calhoun", "Carroll", "Cass", "Cedar", "Cerro Gordo", "Cherokee", "Chickasaw", "Clarke", "Clay", "Clayton", "Clinton", "Crawford", "Dallas", "Davis", "Decatur", "Delaware", "Des Moines", "Dickinson", "Dubuque", "Emmet", "Fayette", "Floyd", "Franklin", "Fremont", "Greene", "Grundy", "Guthrie", "Hamilton", "Hancock", "Hardin", "Harrison", "Henry", "Howard", "Humboldt", "Ida", "Iowa", "Jackson", "Jasper", "Jefferson", "Johnson", "Jones", "Keokuk", "Kossuth", "Lee", "Linn", "Louisa", "Lucas", "Lyon", "Madison", "Mahaska", "Marion", "Marshall", "Mills", "Mitchell", "Monona", "Monroe", "Montgomery", "Muscatine", "O’Brien", "Osceola", "Page", "Palo Alto", "Plymouth", "Pocahontas", "Polk", "Pottawattamie", "Poweshiek", "Ringgold", "Sac", "Scott", "Shelby", "Sioux", "Story", "Tama", "Taylor", "Union", "Van Buren", "Wapello", "Warren", "Washington", "Wayne", "Webster", "Winnebago", "Winneshiek", "Woodbury", "Worth", "Wright"];


    return (
        <div className="relative flex">
            {/* Button to toggle district selection open and closed */}
                <button
                    ref={triggerRef}
                    className="p-1 outline-none cursor-pointer border-2 flex group hover:border-tfl-green"
                    onClick={() => setShowCounties(true)}
                >
                   <span className="font-medium group-hover:text-tfl-green">SELECT</span><ChevronDownIcon className="h-5 text-gray-600 cursor-pointer group-hover:text-tfl-green"/>
                </button>

            {/* Dropdown list of counties */}
            {showCounties && 
                <div 
                    className='counties p-1 absolute flex flex-col top-8 border-t-2 bg-tfl-green text-paperSwatch text-xs z-50 custom-scroll'
                    ref={dropdownRef}
                >
                    <p className='p-2 font-black bg-slate-600'>COUNTIES</p>
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