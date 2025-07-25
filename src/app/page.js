import { redirect } from "next/navigation";

export default function Home() {
  redirect("/all-forms");

  return (
    <div>
      you should not see this.
    </div>
  );
}
