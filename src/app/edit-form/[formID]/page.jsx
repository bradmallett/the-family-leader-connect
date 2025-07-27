export default async function Page({ params }) {
  const { formID } = await params


  return <div>Edit Form: {formID}</div>
}