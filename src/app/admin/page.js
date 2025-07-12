import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/utils/supabase/signOut';
import TestingDb from '@/app/components/TestingDb';

export default async function AdminPage() {
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
  <div>
    <h1>admin page</h1>
    <p>Hello {data.user.email}</p>
    <button onClick={signOut} className="p-2 border-2 cursor-pointer hover:bg-amber-500">SIGNOUT</button>
    <TestingDb />
  </div>
  );
}
