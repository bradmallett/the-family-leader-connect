import { redirect } from "next/navigation";

export default function Home() {
  redirect("/all-forms");
  
  return (
    <div>
      you shouldn't see this.
    </div>
  );
}
