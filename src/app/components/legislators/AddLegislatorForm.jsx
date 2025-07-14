
import { addLegislator } from '@/app/actions/legislators/addLegislator';

export default function AddLegislatorForm() {

    return (
        <form className='text-gray-600 flex gap-5 flex-wrap mt-5'>
            <div className="flex flex-col-reverse items-start">
                <input
                    id="title"
                    name="title"
                    type="text"
                    className="w-[100px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="title"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                TITLE (Dr. / Mr...)
                </label>
            </div>

            <div className="flex flex-col-reverse items-start">
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
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
                    required
                    className="w-[300px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="lastName"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                LAST NAME (include suffix if applicable - Jr.)
                </label>
            </div>

            <div className="flex flex-col-reverse items-start">
                <input
                    id="email"
                    name="email"
                    type="email"
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

             <div className="flex flex-col-reverse items-start">
                <input
                    id="district"
                    name="district"
                    type="text"
                    required
                    className="w-[100px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="district"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                DISTRICT
                </label>
            </div>

            <div className="flex flex-col-reverse items-start">
                <input
                    id="county"
                    name="county"
                    type="text"
                    required
                    className="w-[300px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="county"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                COUNTY
                </label>
            </div>

            <div className="flex flex-col-reverse items-start">
                <input
                    id="party"
                    name="party"
                    type="text"
                    required
                    className="w-[300px] peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
                />
                <label
                    htmlFor="party"
                    className="text-xs font-medium peer-focus:text-tfl-green"
                >
                PARTY
                </label>
            </div>


            <button formAction={addLegislator}></button>
        </form>
    );
}