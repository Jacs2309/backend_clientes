import { Router } from "express";
import {UsuarioController} from "../controllers/UsuarioController.js";

export const routerUsuario = (modelo)=>{
    const constructor = new UsuarioController(modelo);
    const usuarioRouter = Router();

    usuarioRouter.get('/', constructor.getAll);
    usuarioRouter.get('/:id', constructor.getOneById);
    usuarioRouter.delete('/:id',constructor.delete);
    usuarioRouter.post('/', constructor.create);
    usuarioRouter.put('/:id',constructor.update);
    return usuarioRouter;
}

