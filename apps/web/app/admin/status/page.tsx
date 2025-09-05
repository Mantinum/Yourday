'use client';
import { useEffect, useState } from 'react';

export default function StatusPage() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/status`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('API non configurée'));
  }, []);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Status</h1>
      <p>API: {process.env.NEXT_PUBLIC_API_BASE_URL}</p>
      <p>X-User-Id: {process.env.NEXT_PUBLIC_DEV_USER_ID || 'none'}</p>
      <div>DB: {data.db ? 'ok' : 'ko'}</div>
      <div>Fake DB: {data.fakeDb ? 'on' : 'off'}</div>
      <div>
        Counts: users {data.counts.users}, recipients {data.counts.recipients}, events {data.counts.events},
        recommendations {data.counts.recommendations}, orders {data.counts.orders}
      </div>
      <pre>{JSON.stringify(data.flags, null, 2)}</pre>
    </div>
  );
}
