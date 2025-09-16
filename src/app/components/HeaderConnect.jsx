
import Image from "next/image";
import Link from "next/link";

export default function HeaderConnect() {
    
    return (
        <header>
            <div className="m-3 flex flex-col md:flex-row md:gap-2">
                <Link href="https://thefamilyleader.com/" target="blank">
                    <Image
                        className="dark:invert hidden md:block"
                        src="/tfl-logo-wh1.webp"
                        alt="The Family Leader Logo"
                        width={162}
                        height={35}
                        priority
                    />
                    <Image
                        className="dark:invert md:hidden"
                        src="/tfl-logo-wh1.webp"
                        alt="The Family Leader Logo"
                        width={96}
                        height={21}
                        priority
                    />
                </Link>
                <p className="text-base font-black text-gray-600 hidden md:block"> | connect</p>
                <p className="text-sm font-black text-gray-600 md:hidden">connect</p>
            </div>
        </header>
    );
}