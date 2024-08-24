'use client';
import Link from "next/link";
import { useState } from "react";

export default function PostCard({ post }) {
    const date = new Date(post.createdAt);

    const [imgSrc, setImgSrc] = useState(`${process.env.NEXT_PUBLIC_API_URL}/users/${post.author.username}/profileImg`);
    const handleImageError = () => {
        setImgSrc('/blank-profile.png');
    };

    const tagCards = post.tags.map(tag => (
        <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="bg-green-600 hover:bg-green-700 text-white text-xs rounded-full py-1 px-2.5 transition-all">
            {tag.name}
        </Link>
    ));

    return (
        <div className="flex flex-col md:flex-row items-start h-auto md:h-56 lg:h-48  rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
            <Link href={`/blog/${post.slug}`} className="w-full md:w-64 lg:w-56 h-40 md:h-full flex-shrink-0">
                <div className="relative w-full h-full">
                    <img
                        className="absolute inset-0 w-full h-full rounded-lg object-cover object-[50%_25%]"
                        loading="lazy"
                        src={post.imgUrl || "/limoeiro-alt.jpg"}
                        alt={post.title}
                    />
                </div>
            </Link>
            <div className="flex flex-col w-full h-full justify-center gap-2.5 p-5">
                <div>
                    <Link href={`/blog/${post.slug}`} className="font-bold text-sm md:text-base lg:text-lg">{post.title}</Link>
                    <p className="text-gray-600 text-xs lg:text-sm">{post.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                    {tagCards}
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm gap-4">
                    <Link href={`/authors/${post.author.username}`} className="flex items-center gap-2">
                        <img src={imgSrc} onError={handleImageError} loading="lazy" alt="Foto de perfil" className="h-6 w-6 md:h-7 md:w-7 lg:h-9 lg:w-9 rounded-full border border-green-600" />
                        <p className="text-green-600 hover:text-green-700 transition-all text-xs">
                            {post.author.name}
                        </p>
                    </Link>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <p className="text-gray-700 text-xs">{post.readingTime} min</p>
                        <p className="text-gray-700">·</p>
                        <p className="text-gray-700 text-xs">{date.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
