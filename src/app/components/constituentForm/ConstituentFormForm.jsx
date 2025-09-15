'use client';

import { useState } from 'react';
import { formatPhoneNumber, isValidEmail, isValidPhone, isValidZip } from './constituentUtils';
import SelectState from './SelectState';
import { constituentSubmission } from '@/app/actions/constituents/constituentSubmission';


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
    const [formError, setFormError] = useState('');
    const [emailBodyError, setEmailBodyError] = useState('');
    const [emailBody, setEmailBody] = useState(formData.constituent_email_prompt || '');

    function updateSelectedState(selectedState) {
        setState(selectedState);
    }

    function handleSendMessage() {
        if (!firstName || !lastName || !email || !address || !city || !zip) {
            setFormError('Please fill out all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            setFormError('Please enter a valid email address.');
            return;
        }

        if(phone.length && !isValidPhone(phone)) {
            setFormError('Please enter a valid phone number.');
            return;
        }

        if (!isValidZip(zip)) {
            setFormError('Please enter a valid ZIP code.');
            return;
        }

        if (!emailBody) {
            setEmailBodyError('Please type your message in order to send.');
            return;
        }

        const constituentSubmissionData = {
            constituentFirstName: firstName.trim(),
            constituentLastName: lastName.trim(),
            constituentEmail: email.trim().toLowerCase(),
            constituentPhone: phone.trim(),
            constituentAddress: address.trim(),
            constituentAddressTwo: addressTwo.trim(),
            constituentCity: city.trim(),
            constituentState: state,
            constituentZip: zip.trim(),
            constituentEmailBody: emailBody.trim(),
            formID: formData.id
        }

       constituentSubmission(constituentSubmissionData);
    }

    return (
        <div className='w-11/12 max-w-[1750px] flex-col md:flex-row flex mx-auto justify-center mt-15 gap-20 mb-5 text-gray-600'>

            <div className='w-[90%] md:w-[45%] max-w-[800px] mx-auto'>
                <h2 className='border-b-2 border-tfl-green font-bold text-lg text-tfl-green'>CONSTITUENT</h2>
                <h3 className='font-light text-sm'>PLEASE ENTER YOUR INFORMATION</h3>
                <p className='text-xs text-red-600'>*required</p>
                {formError && (
                    <p className="text-red-600 font-bold text-base my-2">{formError}</p>
                )}

                {/* div holding first group of form fields */}
                <div className='w-full mt-10 flex flex-wrap gap-5'>
                    <div className="flex flex-col-reverse w-full md:w-[250px]">
                        <input 
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green hover:text-tfl-green hover:border-tfl-green text-xs md:text-sm'
                        />
                        <label
                            htmlFor="firstName"
                            className="text-xs font-medium peer-focus:text-tfl-green peer-hover:text-tfl-green"
                        >FIRST NAME<span className='text-red-600'>*</span></label>
                    </div>
                    <div className="flex flex-col-reverse w-full md:w-[250px]">
                        <input 
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green hover:text-tfl-green hover:border-tfl-green text-xs md:text-sm'
                        />
                        <label
                            htmlFor="lastName"
                            className="text-xs font-medium peer-focus:text-tfl-green peer-hover:text-tfl-green"
                        >LAST NAME<span className='text-red-600'>*</span></label>
                    </div>
                    <div className="flex flex-col-reverse w-full md:w-[250px]">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green hover:text-tfl-green hover:border-tfl-green text-xs md:text-sm'
                        />
                        <label
                            htmlFor="email"
                            className="text-xs font-medium peer-focus:text-tfl-green peer-hover:text-tfl-green"
                        >EMAIL<span className='text-red-600'>*</span></label>
                    </div>
                    <div className="flex flex-col-reverse w-full md:w-[250px]">
                        <input 
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => setPhone(formatPhoneNumber(phone))}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green hover:text-tfl-green hover:border-tfl-green text-xs md:text-sm'
                        />
                        <label
                            htmlFor="phone"
                            className="text-xs font-medium peer-focus:text-tfl-green peer-hover:text-tfl-green"
                        >PHONE</label>
                    </div>
                </div>

                {/* div holding 2nd group of form fields */}
                <div className='w-full mt-15 flex flex-wrap gap-5'>
                    <div className="flex flex-col-reverse w-full md:w-[250px]">
                        <input 
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green hover:text-tfl-green hover:border-tfl-green text-xs md:text-sm'
                        />
                        <label
                            htmlFor="firstName"
                            className="text-xs font-medium peer-focus:text-tfl-green peer-hover:text-tfl-green"
                        >ADDRESS<span className='text-red-600'>*</span></label>
                    </div>
                    <div className="flex flex-col-reverse w-full md:w-[250px]">
                        <input 
                            type="text"
                            id="addressTwo"
                            value={addressTwo}
                            onChange={(e) => setAddressTwo(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green hover:text-tfl-green hover:border-tfl-green text-xs md:text-sm'
                        />
                        <label
                            htmlFor="addressTwo"
                            className="text-xs font-medium peer-focus:text-tfl-green peer-hover:text-tfl-green"
                        >ADDRESS 2</label>
                    </div>
                    <div className="flex flex-col-reverse w-full md:w-[250px]">
                        <input 
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green hover:text-tfl-green hover:border-tfl-green text-xs md:text-sm'
                        />
                        <label
                            htmlFor="city"
                            className="text-xs font-medium peer-focus:text-tfl-green peer-hover:text-tfl-green"
                        >CITY<span className='text-red-600'>*</span></label>
                    </div>

                    <SelectState updateSelectedState={updateSelectedState}/>

                    <div className="flex flex-col-reverse w-full md:w-[250px]">
                        <input 
                            type="text"
                            id="zip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            className='peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green hover:text-tfl-green hover:border-tfl-green text-xs md:text-sm'
                        />
                        <label
                            htmlFor="zip"
                            className="text-xs font-medium peer-focus:text-tfl-green peer-hover:text-tfl-green"
                        >ZIP CODE<span className='text-red-600'>*</span></label>
                    </div>
                </div>
            </div>











            <div className='w-[90%] md:w-[45%] max-w-[800px] mx-auto'>
                <h2 className='border-b-2 border-tfl-green font-bold text-lg text-tfl-green'>EMAIL BODY</h2>
                <h3 className='font-light text-sm'>CUSTOMIZE YOUR MESSAGE TO THE LEGISLATORS</h3>
                { formData.constituent_direction &&
                    <p className='mt-5 text-sm font-medium'>{formData.constituent_direction}</p>
                }
                {emailBodyError ? 
                    <h3 className='mt-5 font-bold text-base text-red-600'>{emailBodyError}</h3> :
                    <h3 className='mt-5 font-bold text-sm text-tfl-green'>Please enter your message below.</h3>
                }
                <textarea
                    value={emailBody}
                    maxLength={2000}
                    onChange={(e) => {
                        setEmailBody(e.target.value)
                        setEmailBodyError('')
                    }}
                    rows="14"
                    className='w-full p-2 outline-none border-2 border-gray-600 font-medium focus:border-tfl-green text-sm text-black'
                />
                <p className="text-xs text-gray-500 text-left md:text-right">
                    {emailBody.length}/{2000} characters
                </p>
                <button
                    onClick={handleSendMessage}
                    className='mt-5 p-4 cursor-pointer text-sm md:text-base text-paperSwatch bg-gray-600 font-black hover:bg-tfl-green'
                >
                    SEND MESSAGE
                </button>
            </div>
        </div>
    );
}