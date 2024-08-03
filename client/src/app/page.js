
export default function Home() {
  return (
    <div className="bg-gray-50">
      <div className="relative flex flex-col items-center justify-center text-white h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/limoeiro.jpg')]">
        <div className="absolute inset-0 bg-black opacity-50" />
        <h1 className="relative text-4xl font-black leading-none pt-5">Teologia com Limonada</h1>
        <p className="relative text-gray-300">Teologia e limonada, as vezes, quando a gente lembra</p>
      </div>
    </div>
  );
}