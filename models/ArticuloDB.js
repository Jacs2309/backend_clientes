import mongoose,{model} from "mongoose";
import  {conexion} from "../helpers/conexion.js";
import { response } from "express";

conexion();
const articuloSchema = mongoose.Schema(
    {
        id: Number,
        titulo: String,
        cuerpo: String,
        usuario: String,
    },
    {
        versionkey: false
    }

)

const Articulo = model('Articulo',articuloSchema);

export class ArticuloModel{
    static  async getAll()  {
        try{
            return await Articulo.find();
        }
        catch(e){
            console.log(e);
        }
    }
    static async getOneByID(id) {
    try {
        if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`ID inválido: ${id}`);
        }
        return await Articulo.findById(id);
    } catch (e) {
        console.error("Error al obtener el artículo por ID:", e.message);
        throw e;
    }
}


    static async delete(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("ID inválido");
            }
    
            const objectId = new mongoose.Types.ObjectId(id);
            return await Articulo.deleteOne({ _id: objectId });
        } catch (e) {
            console.error("Error al eliminar el artículo:", e);
            throw e;
        }
    }
    
    static async create(articulo){
        if(!articulo.success){
            return Error;
        }

        const nuevoArticulo={
            ...articulo.data
        };

        const articuloGuardar=new Articulo(nuevoArticulo);
        try {
            await articuloGuardar.save();
            return nuevoArticulo;
        }        
        catch(e)
        {
            console.log(e);
        }

    }

    static async update (id,validacion){
     if(!validacion.success){
        throw new Error('Error de validación');
     }
     try{
        return await Articulo.findOneAndUpdate({_id:id}, {... validacion.data}, {new:true});
     }
     catch(e){
       console.log(e);
     }

    }

}
 
