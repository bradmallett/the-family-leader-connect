import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import HeaderAdmin from '@/app/components/HeaderAdmin';
import AllForms from '../components/allForms/AllForms';

export default async function allForms() {
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
      <AllForms />
    </div>
  );
}
