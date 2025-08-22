import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // <-- use environment variable
const API = `${BASE_URL}/properties/properties`;

export const listProperties = async () => {
  const res = await axios.get(`${API}`);
  return res.data;
};

export const createProperty = async (formData) => {
  const res = await axios.post(`${API}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const uploadPropertyImages = async (propertyId, images) => {
  const formData = new FormData();
  images.forEach(img => formData.append("image", img));
  formData.append("property", propertyId);

  const res = await axios.post(`${BASE_URL}/properties/property-images/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
