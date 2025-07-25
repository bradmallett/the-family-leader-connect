import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import HeaderAdmin from '@/app/components/HeaderAdmin';

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
      <h3 className='text-center text-lg font-bold mb-10'>page under construction...</h3>
      <p className='text-center'>This page will display all created forms. Here you'll be able to edit, delete, and send forms to constituents.</p>
    </div>
  );
}
