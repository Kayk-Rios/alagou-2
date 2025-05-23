import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const name = Cookies.get('userName');

    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userName');
    Cookies.remove('isAdmin');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
        <Link href="/" className="hover:text-gray-400">
            <Image
              src="/alagou3.png" 
              alt="Logo Alagou"
              width={60}
              height={40}
              priority
            />
          </Link>
        
        </div>

        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-sm">Olá, {userName}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200">
                Login
              </Link>
              <Link href="/cadastro" className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600 transition duration-200">
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
