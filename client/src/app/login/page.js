'use client';

import { parseCookies, setCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
    const router = useRouter();
    const cookies = parseCookies();

    useEffect(() => {
        const token = cookies.token;

        if (token) {
            router.push('/dashboard');
            return;
        }
    }, [cookies.token, router]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        let formObject = Object.fromEntries(formData.entries());

        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const data = await response.json();

        if (!data.error) {
            setCookie(undefined, 'token', data.token, {
                maxAge: 24 * 60 * 60 // 24 hours
            });

            setCookie(undefined, 'user', JSON.stringify(data.user), {
                maxAge: 24 * 60 * 60 // 24 hours
            });

            router.push('/dashboard');
        }
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login
                        </h1>
                        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Usuário</label>
                                <input type="text" name="username" id="username" placeholder="st.paul" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" required />
                            </div>
                            <button type="submit" className="w-full shadow text-white text-sm text-center bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}