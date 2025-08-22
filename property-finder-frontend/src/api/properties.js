// api/properties.js
import axios from "axios";

const API = "http://127.0.0.1:8000/properties/";

export const listProperties = async () => {
  const res = await axios.get(`${API}properties/`);
  return res.data;
};

export const createProperty = async (formData) => {
  const res = await axios.post(`${API}properties/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
export const uploadPropertyImages = async (propertyId, images) => {
  const formData = new FormData();
  images.forEach(img => formData.append("image", img));
  formData.append("property", propertyId);

  // ✅ correct URL
  const res = await axios.post(`http://127.0.0.1:8000/properties/property-images/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

