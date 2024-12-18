import type {
  ElectedMirror,
  FeedItem,
  Profile,
  Publication
} from '@/utils/lens/generatedLenster';
import cn from '@/components/UI/cn';
import type { FC } from 'react';

import HiddenPublication from './HiddenPublication';
import PublicationBody from './PublicationBody';
import PublicationHeader from './PublicationHeader';
import PublicationWrapper from './PublicationWrapper';
import PublicationActions from '../Publication/Actions';
import PublicationType from '../Publication/Type';
import PublicationMenu from '../Publication/Actions/Menu';
import FeaturedChannel from '../FeaturedChannel';
import { useRouter } from 'next/router';
import { COMMUNITIES_WORKER_URL } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Community } from '@/types/communities';

interface SinglePublicationProps {
  publication: Publication;
  feedItem?: FeedItem;
  showType?: boolean;
  showActions?: boolean;
  showModActions?: boolean;
  showThread?: boolean;
  showMore?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  profile: Profile;
  showCount: boolean;
  tags: string;
}

const SinglePublication: FC<SinglePublicationProps> = ({
  publication,
  tags,
  feedItem,
  showThread = true,
  profile,
  showType = true,
  showActions = true,
  showModActions = false,
  showCount = true,
  showMore = true,
  isFirst = false,
  isLast = false
}) => {
  const {
    query: { slug }
  } = useRouter();

  const firstComment = feedItem?.comments && feedItem.comments[0];
  const rootPublication = feedItem
    ? firstComment
      ? firstComment
      : feedItem?.root
    : publication;

  return (
    <PublicationWrapper
      className={cn(
        isFirst && 'rounded-t-xl',
        isLast && 'rounded-b-xl',
        'cursor-pointer p-5 hover:bg-gray-100 dark:hover:bg-gray-700'
      )}
      publication={rootPublication}
    >
      <PublicationType
        publication={publication}
        showType={showType}
        showThread={showThread}
        profile={profile}
      />

      <PublicationHeader
        publication={rootPublication}
        feedItem={feedItem}
        profile={profile}
      />

      <div className="ml-[53px] border-blue-500">
        {publication?.hidden ? (
          <HiddenPublication type={publication.__typename} />
        ) : (
          <>
            <PublicationBody
              publication={rootPublication}
              showMore={showMore}
              profile={profile}
            />
            {showActions && (
              <PublicationActions
                publication={rootPublication}
                electedMirror={feedItem?.electedMirror as ElectedMirror}
                showCount={showCount}
              />
            )}
          </>
        )}
      </div>
    </PublicationWrapper>
  );
};

export default SinglePublication;
