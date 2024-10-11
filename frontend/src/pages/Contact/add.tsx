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
    foto: null as File | null, // Para almacenar la imagen
    activo: true,
  });

  const [imageBase64, setImageBase64] = useState("");

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string; // Asegúrate de que sea string
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Usa el operador de encadenamiento opcional
    if (file) {
      const base64 = await convertToBase64(file); // Convierte a Base64
      setImageBase64(base64); // Guarda el Base64 en el estado
      setForm({ ...form, foto: file }); // Guarda el archivo en el estado
    }
  };

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
      active: form.activo,
      photo: imageBase64,
    };

    console.log(contactData.photo, "foto");
    dispatch(createContact(contactData));

    setForm({
      nombre: "",
      apellido: "",
      email: "",
      telefono: 0,
      foto: null,
      activo: false,
    });

    navigate("/contact");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, activo: e.target.value === "true" });
  };

  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Añadir Contact</h1>

        <form
          onSubmit={onSubmit}
          className="mt-4 flex flex-col gap-3 justify-center items-center"
        >
          <div className="form-group">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              onChange={handleInputChange}
              value={form.nombre}
              className="border px-4 py-2 ml-2"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              onChange={handleInputChange}
              value={form.apellido}
              className="border px-4 py-2 ml-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={form.email}
              className="border px-4 py-2 ml-2"
            />
            <input
              type="number"
              name="telefono"
              onChange={handleInputChange}
              value={form.telefono}
              className="border px-4 py-2 ml-2"
            />
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="border px-4 py-2 ml-2 w-full"
            />
            <select
              name="activo"
              onChange={handleSelectChange}
              value={String(form.activo)}
              className="border px-4 py-2 ml-2"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
            {imageBase64 && (
              <img
                src={
                  imageBase64.startsWith("data:")
                    ? imageBase64
                    : `data:image/jpeg;base64,${imageBase64}`
                }
                alt="Preview"
                className="p-2"
              />
            )}

            <div className="form-group">
              <button
                onClick={onCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Cancelar
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
      </div>
    </div>
  );
}

export default AddContact;
