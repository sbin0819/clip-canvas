import html2canvas from 'html2canvas';
import { useState } from 'react';
import { BiExport } from 'react-icons/bi';
import RecordRTC from 'recordrtc';

export default function Export() {
  const [isRecording, setIsRecording] = useState(false);

  const onClick = async () => {
    setIsRecording(true);

    const divElement = document.getElementById('editor__canvas');
    if (!divElement) {
      console.error('DIV element not found');
      setIsRecording(false);
      return;
    }

    // 스크린샷을 찍어 Canvas에 그리기 위한 새 Canvas 요소 생성
    const captureCanvas = document.createElement('canvas');
    const captureContext = captureCanvas.getContext('2d');
    if (!captureContext) {
      console.error('Failed to get 2D context');
      setIsRecording(false);
      return;
    }
    const stream = captureCanvas.captureStream(25); // FPS 설정
    const recorder = new RecordRTC(stream, {
      type: 'video',
      mimeType: 'video/webm',
      frameRate: 25,
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
    }, 40); // 대략 25 FPS에 해당하는 주기

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
    }, 3000); // 3초간 녹화 후 중단
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
