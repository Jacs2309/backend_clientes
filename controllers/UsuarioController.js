import { validarUsuario, validarParUser } from "../helpers/zod.js";
export class UsuarioController{
    constructor(model){
        this.model=model
    }
    getAll = async(request,response)=>{
        response.json(await this.model.getAll());
    }

    getOneById = async(request,response)=>{
        const id = String(request.params.id);
        const usuario = await this.model.getOneById(id);
        if(usuario){
            response.json(usuario);
        }else{
            response.status(400).end();
        }
    }
    delete = async(request,response)=>{
        const id = String(request.params.id);
        const devolerUsuario = await this.model.delete(id);
        if(devolerUsuario){
            response.json(devolerUsuario);
        }else{
            response.status(400),end();
        }
    }
    create = async (request, response) => {
        try {
            console.log('Cuerpo de la solicitud:', request.body);
            const usuario = validarUsuario(request.body);
            if (usuario.error) {
                console.error('Error de validación:', usuario.error);
                return response.status(400).json({ error: 'Error de validación', detalles: usuario.error });
            }
            console.log('Usuario validado:', usuario);
            const nUsuario = await this.model.create(usuario);
            response.status(201).json(nUsuario);
    
        } catch (error) {
            console.error('Error en la creación del usuario:', error);
            response.status(500).json({ error: 'Error interno del servidor' });
        }
    };
    
    update = async(request,response)=>{
        const id = String(request.params.id);
        const usuarioVali = validarParUser(request.body);
        const nUsuario = await this.model.update(id,usuarioVali);
        response.json(nUsuario);
    }
}