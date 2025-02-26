import { useLoaderData, Link } from "react-router-dom"
import { fetchPublisherDetails, fetchGamesByPublisher } from "../../../service/games"

export async function loader({ params }) {
  try {
    const publisherData = await fetchPublisherDetails(params.id)
    const gamesData = await fetchGamesByPublisher(params.id)
    if (!publisherData) {
      throw new Error("Publisher not found")
    }
    return { publisher: publisherData, games: gamesData.results }
  } catch (error) {
    throw new Error("Failed to load publisher details")
  }
}

function PublisherDetails() {
  const { publisher, games } = useLoaderData()

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-10">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-white mb-6">{publisher.name}</h1>
        {publisher.description && (
          <div className="text-lg text-white opacity-80 mb-8" dangerouslySetInnerHTML={{ __html: publisher.description }} />
        )}

        <h2 className="text-3xl font-semibold text-white mb-4">Juegos del Publisher</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game) => (
            <Link key={game.id} to={`/gamesDetails/${game.id}`} className="block transition transform hover:scale-110 hover:shadow-xl">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={game.background_image || "/placeholder.svg"}
                  alt={game.name}
                  className="w-full h-60 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">{game.name}</h3>
                  <p className="text-yellow-300 text-lg">⭐ {game.rating}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/games"
          className="inline-block mt-10 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-700 transition"
        >
          Volver a Juegos
        </Link>
      </div>
    </div>
  )
}

export default PublisherDetails
