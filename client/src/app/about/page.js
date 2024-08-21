
export default function About() {
    return (
        <div>
            <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/teolima.jpeg')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none py-5">Sobre nós</h1>
            </div>
            <div className="lg:mx-72 md:mx-32 sm:mx-24 mx-12 my-6">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut sollicitudin neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nunc posuere, placerat nibh ac, porta turpis. Phasellus sit amet finibus ex. Sed at pretium erat, a sollicitudin erat. Sed tempor eget nisl ut molestie. Nulla sit amet dolor eros. Donec in nisi tellus. Aliquam maximus urna ut nisi mattis laoreet. Ut a tempus quam. Proin vestibulum elit eget faucibus dictum. Maecenas commodo elit ut ex varius, ac lacinia leo ullamcorper. Suspendisse sed tempus ligula. Phasellus non elit facilisis metus vestibulum mollis vel quis mi. Donec dignissim semper leo a commodo. Sed et congue erat.</p>
                <p className="mt-4">Integrantes:</p>
                <ul className="list-disc list-inside">
                    <li>Bruno</li>
                    <li>Filipe</li>
                    <li>Guilherme</li>
                    <li>João</li>
                    <li>Yvis</li>
                </ul>
            </div>
        </div>
    );
}