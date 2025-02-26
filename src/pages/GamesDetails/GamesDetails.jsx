"use client"

import { useEffect, useState } from "react"
import { useLoaderData, Link, useParams } from "react-router-dom"
import { fetchGameDetails } from "../../service/games"

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

function GameDetails() {
  const { gameDetails } = useLoaderData()
  const [game, setGame] = useState(gameDetails)
  const [isLoading, setLoading] = useState(false)
  const { id } = useParams()

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
    <section className="p-5 bg-gray-900 min-h-screen text-white">
      <div className="bg-gray-800 p-4 rounded-xl shadow-md">
        <img
          src={game.background_image || "/placeholder.svg"}
          alt={game.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2">{game.name}</h1>
        <p className="text-yellow-400 mb-4">⭐ {game.rating}</p>
        <p className="mb-4">{game.description_raw}</p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Publishers</h2>
          <div className="flex flex-wrap gap-2">
            {game.publishers &&
              game.publishers.map((publisher) => (
                <Link
                  key={publisher.id}
                  to={`/publisher/${publisher.id}`}
                  className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm"
                >
                  {publisher.name}
                </Link>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Géneros</h2>
          <div className="flex flex-wrap gap-2">
            {game.genres &&
              game.genres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm"
                >
                  {genre.name}
                </Link>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {game.tags &&
              game.tags.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/tag/${tag.id}`}
                  className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-sm"
                >
                  {tag.name}
                </Link>
              ))}
          </div>
        </div>

        <Link to="/games" className="mt-4 inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-md">
          Volver a la lista
        </Link>
      </div>
    </section>
  )
}

export default GameDetails

