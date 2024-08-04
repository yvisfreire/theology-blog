import { useContext, useState } from "react";
import Link from "next/link";
import AuthContext from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

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
            <div className={`absolute top-20 right-2 z-10 ${transClass} flex-col bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                <ul className="py-2 text-sm text-gray-700">
                    <li>
                        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 hover:text-green-600 transition-all">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 hover:text-green-600 transition-all">Configurações</Link>
                    </li>
                </ul>
                <div className="py-2">
                    <a onClick={handleLogout} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 hover:cursor-pointer transition-all">Logout</a>
                </div>
            </div>
        </div>
    );
}