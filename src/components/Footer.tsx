import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">Alagou AI</span>
            </div>
            <p className="mt-2 text-gray-300 max-w-md">
              Uma plataforma para acompanhamento e alerta de áreas alagadas em todo o Brasil.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Recursos
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/search" className="text-gray-400 hover:text-white">
                    Buscar
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="text-gray-400 hover:text-white">
                    Mapa
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Conta
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/cadastro" className="text-gray-400 hover:text-white">
                  Cadastro
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white">
                    Entrar
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr className="my-8 border-gray-700" />
        
        <div className="text-center text-gray-400">
          <p>© 2025 FloodTracker. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
    );
  }
  