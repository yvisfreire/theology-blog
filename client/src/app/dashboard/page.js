import Link from "next/link";

export default function Dashboard() {
    return (
        <div>
            <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/plantando.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none pt-5">Dashboard</h1>
            </div>
            <div>
                <Link href="/dashboard/write" className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Escrever</Link>
            </div>
        </div>
    );
}