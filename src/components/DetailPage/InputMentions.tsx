import cn from '@/components/UI/cn';
import type { Profile } from '@/utils/lens/generatedLenster';
import {
  SearchRequestTypes,
  useSearchProfilesLazyQuery
} from '@/utils/lens/generatedLenster';
import type { ComponentProps, FC } from 'react';
import React, { useId } from 'react';
import type { SuggestionDataItem } from 'react-mentions';
import { Mention, MentionsInput } from 'react-mentions';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import { formatNumber } from '@/utils/functions/formatNumber';
import { LENS_CUSTOM_FILTERS } from '@/constants';

interface Props extends ComponentProps<'textarea'> {
  label?: string;
  type?: string;
  className?: string;
  validationError?: string;
  value: string;
  onContentChange: (value: string) => void;
  mentionsSelector: string;
}

const InputMentions: FC<Props> = ({
  label,
  validationError,
  value,
  onContentChange,
  mentionsSelector,
  ...props
}) => {
  const id = useId();
  const [searchChannels] = useSearchProfilesLazyQuery();

  const fetchSuggestions = async (
    query: string,
    callback: (data: SuggestionDataItem[]) => void
  ) => {
    if (!query) {
      return;
    }
    try {
      const { data } = await searchChannels({
        variables: {
          request: {
            type: SearchRequestTypes.Profile,
            query,
            limit: 5,
            customFilters: LENS_CUSTOM_FILTERS
          }
        }
      });
      if (data?.search.__typename === 'ProfileSearchResult') {
        const profiles = data?.search?.items as Profile[];
        const channels = profiles?.map((channel: Profile) => ({
          id: channel.handle,
          display: channel.handle,
          profileId: channel.id,
          picture: getProfilePicture(channel),
          followers: channel.stats.totalFollowers
        }));
        callback(channels);
      }
    } catch {
      callback([]);
    }
  };

  return (
    <label className="w-full" htmlFor={id}>
      {label && (
        <div className="mb-1 flex items-center space-x-1.5">
          <div className="text-[13px] font-semibold uppercase opacity-70">
            {label}
          </div>
        </div>
      )}
      <div className="flex">
        <MentionsInput
          id={id}
          className={mentionsSelector}
          value={value}
          placeholder={props.placeholder}
          onChange={(e) => onContentChange(e.target.value)}
        >
          <Mention
            trigger="@"
            displayTransform={(handle) => `@${handle} `}
            markup=" @__id__ "
            appendSpaceOnAdd
            renderSuggestion={(
              suggestion: SuggestionDataItem & {
                picture?: string;
                followers?: number;
                profileId?: string;
              },
              _search,
              _highlightedDisplay,
              _index,
              focused
            ) => (
              <div
                className={cn('flex space-x-1.5 truncate px-1.5 py-1.5', {
                  'dark:bg-theme rounded bg-green-50': focused
                })}
              >
                <img
                  src={suggestion?.picture}
                  className="mt-1 h-6 w-6 rounded-full"
                  alt="pfp"
                  draggable={false}
                />
                <div className="overflow-hidden">
                  <div className="flex items-center space-x-0.5">
                    <p className="truncate font-medium leading-4">
                      {suggestion?.id}
                    </p>
                  </div>
                  {suggestion?.followers && (
                    <span className="text-xs opacity-80">
                      {formatNumber(suggestion?.followers)} followers
                    </span>
                  )}
                </div>
              </div>
            )}
            data={fetchSuggestions}
          />
        </MentionsInput>
      </div>
      {validationError && (
        <div className="mx-1 mt-1 text-xs font-medium text-red-500">
          {validationError}
        </div>
      )}
    </label>
  );
};

export default InputMentions;
