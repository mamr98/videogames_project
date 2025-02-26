"use client"

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Cambiado de "next/link" a "react-router-dom"
import { fetchAllPublisher } from "../../../service/games";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadPublishers = async () => {
      try {
        setLoading(true);
        const { results, count } = await fetchAllPublisher(searchTerm, page);
        setPublishers(results);
        setTotalPages(Math.ceil(count / 40));
      } catch (err) {
        setError("Error al cargar los publishers");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      loadPublishers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, page]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <p className="text-red-500 text-2xl font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-6 sm:px-8 lg:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-400 mb-10 text-center border-b-4 border-blue-500 pb-4">
          Publishers
        </h1>
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Buscar publishers..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md px-5 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <p className="text-blue-400 text-2xl font-semibold animate-pulse">Cargando publishers...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {publishers.map((publisher) => (
                <Link
                  key={publisher.id}
                  to={`/publisher/${publisher.id}`}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-400/30 transition-all duration-300 flex flex-col group"
                >
                  <div className="p-6 flex-grow">
                    <h3 className="text-2xl font-semibold text-blue-400 mb-3 truncate group-hover:text-blue-300 transition-colors">
                      {publisher.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {publisher.description || "No hay descripción disponible"}
                    </p>
                  </div>
                  <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
                    <span className="text-sm text-blue-400">{publisher.games_count || 0} juegos</span>
                    <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver más →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex justify-center gap-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-5 py-3 bg-gray-800 text-blue-400 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition"
              >
                Anterior
              </button>
              <span className="text-xl text-blue-400">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-5 py-3 bg-gray-800 text-blue-400 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Publishers;