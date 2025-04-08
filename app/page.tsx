'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
            textAlign: 'center',
            background: '#f9f9f9'
        }}>
            <main style={{
                padding: '20px',
                maxWidth: '600px',
                width: '100%',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #ddd'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    marginBottom: '20px',
                    color: '#333'
                }}>
                    Добро пожаловать!
                </h1>
                <p style={{
                    fontSize: '1rem',
                    marginBottom: '20px',
                    color: '#666'
                }}>
                    Социальная сеть для владельцев животных.
                </p>

                {/* Кнопка перехода к сообществам */}
                <Link href="/api/communities/route">
                    <button style={{
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
                        Перейти к сообществам
                    </button>
                </Link>
            </main>
        </div>
    );
}