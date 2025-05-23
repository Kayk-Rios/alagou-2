import { Geist, Geist_Mono } from "next/font/google";
import PostsList from "@/components/PostsList";


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
      className={`${geistSans.variable} ${geistMono.variable}  items-center justify-items-center min-h-screen `}
      
    > 
    <h1 className="text-3xl font-bold mb-6"></h1>
     <PostsList />
    </div>
  );
}
