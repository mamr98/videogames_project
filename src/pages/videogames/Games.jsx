import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaSearch, FaStar } from "react-icons/fa"

const API_KEY = "e621543c33ee44e48e7b82cfdc83fb23"

function Games() {
  const [isLoading, setLoading] = useState(true)
  const [games, setGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredGames, setFilteredGames] = useState([])

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
        if (!response.ok) throw new Error("Error al obtener los juegos")

        const data = await response.json()
        setGames(data.results)
        setFilteredGames(data.results)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)

    const filtered = games.filter((game) => game.name.toLowerCase().includes(term))
    setFilteredGames(filtered)
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4 md:mb-0">Juegos</h1>

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar juegos..."
            className="w-full p-3 pl-10 rounded-full bg-white shadow-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGames.map((game) => (
            <Link to={`/gamesDetails/${game.id}`} key={game.id} className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <img
                  src={game.background_image || "/placeholder.svg"}
                  alt={game.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition duration-300">
                    {game.name}
                  </h3>
                  <div className="flex items-center mt-2 text-indigo-500">
                    <FaStar className="mr-1" />
                    <span>{game.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No se encontraron juegos que coincidan con la búsqueda.</p>
      )}
    </section>
  )
}
export default Games