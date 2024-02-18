import Link from 'next/link';

export default function Page(): JSX.Element {
  return (
    <main className="min-h-[100vh] bg-slate-100">
      <Link className="text-4xl" href="/dashboard">
        Dashboard
      </Link>
    </main>
  );
}
