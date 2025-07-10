import { login } from "./actions";

export default function LoginPage() {
  return (
    <form className="m-4">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required className="p-2 border-2"/>

      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required className="p-2 border-2"/>

      <button formAction={login} className="p-2 border-2 cursor-pointer hover:bg-amber-500">Log in</button>
      {/* <button formAction={signup}>Sign up</button> */}
    </form>
  );
}
