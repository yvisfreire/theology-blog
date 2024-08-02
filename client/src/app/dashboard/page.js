'use client';

import Link from "next/link";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/blog');
                const data = await response.json();

                setPosts(data);
            } catch (error) {
                console.error('Erro ao buscar dados do post:', error);
            }
        }

        fetchData();
    }, [])

    const postCards = posts.map(post => <PostCard key={post.id} post={post} />)
    return (
        <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/plantando.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none pt-5">Dashboard</h1>
            </div>
            <div className="px-8 pt-4 lg:w-[60%] md:w-[80%] w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl text-center font-black leading-none">Posts</h2>
                    <Link href="/dashboard/write" className="shadow text-white text-sm text-center bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Escrever</Link>
                </div>
                <hr className="h-px my-4 bg-gray-300 border-0"></hr>
                <div className="grid grid-cols-3 gap-4">
                    {postCards}
                </div>
            </div>
        </div>
    );
}