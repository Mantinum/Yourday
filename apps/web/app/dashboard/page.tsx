'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [message, setMessage] = useState<string | null>(null);
  const events = [{ id: 1, name: 'Anniversaire', date: '2024-06-01' }];

  const callApi = async (path: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`);
      await res.json();
    } catch (e) {
      setMessage('API non configurée');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            {e.name} - {e.date}
            <button onClick={() => callApi('/recommendations/run')}>Générer reco</button>
            <button onClick={() => callApi('/orders/egift')}>Envoyer e-gift (test)</button>
          </li>
        ))}
      </ul>
      {message && <div>{message}</div>}
    </div>
  );
}
