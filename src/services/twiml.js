import { TWIML_API } from '@config';
import axios from 'axios';

const api = axios.create({
  baseURL: TWIML_API,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  // },
});

export const TwimlService = {
  getAudios() {
    return api.get('/uploaded-audios');
  },

  uploadAudio(file) {
    // const formData = new FormData();
    // formData.append('file', file);
    // console.log('formData', formData);
    return api.post(
      '/upload-audio',
      {
        audioUpload: file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  },

  deleteAudio(id) {
    return api.delete(`/audio/${id}`);
  },

  getAudioSample(audioName) {
    return api.get(`/audio/${audioName}`);
  },

  createCall(payload) {
    return api.post('/create-call', payload);
  },
};
