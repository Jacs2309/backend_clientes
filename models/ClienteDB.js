import mongoose, {model, } from "mongoose";
import { conexion } from "../helpers/conexion.js";


conexion();
const clienteSchema = mongoose.Schema(
    {
        nombre: String,
        edad: Number,
        telefono: String,
        direccion: String,
        email: String
    },
    {
        versionkey: false
    }
)
const Cliente = model('Cliente',clienteSchema);

export class ClienteModel{
    static async getAll(){
        try{
            return Cliente.find()
        }catch(e){
            console.error("Error al obtener los clientes:", e.message);
        throw e;
        }
    }
    static async getOneById(id){
        try{
            if(!id|| typeof id !=='string' || !mongoose.Types.ObjectId.isValid(id)){
                throw new Error(`Id invalido: ${id}`);
            }
            return await Cliente.findById(id);
        }catch(e){
            console.error("Error al obtener el Cliente por ID:", e.message);
            throw e;
        }
    }
    static async delete(id){
        try{
            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new Error("ID inválido");
            }
            const objectId = new mongoose.Types.ObjectId(id);
            return await Cliente.deleteOne({_id:objectId})
        }catch(e){
            console.error("Error al eliminar el cliente:", e);
            throw e;
        }
    }
    static async create(cliente){
        if(!cliente.success){
            return Error;
        }
        const nClietne={
            ...cliente.data
        }
        const gCliente = new Cliente(nClietne);
        try{
            await gCliente.save();
            return nClietne;
        }
        catch(e){
            console.error("Error al crear elcliente", e);
            throw e;
        }
    }
    static async update(id, validacion) {
        try {
            if (!validacion.success) {
                throw new Error('Error de validación');
            }
            const aCliente = await Cliente.findOneAndUpdate(
                { _id: id },
                { ...validacion.data },
                { new: true }
            );
    
            return aCliente;
        } catch (e) {
            console.error('Error al actualizar Clienre:', e.message);
            throw e;
        }
    }  
}