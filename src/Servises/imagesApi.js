import axios from 'axios';

const KEY = '33173109-7f033f41c702edaff07185b5d';

axios.defaults.baseURL = 'https://pixabay.com';

export const fetchGallery = async (query, page) => {
  const { data } = await axios.get('/api/', {
    params: {
      key: KEY,
      q: query,
      page: page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return data;
};
