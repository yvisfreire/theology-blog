export default function Post() {
    return (
        <div>
            <div className="relative flex flex-col items-center justify-center text-white h-screen w-full bg-cover bg-[50%_25%] bg-no-repeat bg-[url('https://miro.medium.com/v2/resize:fit:640/format:webp/1*uhcMBpAbF7wbL-KcPLqnHw.png')]">
                <div className="absolute inset-0 bg-black opacity-50" />
                <h1 className="relative text-4xl font-black leading-none py-5">Título</h1>
                <p className="relative">Por Autor</p>
                <p className="relative">Em 01/01/1970</p>
            </div>
            <div className="p-4 mx-64 my-4">
                <h2 className="text-4xl font-black leading-none py-5">Seção</h2>
                <p className="text-justify indent-16">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque vitae libero sit amet sapien sagittis volutpat.
                    Vestibulum nibh turpis, tempus pulvinar mauris eget, imperdiet
                    iaculis sem. Quisque lobortis vitae nisl rutrum pharetra.
                    Vivamus bibendum rhoncus fermentum. Integer id est ex. Nam id
                    turpis quis sem dignissim porta sed ac massa. Donec lectus felis,
                    venenatis eget malesuada non, porta at quam. Mauris vel fermentum
                    arcu. Cras vestibulum volutpat odio quis ultrices. Proin augue
                    mauris, tempus vel ultrices vitae, posuere eget libero. Duis
                    sollicitudin lectus dignissim metus ultrices faucibus nec in
                    odio.
                </p>
            </div>
        </div>
    );
}
