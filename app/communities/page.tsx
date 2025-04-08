'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

type Community = {
    id: number;
    name: string;
    description: string;
    avatar: string;
};

export default function CommunitiesPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [newCommunity, setNewCommunity] = useState<Omit<Community, 'id'>>({
        name: '',
        description: '',
        avatar: ''
    });

    // Загрузка данных
    useEffect(() => {
        fetch('/api/communities')
            .then((res) => res.json())
            .then((data) => setCommunities(data))
            .catch((error) => console.error('Error loading communities:', error));
    }, []);

    // Универсальный обработчик изменений
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewCommunity({ ...newCommunity, [name]: value });
    };

    // Создание нового сообщества
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/communities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCommunity),
            });

            if (response.ok) {
                // Обновляем список после успешного создания
                const updatedData = await fetch('/api/communities').then((res) => res.json());
                setCommunities(updatedData);
                setNewCommunity({ name: '', description: '', avatar: '' });
            }
        } catch (error) {
            console.error('Error creating community:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', textAlign: 'center' }}>
            <Head>
                <title>Сообщества | Petto</title>
                <meta name="description" content="Список сообществ для владельцев животных" />
            </Head>

            <main style={{ padding: '20px', maxWidth: '600px', width: '100%' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Сообщества</h1>

                {/* Форма для создания нового сообщества */}
                <form onSubmit={handleSubmit} style={{
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #ddd'
                }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#555' }}>Создать новое сообщество</h2>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Название:</label>
                        <input
                            type="text"
                            name="name"
                            value={newCommunity.name}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                border: '2px solid #0070f3',
                                borderRadius: '4px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Описание:</label>
                        <textarea
                            name="description"
                            value={newCommunity.description}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                height: '100px',
                                border: '2px solid #0070f3',
                                borderRadius: '4px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>Аватарка (URL):</label>
                        <input
                            type="url"
                            name="avatar"
                            value={newCommunity.avatar}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                border: '2px solid #0070f3',
                                borderRadius: '4px',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: '#fff',
                            background: '#0070f3',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#005bb5'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#0070f3'}
                    >
                        Создать
                    </button>
                </form>

                {/* Список сообществ */}
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#555' }}>Мои сообщества</h2>
                    {communities.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {communities.map((community) => (
                                <li key={community.id} style={{
                                    marginBottom: '20px',
                                    padding: '15px',
                                    background: '#fff',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    border: '1px solid #ddd',
                                    textAlign: 'left'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img
                                            src={community.avatar}
                                            alt={`Аватар ${community.name}`}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                marginRight: '10px',
                                                verticalAlign: 'middle'
                                            }}
                                        />
                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', margin: '0', color: '#333' }}>{community.name}</h3>
                                            <p style={{ fontSize: '1rem', margin: '5px 0 0', color: '#666' }}>{community.description}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ fontSize: '1rem', color: '#666' }}>Вы ещё не состоите ни в одном сообществе.</p>
                    )}
                </div>
            </main>
        </div>
    );
}