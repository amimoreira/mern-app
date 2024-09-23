import axios from "axios"
const API_URL = "http://localhost:5000/api/exps"

// Create experience
const createExp = async (expData: { company: string; position: string; description: string, startDate: Date; endDate: Date }, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, expData, config)
  return response.data
}

// Get experiences
const getExps = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)

  const exps = response.data.map((exp: any) => ({
    id: exp._id,
    company: exp.company,
    position: exp.position,
    description: exp.description,
    startDate: exp.startDate,
    endDate: exp.endDate,
  }));

  return exps;
}

// Get experience
const getExp = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/${id}`, config)

  const exp = {
    id: response.data._id,
    company: response.data.company,
    position: response.data.position,
    description: response.data.description,
    startDate: response.data.startDate,
    endDate: response.data.endDate,
  };
  return exp
}

// Update experience
const updateExp = async (
  expData: {
    id: string;
    company: string;
    position: string;
    description: string;
    startDate: Date;
    endDate: Date;
  },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${expData.id}`, expData, config);
  return response.data;
};

// Delete experience
const deleteExp = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${id}`, config)
  return response.data
}


const expService = {
  createExp,
  getExps,
  getExp,
  updateExp,
  deleteExp
}

export default expService