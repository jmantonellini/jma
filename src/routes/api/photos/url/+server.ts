import { json, type RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const getS3Client = () => {
	const region = process.env.AWS_REGION;
	const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
	const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

	if (!region || !accessKeyId || !secretAccessKey) {
		throw new Error('Missing AWS credentials in environment variables');
	}

	return new S3Client({
		region,
		credentials: {
			accessKeyId,
			secretAccessKey
		}
	});
};

export const GET: RequestHandler = async ({ url }) => {
	const name = url.searchParams.get('name');
	if (!name) {
		return json({ error: 'Missing key' }, { status: 400 });
	}

	const s3Client = getS3Client();

	const uniqueKey = `${uuidv4()}-${name}`;
	const bucket = process.env.AWS_BUCKET_NAME;
	const region = process.env.AWS_REGION;

	if (!bucket || !region) {
		return json({ error: 'Missing AWS_BUCKET_NAME or AWS_REGION' }, { status: 500 });
	}

	const command = new PutObjectCommand({
		Bucket: bucket,
		Key: uniqueKey,
		ContentType: 'image/jpeg'
	});

	const preSignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
	const permanentUrl = `https://${bucket}.s3.${region}.amazonaws.com/${uniqueKey}`;

	return json({ preSignedUrl, permanentUrl });
};
