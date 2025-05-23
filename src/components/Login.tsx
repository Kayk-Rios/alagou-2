import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const query = `
      mutation Login($email: String!, $password: String!) {
        login(loginInput: { email: $email, password: $password }) {
          token
          user {
            id
            name
            isAdmin
          }
        }
      }
    `;

    const variables = { email, password };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();

      if (data.errors) {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      } else {
        const { token, user } = data.data.login;

        Cookies.set('token', token, { expires: 7 });
        Cookies.set('userName', user.name, { expires: 7 });
        Cookies.set('isAdmin', user.isAdmin ? 'true' : 'false', { expires: 7 });
        if (user.isAdmin) {
          await router.replace('/admin/admin');
        } else {
          await router.replace('/dashboard/dashboard');
        }
        window.location.reload();
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
