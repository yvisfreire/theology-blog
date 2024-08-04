import Link from "next/link";

export default function PostCardDashboard({ post }) {
    const date = new Date(post.createdAt);

    return (
        <div className="max-w-64 h-64 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all">
            <Link href={`/dashboard/write/${post.slug}`}>
                <img className="h-32 w-64 object-cover object-[50%_25%]" src={`${post.imgUrl || "/limoeiro-alt.jpg"}`} alt={`${post.title}`} />
            </Link>
            <div className="flex flex-col flex-grow justify-between h-32 px-4 py-4">
                <Link href={`/dashboard/write/${post.slug}`} className="font-bold text-sm mb-2">{post.title}</Link>
                <div className="flex justify-center items-center gap-2">
                    <img src="/blank-profile.png" alt="Profile picture" className="h-8 w-8 rounded-full"></img>
                    <p className="text-gray-700 text-xs">
                        Yvis Freire
                    </p>
                    <p className="text-gray-700 text-xs">·</p>
                    <p className="text-gray-700 text-xs">{date.toLocaleDateString()}</p>
                </div>
            </div>

        </div>
    )
}