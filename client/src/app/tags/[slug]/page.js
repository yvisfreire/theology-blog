
export default function Tag() {
    return (
        <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/topicos.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none py-5">Tópico</h1>
            </div>
            <div className="lg:mx-72 md:mx-32 sm:mx-24 mx-12 my-6">
                <p className="text-center">Em construção...</p>
            </div>
        </div>
    );
}