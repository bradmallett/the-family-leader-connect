import { createClient } from '@/utils/supabase/server';

export default async function TestingDb() {
    // create client for every protected page
    const supabase = await createClient();

    const { data, error } = await supabase
    .from('legislators')
    .select()

    // if not authenticated, redirect to login
    if (error || data.length === 0) {
    console.log('eror fetching legislators:', error);
    }

    return (
        <div className="m-4">
            <h1 className="text-2xl font-bold mb-4">Iowa Legislators</h1>
            <ul>
                {data.map((legislator) => (
                    <li key={legislator.id} className="p-2 border-b">
                        <h2 className='font-bold'>{legislator.first_name} {legislator.last_name}</h2>
                        <p>Party: {legislator.party}</p>
                        <p>Email: {legislator.email}</p>
                        <p>County: {legislator.county}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}