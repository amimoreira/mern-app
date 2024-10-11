import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import type { AppDispatch } from "../../app/store";
import {
  getContacts,
  deleteContact,
  reset,
} from "../../features/contact/contactSlice";
import { FaEdit, FaRegCheckSquare, FaRegSquare, FaTrash } from "react-icons/fa";

function Contact() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: any) => state.auth);
  const { contacts, isLoading, isError, message } = useSelector(
    (state: any) => state.contacts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getContacts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/contact/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/contact/add");
  };
  const handleDelete = (id: string) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este contacto?")
    ) {
      dispatch(deleteContact(id));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Contacto</h1>
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
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Foto
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Nombre
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Apellidos
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Telefono
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Email
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts && contacts.length > 0 ? (
                contacts.map((contact: any) => (
                  <tr key={contact.id} className="hover:bg-gray-200">
                    <td className="px-4 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900 w-auto">
                      {contact.photo ? (
                        <img
                          src={
                            contact.photo.startsWith("data:image")
                              ? contact.photo
                              : `${contact.photo}`
                          }
                          alt={`${contact.name} ${contact.lastName}`}
                          className="h-10 w-10 rounded-full mx-auto"
                        />
                      ) : (
                        <span>No hay foto disponible</span> // Muestra esto si no hay foto
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-500 break-words w-auto">
                      {contact.name}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-500 break-words w-auto">
                      {contact.lastName}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-500 break-words w-auto">
                      {contact.phone}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-500 break-words w-auto">
                      {contact.email}
                    </td>
                    <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-500 w-auto">
                      <div className="flex justify-center space-x-4">
                        <button className="flex items-center gap-2 text-green-600 hover:text-green-800 focus:outline-none">
                          {contact.active ? (
                            <FaRegCheckSquare />
                          ) : (
                            <FaRegSquare />
                          )}
                          {contact.active ? "Activo" : "Inactivo"}
                        </button>
                        <button
                          onClick={() => handleEdit(contact.id)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                        >
                          <FaEdit />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          <FaTrash />
                          Eliminar
                        </button>
                      </div>
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

export default Contact;
