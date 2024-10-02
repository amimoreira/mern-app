import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { createContact } from "../../features/contact/contactSlice";

function AddContact() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: 0,
  });
  const onCancel = () => {
    navigate("/contact");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const contactData = {
      name: form.nombre,
      lastName: form.apellido,
      email: form.email,
      phone: form.telefono,
    };

    dispatch(createContact(contactData));
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      telefono: 0,
    });

    navigate("/contact");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Añadir Contact
        </h1>
        <section className="form">
          <form
            onSubmit={onSubmit}
            className="mt-4 flex flex-col gap-3 justify-center items-center"
          >
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={handleChange}
                value={form.nombre}
                className="border px-4 py-2 ml-2"
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                onChange={handleChange}
                value={form.apellido}
                className="border px-4 py-2 ml-2"
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                className="border px-4 py-2 ml-2"
              />
              <input
                type="number"
                name="telefono"
                onChange={handleChange}
                value={form.telefono}
                className="border px-4 py-2 ml-2"
              />
              <div className="form-group">
                <button
                  onClick={onCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md ml-2"
                >
                  Añadir
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddContact;
