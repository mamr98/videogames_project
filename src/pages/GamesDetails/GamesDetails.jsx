"use client"

import { useEffect, useState } from "react"
import { useLoaderData, Link } from "react-router-dom"
import { fetchGameDetails } from "../../service/games"

// Exportación del loader
export async function loader({ params }) {
  try {
    const gameDetails = await fetchGameDetails(params.id)
    if (!gameDetails) {
      throw new Error("Game not found")
    }
    return { gameDetails }
  } catch (error) {
    throw new Error("Failed to load game details")
  }
}

// Definición del componente con export default
function GamesDetails() {
  const { gameDetails } = useLoaderData()
  const [game, setGame] = useState(gameDetails)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setGame(gameDetails)
  }, [gameDetails])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-yellow-400 text-2xl font-semibold animate-pulse">Cargando detalles...</p>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl font-semibold">Error al cargar el juego.</p>
      </div>
    )
  }

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
              </div>
          </Link>
      </section> 
      
    </>
  );
}

export default fetchGameDetails;