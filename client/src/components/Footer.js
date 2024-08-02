import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-400 py-4 mt-10">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-sm">© 2024 Teologia com Limonada</p>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                    <FaInstagram className="text-xl text-gray-400 hover:text-pink-500 transition-all" />
                </a>
                <p className="text-sm">Desenvolvido por Yvis Freire</p>
            </div>
        </footer>
    );
}
