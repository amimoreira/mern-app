import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { updateContact, getContact } from "../../features/contact/contactSlice";
import { useDispatch } from "react-redux";


function EditContact() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    id: "",
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
      id: form.id,
      name: form.nombre,
      lastName: form.apellido,
      email: form.email,
      phone: form.telefono,
    };

    dispatch(updateContact(contactData));
    setForm({
      id: "",
      nombre: "",
      apellido: "",
      email: "",
      telefono: 0,
    });

    navigate("/contact");
  };


  const getData = async (id: string) => {
    const { payload }: any = await dispatch(getContact(id));
    const data = {
      nombre: payload.name,
      apellido: payload.lastName,
      email: payload.email,
      telefono: payload.phone,
    }

    setForm({ ...form, id: id, ...data });
  };

  

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Editar Contacto
        </h1>

        <form
          onSubmit={onSubmit}
          className="mt-4 flex flex-col gap-3 justify-center items-center"
        >
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border px-4 py-2 ml-2"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            className="border px-4 py-2 ml-2"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border px-4 py-2 ml-2"
          />
          <input
            type="number"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="border px-4 py-2 ml-2"
          />
          <div className="flex gap-2 p-2 justify-center">
            <button
              onClick={onCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md ml-2"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditContact;
