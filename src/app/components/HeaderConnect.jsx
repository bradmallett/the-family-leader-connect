
import Image from "next/image";

export default function HeaderConnect() {
    
    return (
        <header>
            <div className="m-3 flex gap-2">
                <Image
                    className="dark:invert"
                    src="/tfl-logo-wh1.webp"
                    alt="The Family Leader Logo"
                    width={162}
                    height={35}
                    priority
                />
                <p className="text-base font-black text-gray-600"> | connect</p>
            </div>
        </header>
    );
}