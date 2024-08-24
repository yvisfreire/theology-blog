import PostCard from "@/components/PostCard";

export default async function Tag({ params }) {
    const { slug } = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags/${slug}`, { cache: 'no-store' });
    const tag = await response.json();

    const postCards = tag.posts.filter(post => post.published === true).map(post => <PostCard key={post.id} post={post} />)

    return (
        <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/topicos.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none">{tag.name}</h1>
                <p className="relative text-center text-gray-300">{tag._count.posts} post{tag._count.posts > 1 ? 's' : ''}</p>
            </div>
            <div className="w-full">
                <div className="grid gap-4 my-5 xl:mx-48 lg:mx-36 md:mx-24 sm:mx-12 mx-4">
                    {postCards}
                </div>
            </div>
        </div>
    );
}