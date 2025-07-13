'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation'
import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { signOut } from '@/utils/supabase/signOut';


export default function HeaderAdmin( { user } ) {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();

    // CLOSE POPUP WITH CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (event) => {
            if(isOpen && !event.target.closest(".signOut")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [isOpen]);


    return (
        <header className="flex justify-between m-6 text-sm text-gray-600">
            <div>
                <Image
                    className="dark:invert"
                    src="/tfl-logo-wh1.webp"
                    alt="The Family Leader Logo"
                    width={162}
                    height={35}
                    priority
                />
                <nav className="mt-5 pl-2 border-l-2 border-gray-600">
                    <ul>
                        <li>
                            <Link href="/all-forms" className={clsx(pathName === '/all-forms' ? 'font-bold' : 'hover:font-bold')}>
                                ALL FORMS
                            </Link>
                        </li>
                        <li>
                            <Link href="/manage-legislators" className={clsx(pathName === '/manage-legislators' ? 'font-bold' : 'hover:font-bold')}>
                                MANAGE LEGISLATORS
                            </Link>
                        </li>
                        <li>
                            <Link href="/create-new-form" className={clsx(pathName === '/create-new-form' ? 'font-bold' : 'hover:font-bold')}>
                                CREATE NEW FORM
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                
                <div className="relative">
                    <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex justify-center items-center">
                        <UserCircleIcon className="mr-1 h-7 w-7"/>
                        <p>{`${user.email}`}</p>
                    </div>


                    {/* SIGN OUT BUTTON */}
                    {isOpen && (
                        <button 
                            onClick={signOut}
                            className="signOut p-2 border-2 border-gray-600 absolute top-10 cursor-pointer hover:bg-amber-500"    
                        >
                            Sign Out
                        </button>   
                    )}

                </div>

            </div>
        </header>
    );
}