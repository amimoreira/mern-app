import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import type { AppDispatch } from "../../app/store";
import { getAbouts, deleteAbout, reset } from "../../features/about/aboutSlice";
import { FaEdit, FaTrash, FaRegCheckSquare, FaRegSquare } from "react-icons/fa";

function About() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: any) => state.auth);
  const { abouts, isLoading, isError, message } = useSelector(
    (state: any) => state.abouts
  );
  
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getAbouts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleEdit = (id: string) => {
    console.log(id, "edit id");
    navigate(`/about/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/about/add");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
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
                  Nombre
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Descripción
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {abouts && abouts.length > 0 ? (
                abouts.map((about: any) => (
                  <tr key={about.id} className="hover:bg-gray-200">
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 w-auto">
                      {about.name}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 break-words w-auto">
                      {about.description}
                    </td>
                    <td className="flex  px-4 py-4 text-center text-sm text-gray-500  w-auto">
                      <button className="flex items-center gap-2 ml-4 text-green-600 hover:text-green-800 focus:outline-none">
                        {about.active ? <FaRegCheckSquare /> : <FaRegSquare />}
                        {about.active ? "Activo" : "Inactivo"}
                      </button>
                      <button
                        onClick={() => handleEdit(about.id)}
                        className="flex items-center gap-2 ml-4 text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <FaEdit />
                        Editar
                      </button>
                      <button
                        onClick={() => dispatch(deleteAbout(about.id))}
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
                  <td colSpan={3} className="text-center">
                    No hay datos disponibles
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

export default About;
