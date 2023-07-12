import { logger } from '@/utils/functions/logger';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  views?: number;
  success: boolean;
};

const views = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST' || !req.body) {
    return res.status(400).json({ success: false });
  }
  try {
    const payload = req.body;
    const headers = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY!}`
      }
    };
    const { data } = await axios.get(
      `https://livepeer.studio/api/asset?sourceUrl=${payload.sourceUrl}&phase=ready`,
      headers
    );
    if (data && data?.length) {
      const { data: views } = await axios.get(
        `https://livepeer.studio/api/data/views/${
          data[data.length - 1].id
        }/total`,
        headers
      );
      if (!views || !views?.length) {
        return res.status(200).json({ success: false });
      }
      return res.setHeader('Cache-Control', 's-maxage=100').status(200).json({
        success: true,
        views: views[0].startViews
      });
    }
    return res.status(200).json({ success: false });
  } catch (error) {
    logger.error('[API Error Video Views]', error);
    return res.status(200).json({ success: false });
  }
};

export default views;
