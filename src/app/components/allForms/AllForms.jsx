// import LegislatorsTable from "./LegislatorsTable";
import getAllForms from "@/app/actions/forms/getAllForms"
import FormsTable from "./FormsTable";

export default async function AllForms() {
  const allForms = await getAllForms();



  return (
    <div>
        {/* <LegislatorsTable legislators={formattedLegislators} /> */}
        <FormsTable allForms={allForms} />
    </div>
  )
}
