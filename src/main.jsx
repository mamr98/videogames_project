import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import "./index.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import Games from "./pages/videogames/Games"
import GamesDetails, { loader as gameDetailsLoader } from "./pages/GamesDetails/GamesDetails"
import PublisherDetails, { loader as publisherLoader } from "./pages/GamesDetails/publisher/PublisherDetails"
import Publishers  from "./pages/GamesDetails/publisher/Publisher"
import GenreDetails, { loader as genreLoader } from "./pages/GamesDetails/genre/GenreDetails"
import TagDetails, { loader as tagLoader } from "./pages/GamesDetails/tag/TagDetails"
import ErrorPage from "./pages/ErrorPage/ErrorPage"

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/games", element: <Games /> },
      { path: "/gamesDetails/:id", element: <GamesDetails />, loader: gameDetailsLoader },
      { path: "/publisher/:id", element: <PublisherDetails />, loader: publisherLoader },
      { path: "/genre/:id", element: <GenreDetails />, loader: genreLoader },
      { path: "/tag/:id", element: <TagDetails />, loader: tagLoader },
      { path: "/publisher", element: <Publishers />,},
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

