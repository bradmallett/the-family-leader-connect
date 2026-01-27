import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import HeaderAdmin from '@/app/components/HeaderAdmin';
import CreateFormForm from'@/app/components/createForm/CreateFormForm';
import getAllLegislators from '../actions/legislators/getAllLegislators';

export default async function createNewForm() {
    // create client for every protected page
    const supabase = await createClient();

    // ensure user is logged in
    // sends req to supabase auth server to revalidate auth token
    const { data, error } = await supabase.auth.getUser();

    // if not authenticated, redirect to login
    if (error || !data?.user) {
        redirect('/login');
    }

    const legislators = await getAllLegislators();



  return (
    <div className='max-w-[1800px] mx-auto font-inter'>
        <HeaderAdmin user={data.user}/>
        <CreateFormForm legislators={legislators} />
    </div>
    );
}