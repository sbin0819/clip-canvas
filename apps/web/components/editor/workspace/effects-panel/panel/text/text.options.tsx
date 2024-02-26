'use client';
import useSideOptions from '@/app/store/use-side-options';

const DEFAULT_FONT_SIZE = 16;

export default function TextOptions({ textIdx }: { textIdx: number }) {
  const { currentText, setCurrentFrame } = useSideOptions((state) => ({
    currentText:
      state.options.frames[state.options.option.currentFrameIdx]?.texts[
        textIdx
      ],
    setCurrentFrame: state.setCurrentFrame,
  }));

  const onChangeFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;

    if (inputText === '') {
      setCurrentFrame((prevFrame) => {
        const updatedTexts = prevFrame.texts.map((text, index) => {
          if (index === textIdx) {
            return { ...text, fontSize: undefined };
          }
          return text;
        });
        return { ...prevFrame, texts: updatedTexts };
      });
      return;
    }

    if (/[^\d]/.test(inputText) || inputText.startsWith('0')) {
      return;
    }

    const newFontSize = parseInt(inputText, 10);
    if (newFontSize > 0) {
      setCurrentFrame((prevFrame) => {
        const updatedTexts = prevFrame.texts.map((text, index) => {
          if (index === textIdx) {
            return { ...text, fontSize: newFontSize };
          }
          return text;
        });
        return { ...prevFrame, texts: updatedTexts };
      });
    }
  };

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between text-[16px]">
        <h3 className="flex-1">Size</h3>
        <input
          className="flex-1 border text-sm border-slate-200"
          type="number"
          value={currentText?.fontSize}
          onChange={onChangeFontSize}
        />
      </div>
    </div>
  );
}
