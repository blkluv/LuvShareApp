import { useHuddle01, usePeers } from '@huddle01/react/hooks';
import { Image } from '@/components/UI/Image';
import React, { FC } from 'react';
import { useSpacesStore } from 'src/store/spaces';

import { Icons } from '../Common/assets/Icons';
import { Profile, useProfilesQuery } from '@/utils/lens/generated5';
import getAvatar from '@/lib/getAvatar';

const SpacesSummary: FC = () => {
  const space = useSpacesStore((state) => state.space);
  const { peers } = usePeers();
  const { me } = useHuddle01();

  const { data } = useProfilesQuery({
    variables: {
      request: { ownedBy: [space.host] }
    }
  });

  const hostProfile = data?.profiles?.items?.find(
    (profile) => profile?.ownedBy === space.host
  ) as Profile;

  const topThreePeers = Object.values(peers).slice(0, 3);

  const listeners = Object.keys(peers).filter(
    (peerId) => peerId !== me.meId
  ).length;

  return (
    <div className="flex items-center justify-between pt-4">
      <div className="flex items-center gap-2">
        <span>{Icons.speaking}</span>
        <Image
          src={getAvatar(hostProfile)}
          className="aspect-square h-4 w-4 rounded-full"
        />
        <div className="text-sm font-normal leading-none">
          {hostProfile.handle}
        </div>
      </div>
      <div className="flex items-center text-xs font-normal leading-none text-gray-500 text-opacity-60 dark:text-white">
        <div className="flex p-0.5">
          {topThreePeers[0] ? (
            <Image
              src={topThreePeers[0].avatarUrl}
              className="aspect-square h-3 w-3 rounded-full"
            />
          ) : null}
          {topThreePeers[1] ? (
            <Image
              src={topThreePeers[1].avatarUrl}
              className="aspect-square h-3 w-3 -translate-x-1/2 rounded-full"
            />
          ) : null}
          {topThreePeers[2] ? (
            <Image
              src={topThreePeers[2].avatarUrl}
              className="aspect-square h-3 w-3 -translate-x-full rounded-full"
            />
          ) : null}
        </div>
        {`${listeners}${listeners > 0 ? '+ ' : ' '}`}
        Listening
      </div>
    </div>
  );
};

export default SpacesSummary;
