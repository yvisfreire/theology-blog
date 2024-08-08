'use client';

import PostCardDashboard from "@/components/PostCardDashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { parseCookies } from "nookies";

export default function Dashboard() {
    const router = useRouter();
    const cookies = parseCookies();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = cookies.token;

        if (!token) {
            router.push('/login');
            return;
        }

        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/blog');
                const data = await response.json();

                if (data.error) throw new Error(data.error);

                setPosts(data);
            } catch (error) {
                console.error('Erro ao buscar dados do post:', error);
            }
        }

        fetchData();
    }, [cookies.token]);

    const postCards = posts.map(post => <PostCardDashboard key={post.id} post={post} />)
    return (
        <div className="flex flex-col items-center bg-gray-50">
            <div className="relative flex flex-col items-center justify-center text-white mb-8 h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/plantando.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none pt-5">Dashboard</h1>
            </div>
            <div className="lg:mx-72 md:mx-32 sm:mx-24 mx-12">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl text-center font-black leading-none">Posts</h2>
                    <Link href="/dashboard/write" className="shadow text-white text-sm text-center bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Escrever</Link>
                </div>
                <hr className="h-px my-4 bg-gray-300 border-0"></hr>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                    {postCards}
                </div>
            </div>
        </div>
    );
}