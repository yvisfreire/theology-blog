import ProfileImage from "@/components/ProfileImage";
import Link from "next/link";

export default async function Author() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { cache: 'no-store' });
    const users = await response.json();

    const userCards = users.map(user =>
        <Link href={`/authors/${user.username}`} key={user.id} className="flex flex-col items-center">
            <ProfileImage user={user} className="w-24 h-24 z-10 border-2 rounded-full" />
            <h1 className="text-green-600 hover:text-green-700 transition-all relative text-2xl font-black leading-none py-5 text-center">{user.name}</h1>
        </Link>
    )

    return (
        <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/limoeiro-alt.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none py-5">Autores</h1>
            </div>
            <div className="w-full xl:mx-64 md:mx-32 sm:mx-24 mx-4 my-8 px-5">
                <div className="flex items-center justify-center gap-8 mb-8">
                    <Link href="/blog" className=" text-green-600 hover:text-green-700 transition-all text-center font-black leading-none">Posts</Link>
                    <Link href="/authors" className=" text-green-600 hover:text-green-700 transition-all text-center font-black leading-none">Autores</Link>
                    <Link href="/tags" className=" text-green-600 hover:text-green-700 transition-all text-center font-black leading-none">Tópicos</Link>
                </div>
                <hr className="h-px my-4 bg-gray-300 border-0"></hr>
                <div className="flex justify-center">
                    {userCards}
                </div>
            </div>
        </div>
    );
}