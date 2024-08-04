'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

export default function EditForm({ params }) {
    const { slug } = params;
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        imgUrl: '',
        content: '',
        published: false
    });

    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:5000/blog/${slug}`);
                const data = await response.json();

                setFormData({
                    title: data.title || '',
                    subtitle: data.subtitle || '',
                    imgUrl: data.imgUrl || '',
                    content: data.content || '',
                    published: data.published || false,
                });
            } catch (error) {
                console.error('Erro ao buscar dados do post:', error);
            }
        }

        fetchData();
    }, [slug]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let formObject = Object.fromEntries(formData.entries());

        if (!formObject.published) formObject.published = false;
        else formObject.published = true;

        const response = await fetch(`http://localhost:5000/blog/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const data = await response.json();

        if (data.error) alert(data.error);
        else router.push('/dashboard');
    }

    return (
        <div className="flex justify-center bg-gray-50">
            <form onSubmit={onSubmit} className="px-8 lg:w-[60%] md:w-[75%] w-full mt-12">
                <div className="flex flex-col gap-2">
                    <input type="text" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Título" className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 focus:ring-0" required />
                    <input type="text" name="subtitle" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="Subtítulo" className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 focus:ring-0" />
                    <input type="text" name="imgUrl" value={formData.imgUrl} onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })} placeholder="URL da imagem" className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 focus:ring-0" />
                    <textarea name="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Conteúdo" className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 h-64 leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 focus:ring-0"></textarea>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <label htmlFor="published" className="text-sm">Público?</label>
                            <input type="checkbox" name="published" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} id="published" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-600" />
                        </div>
                        <button className="shadow text-white text-sm bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Salvar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}