import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import HeaderAdmin from '@/app/components/HeaderAdmin';

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

  const user = data.user;

  return (
    <div className='max-w-[1800px] mx-auto'>
        <HeaderAdmin user={user}/>
        <h1>Create New Form!</h1>
        <p>This is where you can create a new form.</p>
    </div>
    );
}