import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Menu, X, Droplet, LogIn, User, LogOut, Home, MapPin, Settings } from 'lucide-react';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const name = Cookies.get('userName');
    const adminStatus = Cookies.get('isAdmin');

    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
      setIsAdmin(adminStatus === 'true');
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userName');
    Cookies.remove('isAdmin');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <Image
                src="/alagou3.png"
                alt="Logo Alagou"
                width={40}
                height={40}
                priority
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">Alagou AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Link>
            <Link href="/search" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Buscar</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/admin/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Meus Registros
                </Link>

                {isAdmin && (
                  <Link href="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-1">
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}

                <div className="relative ml-3 group">
                  <button className="flex items-center max-w-xs text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white rounded-full">
                    <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center border-2 border-blue-300">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="ml-2">{userName}</span>
                  </button>

                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center space-x-1"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Entrar</span>
                </Link>
                <Link
                  href="/cadastro"
                  className="bg-blue-500 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-400 transition-colors"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">
              Início
            </Link>
            <Link href="/search" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">
              Buscar
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/dashboard/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">
                  Meus Registros
                </Link>

                {isAdmin && (
                  <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">
                    Admin
                  </Link>
                )}

                <div className="pt-4 pb-3 border-t border-blue-700">
                  <div className="flex items-center px-5">
                    <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center border-2 border-blue-300">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium">{userName}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 hover:text-white"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">
                  Entrar
                </Link>
                <Link href="/cadastro" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;