import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import type { AppDispatch } from "../../app/store";
import { getExps, deleteExp, reset } from "../../features/experience/expSlice";
import moment from "moment";

function Experience() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: any) => state.auth);
  const { exps, isLoading, isError, message } = useSelector(
    (state: any) => state.exps
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getExps());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/experience/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/experience/add");
  };

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Experiencia</h1>
      <div className="bg-gray-100 p-6">
        <div className="flex justify-end p-2">
          <button
            onClick={handleAdd}
            className="bg-gray-800 text-white px-4 py-2 rounded-md "
          >
            Adicionar
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Empresa
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Cargo
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Descripción
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Fecha de inicio
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Fecha de término
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {exps && exps.length > 0 ? (
                exps.map((exp: any) => (
                  <tr key={exp.id} className="hover:bg-gray-200">
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 w-auto">
                      {exp.company}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 w-auto">
                      {exp.position}
                    </td>
                    <td className="px-6 py-4 text-justify text-sm text-gray-500 break-words w-auto">
                      {exp.description}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 w-auto">
                      {moment(exp.startDate).format("YYYY-MM-DD")}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 w-auto">
                      {moment(exp.endDate).format("YYYY-MM-DD")}
                    </td>
                    <td className="flex px-2 py-4 text-center text-sm text-gray-500  w-auto">
                      <button
                        onClick={() => handleEdit(exp.id)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <FaEdit />
                        Editar
                      </button>
                      <button
                        onClick={() => dispatch(deleteExp(exp.id))}
                        className="flex items-center gap-2 ml-4 text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        <FaTrash />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No hay experiencias disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Experience;
