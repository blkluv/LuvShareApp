import { S3 } from '@aws-sdk/client-s3';
import {
  EVER_BUCKET_NAME,
  EVER_ENDPOINT,
  S3_BUCKET,
  STS_GENERATOR_WORKER_URL
} from '@/constants';
import axios from 'axios';

import { v4 as uuid } from 'uuid';
import { MediaSetWithoutOnChain } from '@/types/misc';

const FALLBACK_TYPE = 'image/jpeg';

/**
 * Returns an S3 client with temporary credentials obtained from the STS service.
 *
 * @returns S3 client instance.
 */
const getS3Client = async (): Promise<S3> => {
  const token = await axios.get(STS_GENERATOR_WORKER_URL);
  const client = new S3({
    endpoint: EVER_ENDPOINT,
    credentials: {
      accessKeyId: token.data?.accessKeyId,
      secretAccessKey: token.data?.secretAccessKey,
      sessionToken: token.data?.sessionToken
    },
    region: 'us-west-2',
    maxAttempts: 3
  });

  client.middlewareStack.addRelativeTo(
    (next: Function) => async (args: any) => {
      const { response } = await next(args);
      if (response.body === null) {
        response.body = new Uint8Array();
      }
      return { response };
    },
    {
      name: 'nullFetchResponseBodyMiddleware',
      toMiddleware: 'deserializerMiddleware',
      relation: 'after',
      override: true
    }
  );

  return client;
};

/**
 * Uploads a set of files to the IPFS network via S3 and returns an array of MediaSet objects.
 *
 * @param data Files to upload to IPFS.
 * @returns Array of MediaSet objects.
 */
const uploadToIPFS = async (data: any): Promise<MediaSetWithoutOnChain[]> => {
  try {
    const files = Array.from(data);
    const client = await getS3Client();
    const attachments = await Promise.all(
      files.map(async (_: any, i: number) => {
        const file = data[i];
        const params = {
          Bucket: S3_BUCKET.LENSSHARE,
          Key: uuid()
        };
        await client.putObject({
          ...params,
          Body: file,
          ContentType: file.type
        });
        const result = await client.headObject(params);
        const metadata = result.Metadata;

        return {
          original: {
            url: `ipfs://${metadata?.['ipfs-hash']}`,
            mimeType: file.type || FALLBACK_TYPE
          }
        };
      })
    );

    return attachments;
  } catch (error) {
    return [];
  }
};

/**
 * Uploads a file to the IPFS network via S3 and returns a MediaSet object.
 *
 * @param file File to upload to IPFS.
 * @returns MediaSet object or null if the upload fails.
 */
export const uploadFileToIPFS = async (
  file: File
): Promise<MediaSetWithoutOnChain> => {
  try {
    const ipfsResponse = await uploadToIPFS([file]);
    const metadata = ipfsResponse[0];

    return {
      original: {
        url: metadata.original.url,
        mimeType: file.type || FALLBACK_TYPE
      }
    };
  } catch (error) {
    console.error('Failed to upload file to IPFS', error);
    return { original: { url: '', mimeType: file.type || FALLBACK_TYPE } };
  }
};

export default uploadToIPFS;
