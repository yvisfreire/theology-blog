
export default function Blog() {
    return (
        <div>
            <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/stpaul-valentin-de-boulogne.jpg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none pt-5">Blog</h1>
                <p className="relative text-gray-300">“Theologia a Deo docetur, Deum docet, et ad Deum ducit” - Tomás de Aquino</p>
            </div>
        </div>
    );
}