import dynamic from 'next/dynamic';
// import Editor from '@/components/editor/editor';

const Editor = dynamic(() => import('@/components/editor/editor'), {
  ssr: false,
});

export default function Page(): JSX.Element {
  return (
    <main>
      <Editor />
    </main>
  );
}
