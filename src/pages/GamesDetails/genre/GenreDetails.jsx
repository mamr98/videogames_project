import { useLoaderData, Link } from "react-router-dom";
import { fetchGenreDetails, fetchGamesByGenre } from "../../../service/games";

export async function loader({ params }) {
  try {
    const [genreData, gamesData] = await Promise.all([
      fetchGenreDetails(params.id),
      fetchGamesByGenre(params.id),
    ]);

    if (!genreData) {
      throw new Error("Genre not found");
    }

    return { genre: genreData, games: gamesData.results || [] };
  } catch (error) {
    throw new Error("Failed to load genre details");
  }
}

function GenreDetails() {
  const { genre, games } = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-950 p-10 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-400 mb-8 border-b-4 border-blue-500 pb-3">
          {genre.name}
        </h1>
        {genre.description && (
          <div className="text-gray-400 mb-10 text-lg" 
               dangerouslySetInnerHTML={{ __html: genre.description }} 
          />
        )}

        <h2 className="text-3xl font-semibold text-blue-400 mb-6">Juegos de este Género</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {games.map((game) => (
            <Link 
              key={game.id} 
              to={`/gamesDetails/${game.id}`} 
              className="block transform transition duration-300 hover:scale-110"
            >
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/50">
                <img
                  src={game.background_image || "/placeholder.svg"}
                  alt={game.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">{game.name}</h3>
                  <p className="text-blue-400 text-sm">⭐ {game.rating}</p>
                  {game.released && (
                    <p className="text-gray-500 text-xs mt-2">{new Date(game.released).getFullYear()}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/games"
          className="inline-block mt-10 px-8 py-4 bg-blue-500 text-gray-900 font-bold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Volver a Juegos
        </Link>
      </div>
    </div>
  );
}

export default GenreDetails;