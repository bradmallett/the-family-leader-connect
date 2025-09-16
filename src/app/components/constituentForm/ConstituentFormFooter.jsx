import Link from "next/link";

export default function ConstituentFormFooter() {


    return (
        <div className="w-[90%] text-sm md:text-base md:w-[80%] mx-auto mt-30 text-center text-gray-600 border-t-2 border-tfl-green">    
            <p className="mt-3 mb-10">
                The FAMiLY Leader is a Christian ministry to government, transforming America for you and your family. <Link 
                    href="https://thefamilyleader.com/" 
                    target="blank"
                    className="font-bold text-tfl-green hover:text-tfl-blue"
            >
                        Learn More →
                </Link>
            </p>
        </div>
    )
}