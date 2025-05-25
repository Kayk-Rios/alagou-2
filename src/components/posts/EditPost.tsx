import { useState } from 'react';
import Cookies from 'js-cookie';
import { UPDATE_POST } from '@/graphql/mutations';
import { AlertCircle, Edit, Save, X } from 'lucide-react';

interface EditPostProps {
  post: any;
  onUpdated: () => void;
  onCancel: () => void;
}

const EditPost = ({ post, onUpdated, onCancel }: EditPostProps) => {
  const [form, setForm] = useState({
    title: post.title,
    description: post.description,
    floodLevel: post.floodLevel,
    address: post.address,
    neighborhood: post.neighborhood,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = Cookies.get('token');
    if (!token) return setError('Usuário não autenticado.');

    setLoading(true);
    setError('');

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: UPDATE_POST,
          variables: {
            input: {
              id: Number(post.id),
              ...form,
            },
          },
        }),
      });

      const data = await response.json();

      if (data.errors) {
        setError('Erro ao atualizar o post.');
      } else {
        onUpdated();
      }
    } catch (err) {
      setError('Erro de rede.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500">
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Edit className="h-5 w-5 mr-2 text-blue-600" />
          Editar Post
        </h3>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Título do post"
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descreva a situação"
              rows={4}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Inundação</label>
            <select
              name="floodLevel"
              value={form.floodLevel}
              onChange={handleChange}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="LOW">Baixo</option>
              <option value="MEDIUM">Médio</option>
              <option value="HIGH">Alto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Rua, número"
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
            <input
              name="neighborhood"
              value={form.neighborhood}
              onChange={handleChange}
              placeholder="Nome do bairro"
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;