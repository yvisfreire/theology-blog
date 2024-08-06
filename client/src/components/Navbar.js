'use client';

import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import Dropdown from './Dropdown';

export default function Navbar() {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<nav className="flex justify-between items-center w-full px-12 py-4">
			<div>
				<Link href="/" className="text-lg font-bold hover:text-green-600 transition-all">TeoLima</Link>
			</div>
			<div className="flex grow justify-center">
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
					<Dropdown />
				) : (
					<Link href="/login" className="text-green-600 hover:bg-green-600 hover:text-white border border-green-600 px-5 py-2.5 text-sm rounded-lg transition-all">Login</Link>
				)}
			</div>
		</nav>
	);
}
