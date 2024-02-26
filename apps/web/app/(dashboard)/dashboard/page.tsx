import dynamic from 'next/dynamic';
import Editor from '@/components/editor/editor';

const ToastProvider = dynamic(() => import('app/toast-provider'), {
  ssr: false,
});

export default function Page(): JSX.Element {
  return (
    <main>
      <ToastProvider>
        <Editor />
      </ToastProvider>
    </main>
  );
}
