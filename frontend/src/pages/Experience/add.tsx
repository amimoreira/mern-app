import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { createExp } from "../../features/experience/expSlice";

function AddExp() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    empresa: "",
    cargo: "",
    descripcion: "",
    fechaInicio: "",
    fechaTermino: "",
  });
  const onCancel = () => {
    navigate("/experience");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const expData = {
      company: form.empresa,
      position: form.cargo,
      description: form.descripcion,
      startDate: new Date(form.fechaInicio),
      endDate: new Date(form.fechaTermino),
    };

    dispatch(createExp(expData));
    setForm({
      empresa: "",
      cargo: "",
      descripcion: "",
      fechaInicio: "",
      fechaTermino: "",
    });

    navigate("/experience");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Añadir Experiencia
        </h1>
        <section className="form">
          <form
            onSubmit={onSubmit}
            className="mt-4 flex flex-col gap-3 justify-center items-center"
          >
            <div className="form-group">
              <input
                type="text"
                name="empresa"
                placeholder="Empresa"
                onChange={handleChange}
                value={form.empresa}
                className="border px-4 py-2 ml-2"
              />
              <input
                type="text"
                name="cargo"
                placeholder="Cargo"
                onChange={handleChange}
                value={form.cargo}
                className="border px-4 py-2 ml-2"
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                onChange={handleChange}
                value={form.descripcion}
                className="border px-4 py-2 ml-2"
              />
              <input
                type="date"
                name="fechaInicio"
                onChange={handleChange}
                value={form.fechaInicio}
                className="border px-4 py-2 ml-2"
              />
              <input
                type="date"
                name="fechaTermino"
                onChange={handleChange}
                value={form.fechaTermino}
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

export default AddExp;
