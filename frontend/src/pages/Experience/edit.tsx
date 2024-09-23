import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { updateExp, getExp } from "../../features/experience/expSlice";
import { useDispatch } from "react-redux";
import moment from "moment";

function EditExp() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    id: "",
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
      id: form.id,
      company: form.empresa,
      position: form.cargo,
      description: form.descripcion,
      startDate: new Date(form.fechaInicio),
      endDate: new Date(form.fechaTermino),
    };

    dispatch(updateExp(expData));
    setForm({
      id: "",
      empresa: "",
      cargo: "",
      descripcion: "",
      fechaInicio: "",
      fechaTermino: "",
    });

    navigate("/experience");
  };


  const getData = async (id: string) => {
    const { payload }: any = await dispatch(getExp(id));
    const data = {
      empresa: payload?.company,
      cargo: payload?.position,
      descripcion: payload?.description,
      fechaInicio: moment(payload?.startDate).format("YYYY-MM-DD"),
      fechaTermino: moment(payload?.endDate).format("YYYY-MM-DD"),
    }
    console.log({ ...form, id: id, ...data }, "edit");
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
          Editar Experiencia
        </h1>

        <form
          onSubmit={onSubmit}
          className="mt-4 flex flex-col gap-3 justify-center items-center"
        >
          <input
            type="text"
            name="empresa"
            placeholder="Empresa"
            value={form.empresa}
            onChange={handleChange}
            className="border px-4 py-2 ml-2"
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={form.cargo}
            onChange={handleChange}
            className="border px-4 py-2 ml-2"
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            className="border px-4 py-2 ml-2"
          />
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
            className="border px-4 py-2 ml-2"
          />
          <input
            type="date"
            name="fechaTermino"
            value={form.fechaTermino}
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

export default EditExp;
