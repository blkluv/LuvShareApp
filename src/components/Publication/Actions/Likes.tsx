import { ErrorMessage } from '@/components/ErrorMessage';
import UserProfile from '@/components/ProfilePage/UserProfile';
import { EmptyState } from '@/components/UI/EmptyState';
import Loader from '@/components/UI/Loader';
import {
  Profile,
  WhoReactedPublicationRequest,
  useLikesQuery
} from '@/utils/lens/generatedLenster';
import { HeartIcon } from '@heroicons/react/24/outline';

import { motion } from 'framer-motion';
import type { FC } from 'react';
import { Virtuoso } from 'react-virtuoso';

interface LikesProps {
  publicationId: string;
}

const Likes: FC<LikesProps> = ({ publicationId }) => {
  // Variables
  const request: WhoReactedPublicationRequest = {
    publicationId: publicationId,
    limit: 10
  };

  const { data, loading, error, fetchMore } = useLikesQuery({
    variables: { request },
    skip: !publicationId
  });

  const profiles = data?.whoReactedPublication?.items;
  const pageInfo = data?.whoReactedPublication?.pageInfo;
  const hasMore = pageInfo?.next;

  const onEndReached = async () => {
    if (!hasMore) {
      return;
    }

    await fetchMore({
      variables: { request: { ...request, cursor: pageInfo?.next } }
    });
  };

  if (loading) {
    return <Loader message={`Loading likes`} />;
  }

  if (profiles?.length === 0) {
    return (
      <div className="p-5">
        <EmptyState
          message={`No likes.`}
          icon={<HeartIcon className="text-brand h-8 w-8" />}
          hideCard
        />
      </div>
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto" data-testid="likes-modal">
      <ErrorMessage
        className="m-5"
        title={`Failed to load likes`}
        error={error}
      />
      <Virtuoso
        className="virtual-profile-list"
        data={profiles}
        endReached={onEndReached}
        itemContent={(index, like) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5"
            >
              <UserProfile
                profile={like?.profile as Profile}
                isFollowing={like?.profile?.isFollowedByMe}
                followUnfollowPosition={index + 1}
                showFollow
                showUserPreview={false}
              />
            </motion.div>
          );
        }}
      />
    </div>
  );
};

export default Likes;
