import { createClient } from "@/utils/supabase/server";
import LegislatorsTable from "./LegislatorsTable";
import getAllLegislators from "@/app/actions/legislators/getAllLegislators";

export default async function AllLegislators() {
  const formattedLegislators = await getAllLegislators();

  return (
    <div className="">
        <LegislatorsTable legislators={formattedLegislators} />
    </div>
  )
}
