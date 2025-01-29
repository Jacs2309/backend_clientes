import mongoose, {model} from "mongoose";
import { conexion } from "../helpers/conexion.js";
import { isValid } from "zod";
conexion()
const usuarioSchema =  mongoose.Schema(
    {
        usuario: String,
        email: String,
        constraseña: String,
    },
    {
        versionkey:false
    }
)
const Usuario = model('Usuario',usuarioSchema);

export class UsuarioModel{
    static async getAll(){
        try{
            return Usuario.find();
        }catch(e){
            console.error("Error al obtener los usuarios");
            throw e;
        }
    }
    static async getOneById(id){
        try{
            if(!id|| typeof id !=='string' || !mongoose.Types.ObjectId.isValid(id)){
                throw new Error(`Id invalido: ${id}`);
            }
            return await Usuario.findById(id);
        }catch(e){
            console.error("Error al obtener el Usuario por ID:", e.message);
            throw e;
        }
    }
    static async delete(id){
        try{
            if(!mongoose.Types.ObjectId-isValid(id)){
                throw new Error("Id invalido")
            }
            const objectId = new mongoose.Types.ObjectId(id);
            return await Usuario.deleteOne({_id:objectId});
        }catch(e){
            console.error("Error al eliminar Usuario",e)
            throw e;
        }
    }
    static async create(usuario){
        if(!usuario.success){
            return Error;
        }
        const nUsuario={
            ...usuario.data
        }
        const gUsuario = new Usuario(nUsuario);
        try{
            await gUsuario.save();
            return nUsuario;
        }catch(e){
            console.error("Error al crear el Usuario", e)
            throw e;
        }
    }
    static async update(id,validacion){
        try{
            if(!validacion.success){
                throw new Error("Error de valdacion");
            }
            const aUsuario = await Usuario.findOneAndUpdate(
                {_id:id},
                {...validacion.data},
                {new:true}
            );
            return aUsuario
        }catch(e){
            console.error('Error al actualizar Usuaio:', e.message);
            throw e;
        }
    }
}
