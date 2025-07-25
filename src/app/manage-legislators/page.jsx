import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import HeaderAdmin from '@/app/components/HeaderAdmin';
import AllLegislators from '@/app/components/legislators/AllLegislators';
import AddLegislatorPopup from '@/app/components/legislators/AddLegislatorPopup';

export default async function manageLegislators() {
    // create client for every protected page
    const supabase = await createClient();

    // ensure user is logged in
    // sends req to supabase auth server to revalidate auth token
    const { data, error } = await supabase.auth.getUser();

    // if not authenticated, redirect to login
    if (error || !data?.user) {
        redirect('/login');
    }

  return (
    <div className='max-w-[1800px] mx-auto font-inter'>
        <HeaderAdmin user={data.user}/>
        <AddLegislatorPopup />
        <AllLegislators />
    </div>
    );
}