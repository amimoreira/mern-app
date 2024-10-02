import axios from "axios";
const API_URL = "http://localhost:5000/api/contacts";

// Create Contact
const createContact = async (
  contactData: { name: string; lastName: string; phone: number; email: string },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, contactData, config);
  return response.data;
};

// Get contacts
const getContacts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  const contacts = response.data.map((contact: any) => ({
    id: contact._id,
    name: contact.name,
    lastName: contact.lastName,
    phone: contact.phone,
    email: contact.email,
  }));

  return contacts;
};

// Get contact
const getContact = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${id}`, config);

  const contact = {
    id: response.data._id,
    name: response.data.name,
    lastName: response.data.lastName,
    phone: response.data.phone,
    email: response.data.email,
  };
  return contact;
};

// Update contact
const updateContact = async (
  contactData: {
    id: string;
    name: string;
    lastName: string;
    phone: number;
    email: string;
  },
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${contactData.id}`, contactData, config);
  return response.data;
};

// Delete contact
const deleteContact = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const contactService = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
};

export default contactService;
