import Link from 'next/link';

export default function Navbar() {
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
				<Link href="/" className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition-all">Login</Link>
			</div>
		</nav>
	);
}