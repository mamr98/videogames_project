const API_KEY = "e621543c33ee44e48e7b82cfdc83fb23"

export const fetchGameHome = async () => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
    if (!response.ok) throw new Error("Error al obtener los videojuegos")

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error al obtener los videojuegos:", error)
    return []
  }
}

export const fetchGames = async (query = "", page = 1) => {
  try {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${page}`
    if (query) {
      url += `&search=${encodeURIComponent(query)}`
    }
    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los juegos")
    const data = await response.json()
    return { results: data.results || [], count: data.count }
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}

export const fetchGameDetails = async (gameId) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}&lang=es`)
    if (!response.ok) throw new Error("Error al obtener los detalles del juego")
    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export const fetchPublisherDetails = async (publisherId) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/publishers/${publisherId}?key=${API_KEY}`)
    if (!response.ok) throw new Error("Error al obtener los detalles del publisher")
    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export const fetchGamesByPublisher = async (publisherId, page = 1) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&publishers=${publisherId}&page=${page}`)
    if (!response.ok) throw new Error("Error al obtener los juegos del publisher")
    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}

// Añadida la función fetchGenreDetails
export const fetchGenreDetails = async (genreId) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/genres/${genreId}?key=${API_KEY}`)
    if (!response.ok) throw new Error("Error al obtener los detalles del género")
    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export const fetchGamesByGenre = async (genreId, page = 1) => {
  try {
    if (genreId) {
      // Si se proporciona un ID, obtener juegos de ese género
      const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreId}&page=${page}`)
      if (!response.ok) throw new Error("Error al obtener los juegos del género")
      return await response.json()
    } else {
      // Si no hay ID, obtener lista de géneros
      const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      if (!response.ok) throw new Error("Error al obtener los géneros")
      const data = await response.json()
      return data
    }
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}

export const fetchTagDetails = async (tagId) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/tags/${tagId}?key=${API_KEY}`)
    if (!response.ok) throw new Error("Error al obtener los detalles del tag")
    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export const fetchGamesByTag = async (tagId, page = 1) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&tags=${tagId}&page=${page}`)
    if (!response.ok) throw new Error("Error al obtener los juegos del tag")
    return await response.json()
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}

export const fetchAllPublisher = async (query, page = 1) => {
  try {
    let url = `https://api.rawg.io/api/publishers?key=${API_KEY}&page_size=40&page=${page}`

    if (query) {
      url += `&search=${query}`
    }

    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los publishers")

    const data = await response.json()
    return {
      results: data.results || [],
      count: data.count,
    }
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}