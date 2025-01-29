import { clientes } from "../datos/clientes.js";
var devolverClientes = clientes;
export class Cliente{
    static getAll(){
        return devolverClientes;
    }
    static getOneByID(id){
        return devolverClientes.find(cliente=>cliente.id == id);
    }
    static delete(id){
        return devolverClientes.filter(cliente=>cliente.id != id);
    }
    static create(cliente){
        if(!cliente.success){
            return Error;
        }
        const nuevoCliente = {
            ...cliente.dara
        }
        
        devolverClientes = [...devolverClientes,nuevoCliente];
        return nuevoCliente
    }
    static update(id,cliente){
        if(!cliente.success){
            response.status(400).json('Error en la validacion de datos');

        }
        const indiceCliente = devolverClientes.filter(cliente=>cliente.id==id);
        if(indiceCliente == -1){
            return response.status(400).json('Cliente no encontrado');
        }
        const nuevoCliente = {
            ...devolverClientes[indiceCliente],
            ...cliente.data
        }
        devolverClientes[indiceCliente] = nuevoCliente;
        return nuevoCliente;
    }
}