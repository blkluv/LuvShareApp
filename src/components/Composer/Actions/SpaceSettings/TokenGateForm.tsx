
import Search from '@/components/Search/Search';
import { Input } from '@/components/UI/Input';
import MenuTransition from '@/components/UI/MenuTransition';
import { Toggle } from '@/components/UI/Toggle';
import { Profile } from '@/utils/lens/generatedLenster';
import { Menu } from '@headlessui/react';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';



import clsx from 'clsx';
import type { Dispatch, FC, SetStateAction } from 'react';
import React from 'react';
import { TokenGateCondition } from 'src/enums';
import { useSpacesStore } from 'src/store/spaces';

interface TokenGateFormProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const TokenGateForm: FC<TokenGateFormProps> = ({ setShowModal }) => {
  const {
    isTokenGated,
    setIsTokenGated,
    setTokenGateConditionType,
    tokenGateConditionType,
    setTokenGateConditionValue,
    tokenGateConditionValue
  } = useSpacesStore();

  interface ModuleProps {
    title: string;
    onClick: () => void;
    condition: TokenGateCondition;
  }

  const getTokenGateConditionDescription = (
    tokenGateConditionType: TokenGateCondition
  ) => {
    switch (tokenGateConditionType) {
      case TokenGateCondition.HAVE_A_LENS_PROFILE:
        return `have a lens profile`;
      case TokenGateCondition.FOLLOW_A_LENS_PROFILE:
        return `follow a lens profile`;
      case TokenGateCondition.COLLECT_A_POST:
        return `collect a post`;
      case TokenGateCondition.MIRROR_A_POST:
        return `mirror a post`;
    }
  };

  const onProfileSelected = (profile: Profile) => {
    setTokenGateConditionValue(profile.id);
    setShowModal(false);
  };

  const Module: FC<ModuleProps> = ({ title, onClick, condition }) => (
    <Menu.Item
      as="button"
      className={clsx(
        { 'dropdown-active': tokenGateConditionType === condition },
        'menu-item w-[11rem]'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-1.5">
          <div>{title}</div>
        </div>
        {tokenGateConditionType === condition ? (
          <CheckCircleIcon className="w-5 text-green-500" />
        ) : null}
      </div>
    </Menu.Item>
  );

  return (
    <div>
      {tokenGateConditionType !== TokenGateCondition.HAVE_A_LENS_PROFILE && (
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex items-center gap-3 text-neutral-500">
            {tokenGateConditionType === TokenGateCondition.FOLLOW_A_LENS_PROFILE
              ? `Enter Lens profile`
              : `Enter Lens post link`}
          </div>
          <div className="flex flex-[1_0_0] items-center gap-1 px-3">
            {tokenGateConditionType !==
            TokenGateCondition.FOLLOW_A_LENS_PROFILE ? (
              <Input
                placeholder={`Lens post link`}
                value={tokenGateConditionValue}
                onChange={(e) => setTokenGateConditionValue(e.target.value)}
                className="placeholder-neutral-400"
              />
            ) : (
              <Search
                modalWidthClassName="max-w-xs"
                placeholder={`Search for lens profile...`}
                onProfileSelected={onProfileSelected}
              />
            )}
          </div>
        </div>
      )}
      <div className="block w-fit items-center p-4 sm:flex">
        <div className="flex flex-[0_0_1] gap-2 space-x-1">
          <div>
            <Toggle
              on={isTokenGated}
              setOn={() => setIsTokenGated(!isTokenGated)}
            />
          </div>
          <div className="flex items-start gap-1">
            <div className="flex flex-col items-start text-sm text-neutral-400 dark:text-neutral-500">
              Token gate with
            </div>
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-start gap-1">
                <span className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-300">
                  {getTokenGateConditionDescription(tokenGateConditionType)}
                  <ChevronDownIcon className="h-4 w-4 items-center justify-center" />
                </span>
              </Menu.Button>
              <MenuTransition>
                <Menu.Items className="absolute right-0 mt-2 w-[12rem] origin-top-right rounded-lg border bg-white text-sm shadow-lg focus:outline-none dark:border-gray-700 dark:bg-gray-900">
                  <Module
                    title="have a lens profile"
                    onClick={() =>
                      setTokenGateConditionType(
                        TokenGateCondition.HAVE_A_LENS_PROFILE
                      )
                    }
                    condition={TokenGateCondition.HAVE_A_LENS_PROFILE}
                  />

                  <Module
                    title="follow a lens profile"
                    onClick={() =>
                      setTokenGateConditionType(
                        TokenGateCondition.FOLLOW_A_LENS_PROFILE
                      )
                    }
                    condition={TokenGateCondition.FOLLOW_A_LENS_PROFILE}
                  />

                  <Module
                    title="collect a post"
                    onClick={() =>
                      setTokenGateConditionType(
                        TokenGateCondition.COLLECT_A_POST
                      )
                    }
                    condition={TokenGateCondition.COLLECT_A_POST}
                  />

                  <Module
                    title="mirror a post"
                    onClick={() =>
                      setTokenGateConditionType(
                        TokenGateCondition.MIRROR_A_POST
                      )
                    }
                    condition={TokenGateCondition.MIRROR_A_POST}
                  />
                </Menu.Items>
              </MenuTransition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenGateForm;
