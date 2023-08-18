
import { useEventListener, useHuddle01, useRoom } from '@huddle01/react/hooks';

import React from 'react';
import { useSpacesStore } from 'src/store/spaces';

import { Icons } from '../Common/assets/Icons';
import { Profile, useProfilesQuery } from '@/utils/lens/generatedLenster';
import Slug from '@/components/UI/Slug';
import getAvatar from '@/lib/getAvatar';
import { Image } from '@/components/UI/Image';

type Props = {
  isExpanded?: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpaceWindowHeader = ({ isExpanded, setIsExpanded }: Props) => {
  const space = useSpacesStore((state) => state.space);
  const setSidebarView = useSpacesStore((state) => state.setSidebarView);
  const sidebarView = useSpacesStore((state) => state.sidebar.sidebarView);
  const setShowSpacesWindow = useSpacesStore(
    (state) => state.setShowSpacesWindow
  );
  const { leaveRoom, endRoom } = useRoom();
  const { me } = useHuddle01();

  const { data } = useProfilesQuery({
    variables: {
      request: { ownedBy: [space.host] }
    }
  });

  const hostProfile = data?.profiles?.items?.find(
    (profile) => profile?.ownedBy === space.host
  ) as Profile;

  useEventListener('room:me-left', () => {
    setShowSpacesWindow(false);
  });

  return (
    <div className={'border-b border-neutral-700 pb-3'}>
      {/* Nav */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="cursor-pointer"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {Icons.chevronUp}
            </div>
            {!isExpanded && (
              <div className="text-sm font-medium leading-tight text-neutral-300">
                {space.title}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div>{Icons.share}</div>
            <div>{Icons.more}</div>
            {isExpanded &&
              (me.role === 'host' ? (
                <button className="text-sm text-violet-500" onClick={endRoom}>
                  End Spaces
                </button>
              ) : (
                <button className="text-sm text-violet-500" onClick={leaveRoom}>
                  Leave room
                </button>
              ))}
          </div>
        </div>

        {isExpanded && (
          <>
            <div className="my-1 text-base font-medium leading-normal text-zinc-200">
              {space.title}
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={getAvatar(hostProfile)}
                className="h-4 w-4 rounded-full bg-violet-500"
              />
              <Slug
                slug={`@${hostProfile?.id}`}
                className="text-sm font-normal"
              />
            
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpaceWindowHeader;
