import axios from "axios";

// 🔹 Backend endpoints
const PROPERTIES_API = "https://realestate-dub.onrender.com/properties/properties/";
const PROPERTY_IMAGES_API = "https://realestate-dub.onrender.com/properties/property-images/";

// 🏠 List properties
export const listProperties = async () => {
  const res = await axios.get(PROPERTIES_API);
  return res.data;
};

// 🏗️ Create property
export const createProperty = async (formData) => {
  const res = await axios.post(PROPERTIES_API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 🖼️ Upload property images
export const uploadPropertyImages = async (propertyId, images) => {
  const formData = new FormData();
  images.forEach((img) => formData.append("image", img));
  formData.append("property", propertyId);

  const res = await axios.post(PROPERTY_IMAGES_API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
