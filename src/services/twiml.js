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
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload-audios', formData);
  },

  deleteAudio(id) {
    return api.delete(`/uploaded-audios/${id}`);
  },

  getAudioSample(audioName) {
    return api.get(`/audio/${audioName}`);
  },
};
