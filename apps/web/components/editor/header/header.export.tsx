import { useState } from 'react';
import { BiExport } from 'react-icons/bi';
import html2canvas from 'html2canvas';
import RecordRTC from 'recordrtc';

export default function Export() {
  const [isRecording, setIsRecording] = useState(false); // State to handle button text and functionality

  const onClick = async () => {
    setIsRecording(true); // Start recording

    const canvasElement = document.getElementById('editor__canvas');
    if (!canvasElement) {
      console.error('Canvas element not found');
      setIsRecording(false); // Reset recording status
      return;
    }

    const canvas = await html2canvas(canvasElement);
    const stream = canvas.captureStream(25); // Capture the stream from the canvas, 25 FPS

    const recorder = new RecordRTC(stream, {
      type: 'video',
      mimeType: 'video/mp4', // Set the desired output format
      frameRate: 25, // Match FPS
    });

    recorder.startRecording();

    // Record for 3 seconds (3000 milliseconds)
    setTimeout(async () => {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();

        // Create a link and trigger a download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'recorded_canvas.mp4'; // Name the file
        downloadLink.click();

        setIsRecording(false); // Reset recording status after downloading
      });
    }, 3000);
  };

  return (
    <div
      className="flex items-center justify-between gap-2 px-4 h-full text-sm font-semibold rounded-lg bg-black text-white cursor-pointer"
      onClick={onClick}
    >
      <div>{isRecording ? 'Exporting...' : 'Export'}</div>
      <div>
        <BiExport />
      </div>
    </div>
  );
}
