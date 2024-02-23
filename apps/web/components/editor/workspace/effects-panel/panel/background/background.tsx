import { BackgroundType } from '@/app/store/use-side-options.types';
import Dropdown from '../common/dropdown';
import Palette from './background.palette';

const backgroundOptions = ['solid', 'gradient'] as BackgroundType[];

export default function BackgroundPanel() {
  return (
    <div className="my-4 flex flex-col gap-3">
      <Dropdown
        dropdownKey={'backgroundType'}
        selectOptions={backgroundOptions}
      />
      <Palette />
    </div>
  );
}
