const IMG_PROXY_BASE_URL = 'https://img-service.eco-sistema.net';

type ProxyOptions = {
	width?: number;
	height?: number;
	format?: 'jpeg' | 'webp' | 'png';
};

export function getProxyUrl(imageUrl: string, opts: ProxyOptions = {}) {
	const width = opts.width || 800;
	const height = opts.height || 0;
	const format = opts.format || 'webp';

	const encodedUrl = encodeURIComponent(imageUrl);

	return `${IMG_PROXY_BASE_URL}/unsafe/fit-in/${width}x${height}/filters:format(${format})/${encodedUrl}`;
}
