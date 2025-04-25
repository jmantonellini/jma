const IMG_PROXY_BASE_URL = 'https://img-service.eco-sistema.net';
const CDN_BASE_URL = 'https://images.eco-sistema.net';
const S3_BASE_URL = 'https://my-photos-album.s3.sa-east-1.amazonaws.com';


type ProxyOptions = {
	width?: number;
	height?: number;
	format?: 'jpeg' | 'webp' | 'png';
};

export function getProxyUrl(imageUrl: string, opts: ProxyOptions = {}) {
	const width = opts.width || 800;
	const height = opts.height || 0;
	const format = opts.format || 'webp';

	const sourceUrl = imageUrl.replace(S3_BASE_URL, CDN_BASE_URL);
	const encodedUrl = encodeURIComponent(sourceUrl);

	return `${IMG_PROXY_BASE_URL}/unsafe/fit-in/${width}x${height}/filters:format(${format}):quality(80)/${encodedUrl}`;
}
