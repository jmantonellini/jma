import { json, type RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '$lib/server/aws';

export const GET: RequestHandler = async ({ url }) => {
	const name = url.searchParams.get('name');
	const bucketParam = url.searchParams.get('bucket');

	if (!name) {
		return json({ error: 'Missing name' }, { status: 400 });
	}

	const bucket =
		bucketParam === 'posts' ? process.env.AWS_POSTS_BUCKET : process.env.AWS_PHOTOS_BUCKET;

	if (!bucket) {
		return json({ error: 'Bucket not configured' }, { status: 500 });
	}

	const uniqueKey = `${uuidv4()}-${name}`;

	const command = new PutObjectCommand({
		Bucket: bucket,
		Key: uniqueKey,
		ContentType: 'image/jpeg'
	});

	const s3Client = getS3Client();

	const preSignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

	const permanentUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

	return json({ preSignedUrl, permanentUrl });
};
