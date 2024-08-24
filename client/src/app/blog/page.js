'use client';

import PostCard from "@/components/PostCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
                const data = await response.json();

                if (data.error) throw new Error(data.error);

                setPosts(data);
            } catch (error) {
                console.error('Erro ao buscar dados do post:', error);
            }
        }

        fetchData();
    }, [])

    const postCards = posts.filter(post => post.published === true).map(post => <PostCard key={post.id} post={post} />)
    return (
        <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center px-4 mb-4 text-white h-96 w-full bg-cover bg-[50%_45%] bg-no-repeat bg-[url('/stpaul-valentin-de-boulogne.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-center text-4xl font-black leading-none pt-5">Blog</h1>
                <p className="relative text-center text-gray-300">“Theologia a Deo docetur, Deum docet, et ad Deum ducit” - Tomás de Aquino</p>
            </div>
            <div className="flex items-center justify-center gap-8 my-4">
                <Link href="/blog" className=" text-green-600 hover:text-green-700 transition-all text-center font-black leading-none">Posts</Link>
                <Link href="/authors" className=" text-green-600 hover:text-green-700 transition-all text-center font-black leading-none">Autores</Link>
                <Link href="/tags" className=" text-green-600 hover:text-green-700 transition-all text-center font-black leading-none">Tópicos</Link>
            </div>
            <div className="w-full">
                <hr className="h-px my-4 bg-gray-300 border-0 mx-4"></hr>
                <div className="grid gap-4 my-5 xl:mx-48 lg:mx-36 md:mx-24 sm:mx-12 mx-4">
                    {postCards}
                </div>
            </div>
        </div>
    );
}