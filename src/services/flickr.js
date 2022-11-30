import { FLICKR_APIKEY, FLICKR_PHOTOSET } from '@config';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.flickr.com/services/rest',
});

export const getFlickrImages = async (params) => {
  const response = await api.get('', {
    params: {
      method: 'flickr.photosets.getPhotos',
      api_key: FLICKR_APIKEY,
      photoset_id: FLICKR_PHOTOSET,
      format: 'json',
      nojsoncallback: 1,
      ...params,
    },
  });
  const formatted = {
    ...response?.data?.photoset,
    photo: response?.data?.photoset?.photo?.map((item) => ({
      title: item?.title,
      image: `https://live.staticflickr.com/${item?.server}/${item?.id}_${item?.secret}.jpg`,
      id: item?.id,
      description: item?.title,
    })),
  };
  return formatted;
};
