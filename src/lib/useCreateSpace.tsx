
import axios from 'axios';
import { useSpacesStore } from 'src/store/spaces';
import getBasicWorkerPayload from './getBasicWorkerPayload';
import { SPACES_WORKER_URL } from '@/constants';

type CreateSpaceResponse = {
  success: boolean;
  response: {
    message: string;
    data: {
      roomId: string;
    };
  };
};

const useCreateSpace = (): [createPoll: () => Promise<CreateSpaceResponse>] => {
  const {
    isTokenGated,
    tokenGateConditionType,
    tokenGateConditionValue,
    spacesStartTime
  } = useSpacesStore();
  let payload = {};
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedTime = new Date(
    spacesStartTime.toLocaleString('en-US', { timeZone: userTimezone })
  );
  const startTime = formattedTime.toISOString();
  const createSpace = async (): Promise<CreateSpaceResponse> => {
    if (isTokenGated) {
      payload = {
        ...getBasicWorkerPayload(),
        conditionType: tokenGateConditionType,
        conditionValue: tokenGateConditionValue,
        isTokenGated: isTokenGated,
        startTime: startTime
      };
    } else {
      payload = {
        ...getBasicWorkerPayload(),
        startTime: startTime
      };
    }
    try {
      const response = await axios.post(`${SPACES_WORKER_URL}/createSpace`,{
        data: payload,
       
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return [createSpace];
};

export default useCreateSpace;
