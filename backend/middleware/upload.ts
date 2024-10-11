// middleware/upload.ts
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Verificar si el directorio "uploads" existe, si no, lo crea
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (
    req: any,
    file: any,
    cb: (arg0: null, arg1: string) => void
  ) => {
    cb(null, "uploads/"); // Asegúrate de que este directorio exista
  },
  filename: (
    req: any,
    file: { fieldname: string; originalname: string },
    cb: (arg0: null, arg1: string) => void
  ) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

export default upload;
