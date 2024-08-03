import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-neutral-800 text-gray-400 text-xs px-2 py-4 mt-10">
            <div className="container mx-auto flex justify-between items-center">
                <p>© 2024 TeoLima</p>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-xl text-gray-400 hover:text-pink-500 transition-all" />
                </a>
                <p>Feito por <a href="https://github.com/yvisfreire" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 transition-all">Yvis Freire</a></p>
            </div>
        </footer>
    );
}
