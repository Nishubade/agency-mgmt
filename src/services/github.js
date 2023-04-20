import axios from 'axios';
import { GITHUB_API_URL, GITHUB_USERNAME, GITHUB_REPOSITORY, GITHUB_API_BRANCH } from '@config';

function generateRandomNumber() {
  var minm = 1000000000;
  var maxm = 9999999999;
  return Math.floor(Math
  .random() * (maxm - minm + 1)) + minm;
}

export const getFolders = async () => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/contents`);

    return response.data.filter((item) => item.type === 'dir' && !item.name.includes('.'));

      
  } catch (error) {
    console.error(error);
    return [];
  }
};

// export const fetchApiFormFields = async (projectType) => {
//   try {
//     const response = await axios.get(
//       `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/main/${projectType}/cvaProject.metadata`
//     );
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getFileContent = async (folderName, fileName) => {
  try {
    // const response = await axios.get(
    //   `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/${GITHUB_API_BRANCH}/${folderName}/${fileName}`
    // );

    const response = await axios.get(
      `https://gist.githubusercontent.com/santosh-rumsan/8bcf027b38fffb888f8bc825764630f6/raw/jaleshwor-ben.json?v${generateRandomNumber()}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
