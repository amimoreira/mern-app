import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { createAbout } from "../../features/about/aboutSlice";

function AddAbout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    activo: true,
  });
  const onCancel = () => {
    navigate("/about");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const aboutData = {
      name: form.nombre,
      description: form.descripcion,
      active: form.activo,
    };

    dispatch(createAbout(aboutData));
    
    setForm({
      nombre: "",
      descripcion: "",
      activo: true,
    });

    navigate("/about");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, activo: e.target.value === "true" });
  };

  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Añadir Información
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
                onChange={handleInputChange}
                value={form.nombre}
                className="border px-4 py-2 ml-2"
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                onChange={handleInputChange}
                value={form.descripcion}
                className="border px-4 py-2 ml-2"
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
        </section>
      </div>
    </div>
  );
}

export default AddAbout;
