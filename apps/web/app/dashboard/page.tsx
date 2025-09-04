'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`, {
      headers: {
        'X-User-Id': process.env.NEXT_PUBLIC_DEV_USER_ID || '',
      },
    })
      .then(r => r.json())
      .then(setEvents)
      .catch(() => setMessage('API non configurée'));
  }, []);

  const runReco = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recommendations/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': process.env.NEXT_PUBLIC_DEV_USER_ID || '',
        },
        body: JSON.stringify({ eventId: id }),
      });
      setMessage('Recommandation générée');
    } catch {
      setMessage('API non configurée');
    }
  };

  const sendEgift = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/egift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': process.env.NEXT_PUBLIC_DEV_USER_ID || '',
        },
        body: JSON.stringify({ eventId: id, amountEur: events.find(e => e.id === id)?.budgetEur || 0 }),
      });
      setMessage('E-gift envoyé');
    } catch {
      setMessage('API non configurée');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            {e.type} - {e.date}
            <button onClick={() => runReco(e.id)}>Générer reco</button>
            <button onClick={() => sendEgift(e.id)}>Envoyer e-gift (test)</button>
            <Link href={`/recommendations/${e.id}`}>Voir recommandations</Link>
          </li>
        ))}
      </ul>
      {message && <div>{message}</div>}
    </div>
  );
}
