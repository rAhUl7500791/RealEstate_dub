import axios from "axios";

// const API = "https://realestate-dub.onrender.com/properties/";

export const listProperties = async () => {
  const res = await axios.get(`https://realestate-dub.onrender.com/properties/properties/`);
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
  const res = await axios.post(`https://realestate-dub.onrender.com/properties/property-images/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

