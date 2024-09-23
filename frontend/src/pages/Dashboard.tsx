import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Spinner from "../components/Spinner";
import type { AppDispatch } from "../app/store";
import { getExps } from "../features/experience/expSlice";
import { getAbouts } from "../features/about/aboutSlice";
import { useDispatch } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);
  const { exps, isLoading, isError, message } = useSelector(
    (state: any) => state.exps
  );
  const { abouts } = useSelector((state: any) => state.abouts);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }

    dispatch(getExps());
    dispatch(getAbouts());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <div>
        <h1>Perfil</h1>
        <div className="overflow-x-auto w-full">
          {abouts && abouts.length > 0 ? (
            abouts.map((about: any) => (
              <div key={about.id} className="text-center py-4">
                {about.description}
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              No hay experiencias disponibles.
            </div>
          )}
        </div>
      </div>
      <div>
        <h1>Experencia</h1>
        <div className="overflow-x-auto w-full">
          {exps && exps.length > 0 ? (
            exps.map((exp: any) => (
              <table
                key={exp.id}
                className="min-w-full bg-white rounded-lg border-gray-200 table-auto"
              >
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-40">
                      {exp.company}
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-auto">
                      {exp.position}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-200">
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900 w-40">
                      {moment(exp.startDate).format("YYYY-MM-DD")} -{" "}
                      {moment(exp.endDate).format("YYYY-MM-DD")}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500 break-words max-w-xs">
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
    </section>
  );
}

export default Dashboard;
