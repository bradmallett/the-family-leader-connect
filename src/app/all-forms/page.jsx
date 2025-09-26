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
      <div className='mx-auto text-center my-10 max-w-[900px] px-10'>
        <p className='font-bold text-lg text-red-600'>CAUTION - APP LIVE AND REAL EMAILS WILL BE SENT!</p>
        <p className='text-sm text-red-600'>Before submiting a form as a constituent - verify the selected legislators attached to form by clicking on the edit/pencil icon. The selected legislators should only be "placeholder" legislators - eg.. Bryan Lee</p>
      </div>
      <AllForms />
    </div>
  );
}
