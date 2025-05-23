// components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Alagou AI. Todos os direitos reservados.</p>
          <p>
            <a href="/sobre" className="text-blue-400 hover:text-blue-600">
              Sobre nós
            </a>
            {" | "}
            <a href="/contato" className="text-blue-400 hover:text-blue-600">
              Contato
            </a>
          </p>
        </div>
      </footer>
    );
  }
  