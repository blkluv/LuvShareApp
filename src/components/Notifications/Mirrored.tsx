import type { NewMirrorNotification } from '@/utils/lens/generatedLenster';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import getRelativeTime from '@/utils/functions/formatTime';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';

interface Props {
  notification: NewMirrorNotification;
}

const MirroredNotification: FC<Props> = ({ notification }) => {
  return (
    <>
      <div className="flex items-center space-x-3">
        <Link
          href={`/u/${notification?.profile?.id}`}
          className="font-base inline-flex items-center space-x-1.5"
        >
          <img
            className="h-5 w-5 rounded-full"
            src={getAvatar(notification.profile)}
            alt={notification.profile?.handle}
            draggable={false}
          />
          <div className="flex items-center space-x-0.5">
            <span>{notification?.profile?.name}</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <span className="truncate text-gray-600 dark:text-gray-400">
          mirrored{' '}
          <Link
            href={`/post/${notification?.publication.id}`}
            className="ml-1 text-indigo-500"
          >
            video
          </Link>
        </span>
        <div className="flex flex-none items-center text-xs text-blue-500">
          <span>{getRelativeTime(notification?.createdAt)}</span>
        </div>
      </div>
    </>
  );
};

export default MirroredNotification;
