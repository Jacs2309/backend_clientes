import { Router} from "express";
import { ClienteController} from "../controllers/ClienteController.js";

export const routerCliente = (modelo)=>{
    const controlador = new ClienteController(modelo);
    const clienteRouter = Router();

    clienteRouter.get('/',controlador.getAll);
    clienteRouter.get('/:id', controlador.getOneById);
    clienteRouter.delete('/:id', controlador.delete);
    clienteRouter.post('/', controlador.create);
    clienteRouter.put('/:id', controlador.update);
    return clienteRouter
}


