import html2canvas from 'html2canvas';
import RecordRTC from 'recordrtc';

const fps = 60;

// 스크린샷을 찍어 Canvas에 그리기 위한 새 Canvas 요소 생성
export const createVideo = async (
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
  duration: number,
) => {
  setIsRecording(true);

  const divElement = document.getElementById('editor__canvas');
  if (!divElement) {
    console.error('DIV element not found');
    setIsRecording(false);
    return;
  }

  let width = 1920;
  let height = 1080;

  const captureCanvas = document.createElement('canvas');
  captureCanvas.width = width;
  captureCanvas.height = height;
  const captureContext = captureCanvas.getContext('2d');
  if (!captureContext) {
    console.error('Failed to get 2D context');
    setIsRecording(false);
    return;
  }
  const stream = captureCanvas.captureStream(fps);
  const recorder = new RecordRTC(stream, {
    type: 'video',
    mimeType: 'video/webm',
    frameRate: fps,
  });

  recorder.startRecording();

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
      downloadLink.download = 'recorded_content.webm';
      downloadLink.click();

      setIsRecording(false);
    });
  }, duration); // Adjust duration as needed
};
