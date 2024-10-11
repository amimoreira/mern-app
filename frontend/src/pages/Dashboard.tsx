import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Spinner from "../components/Spinner";
import { jsPDF } from "jspdf";
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

  const activeContact = contacts?.find(
    (contact: any) => contact.active === true
  );

  const downloadPDF = () => {
    const doc = new jsPDF();

    let currentY = 20; // Posición inicial

    // Sección Contactos

    currentY += 10;

    // Dibuja el fondo azul
    const contactBackgroundHeight = 8; // Altura del fondo azul
    const contactWidth = 100; // Ancho del fondo azul
    const marginTop = 5; // Margen superior que deseas agregar

    if (activeContact) {
      doc.setFillColor(75, 85, 99);
      doc.rect(
        25,
        currentY - contactBackgroundHeight + 3 - marginTop,
        contactWidth,
        contactBackgroundHeight * 4 + marginTop,
        "F"
      ); // Dibuja el rectángulo de fondo

      // Nombre y Apellidos
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255); // Cambia el color del texto a blanco
      doc.text(`${activeContact.name} ${activeContact.lastName}`, 30, currentY);
      currentY += 10;

      // Email
      doc.setFontSize(14);
      doc.text(`Email: ${activeContact.email}`, 30, currentY);
      currentY += 10;

      // Teléfono
      doc.text(`Teléfono: ${activeContact.phone}`, 30, currentY);
      currentY += 10; // Espacio entre contactos

      // Añadir foto en formato Base64
      if (activeContact.photo) {
        const imgWidth = 40; // Ancho de la imagen
        const imgHeight = 40; // Altura de la imagen
        doc.addImage(
          activeContact.photo,
          "JPEG",
          140,
          currentY - imgHeight,
          imgWidth,
          imgHeight
        ); // Ajusta la posición y tamaño
        currentY += 5; // Incrementar Y para el siguiente contacto
      }
    } else {
    
      doc.setFillColor(75, 85, 99);
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
    doc.setFontSize(14);
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
        doc.setFillColor(75, 85, 99);
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
    if (activeContact) {
      doc.save(`CV - ${activeContact.name} ${activeContact.lastName}.pdf`);
    }
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
                {activeContact ? (
                  <div className="text-center py-4">
                    <img
                      className="rounded-full w-20 h-20 mx-auto"
                      src={
                        activeContact.photo &&
                        !activeContact.photo.startsWith("data:image")
                          ? activeContact.photo
                          : `${activeContact.photo}`
                      }
                      alt={activeContact.name}
                    />
                    <br />
                    <h1 className="text-2xl font-semibold">
                      {activeContact.name} {activeContact.lastName}
                    </h1>
                    <p> Email: {activeContact.email}</p>
                    <p> Teléfono: {activeContact.phone}</p>
                  </div>
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
