import Link from 'next/link';
import Image from 'next/image';

export default function Page(): JSX.Element {
  return (
    <main className="min-h-screen bg-[#111215] text-white overflow-auto">
      <div className="max-w-[1200px] mx-auto pt-6 px-4">
        <nav className="w-full flex items-center justify-between">
          <Link href="/">
            <span
              data-testid="nav__data-logo"
              className="text-2xl cursor-pointer"
            >
              Clipcanvas
            </span>
          </Link>
          <Link href="/dashboard">
            <span className="px-4 py-2 text-sm bg-gray-700 rounded-2xl cursor-pointer">
              Go to Dashboard
            </span>
          </Link>
        </nav>
        <section className="mt-20 p-10 flex flex-col md:flex-row justify-between gap-2 bg-gray-800 rounded-lg">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl">손쉽게 동영상을 만들어보세요!</h2>
              <ul className="mt-6 text-xl">
                <li className="mt-2">
                  Clipcanvas는 동영상을 손쉽게 만들 수 있는 서비스입니다.
                </li>
                <li className="mt-2">
                  Clipcanvas를 이용하여 동영상을 만들어보세요!
                </li>
              </ul>
            </div>
            <div className="my-10 md:my-0">
              <Link href="/dashboard">
                <span className="px-10 py-4 text-lg bg-gray-700 rounded-2xl hover:bg-teal-400 cursor-pointer">
                  시작하기
                </span>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative aspect-square md:aspect-16/9">
            <Image
              className="rounded-md"
              src="https://source.unsplash.com/400x400/?video"
              alt="video"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
