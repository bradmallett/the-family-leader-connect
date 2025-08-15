
import Image from "next/image";
import Link from "next/link";

export default function HeaderConnect() {
    
    return (
        <header>
            <div className="m-3 flex gap-2">
                <Link href="https://thefamilyleader.com/" target="_blank">
                    <Image
                        className="dark:invert"
                        src="/tfl-logo-wh1.webp"
                        alt="The Family Leader Logo"
                        width={162}
                        height={35}
                        priority
                    />
                </Link>
                <p className="text-base font-black text-gray-600"> | connect</p>
            </div>
        </header>
    );
}