'use client';

import AuthContext from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { parseCookies } from 'nookies';

export default function Settings() {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, []);

    const cookies = parseCookies();
    const user = JSON.parse(cookies.user);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch(`http://localhost:5000/user/profile`, {
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

    return (
        <div className="flex flex-col lg:mx-72 md:mx-32 sm:mx-24 mx-12">
            <div>
                <h3 className="text-2xl font-black leading-none my-5">Foto de perfil</h3>
                <div className="flex items-center w-full gap-6">
                    <img className="w-12 h-12 rounded-full" src={`http://localhost:5000/images/${user.profileImg}`} alt="Profile picture" />
                    <form onSubmit={onSubmit} className="flex items-center gap-6 grow">
                        <div>
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
                <div>

                </div>
            </div>
        </div>
    );
}