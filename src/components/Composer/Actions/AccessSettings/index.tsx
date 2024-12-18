import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useState } from 'react';

import BasicSettings from './BasicSettings';
import { useAccessSettingsStore } from '@/store/access';
import { Tooltip } from '@/components/UI/Tooltip';
import { Modal } from '@/components/UI/Modal';
import HelpTooltip from '@/components/UI/HelpTooltip';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import cn from '@/components/UI/cn';

const AccessSettings: FC = () => {
  const restricted = useAccessSettingsStore((state) => state.restricted);
  const hasConditions = useAccessSettingsStore((state) => state.hasConditions);
  const reset = useAccessSettingsStore((state) => state.reset);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Tooltip placement="top" content={`Access`}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={() => setShowModal(!showModal)}
          aria-label="Access"
        >
          <LockClosedIcon
            className={cn(
              restricted ? 'text-green-500' : 'text-brand',
              'h-5 w-5'
            )}
          />
        </motion.button>
      </Tooltip>
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <span>Access settings</span>
            <HelpTooltip
              children={`Add restrictions on who can view your content, and who can't. For instance - token gate your posts on the condition of owning specific NFTs or tokens.`}
            />
          </div>
        }
        icon={<LockClosedIcon className="text-brand h-5 w-5" />}
        show={showModal}
        onClose={() => {
          setShowModal(false);
          if (!hasConditions()) {
            reset();
          }
        }}
      >
        <BasicSettings setShowModal={setShowModal} />
      </Modal>
    </>
  );
};

export default AccessSettings;
