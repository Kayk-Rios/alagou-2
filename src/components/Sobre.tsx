import { AlertTriangle, Droplet, Home, Phone, Car, Umbrella, Info } from 'lucide-react';

export default function AlertasAlagamento() {
  const alertas = [
    { id: 1, local: 'Centro', nivel: 'Alto', status: 'Ativo' },
    { id: 2, local: 'Zona Norte', nivel: 'Médio', status: 'Ativo' },
    { id: 3, local: 'Zona Sul', nivel: 'Baixo', status: 'Monitoramento' },
  ];

  const dicasPrevencao = [
    {
      titulo: 'Em casa',
      itens: [
        'Desligue a energia elétrica se a água atingir as tomadas',
        'Coloque objetos valiosos em lugares altos',
        'Feche registros de gás e água'
      ]
    },
    {
      titulo: 'Na rua',
      itens: [
        'Evite andar em áreas alagadas',
        'Não tente atravessar pontes inundadas',
        'Cuidado com buracos e bueiros abertos'
      ]
    },
    {
      titulo: 'No carro',
      itens: [
        'Nunca tente atravessar enchentes',
        'Se ficar preso, abandone o veículo',
        'Mantenha o tanque de combustível cheio'
      ]
    }
  ];

  const numerosEmergencia = [
    { nome: 'Defesa Civil', numero: '199' },
    { nome: 'Bombeiros', numero: '193' },
    { nome: 'SAMU', numero: '192' },
    { nome: 'Polícia', numero: '190' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Droplet className="h-10 w-10 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Alertas de Alagamento</h1>
          </div>
          <p className="text-lg text-gray-600">
            Informações em tempo real e orientações para situações de chuva forte
          </p>
        </header>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Alertas Ativos</h2>
          </div>
          
          <div className="space-y-4">
            {alertas.map((alerta) => (
              <div key={alerta.id} className={`p-4 rounded-md border-l-4 ${
                alerta.nivel === 'Alto' ? 'border-red-500 bg-red-50' : 
                alerta.nivel === 'Médio' ? 'border-yellow-500 bg-yellow-50' : 
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">{alerta.local}</h3>
                    <p className="text-sm text-gray-600">Nível: {alerta.nivel}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alerta.status === 'Ativo' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {alerta.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Info className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">O Que Fazer em Caso de Alagamento</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {dicasPrevencao.map((categoria, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  {index === 0 ? <Home className="h-5 w-5 text-blue-600 mr-2" /> : 
                   index === 1 ? <Umbrella className="h-5 w-5 text-blue-600 mr-2" /> : 
                   <Car className="h-5 w-5 text-blue-600 mr-2" />}
                  <h3 className="font-medium text-gray-800">{categoria.titulo}</h3>
                </div>
                <ul className="space-y-2">
                  {categoria.itens.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-300 mt-2 mr-2"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Phone className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Números de Emergência</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {numerosEmergencia.map((contato, index) => (
              <div key={index} className="border rounded-lg p-4 text-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="font-medium text-gray-800">{contato.nome}</h3>
                <p className="text-lg font-semibold text-red-600">{contato.numero}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}