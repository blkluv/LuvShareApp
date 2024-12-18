import {
  APP_INFOPAGE,
  APP_NAME,
  LENSSHARE_API_URL,
  LENSSHARE_EMBED_URL,
  LENSSHARE_TWITTER_HANDLE,
  LENSTOK_URL,
  STATIC_ASSETS_URL
} from '@/constants';

type Args = {
  title: string;
  description: string;
  image: string;
  page?: 'PROFILE' | 'VIDEO';
  handle?: string;
  pubId?: string;
  id?: string;
};

const getMetaTags = ({ title, description, image, page, id, pubId }: Args) => {
  const isVideo = page === 'VIDEO';
  const meta = {
    title: `${title} • LensShare` ?? APP_NAME,
    description: description || APP_INFOPAGE,
    image: image ?? `${STATIC_ASSETS_URL}/images/icon.png`,
    url: isVideo ? `${LENSTOK_URL}/${pubId}` : `${LENSTOK_URL}/u/${id}`
  };

  let defaultMeta = `<title>${meta.title}</title>
              <meta charset="UTF-8" />
              <meta content="${meta.description}" name="description" />
              <meta name="robots" content="follow, index" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" viewport-fit=cover />
              <meta property="og:url" content="${meta.url}" />
              <meta property="og:site_name" content="${APP_NAME}" />
              <meta property="og:description" content="${meta.description}" />
              <meta property="og:title" content="${meta.title}" />
              <meta property="og:image" content="${meta.image}" />
              <meta property="og:image:width" content="${
                isVideo ? 480 : 400
              }" />
              <meta property="og:image:height" content="${
                isVideo ? 360 : 400
              }" />
              <meta property="twitter:image:width" content="${
                isVideo ? 480 : 400
              }" />
              <meta property="twitter:image:height" content="${
                isVideo ? 360 : 400
              }" />
              <meta name="twitter:site" content="@${LENSSHARE_TWITTER_HANDLE}" />
              <meta name="twitter:title" content="${meta.title}" />
              <meta name="twitter:description" content="${meta.description}" />
              <meta property="twitter:image" content="${meta.image}" />
              <meta property="twitter:creator" content="${LENSSHARE_TWITTER_HANDLE}" />
              <meta name="twitter:card" content="${
                isVideo ? 'player' : 'summary'
              }" />`;

  if (isVideo) {
    const embedUrl = `${LENSSHARE_EMBED_URL}/${pubId}`;
    defaultMeta += `<meta property="og:video" content="${embedUrl}" />
      <meta property="og:video:width" content="1280" />
      <meta property="og:video:height" content="720" />
      <meta property="og:video:url" content="${embedUrl}" />
      <meta property="og:video:secure_url" content="${embedUrl}"/>
      <meta property="og:video:type" content="text/html" />

      <meta name="twitter:url" content="${meta.url}" />
      <meta name="twitter:player" content="${embedUrl}" />
      <meta property="twitter:player:width" content="1280" />
      <meta property="twitter:player:height" content="720" />
      <link rel="iframely player" type="text/html" href="${embedUrl}" media="(aspect-ratio: 1280/720)" />
      <link rel="alternate" type="text/xml+oembed" href="${LENSSHARE_API_URL}/oembed?format=xml&id=${pubId}" title="${title}" />
      <link rel="alternate" type="application/json+oembed" href="${LENSSHARE_API_URL}/oembed?format=json&id=${pubId}" title="${title}" />

      <meta property="og:video:url" content="${meta.url}" />
      <meta property="og:video:secure_url" content="${meta.url}" />
      <meta property="og:video:type" content="application/x-shockwave-flash" />
      <meta property="og:video:width" content="1280" />
      <meta property="og:video:height" content="720" />`;
  }

  return `<!DOCTYPE html>
          <html lang="en">
            <head>
              ${defaultMeta}
            </head>
            <body>
              <h1>${title}</h1>
            </body>
          </html>`;
};

export default getMetaTags;
