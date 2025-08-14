'use client';

import { useState } from 'react';
import { formatPhoneNumber, isValidEmail, isValidPhone } from './constituentUtils';
import SelectState from './SelectState';
// import SelectLegislators from './SelectLegislators';
// import { createForm } from '@/app/actions/forms/createForm';

export default function ConstituentFormForm({ formData }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('IOWA');
    const [zip, setZip] = useState('');

    function updateSelectedState(selectedState) {
        setState(selectedState);
    }

    function handleSendMessage() {
        if (!firstName || !lastName || !email || !address || !city || !zip) {
            alert('Please fill out all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if(phone.length && !isValidPhone(phone)) {
            alert('Please enter a valid phone number');
            return;
        }

        // Here you would typically send the form data to your server
        console.log({
            firstName,
            lastName,
            email,
            phone,
            address,
            addressTwo,
            city,
            state,
            zip
        });

        // Reset form fields after submission
        // setFirstName('');
        // setLastName('');
        // setEmail('');
        // setPhone('');
        // setAddress('');
        // setAddressTwo('');
        // setCity('');
        // setState('IOWA');
        // setZip('');
    }

    return (
        <div className='max-w-11/12 flex mx-auto justify-center mt-15 gap-20 mb-5 text-gray-600'>
            <div className='w-[45%] max-w-[800px]'>
                <h2 className='border-b-2 border-tfl-green font-bold text-lg text-tfl-green'>CONSTITUENT</h2>
                <h3 className='font-light text-sm'>PLEASE ENTER YOUR INFORMATION</h3>
                <p className='text-xs text-red-600'>*required</p>

                {/* div holding first group of form fields */}
                <div className='w-full mt-10 flex flex-wrap gap-5'>
                    <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
                        <input 
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green'
                        />
                        <label
                            htmlFor="firstName"
                            className="text-xs font-medium peer-focus:text-tfl-green"
                        >FIRST NAME<span className='text-red-600'>*</span></label>
                    </div>
                    <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
                        <input 
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green'
                        />
                        <label
                            htmlFor="lastName"
                            className="text-xs font-medium peer-focus:text-tfl-green"
                        >LAST NAME<span className='text-red-600'>*</span></label>
                    </div>
                    <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green'
                        />
                        <label
                            htmlFor="email"
                            className="text-xs font-medium peer-focus:text-tfl-green"
                        >EMAIL<span className='text-red-600'>*</span></label>
                    </div>
                    <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
                        <input 
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => setPhone(formatPhoneNumber(phone))}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green'
                        />
                        <label
                            htmlFor="phone"
                            className="text-xs font-medium peer-focus:text-tfl-green"
                        >PHONE</label>
                    </div>
                </div>


                {/* div holding 2nd group of form fields */}
                <div className='w-full mt-10 flex flex-wrap gap-5'>

                    <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
                        <input 
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green'
                        />
                        <label
                            htmlFor="firstName"
                            className="text-xs font-medium peer-focus:text-tfl-green"
                        >ADDRESS<span className='text-red-600'>*</span></label>
                    </div>

                    <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
                        <input 
                            type="text"
                            id="addressTwo"
                            value={addressTwo}
                            onChange={(e) => setAddressTwo(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green'
                        />
                        <label
                            htmlFor="addressTwo"
                            className="text-xs font-medium peer-focus:text-tfl-green"
                        >ADDRESS 2</label>
                    </div>

                    <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
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
                    </div>


                    {/* Need to finish the SelectState component */}
                    {/* <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
                        <input 
                            type="text"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green'
                        />
                        <label
                            htmlFor="state"
                            className="text-xs font-medium peer-focus:text-tfl-green"
                        >STATE</label>
                    </div> */}


                    <SelectState updateSelectedState={updateSelectedState}/>


                    <div className="flex flex-col-reverse w-[45%] min-w-[180px] max-w-[330px]">
                        <input 
                            type="text"
                            id="zip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green'
                        />
                        <label
                            htmlFor="zip"
                            className="text-xs font-medium peer-focus:text-tfl-green"
                        >ZIP CODE<span className='text-red-600'>*</span></label>
                    </div>


                </div>





            </div>
            <div className='w-[45%]'>
                <h2 className='border-b-2 border-tfl-green font-bold text-lg text-tfl-green'>EMAIL BODY</h2>
                <h3 className='font-light text-sm'>CUSTOMIZE YOUR MESSAGE TO THE LEGISLATORS</h3>
                { formData.constituent_direction &&
                    <p className='text-sm'>{formData.constituent_direction}</p>
                }
                {/* <textarea
                    
                    rows="10"
                    className='w-[80%] p-2 border-2 border-gray-600 text-sm'
                >
                        {formData.constituent_email_prompt}
                </textarea> */}
            </div>
        </div>
    );
}