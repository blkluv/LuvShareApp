import { Profile, Publication } from '@/utils/lens/generatedLenster';
import { formatNumber } from '@/utils/functions/formatNumber';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import React from 'react';
import UnfollowButton from '../Buttons/UnfollowButton';
import FollowButton from '../Buttons/FollowButton';

import formatAddress from '@/utils/functions/formatAddress';
import formatHandle from '@/utils/functions/formatHandle';
import { useAppStore } from '@/store/app';
import { Image } from '../UI/Image';

type Props = {
  video: Publication;
  following: boolean;
  setFollowing: (following: boolean) => void;
  profile: Profile;
};

const MobileBottomOverlay: FC<Props> = ({ video }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [following, setFollowing] = useState(false);
  const isMirror = video.__typename === 'Mirror';

  const subscriber = video.profile;

  useEffect(() => {
    if (subscriber?.isFollowedByMe === true) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
    if (!currentProfile) {
      setFollowing(false);
    }
  }, [subscriber?.isFollowedByMe]);

  return (
    <div className="absolute bottom-0   left-0 right-0 z-[10]  overflow-auto  rounded-b-2xl bg-slate-100 px-3   pb-6 pt-3 dark:bg-gray-700 md:rounded-b-xl">
      <Link href={`/bytes/${video?.id}`} key={video.id}>
        <div className="pb-2">
          {isMirror ? (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-blue-700">
                Mirror by {video?.profile.name}
              </span>
              <h1 className="text-xs text-blue-700">{video.metadata.name}</h1>
            </div>
          ) : (
            <h1 className="line-clamp-2 font-bold text-black dark:text-white">
              {video.metadata.name}
            </h1>
          )}
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <Link
            href={`/u/${subscriber?.id}`}
            className="flex flex-none cursor-pointer items-center space-x-2"
          >
            <Image
              src={getProfilePicture(subscriber, 'avatar')}
              className="h-9 w-9 rounded-full"
              draggable={false}
              alt={subscriber?.handle}
            />
            <div className="flex min-w-0 flex-col items-start font-bold text-black dark:text-white">
              <h6 className="flex max-w-full items-center space-x-1">
                <span className="truncate">
                  {formatHandle(subscriber?.handle)}
                </span>
              </h6>
              <span className="inline-flex items-center space-x-1 text-xs text-black dark:text-white">
                {formatNumber(subscriber?.stats.totalFollowers)} Followers
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center  space-x-2">
          {
            <div className="flex-shrink-0 pr-3">
              {following ? (
                <UnfollowButton
                  setFollowing={setFollowing}
                  profile={subscriber as Profile}
                />
              ) : (
                <FollowButton
                  setFollowing={setFollowing}
                  profile={subscriber as Profile}
                />
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MobileBottomOverlay;
