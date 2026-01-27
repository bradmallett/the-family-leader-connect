import HeaderConnect from "@/app/components/HeaderConnect";
import ConstituentFormFooter from "@/app/components/constituentForm/ConstituentFormFooter";
import getSuccessData from "./getSuccessData";
import SelectedLegislators from "@/app/components/success/SelectedLegislators";


export default async function Page({ params }) {
    const { formID } = await params;
    const successData = await getSuccessData(formID);

    if(!successData) {
        throw new Error('Unable to submit form. Please try again.');
    }

    const {formData, selectedLegs} = successData;

    return (
        <div className="h-screen flex flex-col justify-between text-gray-600">
            <HeaderConnect/>
                <p className="px-5 mx-auto text-center max-w-[800px] text-sm md:text-base">{formData.success_message}</p>
                <SelectedLegislators selectedLegs={selectedLegs}/>                
            <ConstituentFormFooter />
        </div>
    );
};