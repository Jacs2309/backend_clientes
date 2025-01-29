import { validarCliente, validarParCli } from "../helpers/zod.js";
export class ClienteController{
    constructor(modelo){
        this.modelo=modelo
    }
    getAll = async(request,response)=>{
        response.json(await this.modelo.getAll());
    }
    getOneById = async(request, response)=>{
        const id = String(request.params.id);
        const cliente = await this.modelo.getOneById(id);
        if(cliente){
            response.json(cliente);
        }else{
            response.status(400).end()
        }
    }
    delete = async(request,response)=>{
        const id = String(request.params.id);
        const devolerCliente = await this.modelo.delete(id);
        if(devolerCliente){
            response.json(devolerCliente);
        }else{
            response.status(400).end()
        }
    }
    create = async(request,response)=>{
        const cliente = validarCliente(request.body);
        if(cliente.error){
            return response.status(400).json('Error en la validacion');
        }
        const nCliente = await this.modelo.create(cliente);
        response.json(nCliente);
    }
    update = async(request,response)=>{
        const id = String(request.params.id);
        const clienteValidado = validarParCli(request.body);
        const nCliente = await this.modelo.update(id,clienteValidado);
        response.json(nCliente);
    }
}