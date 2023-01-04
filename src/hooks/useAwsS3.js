import { useState } from 'react';
import S3 from 'react-aws-s3';
import { useErrorHandler } from './useErrorHandler';

const config = {
  bucketName: 'myBucket',
  dirName: 'media' /* optional */,
  region: 'eu-west-1',
  accessKeyId: 'JAJHAFJFHJDFJSDHFSDHFJKDSF',
  secretAccessKey: 'jhsdf99845fd98qwed42ebdyeqwd-3r98f373f=qwrq3rfr3rf',
  s3Url: 'https:/your-custom-s3-url.com/' /* optional */,
};

const useAwsS3 = () => {
  const ReactS3Client = new S3(config);
  const { handleError } = useErrorHandler();

  const [s3Error, setS3Error] = useState(null);

  const uploadFile = (file) => {
    ReactS3Client.uploadFile(file, file.name)
      .then((data) => console.log(data))
      .catch((err) => {
        setS3Error(err);
        handleError(err);
      });
  };

  return { uploadFile, s3Error };
};

export default useAwsS3;
