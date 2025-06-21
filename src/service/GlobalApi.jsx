import axios from "axios";

const PEXELS_BASE_URL = "https://api.pexels.com/v1/search";

const pexelsConfig = {
  headers: {
    Authorization: import.meta.env.VITE_PEXELS_API_KEY,
  },
};

export const GetImageFromPexels = (query) =>
  axios.get(`${PEXELS_BASE_URL}?query=${query}&per_page=1`, pexelsConfig);
