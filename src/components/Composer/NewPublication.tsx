import type { IGif } from '@giphy/js-types';

import type {
  CollectCondition,
  EncryptedMetadata,
  FollowCondition,
  LensEnvironment,
  EoaOwnership
} from '@lens-protocol/sdk-gated';
import { LensGatedSDK } from '@lens-protocol/sdk-gated';
import type {
  AccessConditionOutput,
  CreatePublicPostRequest
} from '@lens-protocol/sdk-gated/dist/graphql/types';

import {
  ALLOWED_AUDIO_TYPES,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  APP_ID,
  APP_NAME,
  LENSHUB_PROXY,
  LIT_PROTOCOL_ENV,
  LIT_PROTOCOL_ENVIRONMENT
} from '@/constants';

import type {
  CreatePublicCommentRequest,
  MetadataAttributeInput,
  Profile,
  Publication,
  PublicationMetadataMediaInput,
  PublicationMetadataV2Input
} from '@/utils/lens/generated5';
import {
  CollectModules,
  PublicationDocument,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  ReferenceModules,
  useBroadcastDataAvailabilityMutation,
  useBroadcastMutation,
  useCreateCommentTypedDataMutation,
  useCreateCommentViaDispatcherMutation,
  useCreateDataAvailabilityCommentTypedDataMutation,
  useCreateDataAvailabilityCommentViaDispatcherMutation,
  useCreateDataAvailabilityPostTypedDataMutation,
  useCreateDataAvailabilityPostViaDispatcherMutation,
  useCreatePostTypedDataMutation,
  useCreatePostViaDispatcherMutation,
  usePublicationLazyQuery
} from '@/utils/lens/generatedLenster';
import { SuperfluidInflowsDocument } from '@/utils/lens/generated4';

import { $convertFromMarkdownString } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { $getRoot } from 'lexical';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { NewPublicationTypes, OptmisticPublicationType } from 'src/enums';

import { useAppStore } from 'src/store/app';
import { useCollectModuleStore } from 'src/store/collect-module';

import { usePublicationStore } from 'src/store/publication4';

import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { v4 as uuid } from 'uuid';
import { useContractWrite, usePublicClient, useSignTypedData } from 'wagmi';
import { superfluidClient } from '@/utils/lens/apollo';
import PollEditor from './Actions/PollSettings/PollEditor';

import Editor from './Editor';
import { useApolloClient } from '@apollo/client/react';
import { useGlobalModalStateStore } from '@/store/modals';

import { useAccessSettingsStore } from '@/store/access';
import useEthersWalletClient from '@/utils/hooks/useEthersWalletClient';
import { Errors } from '@/lib/errors';
import uploadToArweave from '@/lib/uploadToArweave';
import getTextNftUrl from '@/utils/functions/getTextNftUrl';
import getUserLocale from '@/lib/getUserLocale';
import getSignature from '@/lib/getSignature';
import { NewLensshareAttachment, InflowType } from '@/typesLenster';
import { ErrorMessage } from '../ErrorMessage';
import { Card } from '../UI/Card';
import { Spinner } from '../UI/Spinner';
import { Button } from '../UI/Button';
import withLexicalContext from '../Lexical/withLexicalContext';
import Attachments from './Attachments';
import Wrapper from '../Embed/Wrapper';
import { AudioPublicationSchema } from './Audio';
import collectModuleParams from '@/lib/collectModuleParams';
import { LENS_HUB_ABI } from '@/abi/abi';
import useCreatePoll from '@/lib/useCreatePoll';
import useCreateSpace from '@/lib/useCreateSpace';
import QuotedPublication from './QuotedPublication';
import {
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftIcon,
  MicrophoneIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { LensHub } from '@/abi/LensHub';
import { useNonceStore } from '@/store/nonce';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon
} from '@heroicons/react/20/solid';
import Discard from './Post/Discard';
import Dropdown from '../Spaces/Common/Dropdown';
import { Input } from '../UI/Input';
import { Icons } from '../Spaces/Common/assets/Icons';
import { useUnmountEffect } from 'framer-motion';
import { useSpacesStore } from '@/store/spaces';
import errorToast from './errorToast';
import { useTransactionPersistStore } from '@/store/transaction';
import { useReferenceModuleStore } from '@/store/reference-module';
import ScheduleSpacesMenu from './Actions/SpaceSettings/ScheduleSpacesMenu';
import dayjs from 'dayjs';

import cn from '@/components/UI/cn';
import EmojiPicker from './EmojiPicker';
import LivestreamEditor from './Actions/LivestreamSettings/LivestreamSettings/LivestreamEditor';

const Attachment = dynamic(
  () => import('@/components/Composer/Actions/Attachment'),
  {
    loading: () => <div className="shimmer mb-1 h-5 w-5 rounded-lg" />
  }
);
const Giphy = dynamic(() => import('@/components/Composer/Actions/Giphy'), {
  loading: () => <div className="shimmer mb-1 h-5 w-5 rounded-lg" />
});
const CollectSettings = dynamic(
  () => import('@/components/Composer/Actions/CollectSettings'),
  {
    loading: () => <div className="shimmer mb-1 h-5 w-5 rounded-lg" />
  }
);
const ReferenceSettings = dynamic(
  () => import('@/components/Composer/Actions/ReferenceSettings'),
  {
    loading: () => <div className="shimmer mb-1 h-5 w-5 rounded-lg" />
  }
);
const AccessSettings = dynamic(
  () => import('@/components/Composer/Actions/AccessSettings'),
  {
    loading: () => <div className="shimmer mb-1 h-5 w-5 rounded-lg" />
  }
);
const PollSettings = dynamic(
  () => import('@/components/Composer/Actions/PollSettings'),
  {
    loading: () => <div className="shimmer mb-1 h-5 w-5 rounded-lg" />
  }
);
const SpaceSettings = dynamic(
  () => import('@/components/Composer/Actions/SpaceSettings'),
  {
    loading: () => <div className="shimmer mb-1 h-5 w-5 rounded-lg" />
  }
);

const LivestreamSettings = dynamic(
  () =>
    import(
      '@/components/Composer/Actions/LivestreamSettings/LivestreamSettings'
    ),
  {
    loading: () => <div className="shimmer mb-1 h-5 w-5 rounded-lg" />
  }
);

interface NewPublicationProps {
  publication: Publication;
  profile: Profile;
}
const NewPublication: FC<NewPublicationProps> = ({ publication, profile }) => {
  const { push } = useRouter();
  const { cache } = useApolloClient();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  // Modal store

  const { setShowComposerModal, showComposerModal, modalPublicationType } =
    useGlobalModalStateStore();

  // Spaces store

  const setShowDiscardModal = useGlobalModalStateStore(
    (state) => state.setShowDiscardModal
  );

  // Nonce store
  const { userSigNonce, setUserSigNonce } = useNonceStore();

  // Publication store
  const {
    publicationContent,
    setPublicationContent,
    quotedPublication,
    setQuotedPublication,
    audioPublication,
    attachments,
    setAttachments,
    addAttachments,
    isUploading,
    videoThumbnail,
    setVideoThumbnail,
    videoDurationInSeconds,
    showPollEditor,
    setShowPollEditor,
    resetPollConfig,
    pollConfig,
    showLiveVideoEditor,
    setShowLiveVideoEditor,
    resetLiveVideoConfig,
    liveVideoConfig
  } = usePublicationStore();

  // Transaction persist store
  const { txnQueue, setTxnQueue } = useTransactionPersistStore(
    (state) => state
  );

  // Collect module store
  const { collectModule, reset: resetCollectSettings } = useCollectModuleStore(
    (state) => state
  );

  // Reference module store
  const { selectedReferenceModule, onlyFollowers, degreesOfSeparation } =
    useReferenceModuleStore();

  // Access module store
  const {
    restricted,
    followToView,
    collectToView,
    reset: resetAccessSettings
  } = useAccessSettingsStore((state) => state);

  const spacesStartTime = useSpacesStore((state) => state.spacesStartTime);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [publicationContentError, setPublicationContentError] = useState('');

  const [editor] = useLexicalComposerContext();
  const publicClient = usePublicClient();
  const { data: walletClient } = useEthersWalletClient();
  const [createPoll] = useCreatePoll();
  const [createSpace] = useCreateSpace();

  const isComment = Boolean(publication);
  const hasAudio = ALLOWED_AUDIO_TYPES.includes(
    attachments[0]?.original.mimeType
  );
  const hasVideo = ALLOWED_VIDEO_TYPES.includes(
    attachments[0]?.original.mimeType
  );
  const hasLiveVideo =
    showLiveVideoEditor && liveVideoConfig.playbackId.length > 0;

  // Dispatcher
  const canUseRelay = currentProfile?.dispatcher?.canUseRelay;
  const isSponsored = currentProfile?.dispatcher?.sponsor;

  const getButtonIcon = () => {
    switch (true) {
      case isLoading:
        return <Spinner size="xs" />;
      case isComment:
        return <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4" />;
      case showComposerModal &&
        modalPublicationType === NewPublicationTypes.Spaces:
        return <MicrophoneIcon className="h-4 w-4" />;
      default:
        return <PencilIcon className="h-4 w-4" />;
    }
  };

  const getButtonText = () => {
    switch (true) {
      case isComment:
        return `Comment`;
      case showComposerModal &&
        modalPublicationType === NewPublicationTypes.Spaces:
        return `Create Spaces`;
      default:
        return `Post`;
    }
  };

  const onCompleted = (__typename?: 'RelayError' | 'RelayerResult') => {
    if (__typename === 'RelayError') {
      return;
    }

    setIsLoading(false);
    editor.update(() => {
      $getRoot().clear();
    });
    setPublicationContent('');
    setQuotedPublication(null);
    setShowPollEditor(false);
    resetPollConfig();
    setShowLiveVideoEditor(false);
    resetLiveVideoConfig();
    setAttachments([]);
    setVideoThumbnail({
      url: '',
      type: '',
      uploading: false
    });
    resetCollectSettings();
    resetAccessSettings();
    if (!isComment) {
      setShowComposerModal(false, NewPublicationTypes.Publication);
    } else {
      setShowComposerModal(false, NewPublicationTypes.Spaces);
    }
    // Track in leafwatch
    const eventProperties = {
      publication_type: restricted ? 'token_gated' : 'public',
      publication_collect_module: collectModule.type,
      publication_reference_module: selectedReferenceModule,
      publication_reference_module_degrees_of_separation:
        selectedReferenceModule ===
        ReferenceModules.DegreesOfSeparationReferenceModule
          ? degreesOfSeparation
          : null,
      publication_has_attachments: attachments.length > 0,
      publication_attachment_types:
        attachments.length > 0
          ? attachments.map((attachment) => attachment.original.mimeType)
          : null,
      publication_has_poll: showPollEditor
    };
  };

  const onError = (error: any) => {
    setIsLoading(false);
    errorToast(error);
  };

  useUpdateEffect(() => {
    setPublicationContentError('');
  }, [audioPublication]);

  useEffectOnce(() => {
    editor.update(() => {
      $convertFromMarkdownString(publicationContent);
    });
  });

  const generateOptimisticPublication = ({
    txHash,
    txId
  }: {
    txHash?: string;
    txId?: string;
  }) => {
    return {
      id: uuid(),
      ...(isComment && { parent: publication.id }),
      type: isComment
        ? OptmisticPublicationType.NewComment
        : OptmisticPublicationType.NewPost,
      txHash,
      txId,
      content: publicationContent,
      attachments,
      title: audioPublication.title,
      cover: audioPublication.cover,
      author: audioPublication.author
    };
  };

  const { signTypedDataAsync } = useSignTypedData({
    onError
  });

  const { error, write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LensHub,
    functionName: isComment ? 'comment' : 'post',
    onSuccess: ({ hash }) => {
      onCompleted();
      setUserSigNonce(userSigNonce + 1);
      setTxnQueue([
        generateOptimisticPublication({ txHash: hash }),
        ...txnQueue
      ]);
    },
    onError: (error) => {
      onError(error);
      setUserSigNonce(userSigNonce - 1);
    }
  });

  const [broadcastDataAvailability] = useBroadcastDataAvailabilityMutation({
    onCompleted: (data) => {
      onCompleted();
      if (data?.broadcastDataAvailability.__typename === 'RelayError') {
        return toast.error(Errors.SomethingWentWrong);
      }

      if (
        data?.broadcastDataAvailability.__typename ===
        'CreateDataAvailabilityPublicationResult'
      ) {
        push(`/post/${data?.broadcastDataAvailability.id}`);
      }
    },
    onError
  });

  const [broadcast] = useBroadcastMutation({
    onCompleted: ({ broadcast }) => {
      onCompleted(broadcast.__typename);
      if (broadcast.__typename === 'RelayerResult') {
        setTxnQueue([
          generateOptimisticPublication({ txId: broadcast.txId }),
          ...txnQueue
        ]);
      }
    }
  });

  const [getPublication] = usePublicationLazyQuery({
    onCompleted: (data) => {
      if (data?.publication) {
        cache.modify({
          fields: {
            publications: () => {
              cache.writeQuery({
                data: { publication: data?.publication },
                query: PublicationDocument
              });
            }
          }
        });
      }
    }
  });

  const typedDataGenerator = async (
    generatedData: any,
    isDataAvailabilityPublication = false
  ) => {
    const { id, typedData } = generatedData;
    const signature = await signTypedDataAsync(getSignature(typedData));
    if (isDataAvailabilityPublication) {
      return await broadcastDataAvailability({
        variables: { request: { id, signature } }
      });
    }

    const { data } = await broadcast({
      variables: { request: { id, signature } }
    });
    if (data?.broadcast.__typename === 'RelayError') {
      return write({ args: [typedData.value] });
    }
  };

  // Normal typed data generation
  const [createCommentTypedData] = useCreateCommentTypedDataMutation({
    onCompleted: async ({ createCommentTypedData }) =>
      await typedDataGenerator(createCommentTypedData),
    onError
  });

  const [createPostTypedData] = useCreatePostTypedDataMutation({
    onCompleted: async ({ createPostTypedData }) =>
      await typedDataGenerator(createPostTypedData),
    onError
  });

  // Data availability typed data generation
  const [createDataAvailabilityPostTypedData] =
    useCreateDataAvailabilityPostTypedDataMutation({
      onCompleted: async ({ createDataAvailabilityPostTypedData }) =>
        await typedDataGenerator(createDataAvailabilityPostTypedData, true)
    });

  const [createDataAvailabilityCommentTypedData] =
    useCreateDataAvailabilityCommentTypedDataMutation({
      onCompleted: async ({ createDataAvailabilityCommentTypedData }) =>
        await typedDataGenerator(createDataAvailabilityCommentTypedData, true)
    });

  const [createCommentViaDispatcher] = useCreateCommentViaDispatcherMutation({
    onCompleted: ({ createCommentViaDispatcher }) => {
      onCompleted(createCommentViaDispatcher.__typename);
      if (createCommentViaDispatcher.__typename === 'RelayerResult') {
        setTxnQueue([
          generateOptimisticPublication({
            txId: createCommentViaDispatcher.txId
          }),
          ...txnQueue
        ]);
      }
    },
    onError
  });

  const [createPostViaDispatcher] = useCreatePostViaDispatcherMutation({
    onCompleted: ({ createPostViaDispatcher }) => {
      onCompleted(createPostViaDispatcher.__typename);
      if (createPostViaDispatcher.__typename === 'RelayerResult') {
        setTxnQueue([
          generateOptimisticPublication({ txId: createPostViaDispatcher.txId }),
          ...txnQueue
        ]);
      }
    },
    onError
  });

  const [createDataAvailabilityPostViaDispatcher] =
    useCreateDataAvailabilityPostViaDispatcherMutation({
      onCompleted: (data) => {
        if (
          data?.createDataAvailabilityPostViaDispatcher?.__typename ===
          'RelayError'
        ) {
          return;
        }

        if (
          data.createDataAvailabilityPostViaDispatcher.__typename ===
          'CreateDataAvailabilityPublicationResult'
        ) {
          onCompleted();
          const { id } = data.createDataAvailabilityPostViaDispatcher;
          push(`/post/${id}`);
        }
      },
      onError
    });

  const [createDataAvailabilityCommentViaDispatcher] =
    useCreateDataAvailabilityCommentViaDispatcherMutation({
      onCompleted: (data) => {
        if (
          data?.createDataAvailabilityCommentViaDispatcher?.__typename ===
          'RelayError'
        ) {
          return;
        }

        if (
          data.createDataAvailabilityCommentViaDispatcher.__typename ===
          'CreateDataAvailabilityPublicationResult'
        ) {
          onCompleted();
          const { id } = data.createDataAvailabilityCommentViaDispatcher;
          getPublication({ variables: { request: { publicationId: id } } });
        }
      },
      onError
    });

  const createViaDataAvailablityDispatcher = async (request: any) => {
    const variables = { request };

    if (isComment) {
      const { data } = await createDataAvailabilityCommentViaDispatcher({
        variables
      });

      if (
        data?.createDataAvailabilityCommentViaDispatcher?.__typename ===
        'RelayError'
      ) {
        await createDataAvailabilityCommentTypedData({ variables });
      }

      return;
    }

    const { data } = await createDataAvailabilityPostViaDispatcher({
      variables
    });

    if (
      data?.createDataAvailabilityPostViaDispatcher?.__typename === 'RelayError'
    ) {
      await createDataAvailabilityPostTypedData({ variables });
    }

    return;
  };

  const createViaDispatcher = async (request: any) => {
    const variables = {
      options: { overrideSigNonce: userSigNonce },
      request
    };

    if (isComment) {
      const { data } = await createCommentViaDispatcher({
        variables: { request }
      });
      if (data?.createCommentViaDispatcher?.__typename === 'RelayError') {
        return await createCommentTypedData({ variables });
      }

      return;
    }

    const { data } = await createPostViaDispatcher({ variables: { request } });
    if (data?.createPostViaDispatcher?.__typename === 'RelayError') {
      return await createPostTypedData({ variables });
    }

    return;
  };

  const getMainContentFocus = () => {
    if (attachments.length > 0) {
      if (hasAudio) {
        return PublicationMainFocus.Audio;
      } else if (
        ALLOWED_IMAGE_TYPES.includes(attachments[0]?.original.mimeType)
      ) {
        return PublicationMainFocus.Image;
      } else if (hasVideo) {
        return PublicationMainFocus.Video;
      } else {
        return PublicationMainFocus.TextOnly;
      }
    } else {
      if (hasLiveVideo) {
        return PublicationMainFocus.Video;
      }

      return PublicationMainFocus.TextOnly;
    }
  };

  const getAnimationUrl = () => {
    if (attachments.length > 0 && (hasAudio || hasVideo)) {
      return attachments[0]?.original.url;
    }

    return null;
  };

  const getAttachmentImage = () => {
    return hasAudio
      ? audioPublication.cover
      : hasVideo
      ? videoThumbnail.url
      : attachments[0]?.original.url;
  };

  const getAttachmentImageMimeType = () => {
    return hasAudio
      ? audioPublication.coverMimeType
      : attachments[0]?.original.mimeType;
  };

  const getTitlePrefix = () => {
    if (hasVideo) {
      return 'Video';
    }

    return isComment ? 'Comment' : 'Post';
  };

  const createTokenGatedMetadata = async (
    metadata: PublicationMetadataV2Input
  ) => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    if (!walletClient) {
      return toast.error(Errors.SignWallet);
    }

    // Create the SDK instance
    const tokenGatedSdk = await LensGatedSDK.create({
      provider: publicClient as any,
      signer: walletClient as any,
      env: LIT_PROTOCOL_ENVIRONMENT as LensEnvironment
    });

    // Connect to the SDK
    await tokenGatedSdk.connect({
      address: currentProfile.ownedBy,
      env: LIT_PROTOCOL_ENVIRONMENT as LensEnvironment
    });

    // Condition for gating the content
    const collectAccessCondition: CollectCondition = { thisPublication: true };
    const followAccessCondition: FollowCondition = {
      profileId: currentProfile?.id
    };

    // Create the access condition
    let accessCondition: AccessConditionOutput = {};
    if (collectToView && followToView) {
      accessCondition = {
        and: {
          criteria: [
            { collect: collectAccessCondition },
            { follow: followAccessCondition }
          ]
        }
      };
    } else if (collectToView) {
      accessCondition = { collect: collectAccessCondition };
    } else if (followToView) {
      accessCondition = { follow: followAccessCondition };
    }

    // Generate the encrypted metadata and upload it to Arweave
    const { contentURI } = await tokenGatedSdk.gated.encryptMetadata(
      metadata,
      currentProfile?.id,
      accessCondition,
      async (data: EncryptedMetadata) => {
        return await uploadToArweave(data);
      }
    );

    return contentURI;
  };

  const createMetadata = async (metadata: PublicationMetadataV2Input) => {
    return await uploadToArweave(metadata);
  };

  const createPublication = async () => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    if (isComment && publication.isDataAvailability && !isSponsored) {
      return toast.error(
        `Momoka is currently in beta - during this time certain actions are not available to all profiles.`
      );
    }

    try {
      setIsLoading(true);
      if (hasAudio) {
        setPublicationContentError('');
        const parsedData = AudioPublicationSchema.safeParse(audioPublication);
        if (!parsedData.success) {
          const issue = parsedData.error.issues[0];
          return setPublicationContentError(issue.message);
        }
      }

      if (publicationContent.length === 0 && attachments.length === 0) {
        return setPublicationContentError(
          `${isComment ? 'Comment' : 'Post'} should not be empty!`
        );
      }

      setPublicationContentError('');
      let textNftImageUrl = null;
      if (
        !attachments.length &&
        collectModule.type !== CollectModules.RevertCollectModule
      ) {
        textNftImageUrl = await getTextNftUrl(
          publicationContent,
          currentProfile.handle,
          new Date().toLocaleString()
        );
      }

      // Create Space in Huddle

      let spaceData = {
        success: false,
        response: {
          message: '',
          data: {
            roomId: ''
          }
        }
      };
      if (
        showComposerModal &&
        modalPublicationType === NewPublicationTypes.Spaces
      ) {
        spaceData = await createSpace();
      }
      const startTime = dayjs(spacesStartTime);
      const attributes: MetadataAttributeInput[] = [
        {
          traitType: 'type',
          displayType: PublicationMetadataDisplayTypes.String,
          value: getMainContentFocus()?.toLowerCase()
        },
        ...(showComposerModal &&
        spaceData &&
        modalPublicationType === NewPublicationTypes.Spaces
          ? [
              {
                traitType: 'audioSpace',
                displayType: PublicationMetadataDisplayTypes.String,
                value: JSON.stringify({
                  id: spaceData,
                  host: currentProfile.ownedBy,
                  startTime: startTime
                })
              }
            ]
          : []),
        ...(hasLiveVideo
          ? [
              {
                traitType: 'isLive',
                displayType: PublicationMetadataDisplayTypes.String,
                value: 'true'
              },
              {
                traitType: 'liveId',
                displayType: PublicationMetadataDisplayTypes.String,
                value: liveVideoConfig.id
              },
              {
                traitType: 'livePlaybackId',
                displayType: PublicationMetadataDisplayTypes.String,
                value: liveVideoConfig.playbackId
              }
            ]
          : []),
        ...(quotedPublication
          ? [
              {
                traitType: 'quotedPublicationId',
                displayType: PublicationMetadataDisplayTypes.String,
                value: quotedPublication.id
              }
            ]
          : []),
        ...(quotedPublication
          ? [
              {
                traitType: 'quotedPublicationId',
                displayType: PublicationMetadataDisplayTypes.String,
                value: quotedPublication.id
              }
            ]
          : []),
        ...(hasAudio
          ? [
              {
                traitType: 'author',
                displayType: PublicationMetadataDisplayTypes.String,
                value: audioPublication.author
              }
            ]
          : []),
        ...(hasVideo
          ? [
              {
                traitType: 'durationInSeconds',
                displayType: PublicationMetadataDisplayTypes.String,
                value: videoDurationInSeconds
              }
            ]
          : [])
      ];

      const attachmentsInput: PublicationMetadataMediaInput[] = hasLiveVideo
        ? [
            {
              item: `https://livepeercdn.studio/hls/${liveVideoConfig.playbackId}/index.m3u8`,
              type: 'video/mp4'
            }
          ]
        : attachments.map((attachment) => ({
            item: attachment.original.url,
            cover: getAttachmentImage(),
            type: attachment.original.mimeType,
            altTag: attachment.original.altTag
          }));

      let processedPublicationContent = publicationContent;

      if (showPollEditor) {
        processedPublicationContent = await createPoll();
      }
      const metadata: PublicationMetadataV2Input = {
        version: '2.0.0',
        metadata_id: uuid(),
        content: processedPublicationContent,
        external_url: `https://lenshareapp.xyz/u/${currentProfile?.id}`,
        image:
          attachmentsInput.length > 0 ? getAttachmentImage() : textNftImageUrl,
        imageMimeType:
          attachmentsInput.length > 0
            ? getAttachmentImageMimeType()
            : textNftImageUrl
            ? 'image/svg+xml'
            : null,
        name: hasAudio
          ? audioPublication.title
          : `${getTitlePrefix()} by @${currentProfile?.handle}`,
        animation_url: getAnimationUrl(),
        mainContentFocus: getMainContentFocus(),
        attributes,
        media: attachmentsInput,
        locale: getUserLocale(),
        appId: APP_ID
      };

      const isRevertCollectModule =
        collectModule.type === CollectModules.RevertCollectModule;
      const useDataAvailability =
        !restricted &&
        (isComment
          ? publication.isDataAvailability && isRevertCollectModule
          : isRevertCollectModule);

      let arweaveId = null;
      if (restricted) {
        arweaveId = await createTokenGatedMetadata(metadata);
      } else {
        arweaveId = await createMetadata(metadata);
      }

      // Payload for the post/comment
      const request: CreatePublicPostRequest | CreatePublicCommentRequest = {
        profileId: currentProfile?.id,
        contentURI: `ar://${arweaveId}`,
        ...(isComment && {
          publicationId:
            publication.__typename === 'Mirror'
              ? publication?.mirrorOf?.id
              : publication?.id
        }),
        collectModule: collectModuleParams(collectModule, currentProfile),
        referenceModule:
          selectedReferenceModule ===
          ReferenceModules.FollowerOnlyReferenceModule
            ? { followerOnlyReferenceModule: onlyFollowers ? true : false }
            : {
                degreesOfSeparationReferenceModule: {
                  commentsRestricted: true,
                  mirrorsRestricted: true,
                  degreesOfSeparation
                }
              }
      };

      // Payload for the data availability post/comment
      const dataAvailablityRequest = {
        from: currentProfile?.id,
        ...(isComment && {
          commentOn:
            publication.__typename === 'Mirror'
              ? publication?.mirrorOf?.id
              : publication?.id
        }),
        contentURI: `ar://${arweaveId}`
      };

      if (canUseRelay) {
        if (useDataAvailability && isSponsored) {
          return await createViaDataAvailablityDispatcher(
            dataAvailablityRequest
          );
        }

        return await createViaDispatcher(request);
      }

      if (isComment) {
        return await createCommentTypedData({
          variables: {
            options: { overrideSigNonce: userSigNonce },
            request: request as CreatePublicCommentRequest
          }
        });
      }

      return await createPostTypedData({
        variables: { options: { overrideSigNonce: userSigNonce }, request }
      });
    } catch (error) {
      onError(error);
    }
  };

  const setGifAttachment = (gif: IGif) => {
    const attachment: NewLensshareAttachment = {
      id: uuid(),
      previewItem: gif.images.original.url,
      original: {
        url: gif.images.original.url,
        mimeType: 'image/gif',
        altTag: gif.title
      }
    };
    addAttachments([attachment]);
  };

  const isSubmitDisabledByPoll = showPollEditor
    ? !pollConfig.choices.length ||
      pollConfig.choices.some((choice) => !choice.length)
    : false;

  const onDiscardClick = () => {
    setShowComposerModal(false, NewPublicationTypes.Publication);
    setShowDiscardModal(false);
  };

  useUnmountEffect(() => {
    setPublicationContent('');
    setShowPollEditor(false);
    resetPollConfig();
    setAttachments([]);
    setVideoThumbnail({
      url: '',
      type: '',
      uploading: false
    });
    resetCollectSettings();
    resetAccessSettings();
  });

  return (
    <Card
      onClick={() => setShowEmojiPicker(false)}
      className={cn(
        { '!rounded-b-xl !rounded-t-none border-none': !isComment },
        'pb-3'
      )}
    >
      {error ? (
        <ErrorMessage
          className="!rounded-none"
          title={`Transaction failed!`}
          error={error}
        />
      ) : null}
      <Editor />
      {publicationContentError && (
        <div className="mt-1 px-5 pb-3 text-sm font-bold text-red-500">
          {publicationContentError}
        </div>
      )}
      {showPollEditor ? <PollEditor /> : null}
      {showLiveVideoEditor ? <LivestreamEditor /> : null}
      {quotedPublication ? (
        <Wrapper className="m-5" zeroPadding>
          <QuotedPublication
            profile={profile}
            publication={quotedPublication}
            isNew
          />
        </Wrapper>
      ) : null}
      <div className="block  items-center p-1 px-5 sm:flex">
        <div className=" right-2 lg:block ">
          <div className=" pb-2 pr-2 sm:pt-0">
            <Button
              disabled={
                isLoading ||
                isUploading ||
                isSubmitDisabledByPoll ||
                videoThumbnail.uploading
              }
              icon={getButtonIcon()}
              onClick={createPublication}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
        {showComposerModal &&
        modalPublicationType === NewPublicationTypes.Spaces ? (
          <SpaceSettings />
        ) : (
          <div className="flex items-center space-x-4">
            <Attachment />

            <Giphy setGifAttachment={(gif: IGif) => setGifAttachment(gif)} />
            {!publication?.isDataAvailability && (
              <>
                <CollectSettings />
                <ReferenceSettings />
                <AccessSettings />
              </>
            )}
            <PollSettings />
            <LivestreamSettings />
          </div>
        )}
      </div>
      <div className="px-5">
        <Attachments attachments={attachments} isNew />
      </div>
      <Discard onDiscard={onDiscardClick} />
    </Card>
  );
};

export default withLexicalContext(NewPublication);
