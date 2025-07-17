
import { editLegislator } from '@/app/actions/legislators/editLegislator';
import { useState } from 'react';
import SelectDistrictInput from './SelectDistrictInput';
import SelectCountyInput from './SelectCountyInput';
import SelectPartyInput from './SelectPartyInput';
import SelectChamberInput from './SelectChamberInput';

export default function EditLegislatorForm({legislator, closeEditLegislatorForm }) {
    const [legislatorID , setLegislatorID] = useState(legislator.ID)
    const [title, setTitle] = useState(() => legislator.title === null ? '' : legislator.title); // could be null
    const [firstName, setFirstName] = useState(legislator.firstName);
    const [middleName, setMiddleName] = useState(() => legislator.middleName === null ? '' : legislator.middleName);// could be null
    const [lastName, setLastName] = useState(legislator.lastName);
    const [email, setEmail] = useState(legislator.email);
    const [district, setDistrict] = useState(legislator.district);
    const [county, setCounty] = useState(legislator.county);
    const [party, setParty] = useState(legislator.party);
    const [chamber, setChamber] = useState(legislator.chamber);


    // sent from the district selection component
    function updateDistrict(newDistrict) {
        setDistrict(newDistrict);
    }

    // sent from the district selection component
    function updateCounty(newCounty) {
        setCounty(newCounty);
    }

    // sent from the district selection component
    function updateParty(newParty) {
        setParty(newParty);
    }

    // sent from the district selection component
    function updateChamber(newChamber) {
        setChamber(newChamber);
    }


    function handleEditLegislator() {
        const legislator = {
            legislatorID: legislatorID,
            title: title === '' ? null : title.trim(),
            firstName: firstName.trim(),
            middleName: middleName === '' ? null : middleName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            district,
            county,
            party,
            chamber
        }

        editLegislator(legislator);
        closeEditLegislatorForm();
    }


    return (
        <div className='text-gray-600 flex gap-5 flex-wrap mt-5'>
            <div className="flex flex-col-reverse items-start">
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-[100px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="title"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                TITLE ("Dr." / "Mr.")
                </label>
            </div>

            <div className="flex flex-col-reverse items-start">
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-[300px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="firstName"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                FIRST NAME
                </label>
            </div>

            <div className="flex flex-col-reverse items-start">
                <input
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-[300px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="middleName"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                MIDDLE NAME
                </label>
            </div>

              <div className="flex flex-col-reverse items-start">
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-[300px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="lastName"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                LAST NAME (include suffix if applicable: "Jr.")
                </label>
            </div>

            <div className="flex flex-col-reverse items-start">
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-[300px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="email"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                EMAIL
                </label>
            </div>

            <SelectDistrictInput prevDistrict={legislator.district} updateDistrict={updateDistrict}/>
            <SelectCountyInput prevCounty={legislator.county} updateCounty={updateCounty}/>
            <SelectPartyInput prevParty={legislator.party} updateParty={updateParty}/>
            <SelectChamberInput prevChamber={legislator.chamber} updateChamber={updateChamber}/>
            
            <div className='w-full text-left font-black text-base'>
                <button 
                    onClick={() => handleEditLegislator()}
                    className="p-3 mt-3 cursor-pointer bg-gray-600 text-paperSwatch hover:bg-tfl-green"   
                >
                    SAVE EDIT
                </button>
            </div>
        </div>
    );
}