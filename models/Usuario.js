import { response } from "express";
import {usuarios} from "../datos/usuarios.js"

let devolverUsuarios = usuarios;
export class Usuario{
    static getAll(){
        return devolverUsuarios;
    }

    static getOneById(id){
        return devolverUsuarios.find(devolverUsuarios => devolverUsuarios.id == id);
    }

    static delete(id){
        return devolverUsuarios.find(devolverUsuarios => devolverUsuarios.id != id);
    }

    static create(usuario){
        if(!usuario.success){
            return Error;
        }
        const nUsuario = {
            ...usuario.data
        }

        devolverUsuarios = [devolverUsuarios,nUsuario];
        return nUsuario;
    }

    static update(id, usuario){
        if(!usuario.success){
            return response.status(400).json('Error de validacion de datos');
        }

        const indiceUsuario = devolverUsuarios.findIndex(usuario => usuario.id == id);
        if(indiceUsuario == -1){
            return response.status(400).json('Usuario no encontrado');
        }
        const actualizaUsuario = {
            ...devolverUsuarios[indiceUsuario],
            ...usuario.data
        }
        devolverUsuarios[indiceUsuario] = actualizaUsuario;
        return actualizaUsuario;
    }
}