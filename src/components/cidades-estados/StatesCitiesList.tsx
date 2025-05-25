import { GET_STATES_AND_CITIES } from '@/graphql/queries';
import React, { useEffect, useState } from 'react';

const SelectStatesCities = () => {
    const [states, setStates] = useState<any[]>([]);
    const [selectedState, setSelectedState] = useState<any | null>(null);
    const [selectedCity, setSelectedCity] = useState<any | null>(null);
    const [cities, setCities] = useState<any[]>([]);

    useEffect(() => {
        const fetchStatesAndCities = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_URL!, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: GET_STATES_AND_CITIES,
                    }),
                });

                const data = await response.json();

                if (data.errors) {
                    console.error('Erro ao carregar estados e cidades.');
                } else {
                    setStates(data.data.states);
                }
            } catch (err) {
                console.error('Erro ao conectar ao servidor.', err);
            }
        };

        fetchStatesAndCities();
    }, []);

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const stateId = event.target.value;
        const state = states.find((state) => state.id === stateId);

        setSelectedState(state); 
        setCities(state ? state.cities : []); 

       
        setSelectedCity(null);
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = event.target.value;
        const city = cities.find((city) => city.id === cityId);

        setSelectedCity(city); 

       
        localStorage.setItem('selectedStateId', selectedState?.id || '');
        localStorage.setItem('selectedStateName', selectedState?.name || '');
        localStorage.setItem('selectedCityId', cityId || '');
        localStorage.setItem('selectedCityName', city?.name || '');
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                    id="state"
                    className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedState?.id || ''}
                    onChange={handleStateChange}
                >
                    <option value="">Selecione um estado</option>
                    {states.map((state) => (
                        <option key={state.id} value={state.id}>
                            {state.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedState && (
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
                    <select
                        id="city"
                        className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedCity?.id || ''}
                        onChange={handleCityChange}
                    >
                        <option value="">Selecione uma cidade</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default SelectStatesCities;
