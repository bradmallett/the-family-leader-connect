'use client';


import { useState } from 'react';
import SelectLegislators from './SelectLegislators'

export default function CreateFormForm({ legislators }) {
    const [selectedLegislators, setSelectedLegislators] = useState([])
    const [formName, setFormName] = useState('');
    const [constituentDirection, setConstituentDirection] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [successMessage, setSuccessMessage] = useState('Your message has been emailed to your local legislators. You can close this window.');

    function handleGenerateForm() {
        const newFormData = {
            // title: title === '' ? null : title.trim(),
            formName: formName.trim(),
            constituentDirection: constituentDirection.trim(),
            emailBody: emailBody.trim(),
            successMessage: successMessage.trim(),
            selectedLegislators
        }

       
    }


    function updateSelectedLegislators(legislators) {
        setSelectedLegislators(legislators);
    }


    return (
        <div className='max-w-11/12 flex mx-auto justify-center gap-10'>

            <div className='w-[60%]'>
                <SelectLegislators legislators={legislators} updateSelectedLegislators={updateSelectedLegislators}/>
            </div>


            <div className='w-[30%] text-gray-600 flex flex-col gap-6 mt-13'>
                <div className="flex flex-col-reverse items-start">
                    <input
                        id="formName"
                        name="formName"
                        type="text"
                        value={formName}
                        placeholder='Form Name'
                        required
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-[300px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                    />
                    <label
                        htmlFor="formName"
                        className="text-xs font-medium peer-focus:text-tfl-green"
                    >
                    FORM NAME <span className='text-red-500'>*</span>
                    </label>
                </div>
                <div className="flex flex-col-reverse items-start">
                    <textarea
                        id="constituentDirection"
                        name="constituentDirection"
                        value={constituentDirection}
                        placeholder='Give direction or add informative notes to the constituent...'
                        onChange={(e) => setConstituentDirection(e.target.value)}
                        rows={5} // optional — controls initial height
                        className="w-full peer p-2 outline-none border-2 border-gray-600 font-bold text-sm text-gray-500 focus:text-gray-600 focus:border-tfl-green resize-y"
                    />
                    <label
                        htmlFor="constituentDirection"
                        className="text-xs font-medium peer-focus:text-tfl-green"
                    >
                        DIRECTION FOR CONSTITUENT
                    </label>
                </div>
                <div className="flex flex-col-reverse items-start">
                    <textarea
                        id="emailBody"
                        name="emailBody"
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        placeholder='Create an editable placeholder message for the constituent email body...'
                        rows={5} // optional — controls initial height
                        className="w-full peer p-2 outline-none border-2 border-gray-600 font-bold text-sm text-gray-500 focus:text-gray-600 focus:border-tfl-green resize-y"
                    />
                    <label
                        htmlFor="emailBody"
                        className="text-xs font-medium peer-focus:text-tfl-green"
                    >
                        CONSTITUENT EMAIL BODY
                    </label>
                </div>
                <div className="flex flex-col-reverse items-start">
                    <textarea
                        id="successMessage"
                        name="successMessage"
                        value={successMessage}
                        onChange={(e) => setSuccessMessage(e.target.value)}
                        rows={5} // optional — controls initial height
                        className="w-full peer p-2 outline-none border-2 border-gray-600 font-bold text-sm text-gray-500 focus:text-gray-600 focus:border-tfl-green resize-y"
                    />
                    <label
                        htmlFor="successMessage"
                        className="text-xs font-medium peer-focus:text-tfl-green"
                    >
                        SUCCESS MESSAGE AFTER FORM SUBMISSION
                    </label>
                </div>


                {/* submit button */}
                <div className='text-left font-black text-base'>
                    <button 
                        onClick={() => handleGenerateForm()}
                        className="p-3 mt-3 cursor-pointer bg-gray-600 text-paperSwatch hover:bg-tfl-green"   
                    >
                        GENERATE FORM
                    </button>
                </div>
            </div>

        </div>
    );
}