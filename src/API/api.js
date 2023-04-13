import axios from "axios";


export const fetchPhoto = async (search, numberPage) => {
    const response = await axios.get(`https://pixabay.com/api/`, {
      method: 'get',
      params: {
        key: '32876779-a95b33eb506c24842b74d871c',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: numberPage,
      },
    });
    return response.data.hits
}