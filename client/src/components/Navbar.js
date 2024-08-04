'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';

export default function Navbar() {
	const { isAuthenticated, logout } = useContext(AuthContext);
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push('/login');
	};

	return (
		<nav className="flex justify-between items-center w-[92%] mx-auto py-5">
			<div>
				<Link href="/" className="text-lg font-bold hover:text-green-600 transition-all">TeoLima</Link>
			</div>
			<div>
				<ul className="flex items-center gap-[4vw]">
					<li className="hover:text-green-600 transition-all">
						<Link href="/">Home</Link>
					</li>
					<li className="hover:text-green-600 transition-all">
						<Link href="/blog">Blog</Link>
					</li>
					<li className="hover:text-green-600 transition-all">
						<Link href="/about">Sobre</Link>
					</li>
				</ul>
			</div>
			<div>
				{isAuthenticated ? (
					<button onClick={handleLogout} className="text-green-600 hover:bg-green-600 hover:text-white border border-green-600 px-5 py-2.5 text-sm rounded-lg transition-all">
						Logout
					</button>
				) : (
					<Link href="/login" className="text-green-600 hover:bg-green-600 hover:text-white border border-green-600 px-5 py-2.5 text-sm rounded-lg transition-all">Login</Link>
				)}
			</div>
		</nav>
	);
}
