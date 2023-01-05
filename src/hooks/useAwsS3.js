import { useState } from 'react';
// import S3 from 'react-aws-s3';
import { useErrorHandler } from './useErrorHandler';
import AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '@config';

const config = {
  bucketName: AWS_BUCKET_NAME,
  // dirName: 'audio' /* optional */,
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  // s3Url: 'https:/your-custom-s3-url.com/' /* optional */,
};

//  "bucket": "rumsan-rahat",
//  "accessKey": "AKIA2MEMCLOQTT7URDI3",
//  "secret": "SxlacRWtSDl5DjZuccMEO38LdWP9pB4aEo+474Y9",
//  "region": "us-east-1"
const useAwsS3 = () => {
  AWS.config.update({
    region: config.region,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  });
  const s3 = new AWS.S3();

  // const ReactS3Client = new S3(config);
  const { handleError } = useErrorHandler();

  const [s3Error, setS3Error] = useState(null);

  const uploadFile = (file) => {
    s3.upload(
      {
        Bucket: 'rumsan-rahat',
        Key: file.name,
        Body: file,
      },
      (error, data) => {
        if (error) {
          setS3Error(error);
          handleError(error);
          console.log('error', error);
        } else {
          console.log(data);
        }
      }
    );
    // ReactS3Client.uploadFile(file, file.name)
    //   .then((data) => console.log(data))
    //   .catch((err) => {
    //     setS3Error(err);
    //     handleError(err);
    //     console.log('err', { err });
    //   });
  };

  return { uploadFile, s3Error };
};

export default useAwsS3;
