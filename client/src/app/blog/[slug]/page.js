import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function Post({ params }) {
    const { slug } = params;
    const response = await fetch(`http://localhost:5000/blog/${slug}`, { cache: 'no-store' });
    const post = await response.json();

    const date = new Date(post.createdAt);

    return (
        <div className="flex flex-col items-center bg-gray-50">
            <div style={{ '--image-url': `url(${post.imgUrl})` }}
                className="relative flex flex-col items-center justify-center px-4 mb-8 text-white h-96 w-full bg-cover bg-[50%_25%] bg-no-repeat bg-[image:var(--image-url)]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-center text-4xl font-black leading-none pt-5">{post.title}</h1>
                <p className="relative text-center text-gray-300">{post.subtitle}</p>
            </div>
            <div className="lg:mx-72 md:mx-32 sm:mx-24 mx-12">
                <div className="flex justify-between w-full">
                    <div className="flex items-center gap-3">
                        <img src={`http://localhost:5000/images/${post.author.profileImg}`} alt="Foto de perfil" className="h-12 w-12 rounded-full"></img>
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
                <article className="py-8 max-w-none prose prose-neutral prose-a:text-green-600 hover:prose-a:text-green-700 transition-all">
                    <MDXRemote source={post.content} />
                </article>
            </div>
        </div>
    );
}