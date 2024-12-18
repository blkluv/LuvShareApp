import type { FC } from 'react';
import { useAppStore } from 'src/store/app';

import Choices from './Choices';
import Header from './Header';
import Wrapper from '@/components/Embed/Wrapper';
import { Spinner } from '@/components/UI/Spinner';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { Proposal, Vote, useProposalQuery } from '@/utils/snapshot/generated';
import { snapshotApolloClient } from '@/utils/snapshot/apollo';
import { LENSTER_POLLS_SPACE } from '@/constants';

interface SnapshotProps {
  proposalId: string;
}

const Snapshot: FC<SnapshotProps> = ({ proposalId }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const { data, loading, error, refetch } = useProposalQuery({
    client: snapshotApolloClient,
    variables: {
      id: proposalId,
      where: { proposal: proposalId, voter: currentProfile?.ownedBy }
    }
  });

  if (loading) {
    // TODO: Add skeleton loader here
    return (
      <Wrapper>
        <div className="flex items-center justify-center">
          <Spinner size="xs" />
        </div>
      </Wrapper>
    );
  }

  if (!data?.proposal || error) {
    return null;
  }

  const { proposal, votes } = data;
  const isLensterPoll = proposal?.space?.id === LENSTER_POLLS_SPACE;

  if (!proposal) {
    return null;
  }

  if (isLensterPoll) {
    return (
      <span
        onClick={stopEventPropagation}
        data-testid={`poll-${proposal.id}`}
        aria-hidden="true"
      >
        <Choices
          proposal={proposal as Proposal}
          votes={votes as Vote[]}
          isLensterPoll={isLensterPoll}
          refetch={refetch}
        />
      </span>
    );
  }

  return (
    <Wrapper dataTestId={`snapshot-${proposal.id}`}>
      <div className="font-poppins text-xs">
        {' '}
        <div>
          <Header proposal={proposal as Proposal} />
        </div>
        <Choices
          proposal={proposal as Proposal}
          votes={votes as Vote[]}
          refetch={refetch}
        />
      </div>
    </Wrapper>
  );
};

export default Snapshot;
