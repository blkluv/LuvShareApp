import { useAppUtils } from '@huddle01/react/app-utils';
import { useAudio, useEventListener, useHuddle01 } from '@huddle01/react/hooks';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useSpacesStore } from 'src/store/spaces';

import { Icons, NestedPeerListIcons, PeerListIcons } from '../../assets/Icons';
import Dropdown from '../../Dropdown';
import CoHostData from './PeerRole/CoHostData';
import HostData from './PeerRole/HostData';
import ListenersData from './PeerRole/ListenersData';
import SpeakerData from './PeerRole/SpeakerData';
import { CheckIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { BiDotsVertical } from 'react-icons/bi';

interface PeerMetaDatProps {
  isRequested?: boolean;
  role: 'host' | 'coHost' | 'speaker' | 'listener';
  className?: string;
  isHandRaised?: boolean;
  isMicActive?: boolean;
  name: string;
  src: string;
  onAccept?: () => void;
  onDeny?: () => void;
  peerId: string;
}

interface IAcceptDenyProps {
  onAccept?: () => void;
  onDeny?: () => void;
}

const AcceptDenyGroup: FC<IAcceptDenyProps> = ({ onAccept, onDeny }) => (
  <div className="flex items-center gap-2">
    <button
      className="border-brand-500 text-brand-500 rounded-md border p-0.5 dark:border-neutral-500 dark:text-neutral-50"
      onClick={onAccept}
    >
      <CheckIcon className="h-4 w-4" />
    </button>
    <button
      className="rounded-md border border-red-400 p-0.5 text-red-400"
      onClick={onDeny}
    >
      <XCircleIcon className="h-4 w-4" />
    </button>
  </div>
);

const PeerMetaData: React.FC<PeerMetaDatProps> = ({
  className,
  isMicActive,
  name,
  src,
  isRequested,
  role,
  onAccept,
  onDeny,
  peerId
}) => {
  const RoleData = {
    host: <HostData />,
    coHost: <CoHostData peerId={peerId} />,
    speaker: <SpeakerData peerId={peerId} />,
    listener: <ListenersData peerId={peerId} />
  } as const;

  const { me } = useHuddle01();
  const { sendData } = useAppUtils();
  const {
    fetchAudioStream,
    stopAudioStream,
    produceAudio,
    stopProducingAudio
  } = useAudio();
  const [isHandRaised, setIsHandRaised] = useState<boolean>(false);
  const setMyHandRaised = useSpacesStore((state) => state.setMyHandRaised);
  const isMyHandRaised = useSpacesStore((state) => state.isMyHandRaised);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);

  useEffect(() => {
    sendData('*', {
      raiseHand: isHandRaised
    });
    setMyHandRaised(isHandRaised);
  }, [isHandRaised]);

  useEffect(() => {
    if (me.meId == peerId) {
      setIsHandRaised(isMyHandRaised);
    }
  }, [isMyHandRaised]);

  useEventListener('app:mic-on', (stream) => {
    if (me.meId == peerId) {
      setIsAudioOn(true);
      if (stream) {
        produceAudio(stream);
      }
    }
  });

  useEventListener('app:mic-off', () => {
    if (me.meId == peerId) {
      setIsAudioOn(false);
      stopProducingAudio();
    }
  });

  return (
    <div
      className={clsx(className, 'flex w-full items-center justify-between')}
    >
      <div className="flex items-center gap-2">
        <Image
          loader={() => src}
          src={src}
          alt="default"
          width={24}
          height={24}
          priority
          quality={100}
          className="rounded-full object-contain"
        />
        <div className="text-xs font-normal text-neutral-500 dark:text-slate-400">
          {name}
        </div>
      </div>
      {isRequested ? (
        <AcceptDenyGroup onDeny={onDeny} onAccept={onAccept} />
      ) : (
        <div className="flex items-center">
          <button
            onClick={() => {
              if (
                ['host', 'coHost', 'speaker'].includes(role) &&
                peerId === me.meId
              ) {
                isAudioOn ? stopAudioStream() : fetchAudioStream();
              }
            }}
            className="flex items-center justify-center"
          >
            {isAudioOn || isMicActive ? Icons.mic.true : Icons.mic.false}
          </button>

          {me.role === 'host' ||
          (me.role === 'coHost' &&
            (me.meId === peerId || ['speaker', 'listener'].includes(role))) ||
          ((me.role === 'speaker' || me.role === 'listener') &&
            me.meId === peerId) ? (
            <Dropdown
              triggerChild={
                <BiDotsVertical className="h-4 w-4 text-neutral-500" />
              }
            >
              <div className="absolute -right-10 top-4 w-40 rounded-lg border border-neutral-300 bg-white dark:border-neutral-500 dark:bg-neutral-800">
                {RoleData?.[role]}
              </div>
            </Dropdown>
          ) : (
            <BiDotsVertical className="h-4 w-4 text-neutral-500" />
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(PeerMetaData);