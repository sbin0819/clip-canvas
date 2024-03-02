import { ColorType } from '@/app/store/use-editor-store.types';
import Dropdown from '../common/dropdown';
import Palette from './background.palette';

const backgroundOptions = ['solid', 'gradient'] as ColorType[];

export default function BackgroundPanel() {
  return (
    <div>
      <div className="font-bold text-sm">Background</div>
      <div className="my-4 flex flex-col gap-3">
        <Dropdown
          dropdownKey={'backgroundType'}
          selectOptions={backgroundOptions}
        />
        <Palette />
      </div>
    </div>
  );
}
