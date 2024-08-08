'use client';

import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from "react";

export default function EditForm({ params }) {
    const router = useRouter();
    const cookies = parseCookies();

    const { slug } = params;
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        imgUrl: '',
        content: '',
        published: false
    });

    useEffect(() => {
        const token = cookies.token;

        if (!token) {
            router.push('/login');
            return;
        }

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
                Authorization: cookies.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const data = await response.json();

        if (data.error) console.error(data.error);
        else router.push('/dashboard');
    }

    return (
        <div className="flex flex-col items-center bg-gray-50">
            <div className="relative flex flex-col items-center justify-center px-4 mb-8 text-white h-96 w-full bg-cover bg-[50%_45%] bg-no-repeat bg-[url('/escrevendo.gif')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-center text-4xl font-black leading-none pt-5">Editar</h1>
                <p className="relative text-center text-gray-300"></p>
            </div>
            <div className="w-full xl:px-64 md:px-32 sm:px-24 px-4">
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Título</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Título" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                    </div>
                    <div className="flex gap-6">
                        <div className="w-full">
                            <label htmlFor="subtitle" className="block mb-2 text-sm font-medium text-gray-900">Subítulo</label>
                            <input type="text" name="subtitle" id="subtitle" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="Subtítulo" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="imgUrl" className="block mb-2 text-sm font-medium text-gray-900">URL da imagem</label>
                            <input type="text" name="imgUrl" id="imgUrl" value={formData.imgUrl} onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })} placeholder="URL da imagem" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Conteúdo</label>
                        <textarea name="content" id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Conteúdo" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg h-64 focus:ring-green-600 focus:border-green-600 block w-full p-2.5"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <label htmlFor="published" className="text-sm">Público?</label>
                            <input type="checkbox" name="published" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} id="published" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-600" />
                        </div>
                        <button className="shadow text-white text-sm bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}