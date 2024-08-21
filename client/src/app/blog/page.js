'use client';

import PostCard from "@/components/PostCard";
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
            <div className="relative flex flex-col items-center justify-center px-4 mb-8 text-white h-96 w-full bg-cover bg-[50%_45%] bg-no-repeat bg-[url('/stpaul-valentin-de-boulogne.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-center text-4xl font-black leading-none pt-5">Blog</h1>
                <p className="relative text-center text-gray-300">“Theologia a Deo docetur, Deum docet, et ad Deum ducit” - Tomás de Aquino</p>
            </div>
            <div className="xl:mx-64 md:mx-32 sm:mx-24 mx-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl text-center font-black leading-none">Posts</h2>
                </div>
                <hr className="h-px my-4 bg-gray-300 border-0"></hr>
                <div className="grid gap-4">
                    {postCards}
                </div>
            </div>
        </div>
    );
}