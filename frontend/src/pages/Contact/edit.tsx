import { useEffect, useState, useCallback } from "react";
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
    foto: null as File | null,
    activo: false,
  });

  const [imageBase64, setImageBase64] = useState<string>(""); // Estado para almacenar la imagen en Base64

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Usa el operador de encadenamiento opcional
    if (file) {
      setForm({ ...form, foto: file }); // Guardamos el archivo de la foto
      const base64 = await convertToBase64(file); // Convertimos a Base64
      setImageBase64(base64); // Guardamos el Base64 en el estado
    }
  };

  const convertToBase64 = (file: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string; // Resuelve el Base64
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const onCancel = () => {
    navigate("/contact");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    // Validar el ID antes de proceder
    if (!form.id) {
      console.error("Contact ID is undefined");
      return; // Salir si el ID no está definido
    }

    const contactData = {
      name: form.nombre,
      lastName: form.apellido,
      email: form.email,
      phone: form.telefono,
      active: form.activo,
      photo: imageBase64,
    };

    // Dispatch de la acción updateContact
    dispatch(updateContact({ contactData, id: form.id }));

    // Resetear el formulario
    setForm({
      id: "",
      nombre: "",
      apellido: "",
      email: "",
      telefono: 0,
      foto: null,
      activo: false,
    });

    navigate("/contact");
  };

  const getData = useCallback(
    async (id: string) => {
      const { payload }: any = await dispatch(getContact(id));
      const data = {
        nombre: payload.name,
        apellido: payload.lastName,
        email: payload.email,
        telefono: payload.phone,
        activo: payload.active,
        foto: payload.photo,
      };

      setForm({ ...form, id: id, ...data });
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id, getData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, activo: e.target.value === "true" });
  };

  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Contacto</h1>

        <form
          onSubmit={onSubmit}
          className="mt-4 flex flex-col gap-3 justify-center items-center"
        >
          <div className="form-group">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleInputChange}
              className="border px-4 py-2 ml-2"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={form.apellido}
              onChange={handleInputChange}
              className="border px-4 py-2 ml-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
              className="border px-4 py-2 ml-2"
            />
            <input
              type="number"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleInputChange}
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
            <div className="flex gap-2 p-2 justify-center">
              <button
                onClick={onCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md ml-2"
              >
                Editar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditContact;
