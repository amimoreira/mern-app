import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Spinner from "../components/Spinner";
import type { AppDispatch } from "../app/store";
import { getExps } from "../features/experience/expSlice";
import { getAbouts } from "../features/about/aboutSlice";
import { getContacts } from "../features/contact/contactSlice";
import { useDispatch } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);
  const { exps, isLoading, isError, message } = useSelector(
    (state: any) => state.exps
  );
  const { abouts } = useSelector((state: any) => state.abouts);
  const { contacts } = useSelector((state: any) => state.contacts);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }

    dispatch(getExps());
    dispatch(getAbouts());
    dispatch(getContacts());

  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // Filtrar el About activo
  const activeAbout = abouts?.find((about: any) => about.active === true);

  return (
    <section>
      {user ? (
        <>
          <div className="flex my-4 justify-center items-center border-t-4 border-gray-800">
            <div className="w-3/5 p-2">
              <div className="overflow-x-auto w-full">
                {activeAbout ? (
                  <div className=" text-center text-lg italic py-4">
                    {activeAbout.description}
                  </div>
                ) : (
                  <div className="text-center italic py-4">
                    No hay informacion disponibles.
                  </div>
                )}
              </div>
            </div>
            <div className="w-2/5 p-2">
              <div className="overflow-x-auto w-full bg-gray-200">
                {contacts && contacts.length > 0 ? (
                  contacts.map((contact: any) => (
                    <div key={contact.id} className="text-center py-4">
                      <h1 className="text-2xl font-semibold">
                        {contact.name} {contact.lastName}
                      </h1>
                      <p> Email: {contact.email}</p>
                      <p> Teléfono: {contact.phone}</p>
                    </div>
                  ))
                ) : (
                  <p>No hay contactos disponibles.</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="my-4 border-t-4 border-gray-800">
              <br />
              <h1 className="text-2xl font-bold mb-4">Experencia Laboral</h1>
            </div>
            <div className="overflow-x-auto w-full">
              {exps && exps.length > 0 ? (
                exps.map((exp: any) => (
                  <table
                    key={exp.id}
                    className="min-w-full bg-white rounded-lg border-gray-200 table-auto"
                  >
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-center italic font-semibold text-gray-600 uppercase tracking-wider w-40">
                          {exp.company}
                        </th>
                        <th className="px-6 py-3 text-start text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                          {exp.position}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-200">
                        <td className="px-6 py-4 text-center italic text-sm font-medium text-gray-700 w-40">
                          {moment(exp.startDate).format("YYYY-MM-DD")} _{" "}
                          {moment(exp.endDate).format("YYYY-MM-DD")}
                        </td>
                        <td className="px-6 py-4 text-justify text-sm text-gray-500 break-words max-w-xs">
                          {exp.description}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))
              ) : (
                <div className="text-center py-4">
                  No hay experiencias disponibles.
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>No hay usuarios.</p>
      )}
    </section>
  );
}

export default Dashboard;

