import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

const API_KEY = "e621543c33ee44e48e7b82cfdc83fb23";

export async function loader({params}) {
  const id = params.id;
  return {id};
}

function GameDetails() {
  const { id } = useLoaderData();
  const [game, setGame] = useState({});
console.log({game})

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        if (!response.ok) throw new Error("Error al obtener los detalles del juego");

        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, []); 

  return (
    <>
      <section className="p-5">
          <Link to={`/gamesDetails/${id}`} key={game.id}>  {/* Aquí se navega a los detalles del juego */}
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2">{game.name}</h3>
              <p className="text-gray-600">⭐ {game.rating}</p>              
              <p className="text-gray-600">⭐ {game.genres.name}</p>                             
                            
              </div>
          </Link>
      </section> 
      
    </>
  );
}

export default GameDetails;