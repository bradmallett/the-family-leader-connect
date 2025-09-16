import { getFormByID } from "@/app/actions/forms/getFormByID";
import HeaderConnect from "@/app/components/HeaderConnect";
import ConstituentFormFooter from "@/app/components/constituentForm/ConstituentFormFooter";

export default async function Page({ params }) {
    const { formID } = await params;
    const formData = await getFormByID(formID);

    return (
        <div className="h-screen flex flex-col justify-between text-gray-600">
            <HeaderConnect/>
                <p className="px-5 mx-auto text-center max-w-[800px] text-sm md:text-base">{formData.success_message}</p>
            <ConstituentFormFooter />
        </div>
    );
};