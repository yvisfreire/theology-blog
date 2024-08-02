'use client';
import { useRouter } from 'next/navigation';
import React from "react";

export default function Write() {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let formObject = Object.fromEntries(formData.entries());

        if (!formObject.published) formObject.published = false;
        else formObject.published = true;

        const response = await fetch('http://localhost:5000/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const data = await response.json();
        console.log(data)

        if (data.error) alert(data.error);
        else router.push('/dashboard')
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={onSubmit} className="px-8 lg:w-[60%] md:w-[75%] w-full">
                <div className="flex flex-col gap-2">
                    <input type="text" name="title" placeholder="Título" className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 focus:ring-0" required />
                    <input type="text" name="subtitle" placeholder="Subtítulo" className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 focus:ring-0" />
                    <input type="text" name="imgUrl" placeholder="URL da imagem" className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 focus:ring-0" />
                    <textarea name="content" placeholder="Conteúdo" className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 h-64 leading-tight focus:outline-none focus:shadow-outline focus:border-green-600 focus:ring-0"></textarea>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <label htmlFor="published" className="text-sm">Público?</label>
                            <input type="checkbox" name="published" id="published" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-600" />
                        </div>
                        <button className="shadow text-white text-sm bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Salvar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}