import fs from 'fs';
import util from 'util';
const unlinkFile = util.promisify(fs.unlink);
import S3 from 'aws-sdk/clients/s3';
import path from 'path';

const s3 = new S3({
  region: process.env.AWS_S3BUCKET_REGION,
  accessKeyId: process.env.AWS_S3BUCKET_ACCESS_KEY_FOR_SERVER, // このexpress appのbucketにアクセスするためのunique name。
  secretAccessKey: process.env.AWS_S3BUCKET_SECRET_KEY_FOR_SERVER, // そして、それのpassword。
});

export const uploadPhoto = async (fileName) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'assets', 'photos', fileName);
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: process.env.AWS_S3BUCKET_NAME,
    Body: fileStream,
    Key: `assets/photos/${fileName}`,
  };
  await s3.upload(uploadParams).promise();
  console.log('Uploaded');

  await unlinkFile(filePath);
};

export const uploadAvatar = async (fileName) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'avatars', fileName);
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: process.env.AWS_S3BUCKET_NAME,
    Body: fileStream,
    Key: `avatars/${fileName}`,
  };
  await s3.upload(uploadParams).promise();

  await unlinkFile(filePath);
};

export const uploadVideo = async (fileName) => {
  const filePath = path.join(__dirname, '..', '..', 'assets', 'videos', fileName);
  const fileStream = fs.createReadStream(filePath);
  console.log(fileStream);

  const uploadParams = {
    Bucket: process.env.AWS_S3BUCKET_NAME,
    Body: fileStream,
    Key: `assets/videos/${fileName}`,
  };
  await s3.upload(uploadParams).promise();
};
