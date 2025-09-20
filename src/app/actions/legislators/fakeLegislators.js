// First Name	100	VARCHAR(100)
// Last Name	100	VARCHAR(100)
// Email	254	VARCHAR(254)
// Phone	20	VARCHAR(20)
// Address 1	255	VARCHAR(255)
// Address 2	255	VARCHAR(255)
// City	100	VARCHAR(100)
// State	20	VARCHAR(20)
// ZIP	10	VARCHAR(10)
// Email Body	2000	TEXT




const fakeLegislators = [
  {
    id: '11111111-aaaa-4444-bbbb-cccccccccccc',
    created_at: '2025-07-15T14:10:20.123456+00:00',
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.coolguy@mailinator.com',
    district: '1',
    county: 'Redwood',
    party: 'Democrat',
    chamber: 'House',
    middle_name: null,
    title: 'Rep.'
  },
  {
    id: '22222222-bbbb-5555-cccc-dddddddddddd',
    created_at: '2025-07-15T14:11:30.654321+00:00',
    first_name: 'Emily',
    last_name: 'Johnson',
    email: 'emily.johnson@mailinator.com',
    district: '2',
    county: 'Bluegrass',
    party: 'Republican',
    chamber: 'Senate',
    middle_name: null,
    title: 'Sen.'
  },
  {
    id: '33333333-cccc-6666-dddd-eeeeeeeeeeee',
    created_at: '2025-07-15T14:12:45.789012+00:00',
    first_name: 'Jacob',
    last_name: 'Lee',
    email: 'jacob.lee@mailinator.com',
    district: '3',
    county: 'Oakwood',
    party: 'Democrat',
    chamber: 'House',
    middle_name: null,
    title: 'Rep.'
  },
  {
    id: '44444444-dddd-7777-eeee-ffffffffffff',
    created_at: '2025-07-15T14:13:55.321098+00:00',
    first_name: 'Sophia',
    last_name: 'Martinez',
    email: 'sophia.martinez@mailinator.com',
    district: '4',
    county: 'Riverbend',
    party: 'Republican',
    chamber: 'Senate',
    middle_name: null,
    title: 'Sen.'
  },
  {
    id: '55555555-eeee-8888-ffff-000000000000',
    created_at: '2025-07-15T14:15:05.987654+00:00',
    first_name: 'David',
    last_name: 'Nguyen',
    email: 'david.nguyen@mailinator.com',
    district: '5',
    county: 'Maplewood',
    party: 'Democrat',
    chamber: 'House',
    middle_name: null,
    title: 'Rep.'
  }
];


export default fakeLegislators;








// real structure

[
  {
    id: '30624743-ccce-4863-a88b-edf5d4432c43',
    created_at: '2025-07-11T17:17:38.954514+00:00',
    first_name: 'Eddie',
    last_name: 'Andrews',
    email: 'eddie.andrews@legis.iowa.gov',
    district: '43',
    county: 'Polk',
    party: 'Republican',
    chamber: 'House',
    middle_name: null,
    title: null
  },
  {
    id: '6c197f42-2af3-4904-9036-b4110bf13a69',
    created_at: '2025-07-12T22:00:15.359707+00:00',
    first_name: 'Mike',
    last_name: 'Bousselot',
    email: 'mike.bousselot@legis.iowa.gov',
    district: '21',
    county: 'Polk',
    party: 'Republican',
    chamber: 'Senate',
    middle_name: null,
    title: null
  },
  {
    id: '9cf57c00-1aae-4802-a76e-4cca1ff9c9f5',
    created_at: '2025-07-12T22:24:55.426121+00:00',
    first_name: 'Bill',
    last_name: 'Gustoff',
    email: 'bill.gustoff@legis.iowa.gov',
    district: '40',
    county: 'Polk',
    party: 'Republican',
    chamber: 'House',
    middle_name: null,
    title: null
  }
]