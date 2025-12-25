import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getTrending = async () => {
  const res = await axios.get(`${API}/music/trending`);
  return res.data.data;
};
