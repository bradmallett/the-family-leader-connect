import { deleteForm } from "@/app/actions/forms/deleteForm";

export default function DeleteFormForm({ formID, formName, closeDeleteFormPopup }) {
    function handleDeleteForm() {

        deleteForm(formID)
        closeDeleteFormPopup();
    }

    return (
        <div className='text-base text-left gap-5 mt-5'>
            <p className=''>Delete <span className='text-red-500'>"{formName}"</span> from ALL FORMS list?</p>

            <button 
                onClick={handleDeleteForm}
                className="p-3 mt-4 font-bold cursor-pointer bg-red-600 text-white hover:bg-tfl-green"   
            >
                DELETE FORM
            </button>
        </div>
    );
}