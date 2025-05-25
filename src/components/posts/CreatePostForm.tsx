'use client';

import React, { useState } from 'react';
import { CREATE_POST } from '@/graphql/mutations';
import SelectStatesCities from '../cidades-estados/StatesCitiesList';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const CreatePostForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    floodLevel: 'LOW',
    address: '',
    neighborhood: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const cityId = localStorage.getItem('selectedCityId');

    if (!cityId) {
      setError('Selecione um estado e cidade antes de enviar.');
      setLoading(false);
      return;
    }

    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: CREATE_POST,
          variables: {
            input: {
              ...form,
              floodLevel: form.floodLevel.toUpperCase(),
              cityId: Number(cityId),
            },
          },
        }),
      });

      const data = await response.json();

      if (data.errors) {
        setError(data.errors[0].message || 'Erro ao criar post.');
      } else {
        setSuccess('Post criado com sucesso!');
        setForm({
          title: '',
          description: '',
          floodLevel: 'LOW',
          address: '',
          neighborhood: '',
        });
      }
    } catch (err) {
      setError('Erro ao enviar requisição.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Criar Post de Alagamento</h2>

            {(error || success) && (
              <div className={`mb-4 p-3 rounded-md ${error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                <div className="flex items-center">
                  {error ? (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                  )}
                  <p>{error || success}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  name="title"
                  id="title"
                  placeholder="Ex: Alagamento na Av. Principal"
                  value={form.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Descreva a situação do alagamento"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="floodLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Nível do Alagamento
                </label>
                <select
                  name="floodLevel"
                  id="floodLevel"
                  value={form.floodLevel}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="LOW">Baixo</option>
                  <option value="MEDIUM">Médio</option>
                  <option value="HIGH">Alto</option>
                </select>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  name="address"
                  id="address"
                  placeholder="Rua, número"
                  value={form.address}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                  Bairro
                </label>
                <input
                  name="neighborhood"
                  id="neighborhood"
                  placeholder="Nome do bairro"
                  value={form.neighborhood}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localização (Estado e Cidade)
                </label>
                <SelectStatesCities />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Criando...
                    </>
                  ) : 'Criar Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;