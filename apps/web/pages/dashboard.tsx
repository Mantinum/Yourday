import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const query = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events`);
      return res.json();
    },
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(query.data, null, 2)}</pre>
    </main>
  );
}
