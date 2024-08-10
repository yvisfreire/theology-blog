import Link from "next/link";
import { useState } from "react";

export default function PostCard({ post }) {
    const date = new Date(post.createdAt);

    const [imgSrc, setImgSrc] = useState(`${process.env.NEXT_PUBLIC_API_URL}/users/${post.author.username}/profileImg`);
    const handleImageError = () => {
        setImgSrc('/blank-profile.png');
    };

    return (
        <div className="flex flex-col md:flex-row items-start h-auto md:h-40 lg:h-32 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
            <Link href={`/blog/${post.slug}`} className="w-full md:w-56 lg:w-48 h-32 md:h-full flex-shrink-0">
                <div className="relative w-full h-full">
                    <img
                        className="absolute inset-0 w-full h-full rounded-lg object-cover object-[50%_25%]"
                        src={post.imgUrl || "/limoeiro-alt.jpg"}
                        alt={post.title}
                    />
                </div>
            </Link>
            <div className="flex flex-col w-full h-full justify-center gap-2 p-4">
                <div>
                    <Link href={`/blog/${post.slug}`} className="font-bold text-sm md:text-base lg:text-lg mb-1">{post.title}</Link>
                    <p className="text-gray-600 text-xs md:text-sm mb-2">{post.subtitle}</p>
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm lg:text-xs gap-4">
                    <div className="flex items-center gap-2">
                        <img src={imgSrc} onError={handleImageError} alt="Foto de perfil" className="h-6 w-6 md:h-7 md:w-7 lg:h-6 lg:w-6 rounded-full" />
                        <p className="text-gray-700 text-xs md:text-sm lg:text-xs">
                            {post.author.name}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <p className="text-gray-700 text-xs md:text-sm lg:text-xs">{post.readingTime} min</p>
                        <p className="text-gray-700">·</p>
                        <p className="text-gray-700 text-xs md:text-sm lg:text-xs">{date.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
