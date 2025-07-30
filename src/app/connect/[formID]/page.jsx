import { getFormByID } from "@/app/actions/forms/getFormByID"
import HeaderConnect from "@/app/components/HeaderConnect";

export default async function Page({ params }) {
    const { formID } = await params;

    const formData = await getFormByID(formID);

    return (
        <div>
            <HeaderConnect />
            <h1>{formData.form_name}</h1>
            <h2>Form ID: {formData.id}</h2>
            <p>{formData.constituent_direction}</p>
            <p>{formData.constituent_email_prompt}</p>
        </div>
    );
};