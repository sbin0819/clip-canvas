'use client';

import html2canvas from 'html2canvas';
import { useState } from 'react';
import { BiExport } from 'react-icons/bi';
import RecordRTC from 'recordrtc';

// switch (resolution) {
//   case '720p':
//     width = 1280;
//     height = 720;
//     break;
//   case '1080p':
//     width = 1920;
//     height = 1080;
//     break;
//   case '4k':
//     width = 3840;
//     height = 2160;
//     break;
//   default:
//     width = 1280; // 기본값
//     height = 720;
// }

// const resolution = '1080p';
// type Resolution = '720p' | '1080p' | '4k';
// type Fps = 30 | 60;
const fps = 60;

export default function Export() {
  const [isRecording, setIsRecording] = useState(false);

  // const onCallWorker = async () => {
  //   const worker = new Worker(new URL('worker.ts', import.meta.url));
  //   worker.postMessage('Hello, worker!');
  //   worker.onmessage = (event) => {
  //     console.log(event.data);
  //   };
  // };

  const onClick = async () => {
    setIsRecording(true);

    const divElement = document.getElementById('editor__canvas');
    if (!divElement) {
      console.error('DIV element not found');
      setIsRecording(false);
      return;
    }

    let width = 1920;
    let height = 1080;

    // 스크린샷을 찍어 Canvas에 그리기 위한 새 Canvas 요소 생성
    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = width;
    captureCanvas.height = height;
    const captureContext = captureCanvas.getContext('2d');
    if (!captureContext) {
      console.error('Failed to get 2D context');
      setIsRecording(false);
      return;
    }
    const stream = captureCanvas.captureStream(fps); // FPS 설정
    const recorder = new RecordRTC(stream, {
      type: 'video',
      mimeType: 'video/webm',
      frameRate: fps,
    });

    recorder.startRecording();

    // 주기적으로 div의 내용을 캡쳐하고 canvas에 그리는 작업을 수행
    const interval = setInterval(() => {
      html2canvas(divElement).then((canvas) => {
        captureCanvas.width = canvas.width;
        captureCanvas.height = canvas.height;
        captureContext.clearRect(0, 0, canvas.width, canvas.height);
        captureContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);
      });
    }, 1000 / fps);

    setTimeout(() => {
      clearInterval(interval);
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'recorded_content.webm'; // 확장자 변경
        downloadLink.click();

        setIsRecording(false);
      });
    }, 1000 * 6); // 6초간 녹화 후 중단
  };

  return (
    <div
      className="flex items-center justify-between gap-2 px-4 h-full text-sm font-semibold rounded-lg bg-black text-white cursor-pointer"
      onClick={onClick}
    >
      <div>{isRecording ? 'Exporting...' : 'Export'}</div>
      <BiExport />
    </div>
  );
}
