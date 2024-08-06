import { useContext, useState } from "react";
import Link from "next/link";
import AuthContext from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FaGear, FaArrowRightFromBracket } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";

export default function Dropdown() {
    const { logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen ? "flex" : "hidden";

    return (
        <div>
            <button onClick={toggle} className="flex mx-5 text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4" type="button">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="/blank-profile.png" alt="Profile picture" />
            </button>
            <div className={`text-gray-700 absolute top-20 right-2 z-10 ${transClass} flex-col bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                <ul className="py-2 text-sm">
                    <li>
                        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-green-600 transition-all">
                            <RiDashboardFill />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-green-600 transition-all">
                            <FaGear />
                            <span>Configurações</span>
                        </Link>
                    </li>
                </ul>
                <div className="py-2 flex">
                    <a onClick={handleLogout} className="flex items-center gap-2 w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 hover:cursor-pointer transition-all">
                        <FaArrowRightFromBracket />
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </div>
    );
}