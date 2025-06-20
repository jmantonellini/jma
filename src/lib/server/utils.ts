const IMG_PROXY_BASE_URL = 'https://img-service.eco-sistema.net';

const S3_TO_CDN_MAP: Record<string, string> = {
	'https://my-photos-album.s3.sa-east-1.amazonaws.com': 'https://images.eco-sistema.net',
	'https://posts-cover-images.s3.sa-east-1.amazonaws.com': 'https://posts-images.eco-sistema.net'
};

type ProxyOptions = {
	width?: number;
	height?: number;
	format?: 'jpeg' | 'webp' | 'png';
};

export function getProxyUrl(imageUrl: string, opts: ProxyOptions = {}) {
	const width = opts.width || 800;
	const height = opts.height || 0;
	const format = opts.format || 'webp';

	const entry = Object.entries(S3_TO_CDN_MAP).find(([s3Base]) => imageUrl.startsWith(s3Base));
	const sourceUrl = entry ? imageUrl.replace(entry[0], entry[1]) : imageUrl;

	const encodedUrl = encodeURIComponent(sourceUrl);

	return `${IMG_PROXY_BASE_URL}/unsafe/fit-in/${width}x${height}/filters:format(${format}):quality(80)/${encodedUrl}`;
}
