import axios from "axios";
const API_URL = "http://localhost:5000/api/abouts";

// Create about
const createAbout = async (
  aboutData: { name: string; description: string; active: boolean },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, aboutData, config);
  return response.data;
};

// Get abouts
const getAbouts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  const abouts = response.data.map((about: any) => ({
    id: about._id,
    name: about.name,
    description: about.description,
    active: about.active,
  }));

  return abouts;
};

// Get about
const getAbout = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${id}`, config);
  const about = {
    id: response.data._id,
    name: response.data.name,
    description: response.data.description,
    active: response.data.active,
  };
  return about;
};


// Update about
const updateAbout = async (
  aboutData: {
    id: string;
    name: string;
    description: string;
    active: boolean;
  },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/${aboutData.id}`,
    aboutData,
    config
  );

  return response.data;
};

// Delete about
const deleteAbout = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);

  return response.data;
};

const aboutService = {
  createAbout,
  getAbouts,
  getAbout,
  updateAbout,
  deleteAbout,
};

export default aboutService;
