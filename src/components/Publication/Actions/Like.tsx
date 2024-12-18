import { Tooltip } from '@/components/UI/Tooltip';
import { Errors } from '@/lib/errors';
import nFormatter from '@/lib/nFormatter';
import { publicationKeyFields } from '@/utils/functions/publicationKeyFields';
import {
  Publication,
  ReactionTypes,
  useAddReactionMutation,
  useRemoveReactionMutation
} from '@/utils/lens/generatedLenster';
import { ApolloCache } from '@apollo/client';

import { HeartIcon } from '@heroicons/react/24/solid';

import cn from '@/components/UI/cn';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppStore } from 'src/store/app';
import HeartOutline from '@/components/UI/Icons/HeartOutline';

interface LikeProps {
  publication: Publication;
  showCount: boolean;
}

const Like: FC<LikeProps> = ({ publication, showCount }) => {
  const { pathname } = useRouter();
  const isMirror = publication.__typename === 'Mirror';
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [liked, setLiked] = useState(
    (isMirror ? publication?.mirrorOf?.reaction : publication?.reaction) ===
      'UPVOTE'
  );
  const [count, setCount] = useState(
    isMirror
      ? publication?.mirrorOf?.stats?.totalUpvotes
      : publication?.stats?.totalUpvotes
  );

  const onError = (error: any) => {
    error;
  };

  const updateCache = (
    cache: ApolloCache<any>,
    type: ReactionTypes.Upvote | ReactionTypes.Downvote
  ) => {
    if (showCount) {
      cache.modify({
        id: publicationKeyFields(
          isMirror ? publication?.mirrorOf : publication
        ),
        fields: {
          stats: (stats) => ({
            ...stats,
            totalUpvotes:
              type === ReactionTypes.Upvote
                ? stats.totalUpvotes + 1
                : stats.totalUpvotes - 1
          })
        }
      });
    }
  };

  const getLikeSource = () => {
    if (pathname === '/') {
      return 'home_feed';
    } else if (pathname === '/u/[id]') {
      return 'profile_feed';
    } else if (pathname === '/explore') {
      return 'explore_feed';
    } else if (pathname === '/post/[id]') {
      return 'post_page';
    } else {
      return;
    }
  };

  const eventProperties = {
    publication_id: publication?.id,
    source: getLikeSource()
  };

  const [addReaction] = useAddReactionMutation({
    onCompleted: () => {},
    onError: (error) => {
      setLiked(!liked);
      setCount(count - 1);
      onError(error);
    },
    update: (cache) => updateCache(cache, ReactionTypes.Upvote)
  });

  const [removeReaction] = useRemoveReactionMutation({
    onError: (error) => {
      setLiked(!liked);
      setCount(count + 1);
      onError(error);
    },
    update: (cache) => updateCache(cache, ReactionTypes.Downvote)
  });

  const createLike = () => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    const variable = {
      variables: {
        request: {
          profileId: currentProfile.id,
          reaction: ReactionTypes.Upvote,
          publicationId:
            publication.__typename === 'Mirror'
              ? publication?.mirrorOf?.id
              : publication?.id
        }
      }
    };

    if (liked) {
      setLiked(false);
      setCount(count - 1);
      removeReaction(variable);
    } else {
      setLiked(true);
      setCount(count + 1);
      addReaction(variable);
    }
  };

  const iconClassName = showCount
    ? 'w-[17px] sm:w-[20px] '
    : 'w-[15px] sm:w-[18px]';

  return (
    <div className={cn('text-pink-500', 'flex items-center space-x-1')}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: liked ? 0 : 0
        }}
        onClick={createLike}
        aria-label="Like"
      >
        <div className={cn('hover:bg-pink-300/20 ', 'rounded-full p-1.5')}>
          <Tooltip
            placement="top"
            content={liked ? `Unlike` : `Like`}
            withDelay
          >
            {liked ? (
              <HeartIcon className={iconClassName} />
            ) : (
              <HeartOutline className={iconClassName} />
            )}
          </Tooltip>
        </div>
      </motion.button>
      {count > 0 && !showCount && (
        <span className="text-pink text-[11px] sm:text-xs">
          {nFormatter(count)}
        </span>
      )}
    </div>
  );
};

export default Like;
