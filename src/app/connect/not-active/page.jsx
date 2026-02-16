import HeaderConnect from "@/app/components/HeaderConnect";
import ConstituentFormFooter from "@/app/components/constituentForm/ConstituentFormFooter";

export default async function Page() {
    return (
        <div className="h-screen flex flex-col justify-between text-gray-600">
            <HeaderConnect/>
                <p className="px-5 mx-auto text-center max-w-[800px] text-sm md:text-base">This form is no longer active. You can close this tab.</p>             
            <ConstituentFormFooter />
        </div>
    );
};