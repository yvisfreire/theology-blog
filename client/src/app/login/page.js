
export default function Login() {
    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Usuário</label>
                                <input type="username" name="username" id="username" placeholder="st.paul" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            <button type="submit" className="w-full shadow text-white text-sm text-center bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}