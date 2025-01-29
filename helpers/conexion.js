import mongoose from "mongoose";

export const conexion = async () => {
  try {
    
    await mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conectado correctamente a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
  }
};

