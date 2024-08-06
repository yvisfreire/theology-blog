import Link from "next/link";

export default function PostCard({ post }) {
    const date = new Date(post.createdAt);

    return (
        <div className="flex items-start h-48 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all">
            <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
                <div className="relative lg:w-64 w-32 h-48">
                    <img
                        className="absolute inset-0 w-full h-full rounded-xl object-cover object-[50%_25%]"
                        src={post.imgUrl || "/limoeiro-alt.jpg"}
                        alt={post.title}
                    />
                </div>
            </Link>
            <div className="flex flex-col w-full h-full justify-center gap-2 py-4 px-4">
                <div>
                    <Link href={`/blog/${post.slug}`} className="font-bold text-lg mb-1">{post.title}</Link>
                    <p className="text-gray-600 text-sm mb-2">{post.subtitle}</p>
                </div>
                <div className="flex justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <img src={`http://localhost:5000/images/${post.author.profileImg}`} alt="Foto de perfil" className="h-8 w-8 rounded-full"></img>
                        <p className="text-gray-700">
                            {post.author.name}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-700">{post.readingTime} min</p>
                        <p className="text-gray-700">·</p>
                        <p className="text-gray-700">{date.toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
