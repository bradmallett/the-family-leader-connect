import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

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
  </div>
  );
}
