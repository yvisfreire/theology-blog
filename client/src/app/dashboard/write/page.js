'use client';

import AuthContext from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

export default function Write() {
    const router = useRouter();
    const cookies = parseCookies();

    const [tag, setTag] = useState({ name: "" });
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagRemove = (tag) => {
        setSelectedTags(selectedTags.filter(t => t.name !== tag.name));
    };

    const handleTagAdd = () => {
        if (selectedTags.map(tag => tag.name).includes(tag.name))
            return alert("Tópico já inserido.")

        if (selectedTags.length >= 5)
            return alert("Máximo de 5 tópicos por post.");

        setSelectedTags([...selectedTags, tag]);
        setTag({ name: "" });
    };

    useEffect(() => {
        const token = cookies.token;

        if (!token) {
            router.push('/login');
            return;
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let formObject = Object.fromEntries(formData.entries());
        formObject.tags = selectedTags;

        if (!formObject.published) formObject.published = false;
        else formObject.published = true;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
            method: 'POST',
            headers: {
                Authorization: cookies.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const data = await response.json();

        if (data.error) alert(data.error);
        else router.push('/dashboard')
    }

    return (
        <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center px-4 mb-8 text-white h-96 w-full bg-cover bg-[50%_45%] bg-no-repeat bg-[url('/escrevendo.gif')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-center text-4xl font-black leading-none pt-5">Escrever</h1>
                <p className="relative text-center text-gray-300"></p>
            </div>
            <div className="w-full xl:px-64 md:px-32 sm:px-24 px-4">
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Título</label>
                        <input type="text" name="title" id="title" placeholder="Título" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                    </div>
                    <div className="flex gap-6">
                        <div className="w-full">
                            <label htmlFor="subtitle" className="block mb-2 text-sm font-medium text-gray-900">Subítulo</label>
                            <input type="text" name="subtitle" id="subtitle" placeholder="Subtítulo" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="imgUrl" className="block mb-2 text-sm font-medium text-gray-900">URL da imagem</label>
                            <input type="text" name="imgUrl" id="imgUrl" placeholder="URL da imagem" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900">Tópicos (max. 5)</label>
                        <div className="flex items-center gap-6">
                            <input type="text" id="tags" value={tag.name} onChange={(e) => setTag({ name: e.target.value })} placeholder="Tópico" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" />
                            <a onClick={handleTagAdd} className="shadow text-white text-sm bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all cursor-pointer">Adicionar</a>
                        </div>
                        <div className="flex flex-wrap gap-2 my-4">
                            {selectedTags.map((tag, index) => (
                                <p
                                    key={index}
                                    onClick={() => handleTagRemove(tag)}
                                    className="bg-green-600 hover:bg-green-700 text-white text-xs rounded-full py-1 px-2.5 transition-all cursor-pointer"
                                >
                                    {tag.name} ✕
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Conteúdo</label>
                        <textarea name="content" placeholder="Conteúdo" id="content" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg h-64 focus:ring-green-600 focus:border-green-600 block w-full p-2.5"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <label htmlFor="published" className="text-sm">Público?</label>
                            <input type="checkbox" name="published" id="published" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-600" />
                        </div>
                        <button className="shadow text-white text-sm bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}