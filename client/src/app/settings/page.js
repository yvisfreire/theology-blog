'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseCookies } from 'nookies';

export default function Settings() {
    const router = useRouter();

    const cookies = parseCookies();
    const user = cookies.user ? JSON.parse(cookies.user) : null;

    const [formUserData, setFormUserData] = useState({
        username: '',
        email: '',
        name: '',
    });

    useEffect(() => {
        const token = cookies.token;

        if (!token) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user?.username}`);
                if (response.ok) {
                    const data = await response.json();

                    setFormUserData({
                        username: data.username || '',
                        email: data.email || '',
                        name: data.name || '',
                    });
                } else {
                    console.error('Erro ao buscar dados do usuário:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        if (user?.username) {
            fetchData();
        }
    }, [user?.username, cookies.token, router]);

    const onSubmitProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: cookies.token
            }
        });

        const data = await response.json();

        if (data.error) console.error(data.error);
        else console.log(data.message);
    }

    const onSubmitUserUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let formObject = Object.fromEntries(formData.entries());

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user?.username}`, {
            method: 'PUT',
            headers: {
                Authorization: cookies.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const data = await response.json();
        console.log(data);

        if (data.error) alert(data.error);
        else alert("Usuário alterado com sucesso.");
    }

    const onSubmitPassword = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (formData.get('password') !== formData.get('check_password')) {
            return alert('Erro. As senhas não estão iguais.');
        }

        let formObject = Object.fromEntries(formData.entries());
        delete formObject.check_password;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/passChange`, {
            method: 'PUT',
            headers: {
                Authorization: cookies.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const data = await response.json();

        if (data.error) alert(data.error);
        else alert(data.message);
    }

    const onSubmitNewUser = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (formData.get('password') !== formData.get('check_password')) {
            return alert('Erro. As senhas não estão iguais.');
        }

        let formObject = Object.fromEntries(formData.entries());
        delete formObject.check_password;

        console.log(formObject);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            method: 'POST',
            headers: {
                Authorization: cookies.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const data = await response.json();

        if (data.error) alert(data.error);
        else alert("Usuário criado com sucesso.");
    }

    return (
        <div className="bg-gray-50">
            <div className="py-12">
                <h1 className="text-4xl text-center font-black leading-none">Configurações</h1>
            </div>
            <div className="flex flex-col lg:mx-72 md:mx-32 sm:mx-24 mx-12">
                <div className="mb-8">
                    <h3 className="text-2xl font-black leading-none my-5">Foto de perfil</h3>
                    <div className="flex items-center gap-6">
                        <img className="w-12 h-12 rounded-full" src={`${process.env.NEXT_PUBLIC_API_URL}/images/${user?.profileImg}`} alt="Profile picture" />
                        <form onSubmit={onSubmitProfile} className="flex items-center gap-6 grow">
                            <div className="grow">
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload imagem</label>
                                <input name="profile" className="block w-full py-2 px-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" />
                                <p className="mt-1 text-sm text-gray-500 " id="file_input_help">PNG, JPG or GIF.</p>
                            </div>
                            <button className="shadow text-white text-sm bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Enviar</button>
                        </form>
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-black leading-none my-5">Seus Dados</h3>
                    <form onSubmit={onSubmitUserUpdate} className="flex flex-col gap-4">
                        <div className="flex gap-6">
                            <div className="w-full">
                                <label htmlFor="username_edit" className="block mb-2 text-sm font-medium text-gray-900">Usuário</label>
                                <input type="text" name="username" value={formUserData.username} onChange={(e) => setFormUserData({ ...formUserData, username: e.target.value })} id="username_edit" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email_edit" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input type="email" name="email" value={formUserData.email} onChange={(e) => setFormUserData({ ...formUserData, email: e.target.value })} id="email_edit" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" reqired />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="grow">
                                <label htmlFor="name_edit" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                                <input type="text" name="name" value={formUserData.name} onChange={(e) => setFormUserData({ ...formUserData, name: e.target.value })} id="name_edit" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="shadow text-white text-sm bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Salvar</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h3 className="text-2xl font-black leading-none my-5">Alterar senha</h3>
                    <form onSubmit={onSubmitPassword} className="flex flex-col gap-4">
                        <div className="flex gap-6">
                            <div className="w-full">
                                <label htmlFor="password_edit" className="block mb-2 text-sm font-medium text-gray-900">Nova senha</label>
                                <input type="password" name="password" id="password_edit" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="check_password_edit" className="block mb-2 text-sm font-medium text-gray-900">Confirmar nova senha</label>
                                <input type="password" name="check_password" id="check_password_edit" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="shadow text-white text-sm bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Alterar</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h3 className="text-2xl font-black leading-none my-5">Adicionar novo usuário</h3>
                    <form onSubmit={onSubmitNewUser} className="flex flex-col gap-4">
                        <div className="flex gap-6">
                            <div className="w-full">
                                <label htmlFor="username_new" className="block mb-2 text-sm font-medium text-gray-900">Usuário</label>
                                <input type="text" name="username" id="username_new" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email_new" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input type="email" name="email" id="email_new" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" reqired />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="grow">
                                <label htmlFor="name_new" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
                                <input type="text" name="name" id="name_new" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" />
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-full">
                                <label htmlFor="password_new" className="block mb-2 text-sm font-medium text-gray-900">Nova senha</label>
                                <input type="password" name="password" id="password_new" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="check_password_new" className="block mb-2 text-sm font-medium text-gray-900">Confirmar nova senha</label>
                                <input type="password" name="check_password" id="check_password_new" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="shadow text-white text-sm bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}