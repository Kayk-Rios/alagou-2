'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false })


export default function MapPage() {
  const [position, setPosition] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude])
        },
        (err) => {
          console.error('Erro ao obter localização:', err)
        }
      )
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
      <header className="w-full max-w-5xl flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-green-600" />
          Sua Localização Atual
        </h1>
      </header>

      <main className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        {position ? (
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            className="w-full h-[70vh]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Você está aqui!</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-[70vh] text-gray-500">
            Obtendo localização...
          </div>
        )}
      </main>

      <footer className="mt-6 text-sm text-gray-500">
        Desenvolvido com Leaflet + Next.js
      </footer>
    </div>
  )
}
