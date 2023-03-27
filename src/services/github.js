import axios from 'axios';
import { GITHUB_API_URL, GITHUB_USERNAME, GITHUB_REPOSITORY, GITHUB_API_BRANCH } from '@config';

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
    const response = await axios.get(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}/${GITHUB_API_BRANCH}/${folderName}/${fileName}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};