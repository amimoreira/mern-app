import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Spinner from "../components/Spinner";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Importar autoTable
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

  const downloadPDF = () => {
    const doc = new jsPDF();

    let currentY = 20; // Posición inicial

    // Sección Contactos

    currentY += 10;

    // Dibuja el fondo azul
    const contactBackgroundHeight = 8; // Altura del fondo azul
    const contactWidth = 80; // Ancho del fondo azul
    const marginTop = 5; // Margen superior que deseas agregar

    if (contacts && contacts.length > 0) {
      contacts.forEach(
        (contact: { name: any; lastName: any; email: any; phone: any }) => {
          doc.setFillColor(0, 102, 204); // Establece el color azul (RGB: azul brillante)
          doc.rect(
            16,
            currentY - contactBackgroundHeight + 3 - marginTop,
            contactWidth,
            contactBackgroundHeight * 4 + marginTop,
            "F"
          ); // Dibuja el rectángulo de fondo

          // Nombre y Apellidos
          doc.setFontSize(18);
          doc.setTextColor(255, 255, 255); // Cambia el color del texto a blanco
          doc.text(`${contact.name} ${contact.lastName}`, 20, currentY);
          currentY += 10;

          // Email
          doc.setFontSize(14);
          doc.text(`Email: ${contact.email}`, 20, currentY);
          currentY += 10;

          // Teléfono
          doc.text(`Teléfono: ${contact.phone}`, 20, currentY);
          currentY += 10; // Espacio entre contactos
        }
      );
    } else {
      // Dibuja el fondo azul para el mensaje de no hay contactos disponibles
      doc.setFillColor(0, 102, 204);
      doc.rect(
        20,
        currentY - contactBackgroundHeight + 3,
        contactWidth,
        contactBackgroundHeight,
        "F"
      ); // Dibuja el rectángulo de fondo
      doc.setTextColor(255, 255, 255); // Cambia el color del texto a blanco
      doc.text("No hay contactos disponibles.", 20, currentY);
      currentY += 10;
    }

    // Sección About
    currentY += 10;
    doc.setTextColor(0, 0, 0); // Cambia el color del texto a negro
    doc.setFontSize(16);
    // Establece el ancho máximo permitido para el texto del "About"
    const aboutWidth = 170; // Ajusta el valor según el ancho que desees

    if (activeAbout) {
      // Utiliza splitTextToSize para ajustar el texto al ancho especificado
      const aboutLines = doc.splitTextToSize(
        activeAbout.description,
        aboutWidth
      );
      doc.text(aboutLines, 25, currentY);
    } else {
      const noInfoLines = doc.splitTextToSize(
        "No hay información disponible en 'About'.",
        aboutWidth
      );
      doc.text(noInfoLines, 20, currentY);
    }

    currentY += 30; // Espacio adicional después del "About"

    // Sección Experiencia Laboral
    doc.setFontSize(18);
    doc.text("Experiencia Laboral:", 20, currentY);
    currentY += 10;

    // Prepara los datos para la tabla
    exps.forEach(
      (exp: {
        company: string;
        position: any;
        startDate: moment.MomentInput;
        endDate: moment.MomentInput;
        description: any;
      }) => {
        // Nombre de la empresa y posición
        const backgroundHeight = 10; // Altura del fondo azul
        doc.setFillColor(0, 102, 204); // Establece el color de fondo (RGB: azul)
        doc.rect(
          16,
          currentY - backgroundHeight + 3,
          180,
          backgroundHeight,
          "F"
        ); // Dibuja el rectángulo de fondo

        // Texto
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255); // Cambia el color del texto a blanco
        doc.text(`${exp.company.padEnd(40, " ")}`, 20, currentY); // Ajusta el ancho de la columna
        doc.setFontSize(12);
        doc.text(`${exp.position}`, 80, currentY); // Ajusta la posición de la columna
        doc.setTextColor(0, 0, 0); // Restablece el color del texto a negro
        currentY += 10;

        // Fechas
        const dateText = `${moment(exp.startDate).format(
          "YYYY-MM-DD"
        )} _ ${moment(exp.endDate).format("YYYY-MM-DD")}`;
        doc.text(dateText, 20, currentY); // Dibuja las fechas en la posición Y actual
        const dateY = currentY; // Guardar posición Y de las fechas
        currentY += 5; // Incrementar Y para la descripción

        // Ajustar la descripción en el espacio disponible
        const descriptionLines = doc.splitTextToSize(exp.description, 110); // Ajusta el ancho según sea necesario

        // Dibuja la primera línea de la descripción en la misma línea que las fechas
        if (descriptionLines.length > 0) {
          doc.text(descriptionLines[0], 80, dateY); // Dibuja la primera línea de la descripción
        }

        // Si hay más líneas, dibuja debajo
        for (let i = 1; i < descriptionLines.length; i++) {
          doc.text(descriptionLines[i], 80, currentY); // Alinea el texto a la izquierda
          currentY += 5;
        }

        currentY += 10; // Espacio entre experiencias
      }
    );

    // Guardar el PDF
    doc.save("Cv.pdf");
  };

  return (
    <section>
      {user ? (
        <>
          <button onClick={downloadPDF} className="btn btn-primary">
            Descargar PDF
          </button>
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
