import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { PiArrowFatLeftFill, PiArrowFatRightFill } from "react-icons/pi";

export default async function Post({ params }) {
    const { slug } = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`, { cache: 'no-store' });
    const post = await response.json();

    const date = new Date(post.createdAt);

    const tagCards = post.tags.map(tag => (
        <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="bg-green-600 hover:bg-green-700 text-white text-xs rounded-full py-1 px-2.5 transition-all">
            {tag.name}
        </Link>
    ));

    return (
        <div className="flex flex-col items-center">
            <div style={{ '--image-url': `url(${post.imgUrl})` }}
                className="relative flex flex-col items-center justify-center px-4 mb-8 text-white h-96 w-full bg-cover bg-[50%_25%] bg-no-repeat bg-[image:var(--image-url)]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-center text-4xl font-black leading-none pt-5">{post.title}</h1>
                <p className="relative text-center text-gray-300">{post.subtitle}</p>
            </div>
            <div className="lg:mx-72 md:mx-32 sm:mx-24 mx-6">
                <div className="flex justify-between w-full sm:text-base text-sm">
                    <Link href={`/authors/${post.author.username}`} className="flex items-center sm:gap-3 gap-2">
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/${post.author.username}/profileImg`} alt="Foto de perfil" className="sm:h-12 sm:w-12 h-10 w-10 rounded-full border border-green-600"></img>
                        <p className="text-green-600 hover:text-green-700 transition-all">
                            {post.author.name}
                        </p>
                    </Link>
                    <div className="flex items-center sm:gap-2 gap-1">
                        <p className="text-gray-700">{post.readingTime} min</p>
                        <p className="text-gray-700">·</p>
                        <p className="text-gray-700">{date.toLocaleDateString()}</p>
                    </div>
                </div>
                <article className="py-8 prose prose-neutral prose-a:text-green-600 hover:prose-a:text-green-700 prose-a:break-all transition-all">
                    <MDXRemote source={post.content} />
                </article>
                <div className="flex flex-wrap gap-1 items-center py-4">
                    <h4 className="font-black text-sm">Tópicos:</h4>
                    {tagCards}
                </div>
                <div className="flex justify-between w-full py-4 text-sm">
                    <div className="sm:w-52 w-32">
                        {post.previous && <Link href={`${post.previous.slug}`} className="group">
                            <div className="flex items-center gap-1">
                                <PiArrowFatLeftFill />
                                <p>Anterior</p>
                            </div>
                            <p className="truncate text-green-600 group-hover:text-green-700 transition-all">{post.previous.title}</p>
                        </Link>}
                    </div>

                    <div className="sm:w-52 w-32">
                        {post.next && <Link href={`${post.next.slug}`} className="group">
                            <div className="flex justify-end items-center gap-1">
                                <p>Próximo</p>
                                <PiArrowFatRightFill />
                            </div>
                            <p className="truncate text-end text-green-600 group-hover:text-green-700 transition-all">{post.next.title}</p>
                        </Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}