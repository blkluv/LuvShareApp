import { useSpacesStore } from "@/store/spaces";
import { SpaceMetadata } from "@/typesLenster";

import getPublicationAttribute from "@/utils/lib/getPublicationAttribute";
import { getLensAccessToken, getLensMessage } from "@huddle01/auth";
import { FC } from "react";
import { useAccount, useSignMessage } from "wagmi";
import Wrapper from "../Wrapper";
import clsx from 'clsx';
import { Spinner } from "@/components/UI/Spinner";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/UI/Button";
import SmallUserProfile from "@/components/SmallUserProfile";
import { Profile, Publication, useProfilesQuery } from "@/utils/lens/generatedLenster";
import { Icons } from "@/components/Spaces2/Common/assets/Icons";
import { useRouter } from "next/router";
import { useLobby, useRoom } from "@huddle01/react/hooks";




  interface SpaceProps {
    publication: Publication;
  }
  
  const Space: FC<SpaceProps> = ({ publication }) => {
    const { address } = useAccount();
    const { metadata } = publication;
  
    const { setShowSpacesLobby, setLensAccessToken, lensAccessToken, setSpace } =
      useSpacesStore();
  
    const space: SpaceMetadata = JSON.parse(
      getPublicationAttribute(metadata.attributes, 'audioSpace')
    );
  
    const { signMessage, isLoading: signing } = useSignMessage({
      onSuccess: async (data) => {
        const token = await getLensAccessToken(data, address as string);
        if (token.accessToken) {
          setShowSpacesLobby(true);
          setLensAccessToken(token.accessToken);
          setSpace({
            ...space,
            title: metadata.content
          });
        }
      }
    });
  
    const { data, loading } = useProfilesQuery({
      variables: {
        request: { ownedBy: [space.host] }
      }
    });
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    const hostProfile = data?.profiles?.items?.find(
      (profile) => profile?.ownedBy === space.host
    ) as Profile;
  
    const calculateRemainingTime = () => {
      const now = new Date();
      const targetTime = new Date(space.startTime);
      const timeDifference = targetTime.getTime() - now.getTime();
      if (timeDifference <= 0) {
        return 'Start Listening';
      }
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
  
      let result = 'Starts in ';
      if (hours > 0) {
        result += `${hours} hour `;
      }
  
      if (minutes > 0) {
        result += `${minutes} minutes`;
      }
  
      if (hours === 0 && minutes === 0) {
        result = 'Start Listening';
      }
  
      return result;
    };
  
    return (
      <Wrapper className="!bg-brand-500/30 border-brand-400 mt-0 !p-3">
        <SmallUserProfile profile={hostProfile} smallAvatar />
        <div className="mt-2 space-y-3">
          <b className="text-lg">{metadata.content}</b>
          <Button
            className={clsx(
              '!md:pointer-events-none !mt-4 flex w-full justify-center',
              calculateRemainingTime() !== 'Start Listening'
                ? 'pointer-events-none'
                : 'pointer-events-auto'
            )}
            disabled={signing}
            icon={
              signing ? (
                <Spinner size="xs" className="mr-1" />
              ) : calculateRemainingTime() !== 'Start Listening' ? (
                <div className="flex h-5 w-5 items-center justify-center">
                  {Icons.timer}
                </div>
              ) : (
                <MicrophoneIcon className="h-5 w-5" />
              )
            }
            onClick={async () => {
              if (lensAccessToken) {
                setShowSpacesLobby(true);
                setSpace({
                  ...space,
                  title: metadata.content
                });
                return;
              }
              const msg = await getLensMessage(address as string);
              signMessage({ message: msg.message });
            }}
          >
            <div className="hidden md:block"> {calculateRemainingTime()} </div>
            <div className="md:hidden"> Spaces will open in desktop only </div>
          </Button>
        </div>
      </Wrapper>
    );
  };
  
  export default Space;
  