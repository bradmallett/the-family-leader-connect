import { getFormByID } from "@/app/actions/forms/getFormByID"
import HeaderConnect from "@/app/components/HeaderConnect";
import ConstituentFormForm from "@/app/components/constituentForm/ConstituentFormForm";

export default async function Page({ params }) {
    const { formID } = await params;

    const formData = await getFormByID(formID);

    return (
        <div>
            <HeaderConnect/>
            <div className="text-center text-gray-600">
                <h1 className="font-black text-2xl">{formData.form_name}</h1>
            </div>
            <ConstituentFormForm formData={formData} />
            
        </div>
    );
};