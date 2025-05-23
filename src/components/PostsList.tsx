
import { useEffect, useState } from 'react';

type Post = {
  id: string;
  title: string;
  description: string;
  floodLevel: string;
  address: string;
  neighborhood: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  city: {
    id: string;
    name: string;
    state: {
      id: string;
      name: string;
      uf: string;
    };
  };
};

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setAllPosts(json.data.posts);
        setPosts(json.data.posts);

        const uniqueCities = Array.from(
          new Map(json.data.posts.map((post: Post) => [post.city.id, post.city])).values()
        );
        setCities(uniqueCities);
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
        setPosts(json.data.postsByCity);
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

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Filtrar por Cidade</h2>

      <select
        onChange={handleCityFilter}
        value={selectedCityId ?? ''}
        className="mb-6 p-2 border rounded"
      >
        <option value="">Todas as cidades</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <ul className="grid grid-cols-2 gap-3">
        {posts.map((post) => (
          <li key={post.id} className="border rounded p-4 shadow ">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p>{post.description}</p>
            <p><strong>Bairro:</strong> {post.neighborhood}</p>
            <p><strong>Endereço:</strong> {post.address}</p>
            <p><strong>Nível da Enchente:</strong> {post.floodLevel}</p>
            <p><strong>Autor:</strong> {post.author.name}</p>
            <p>
              <strong>Cidade:</strong> {post.city.name} - {post.city.state.uf}
            </p>
            <p className="text-sm text-gray-400">
              Criado em: {new Date(post.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
