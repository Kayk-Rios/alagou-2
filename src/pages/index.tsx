import { Geist, Geist_Mono } from "next/font/google";
import PostsList from "@/components/PostsList";
import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}  `}
      
    > 
           <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Acompanhe e Reporte Alagamentos no Brasil
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Uma plataforma colaborativa para ajudar pessoas a evitar áreas alagadas e 
              alertar autoridades sobre pontos críticos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/search"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar Áreas Alagadas
              </Link>
            </div>
          </div>
        </div>
      
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
            <path 
              fill="#f9fafb" 
              fillOpacity="1" 
              d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,42.7C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>
     <PostsList />
    </div>
  );
}
