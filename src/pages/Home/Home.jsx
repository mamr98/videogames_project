import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Corrección en el import de 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_KEY = "e621543c33ee44e48e7b82cfdc83fb23";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
        if (!response.ok) throw new Error("Error al obtener los juegos");

        const data = await response.json();
        setGames(data.results); // Almacena los resultados en el estado
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    className: "game-slider",
    customPaging: (i) => <div className="custom-dot"></div>,
    prevArrow: (
      <button className="slick-prev">
        <span className="sr-only">Previous</span>
        &#60;
      </button>
    ),
    nextArrow: (
      <button className="slick-next">
        <span className="sr-only">Next</span>
        &#62;
      </button>
    ),
  }

  return (
    <>
      <section
        className="w-full mb-6 py-12 md:py-20 lg:py-28 xl:py-36 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://external-preview.redd.it/pMfz9z86--0UVrMYUeEoiIXOSa_sQyDWqdgSgHZAuyg.png?auto=webp&s=b83df4e2e7e853d8dc6c8559345c521ba3c0b21f')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container px-4 md:px-6 flex flex-col items-center text-center text-white">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Bienvenido a <span className="text-blue-500">Projecto Juegos</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-xl sm:text-2xl">
              La mejor página de Videojuegos, ¡descubre los más nuevos y populares!
            </p>
          </div>
          <div className="space-x-4 mt-6">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-base font-semibold text-black shadow-md transition-colors duration-300 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              to="/Games"
            >
              Ver Juegos
            </Link>
          </div>
        </div>
      </section>

      <section className="text-center py-12 px-6 bg-gray-900">
        <h2 className="font-rubiksh text-4xl text-blue-500 font-bold mb-8">
          Nuevos Videojuegos
        </h2>
        <div className="h-[600px] mb-6 mt-8 sm:h-[500px] xl:h-[650px] 2xl:h-[750px]">
          {isLoading ? (
            <p className="text-center text-xl text-gray-500">Cargando juegos...</p>
          ) : (
            <Slider {...settings}>
              {games.map((game) => (
                <div key={game.id} className="text-center">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="mx-auto h-[450px] object-cover rounded-xl shadow-lg hover:scale-105 transform transition duration-500"
                  />
                  <p className="text-white font-bold text-lg mt-4">{game.name}</p>
                  <p className="text-gray-400 text-sm">{game.rating} ⭐</p>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
