import { IPFS_GATEWAY, POLYGONSCAN_URL } from '@/constants';
import { Publication } from '@/utils/lens/generatedLenster';
import { LinkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { FC } from 'react';
import { Card } from '../UI/Card';

interface MetaProps {
  name: string;
  uri: string;
  hash: string;
}

const Meta: FC<MetaProps> = ({ name, uri, hash }) => (
  <div className="px-5 py-3">
    <Link
      href={uri}
      className="space-y-1"
      target="_blank"
      rel="noreferrer noopener"
    >
      <div className="flex  items-center space-x-1">
        <div className="text-[10px]">{name}</div>
        <LinkIcon className="h-4 w-4" />
      </div>
      <div className="truncate text-xs">{hash}</div>
    </Link>
  </div>
);

interface OnchainMetaProps {
  publication: Publication;
}

const OnchainMeta: FC<OnchainMetaProps> = ({ publication }) => {
  const hash =
    publication?.__typename === 'Mirror'
      ? publication.mirrorOf.onChainContentURI?.split('/').pop()
      : publication.onChainContentURI?.split('/').pop();
  const collectNftAddress =
    publication?.__typename === 'Mirror'
      ? publication.mirrorOf?.collectNftAddress
      : publication?.collectNftAddress;
  const isArweaveHash = hash?.length === 43;
  const isIPFSHash = hash?.length === 46 || hash?.length === 59;

  if (!isArweaveHash && !isIPFSHash && !collectNftAddress) {
    return null;
  }

  return (
    <Card as="aside" className="rounded-xl " dataTestId="onchain-meta">
      <div className="lt-text-gray-500 divide-y rounded-xl border border-blue-700 bg-[#F2F6F9] dark:divide-blue-700 dark:bg-black">
        {isArweaveHash ? (
          <Meta
            name={`ARWEAVE TRANSACTION`}
            uri={`https://arweave.app/tx/${hash}`}
            hash={hash}
          />
        ) : null}
        {publication?.isDataAvailability ? (
          <Meta
            name={`MOMOKA PROOF`}
            uri={`https://momoka.lens.xyz/tx/${publication.dataAvailabilityProofs
              ?.split('/')
              .pop()}`}
            hash={
              publication.dataAvailabilityProofs?.split('/').pop() as string
            }
          />
        ) : null}
        {isIPFSHash ? (
          <Meta
            name="IPFS TRANSACTION"
            uri={`${IPFS_GATEWAY}${hash}`}
            hash={hash}
          />
        ) : null}
        {collectNftAddress ? (
          <Meta
            name={`NFT ADDRESS`}
            uri={`${POLYGONSCAN_URL}/token/${collectNftAddress}`}
            hash={collectNftAddress}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default OnchainMeta;
