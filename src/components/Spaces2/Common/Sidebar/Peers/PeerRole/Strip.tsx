import { clsx } from 'clsx';
import type { FC } from 'react';
import React from 'react';

import { PeerListIcons } from '../../../assets/Icons';
import { UserIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { HiPhoneMissedCall, HiSpeakerphone } from 'react-icons/hi';

type StripProps = {
  type: 'personNormal' | 'speaker' | 'leave' | 'remove';
  title: string;
  className?: string;
  variant: 'normal' | 'danger';
  onClick?: () => void;
};

const PeerIcons = (type: 'personNormal' | 'speaker' | 'leave' | 'remove') => {
  switch (type) {
    case 'personNormal':
      return <UserIcon className="h-4 w-4" />;
    case 'remove' || 'close':
      return <XCircleIcon className="h-4 w-4" />;
    case 'speaker':
      return <HiSpeakerphone className="h-4 w-4" />;
    case 'leave':
      return <HiPhoneMissedCall className="h-4 w-4" />;
  }
};

const Strip: FC<StripProps> = ({ type, title, variant, onClick }) => {
  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center gap-1 p-1 text-sm font-normal',
        variant === 'normal'
          ? 'text-neutral-500 dark:text-neutral-400'
          : 'text-red-400'
      )}
      onClick={onClick}
    >
      <div className="flex h-6 w-6 items-center justify-center">
        {PeerIcons(type)}
      </div>
      <div className="text-xs">{title}</div>
    </div>
  );
};
export default React.memo(Strip);
