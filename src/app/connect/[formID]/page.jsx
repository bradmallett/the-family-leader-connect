import { getFormByID } from "@/app/actions/forms/getFormByID"
import HeaderConnect from "@/app/components/HeaderConnect";
import ConstituentFormForm from "@/app/components/constituentForm/ConstituentFormForm";

export default async function Page({ params }) {
    const { formID } = await params;

    const formData = await getFormByID(formID);

    return (
        <div>
            <HeaderConnect />
            <div className="text-center text-gray-600">
                <h1 className="font-black text-2xl">CONNECT WITH LEGISLATORS</h1>
                <p className="mt-1 font-light text-sm">Enter your information to send a message to Iowa state legislators.</p>
            </div>

            <ConstituentFormForm formData={formData} />
        </div>
    );
};