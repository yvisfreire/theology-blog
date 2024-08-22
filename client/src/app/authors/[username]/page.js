import PostCard from "@/components/PostCard";
import ProfileImage from "@/components/ProfileImage";

export default async function Author({ params }) {
    const { username } = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, { cache: 'no-store' });
    const user = await response.json();

    const postCards = user.posts.filter(post => post.published === true).map(post => <PostCard key={post.id} post={post} />)

    return (
        <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/limoeiro-alt.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <ProfileImage user={user} className="w-48 h-48 z-10 border-2 rounded-full" />
                <h1 className="relative text-center text-4xl font-black leading-none py-5">{user.name}</h1>
            </div>
            <section className=" prose text-sm my-8 sm:mx-0 mx-4">
                <p>{user.bio}</p>
            </section>
            <div className="xl:mx-64 md:mx-32 sm:mx-24 mx-4">
                <hr className="h-px my-4 bg-gray-300 border-0"></hr>
                <div className="grid gap-4">
                    {postCards}
                </div>
            </div>
        </div>
    );
}