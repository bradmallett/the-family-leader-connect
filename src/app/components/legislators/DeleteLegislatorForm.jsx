
import { deleteLegislator } from '@/app/actions/legislators/deleteLegislator';


export default function AddLegislatorForm({ legislatorID, legislatorName, closeDeleteLegislatorPopup }) {
    function handleDeleteLegislator() {
        deleteLegislator(legislatorID);
        closeDeleteLegislatorPopup();
    }

    return (
        <div className='text-base text-left gap-5 mt-5'>
            <p className=''>Delete <span className='text-red-500'>{legislatorName}</span> from legislator list?</p>

            <button 
                onClick={() => handleDeleteLegislator()}
                className="p-3 mt-4 font-bold cursor-pointer bg-red-600 text-white hover:bg-tfl-green"   
            >
                DELETE LEGISLATOR
            </button>
        </div>
    );
}