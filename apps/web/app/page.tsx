import Link from 'next/link';

export default function Page(): JSX.Element {
  return (
    <main className="min-h-[100vh] bg-[#111215] text-white">
      <div className="max-w-[1200px] mx-auto pt-6">
        <nav className="flex items-center justify-between">
          <div>
            <Link className="text-2xl" href="/">
              Clipcanvas
            </Link>
          </div>
          <div>
            <Link
              className="px-4 py-2 text-sm bg-gray-700 rounded-2xl"
              href="/dashboard"
            >
              Go to Dashboard
            </Link>
          </div>
        </nav>
        <section className="mt-20 p-10 bg-gray-800 rounded-md">
          clipcanvas 랜딩페이지
        </section>
      </div>
    </main>
  );
}
