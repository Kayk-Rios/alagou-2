import { useEffect, useState } from 'react';
import { Droplet, MapPin, CalendarDays, User, Filter, Image as ImageIcon, AlertCircle } from 'lucide-react';

type State = {
  id: string;
  name: string;
  uf: string;
};

type City = {
  id: string;
  name: string;
  state: State;
};

type Author = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  title: string;
  description: string;
  floodLevel: string;
  address: string;
  neighborhood: string;
  createdAt: string;
  author: Author;
  city: City;
  imageUrl?: string; 
};

const getSeverityDetails = (level: string) => {
  switch(level) {
    case 'HIGH':
      return { 
        color: 'bg-red-100 text-red-800',
        borderColor: 'border-red-500',
        icon: 'text-red-500',
        label: 'ALTO'
      };
    case 'MEDIUM':
      return { 
        color: 'bg-yellow-100 text-yellow-800',
        borderColor: 'border-yellow-500',
        icon: 'text-yellow-500',
        label: 'MÉDIO'
      };
    case 'LOW':
      return { 
        color: 'bg-green-100 text-green-800',
        borderColor: 'border-green-500',
        icon: 'text-green-500',
        label: 'BAIXO'
      };
    default:
      return { 
        color: 'bg-gray-100 text-gray-800',
        borderColor: 'border-gray-500',
        icon: 'text-gray-500',
        label: 'NÃO INFORMADO'
      };
  }
};

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const placeholderImage = '/path/to/your/placeholder-image.jpg'; 

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query Posts {
              posts {
                id
                title
                description
                floodLevel
                address
                neighborhood
                createdAt
                author {
                  id
                  name
                }
                city {
                  id
                  name
                  state {
                    id
                    name
                    uf
                  }
                }
              }
            }
          `,
        }),
      });

      const json = await response.json();
      if (json.errors) {
        setError(JSON.stringify(json.errors));
      } else {
        const fetchedPosts: Post[] = json.data.posts.map((post: Post) => ({
          ...post,
          imageUrl: Math.random() > 0.5 ? placeholderImage : undefined
        }));
        
        setAllPosts(fetchedPosts);
        setPosts(fetchedPosts);

        const uniqueCities = Array.from(
          new Map(fetchedPosts.map((post) => [post.city.id, post.city])).values()
        );
        setCities(Array.from(uniqueCities));
      }
    } catch (err) {
      setError('Erro ao buscar os posts.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPostsByCity = async (cityId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query FilteredPosts($cityId: Float!) {
              postsByCity(cityId: $cityId) {
                id
                title
                description
                floodLevel
                address
                neighborhood
                createdAt
                author {
                  id
                  name
                }
                city {
                  id
                  name
                  state {
                    id
                    name
                    uf
                  }
                }
              }
            }
          `,
          variables: { cityId: parseFloat(cityId) },
        }),
      });

      const json = await response.json();
      if (json.errors) {
        setError(JSON.stringify(json.errors));
      } else {
        const filteredPosts = json.data.postsByCity.map((post: Post) => ({
          ...post,
          imageUrl: Math.random() > 0.5 ? placeholderImage : undefined
        }));
        setPosts(filteredPosts);
      }
    } catch (err) {
      setError('Erro ao filtrar por cidade.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleCityFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);

    if (cityId === '') {
      setPosts(allPosts);
    } else {
      fetchPostsByCity(cityId);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Relatos de Enchentes</h2>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            onChange={handleCityFilter}
            value={selectedCityId ?? ''}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Todas as cidades</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.state.uf}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const severityDetails = getSeverityDetails(post.floodLevel);
          const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });

          return (
            <div 
              key={post.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 ${severityDetails.borderColor}`}
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {post.imageUrl ? (
                 ''
                  // <img
                  //   src={post.imageUrl}
                  //   alt={post.title}
                  //   className="w-full h-full object-cover"
                  // />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="h-12 w-12 mb-2" />
                    <span className="text-sm">Sem imagem disponível</span>
                  </div>
                )}
                <div className={`absolute top-0 right-0 m-2 px-2 py-1 rounded-full text-xs font-semibold ${severityDetails.color} flex items-center`}>
                  <Droplet className={`h-3 w-3 mr-1 ${severityDetails.icon}`} />
                  {severityDetails.label}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2 text-blue-600" />
                    <span>
                      {post.address && `${post.address}, `}
                      {post.neighborhood && `${post.neighborhood}, `}
                      {post.city.name} - {post.city.state.uf}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{formattedDate}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{post.author.name}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum relato encontrado</p>
        </div>
      )}
    </div>
  );
}