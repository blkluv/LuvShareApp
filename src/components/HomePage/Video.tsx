import 'plyr-react/plyr.css';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import type { Publication } from '@/utils/lens/generatedLenster';

import getMedia from '@/lib/getMedia';
import { useRouter } from 'next/router';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import ShareModal from './ShareModal';
import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl';
import ViewCount from './ViewCount';

import VideoPlayer from '@/utils/VideoPlayer';

import {
  APP_ID,
  LENSTER_APP_ID,
  LENSTOK_APP_ID,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID
} from '@/constants';
import { useAppStore } from '@/store/app';
import ShareOutline from '../Bytes/ShareOutline';
import ShareButton from '../Buttons/ShareButton';
import sanitizeDStorageUrl from '@/utils/functions/sanitizeDStorageUrl';
import { imageCdn } from '@/utils/functions/imageCdn';
import { getThumbnailUrl } from '@/utils/functions/getThumbnailUrl';

interface Props {
  publication: Publication;
}
const Video: FC<Props> = ({ publication }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [url, setUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const isMirror = publication.__typename === 'Mirror';
  const video = isMirror ? publication.mirrorOf : publication;
  const nextRouter = useRouter();
  const [showShare, setShowShare] = useState(false);

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    });
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
  }, []);

  const refCallback = (ref: HTMLMediaElement) => {
    if (!ref) {
      return;
    }
    videoRef;
  };
  const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };
  const handleOnMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
  };
  const thumbnailUrl = imageCdn(sanitizeDStorageUrl(getThumbnailUrl(video)));
  const isBytesVideo =
    video.appId === LENSTUBE_APP_ID || publication.appId === APP_ID;

  return (
    <div className="lenshare-player">
      <div className="rounded-2xl border-2 border-blue-700">
        <VideoPlayer
          publicationId={video?.id}
          permanentUrl={getPublicationMediaUrl(video as Publication)}
          posterUrl={thumbnailUrl}
          showControls={true}
          options={{
            autoPlay: true,
            muted: false,
            loop: true,
            loadingSpinner: false,
            isCurrentlyShown: false
          }}
        />
      </div>

      <div className="absolute right-0 top-0 m-2 mr-6 flex flex-row space-x-6 p-2 md:relative md:m-0 md:flex md:flex-col md:space-x-0 md:p-0 md:pt-[50px]">
        <div className="dropdown relative inline-block">
          {/* <button 
           onClick={() => setShowButtons(!showButtons)}
           className="bg-black text-[#57B8FF] md:invisible font-semibold py-2 px-2 rounded inline-flex overflow-auto items-center border-2 border-gray-800">
               <span>
                <ChevronDoubleDownIcon className='w-4 h-4'/>
               </span>
  </button>*/}
        </div>
      </div>
    </div>
  );
};

export default Video;
