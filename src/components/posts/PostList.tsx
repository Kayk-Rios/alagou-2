'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { GET_MY_POSTS } from '@/graphql/queries';
import { DELETE_POST } from '@/graphql/mutations';
import EditPost from './EditPost';
import { Droplet, MapPin, CalendarDays, User, AlertCircle, Edit, Trash2 } from 'lucide-react';

const PostsList = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

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

  const fetchPosts = async () => {
    const token = Cookies.get('token');
    if (!token) {
      setError('Usuário não autenticado.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: GET_MY_POSTS }),
      });

      const data = await response.json();
      if (data.errors) {
        setError('Erro ao carregar os posts.');
      } else {
        setPosts(data.data.myPosts);
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    const token = Cookies.get('token');
    if (!token) return alert('Usuário não autenticado.');

    const confirmed = window.confirm('Tem certeza que deseja deletar este post?');
    if (!confirmed) return;

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: DELETE_POST,
          variables: { id: Number(id) },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error(result.errors);
        alert('Erro ao deletar o post.');
      } else {
        setPosts((prev) => prev.filter((post) => post.id !== id));
        alert('Post deletado com sucesso!');
      }
    } catch (err) {
      alert('Erro ao conectar ao servidor.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpdated = () => {
    setEditingPostId(null);
    fetchPosts();
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Meus Posts</h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum post encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
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
                {editingPostId === post.id ? (
                  <EditPost post={post} onUpdated={handleUpdated} onCancel={() => setEditingPostId(null)} />
                ) : (
                  <div className="p-5">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityDetails.color} mb-3`}>
                      <Droplet className={`h-3 w-3 mr-1 ${severityDetails.icon}`} />
                      {severityDetails.label}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{post.description}</p>
                    
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
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => setEditingPostId(post.id)}
                        className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Deletar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostsList;