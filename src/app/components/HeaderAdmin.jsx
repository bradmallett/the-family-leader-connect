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
    const [headerTitle, setHeaderTitle] = useState(() => getHeaderTitle())

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

    function getHeaderTitle() {
        if(pathName === '/all-forms') {
            return 'ALL FORMS';
        }
        
        if(pathName === '/manage-legislators') {
            return 'MANAGE LEGISLATORS';
        }

        if(pathName === '/create-new-form') {
            return 'CREATE NEW FORM';
        }
    }


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
                            <Link href="/all-forms" className={clsx(pathName === '/all-forms' ? 'font-bold text-tfl-green' : 'hover:text-tfl-green')}>
                                ALL FORMS
                            </Link>
                        </li>
                        <li>
                            <Link href="/manage-legislators" className={clsx(pathName === '/manage-legislators' ? 'font-bold text-tfl-green' : 'hover:text-tfl-green')}>
                                MANAGE LEGISLATORS
                            </Link>
                        </li>
                        <li>
                            <Link href="/create-new-form" className={clsx(pathName === '/create-new-form' ? 'font-bold text-tfl-green' : 'hover:text-tfl-green')}>
                                CREATE NEW FORM
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <h1 className="text-gray-600 text-3xl font-black my-12">{headerTitle}</h1>
            <div>
                
                <div className="relative">
                    <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex justify-center items-center group">
                        <UserCircleIcon className="mr-1 h-7 w-7 group-hover:text-tfl-green"/>
                        <p className="group-hover:text-tfl-green">{`${user.email}`}</p>
                    </div>

                    {/* SIGN OUT BUTTON */}
                    {isOpen && (
                        <button 
                            onClick={signOut}
                            className="signOut absolute top-8 p-2 font-bold cursor-pointer bg-gray-600 text-paperSwatch hover:bg-tfl-green"   
                            // p-2 font-bold cursor-pointer bg-gray-600 text-paperSwatch hover:bg-tfl-green 
                        >
                            SIGN OUT
                        </button>   
                    )}

                </div>

            </div>
        </header>
    );
}