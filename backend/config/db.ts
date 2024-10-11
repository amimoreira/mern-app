// backend/config/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

// Cargar variables de entorno desde .env
dotenv.config();

const connectDB = async () => {
  try {
    // Verifica que MONGO_URI esté definido
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined");
      process.exit(1);
    }

    // Conectar a MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Imprimir la conexión con color
    console.log(colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
