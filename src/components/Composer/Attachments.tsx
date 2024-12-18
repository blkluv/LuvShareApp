import cn from '@/components/UI/cn';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { usePublicationStore } from 'src/store/publication4';

import { useUpdateEffect } from 'usehooks-ts';

import Audio from './Audio';

import {
  MediaSet,
  MetadataOutput,
  Publication
} from '@/utils/lens/generatedLenster';
import {
  ALLOWED_AUDIO_TYPES,
  ALLOWED_VIDEO_TYPES,
  ATTACHMENT,
  STATIC_IMAGES_URL
} from '@/constants';
import { NewLensshareAttachment } from '@/types/misc';
import sanitizeDStorageUrl from '@/utils/functions/sanitizeDStorageUrl';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { Button } from '../UI/Button';
import ChooseThumbnail from './ChooseThumbnail';
import imageKit from '@/lib/imageKit';
import { LightBox } from '../UI/LightBox';
import { Image } from '../UI/Image';
import { LinkIcon, XCircleIcon } from '@heroicons/react/24/outline';
import VideoPlayer from '@/utils/VideoPlayer';

import Item from '../Echos/Item';
import { HiExternalLink } from 'react-icons/hi';
import Video from './Video';

const getClass = (attachments: number, isNew = false) => {
  if (attachments === 1) {
    return {
      aspect: isNew ? 'aspect-w-16 aspect-h-10' : '',
      row: 'grid-cols-1 grid-rows-1'
    };
  } else if (attachments === 2) {
    return {
      aspect: 'aspect-w-16 aspect-h-12',
      row: 'grid-cols-2 grid-rows-1'
    };
  } else if (attachments > 2) {
    return {
      aspect: 'aspect-w-16 aspect-h-12',
      row: 'grid-cols-2 grid-rows-2'
    };
  }
};

interface AttachmentsProps {
  attachments: any;
  isNew?: boolean;
  hideDelete?: boolean;
  publication?: Publication;
  txn?: any;
}

const Attachments: FC<AttachmentsProps> = ({
  attachments = [],
  isNew = false,
  hideDelete = false,
  publication,
  txn
}) => {
  const setAttachments = usePublicationStore((state) => state.setAttachments);
  const setVideoDurationInSeconds = usePublicationStore(
    (state) => state.setVideoDurationInSeconds
  );
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onDataLoaded = () => {
    if (videoRef.current?.duration && videoRef.current?.duration !== Infinity) {
      setVideoDurationInSeconds(videoRef.current.duration.toFixed(2));
    }
  };

  useUpdateEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = onDataLoaded;
    }
  }, [videoRef, attachments]);

  const removeAttachment = (attachment: any) => {
    const arr = attachments;
    setAttachments(
      arr.filter((element: any) => {
        return element !== attachment;
      })
    );
  };

  /**
   * Returns the thumbnail URL for the specified publication metadata.
   *
   * @param metadata The publication metadata.
   * @returns The thumbnail URL.
   */
  const getThumbnailUrl = (metadata?: MetadataOutput): string => {
    const fallbackUrl = `${STATIC_IMAGES_URL}/icon.png`;

    if (!metadata) {
      return fallbackUrl;
    }

    const { cover } = metadata;
    const url = cover?.original?.url || fallbackUrl;

    return sanitizeDStorageUrl(url);
  };

  const slicedAttachments = attachments?.some((e: any) =>
    ALLOWED_VIDEO_TYPES.includes(e?.original?.mimeType)
  )
    ? attachments?.slice(0, 1)
    : attachments?.slice(0, 4);
  const attachmentsLength = slicedAttachments?.length;

  return attachmentsLength !== 0 ? (
    <>
      <div className={cn(getClass(attachmentsLength)?.row, 'mt-3 grid gap-2')}>
        {slicedAttachments?.map(
          (attachment: NewLensshareAttachment & MediaSet, index: number) => {
            const type = attachment.original?.mimeType;
            const url = isNew
              ? attachment.previewItem
              : sanitizeDStorageUrl(attachment.original?.url);
            const isAudio = ALLOWED_AUDIO_TYPES.includes(type);
            const isVideo = ALLOWED_VIDEO_TYPES.includes(type);
            const isImage = !(isVideo || isAudio);

            return (
              <div
                className={cn(
                  isImage
                    ? `${getClass(attachmentsLength, isNew)?.aspect} ${
                        attachmentsLength === 3 && index === 0
                          ? 'row-span-2'
                          : ''
                      }`
                    : '',
                  {
                    'w-full': isAudio || isVideo,
                    'w-2/3': !isVideo && attachmentsLength === 1
                  },
                  'relative'
                )}
                key={index + url}
                onClick={stopEventPropagation}
                aria-hidden="true"
              >
                {type === 'image/svg+xml' ? (
                  <Button
                    className="text-sm"
                    variant="primary"
                    icon={<HiExternalLink className="h-4 w-4" />}
                    onClick={() => window.open(url, '_blank')}
                  >
                    <span>Open Image in new tab</span>
                  </Button>
                ) : isVideo ? (
                  isNew ? (
                    <>
                      <video
                        className="w-full overflow-hidden rounded-xl"
                        src={url}
                        ref={videoRef}
                        disablePictureInPicture
                        disableRemotePlayback
                        controlsList="nodownload noplaybackrate"
                        controls
                      />
                      <ChooseThumbnail />
                    </>
                  ) : (
                    <Video
                      src={url}
                      poster={getThumbnailUrl(publication?.metadata)}
                    />
                  )
                ) : isAudio ? (
                  isNew ? (
                    <>
                      <Audio
                        src={url}
                        isNew={isNew}
                        publication={publication}
                        txn={txn}
                        expandCover={(url) => setExpandedImage(url)}
                      />
                    </>
                  ) : (
                    <Item publication={publication as Publication} />
                  )
                ) : (
                  <Image
                    className="cursor-pointer rounded-lg border bg-gray-100 object-cover dark:border-gray-700 dark:bg-gray-800"
                    loading="lazy"
                    height={1000}
                    width={1000}
                    onError={({ currentTarget }) => {
                      currentTarget.src = url;
                    }}
                    onClick={() => {
                      setExpandedImage(url);
                    }}
                    src={isNew ? url : imageKit(url, ATTACHMENT)}
                    alt={isNew ? url : imageKit(url, ATTACHMENT)}
                    data-testid={`attachment-image-${url}`}
                  />
                )}
                {isNew &&
                  !hideDelete &&
                  (isVideo ? (
                    <Button
                      className="mt-3"
                      variant="danger"
                      size="sm"
                      icon={<XCircleIcon className="h-4 w-4" />}
                      onClick={() => removeAttachment(attachment)}
                      outline
                    >
                      Cancel Upload
                    </Button>
                  ) : (
                    <div
                      className={cn(isAudio ? 'absolute left-2 top-2' : 'm-3')}
                    >
                      <button
                        type="button"
                        className="rounded-full bg-gray-900 p-1.5 opacity-75"
                        onClick={() => removeAttachment(attachment)}
                      >
                        <XCircleIcon className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
              </div>
            );
          }
        )}
      </div>
      <LightBox
        show={Boolean(expandedImage)}
        url={expandedImage}
        onClose={() => setExpandedImage(null)}
      />
    </>
  ) : null;
};

export default Attachments;
