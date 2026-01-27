import { login } from "./actions";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen font-inter">

      {/* header for non admin pages */}
      <div className="m-3 shrink-0">
          <Image
            className="dark:invert"
            src="/tfl-logo-wh1.webp"
            alt="The Family Leader Logo"
            width={162}
            height={35}
            priority
          />
          <h3 className="text-base font-black text-gray-600 mt-2 border-t-2 border-gray-600 w-fit">CONNECT</h3>
      </div>

      {/* login form */}
      <div className="flex-1 flex flex-col items-center justify-center w-full text-gray-600 -mt-25">
        <h1 className="p-3 font-bold text-lg">ADMIN LOGIN</h1>
        <form className="flex flex-col border-2 border-gray-600 p-4 max-w-md mx-auto gap-6">
          <div className="flex flex-col-reverse">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
            />
            <label
              htmlFor="email"
              className="text-sm text-gray-600 peer-focus:text-tfl-green"
            >
              EMAIL
            </label>
          </div>
          <div className="flex flex-col-reverse">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="peer p-2 outline-none border-2 border-gray-600 font-bold focus:text-tfl-green focus:border-tfl-green"
            />
            <label
              htmlFor="password"
              className="text-sm text-gray-600 peer-focus:text-tfl-green"
            >
              PASSWORD
            </label>
          </div>
          <button formAction={login} className="p-2 font-bold cursor-pointer bg-gray-600 text-paperSwatch hover:bg-tfl-green">LOGIN</button>
          {/* <button formAction={signup}>Sign up</button> */}
        </form>
        <p className="mt-5 text-sm text-center font-bold text-tfl-green">This is a demo of an internal tool.<br /> Admin credentials are available upon request.</p>
      </div>

    </div>
  );
}
