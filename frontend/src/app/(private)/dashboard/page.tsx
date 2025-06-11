'use client';

import { useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

export default function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token não encontrado. Faça login novamente.');
            setLoading(false);
            return;
        }

        fetch('http://localhost:3001/api/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar usuários');
                return res.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Erro ao buscar usuários:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 32 }}>
            <h2>Você está autenticado!</h2>
            <p>Esta é a página de teste de autenticação.</p>
            <h3>Usuários:</h3>
            {loading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name} ({user.email})</li>
                    ))}
                </ul>
            )}
        </div>
    );
}