import { getFormByID } from "@/app/actions/forms/getFormByID"
import HeaderConnect from "@/app/components/HeaderConnect";
import ConstituentFormForm from "@/app/components/constituentForm/ConstituentFormForm";
import ConstituentFormFooter from "@/app/components/constituentForm/ConstituentFormFooter";

export default async function Page({ params }) {
    const { formID } = await params;

    const formData = await getFormByID(formID);

    return (
        <div>
            <HeaderConnect/>
                <h1 className="mt-8 font-black uppercase text-gray-600 text-lg text-center md:text-2xl">{formData.form_name}</h1>
            <ConstituentFormForm formData={formData} />
            <ConstituentFormFooter />
        </div>
    );
};