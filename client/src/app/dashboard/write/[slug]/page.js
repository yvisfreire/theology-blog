import EditForm from "@/components/EditForm";

export async function generateMetadata({ params }) {
    const { slug } = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`, { cache: 'no-store' });
    const data = await response.json();

    return {
        title: data.title,
        description: data.subtitle
    }
}

export default async function Edit({ params }) {
    const { slug } = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`, { cache: 'no-store' });
    const post = await response.json();

    return <EditForm post={post} />
}