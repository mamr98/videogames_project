"use client"

import { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { fetchGames } from "../../service/games"

const Games = () => {
  const [games, setGames] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Memoizamos la función loadGames con useCallback
  const loadGames = useCallback(async (query, pageNum) => {
    setLoading(true)
    try {
      const data = await fetchGames(query, pageNum)
      setGames(data.results)
      setTotalPages(Math.ceil(data.count / 40))
    } catch (error) {
      console.error("Error loading games:", error)
    } finally {
      setLoading(false)
    }
  }, []) // Sin dependencias ya que no usa ningún estado dentro

  // Efecto para la búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1)
      loadGames(searchTerm, 1)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, loadGames]) // Incluimos searchTerm y loadGames como dependencias

  // Efecto para cambios de página
  useEffect(() => {
    if (page > 1) {
      // Solo cargar si la página es mayor a 1
      loadGames(searchTerm, page)
    }
  }, [page, searchTerm, loadGames]) // Incluimos las dependencias necesarias

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <h1 className="font-rubiksh text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8 text-center">
        Juegos Disponibles
      </h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-400"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-yellow-400 text-xl font-semibold animate-pulse">Cargando juegos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.length > 0 ? (
            games.map((game) => (
              <Link to={`/gamesDetails/${game.id}`} key={game.id}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                  <img
                    src={game.background_image || "/placeholder.svg"}
                    alt={game.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-2 truncate">{game.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-yellow-400 font-semibold">⭐ {game.rating}</p>
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                        {game.released ? new Date(game.released).getFullYear() : "N/A"}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {game.genres &&
                        game.genres.slice(0, 3).map((genre) => (
                          <span key={genre.id} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                            {genre.name}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg col-span-full">No se encontraron juegos.</p>
          )}
        </div>
      )}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-6 py-3 bg-gray-700 text-white font-bold rounded-md shadow-md disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-white font-bold">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
          className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-md shadow-md disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </section>
  )
}

export default Games

