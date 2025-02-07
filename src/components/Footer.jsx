import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg mt-8 rounded-t-lg text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Proyecto Juegos</h3>
            <p className="text-sm text-center md:text-left">Descubre y explora los mejores juegos del momento.</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-200 transition-colors duration-300"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-200 transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-200 transition-colors duration-300"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-8 border-indigo-300" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm text-indigo-100 mb-4 md:mb-0">
            © {new Date().getFullYear()} Proyecto Juegos. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

