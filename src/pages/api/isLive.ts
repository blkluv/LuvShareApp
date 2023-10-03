import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type IsLiveResponse = {
  roomId: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse, spaceId: string) => {
  try {
    const huddleResponse = await axios.get(
      `http://api.huddle01.com/api/v1/live-meeting?roomId=${spaceId}`,
      {
        method: 'GET',
        
   
    
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'R9CTyoxx4nupRkFs5qgsdkBYbdY6JZH8' || '',
        'Access-Control-Allow-Origin': '*',
      }}
    );

    const isLiveResponse: IsLiveResponse = huddleResponse.data;

    res.status(200).json({
      success: true,
      isLive: isLiveResponse.roomId === spaceId
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;