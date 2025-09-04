'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`)
      .then(r => r.json())
      .then(setEvents)
      .catch(() => setMessage('API non configurée'));
  }, []);

  const runReco = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recommendations/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: id }),
      });
    } catch {
      setMessage('API non configurée');
    }
  };

  const sendEgift = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/egift`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: id, amountEur: 10 }),
      });
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
