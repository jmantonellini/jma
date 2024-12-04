import { json, type RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
	region: process.env.AWS_REGION ?? '',
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
	}
});

export const GET: RequestHandler = async ({ url }) => {
	const name = url.searchParams.get('name');
	if (!name) {
		return json({ error: 'Missing key' });
	}
	const uniqueKey = `${uuidv4()}-${name}`;
	const command = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME ?? '',
		Key: uniqueKey,
		ContentType: 'image/jpeg'
	});

	const preSignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
	const permanentUrl = `https://${process.env.AWS_BUCKET_NAME ?? ''}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

	return json({ preSignedUrl, permanentUrl });
};
