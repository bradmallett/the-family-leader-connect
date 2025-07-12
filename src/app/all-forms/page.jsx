import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/utils/supabase/signOut';
import TestingDb from '@/app/components/TestingDb';
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
      <h1 className='text-center text-4xl font-bold'>FORMS</h1>
      <p>Hello {data.user.email}</p>
      <TestingDb />
    </div>
  );
}
