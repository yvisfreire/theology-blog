import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

export default async function Post({ params }) {
    const { slug } = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`, { cache: 'no-store' });
    const post = await response.json();

    const date = new Date(post.createdAt);

    return (
        <div className="flex flex-col items-center">
            <div style={{ '--image-url': `url(${post.imgUrl})` }}
                className="relative flex flex-col items-center justify-center px-4 mb-8 text-white h-96 w-full bg-cover bg-[50%_25%] bg-no-repeat bg-[image:var(--image-url)]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-center text-4xl font-black leading-none pt-5">{post.title}</h1>
                <p className="relative text-center text-gray-300">{post.subtitle}</p>
            </div>
            <div className="lg:mx-72 md:mx-32 sm:mx-24 mx-6">
                <div className="flex justify-between w-full">
                    <Link href={`/authors/${post.author.username}`} className="flex items-center gap-3">
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/${post.author.username}/profileImg`} alt="Foto de perfil" className="h-12 w-12 rounded-full border border-green-600"></img>
                        <p className="text-green-600 hover:text-green-700 transition-all">
                            {post.author.name}
                        </p>
                    </Link>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-700">{post.readingTime} min</p>
                        <p className="text-gray-700">·</p>
                        <p className="text-gray-700">{date.toLocaleDateString()}</p>
                    </div>
                </div>
                <article className="py-8 prose prose-neutral prose-a:text-green-600 hover:prose-a:text-green-700 prose-a:break-all transition-all">
                    <MDXRemote source={post.content} />
                </article>
            </div>
        </div>
    );
}