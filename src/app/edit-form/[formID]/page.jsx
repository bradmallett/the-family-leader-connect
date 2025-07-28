import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import HeaderAdmin from '@/app/components/HeaderAdmin';
import EditFormForm from '@/app/components/editForm/EditFormForm';
import getAllLegislators from '@/app/actions/legislators/getAllLegislators';
import { getFormByID } from '@/app/actions/forms/getFormByID';
import { getSelectedLegislators } from '@/app/actions/legislators/getSelectedLegislators';


export default async function Page({ params }) {
  // create client for every protected page
  const supabase = await createClient();

  // ensure user is logged in
  // sends req to supabase auth server to revalidate auth token
  const { data, error } = await supabase.auth.getUser();

  // if not authenticated, redirect to login
  if (error || !data?.user) {
    redirect('/login');
  }

  const { formID } = await params;
  const formData = await getFormByID(formID);
  const selectedLegislatorIDs = await getSelectedLegislators(formID);
  const allLegislators = await getAllLegislators();


  return (
    <div>
        <HeaderAdmin user={data.user}/>
        <EditFormForm formData={formData} allLegislators={allLegislators} selectedLegislatorIDs={selectedLegislatorIDs}/>
    </div>
  )
}