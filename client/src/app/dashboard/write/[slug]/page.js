import EditForm from "@/components/EditForm";

export async function generateMetadata({ params }) {
    const { slug } = params;
    const response = await fetch(`http://localhost:5000/blog/${slug}`);
    const data = await response.json();

    return {
        title: data.title
    }
}

export default function Edit({ params }) {
    return <EditForm params={params} />
}