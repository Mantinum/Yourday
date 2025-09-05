'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function RecommendationsPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const [items, setItems] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recommendations?eventId=${eventId}`, {
      headers: {
        'X-User-Id': process.env.NEXT_PUBLIC_DEV_USER_ID || '',
      },
    })
      .then(r => r.json())
      .then(reco => setItems(reco?.items || []))
      .catch(() => setMessage('API non configurée'));
  }, [eventId]);

  return (
    <div>
      <h1>Recommandations</h1>
      <ul>
        {items.map((it: any) => (
          <li key={it.id}>
            <a href={it.url} target="_blank" rel="noreferrer">
              {it.title} - {it.priceEur}€ (score {it.score.toFixed(2)})
            </a>
          </li>
        ))}
      </ul>
      {message && <div>{message}</div>}
    </div>
  );
}
