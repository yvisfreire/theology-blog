import Link from "next/link";

export default function Tags() {
    return (
        <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/topicos.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none py-5">Tópicos</h1>
            </div>
            <div className="lg:mx-72 md:mx-32 sm:mx-24 mx-12 my-6">
                <div className="flex items-center justify-center gap-8 mb-8">
                    <Link href="/blog" className=" text-green-600 hover:text-green-700 transition-all text-center font-black leading-none">Posts</Link>
                    <Link href="/authors" className=" text-green-600 hover:text-green-700 transition-all text-center font-black leading-none">Autores</Link>
                    <Link href="/tags" className=" text-green-600 hover:text-green-700 transition-all text-center font-black leading-none">Tópicos</Link>
                </div>
                <hr className="h-px my-4 w-auto bg-gray-300 border-0"></hr>
                <p className="text-center">Em construção...</p>
            </div>
        </div>
    );
}