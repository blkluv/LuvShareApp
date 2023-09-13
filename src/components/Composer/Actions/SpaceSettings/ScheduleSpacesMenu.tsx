
import Dropdown from '@/components/Spaces2/Common/Dropdown';
import { Input } from '@/components/UI/Input';
import { Spinner } from '@/components/UI/Spinner';
import { CalendarIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';
import React from 'react';
import { useSpacesStore } from 'src/store/spaces';

interface ScheduleSpacesMenuProps {
  isLoading: boolean;
  createPublication: () => void;
}

const ScheduleSpacesMenu: FC<ScheduleSpacesMenuProps> = ({
  isLoading,
  createPublication
}) => {
  const { setSpacesTimeInHour, setSpacesTimeInMinute } = useSpacesStore();

  return (
    <Dropdown
      triggerChild={
        <div className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-violet-500 p-1">
          <CalendarIcon className="text-brand-500 relative h-6 w-6" />
        </div>
      }
    >
      <div className="absolute top-10 w-48 translate-x-20 items-start justify-center gap-4 rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <Input
          type="time"
          onChange={(e) => {
            const [hour, minute] = e.target.value.split(':');
            setSpacesTimeInHour(hour);
            setSpacesTimeInMinute(minute);
          }}
        />
        <div className="mt-4 rounded-lg bg-violet-500 p-2">
          {isLoading ? (
            <Spinner size="xs" />
          ) : (
            <CalendarIcon className="inline h-5 w-5 text-gray-50" />
          )}
          <button
            className="ml-2 text-sm font-semibold text-gray-50"
            onClick={createPublication}
          >
            Schedule Spaces
          </button>
        </div>
      </div>
    </Dropdown>
  );
};

export default ScheduleSpacesMenu;
