'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import Dropdown from './Dropdown';
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function Navbar() {
	const { isAuthenticated } = useContext(AuthContext);
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<nav className="flex flex-col md:flex-row justify-between items-center w-full px-5 md:px-12 py-4">
			<div className="flex justify-between w-full md:w-auto items-center">
				<button className="md:hidden text-xl w-10" onClick={toggleMenu}>
					{menuOpen ? '✕' : '☰'}
				</button>
				<Link href="/" className="text-lg font-bold hover:text-green-600 transition-all mx-auto md:mx-0">TeoLima</Link>
				{isAuthenticated ? (
					<div className="md:hidden">
						<Dropdown />
					</div>
				) : (
					<Link href="/login" className="md:hidden text-green-600 hover:bg-green-600 hover:text-white border border-green-600 px-2.5 py-2.5 text-sm rounded-lg transition-all"><FaArrowRightToBracket /></Link>
				)}
			</div>
			<div className={`flex flex-col md:flex-row grow justify-center mt-4 md:mt-0 ${menuOpen ? 'block' : 'hidden'} md:block`}>
				<ul className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-[4vw]">
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
			<div className={`${menuOpen ? 'block mt-4 md:mt-0' : 'hidden'} md:block`}>
				{isAuthenticated ? (
					<div className="hidden md:block">
						<Dropdown />
					</div>
				) : (
					<Link href="/login" className="hidden md:inline text-green-600 hover:bg-green-600 hover:text-white border border-green-600 px-5 py-2.5 text-sm rounded-lg transition-all">Login</Link>
				)}
			</div>
		</nav>
	);
}
