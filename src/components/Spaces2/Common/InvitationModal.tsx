
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';
import type { FC } from 'react';

interface InvitationModalProps {
  title: string;
  description: string;
  onAccept: () => void;
  onClose: () => void;
}

const InvitationModal: FC<InvitationModalProps> = ({
  title,
  description,
  onAccept,
  onClose
}) => {
  return (
    <div className="absolute z-30 flex items-center justify-center px-2 py-2">
      <div className="inline-flex max-w-screen-xl items-start justify-start gap-2 rounded-xl border border-neutral-400 bg-neutral-50 px-2.5 py-4 dark:border-neutral-500 dark:bg-neutral-800">
        <InformationCircleIcon className="relative h-5 w-5 text-neutral-500 dark:text-neutral-200" />
        <div className="inline-flex flex-col items-start justify-start gap-1">
          <div className="text-sm font-semibold text-neutral-600 dark:text-neutral-200">
            {title}
          </div>
          <div className="text-sm font-normal text-neutral-500 dark:text-neutral-300">
            {description}
          </div>
          <div className="mt-2 inline-flex items-start justify-start gap-2">
            <button
              className="flex items-center justify-center rounded-md border border-violet-500 bg-violet-500 px-2 py-1 text-sm text-neutral-50"
              onClick={onAccept}
            >
              Accept
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-md border border-red-300 bg-red-400 bg-opacity-20 px-2 py-1 text-sm text-red-400"
              onClick={onClose}
            >
              Deny
            </button>
          </div>
        </div>
        <XCircleIcon className="relative h-5 w-5" />
      </div>
    </div>
  );
};
export default InvitationModal;