/*import {articulos} from "./datos/articulos.js";
import { validarArticulo } from "./helpers/zod.js";
import { validarParcial } from "./helpers/zod.js";
const app= express();

app.use(express.json());
const PORT=3030;
let articulosDevolver=articulos;

app.get('/',(request,response)=> {
     response.json(articulosDevolver);
})

app.get('/api/articulos/:id', (request,response)=> {
   const id=Number(request.params.id);
   const articulo=articulosDevolver.find(articulo=>articulo.id == id);
   if (articulo){
        response.json(articulo);
     }
   
   else{
     response.status(400).end();
  }
})
app.delete('/api/articulos/:id', (request,response)=> {
    const id=Number(request.params.id);
    articulosDevolver=articulosDevolver.filter(articulo=>articulo.id != id);
    if (articulosDevolver){
         response.json(articulosDevolver);
      }
    
    else{
      response.status(400).end();
   }
 })
 
 app.post('/api/articulos',(request,response) =>{
    const articulo= validarArticulo(request.body);
    
    if (articulo.error){
      return response.status (400).json('Validación de datos es Incorrecta')
    }
 
    nuevoArticulo={
        ...articulo.data
    }   
    articulosDevolver=[...articulosDevolver,nuevoArticulo];
    response.json(nuevoArticulo);
 
 })
 app.put('/api/articulos/:id', (request,response)=> {
    const id=Number(request.params.id);
    const articuloValidado= validarParcial(request.body);
    if (articuloValidado.error){
        return response.status (400).json('En validación de datos sale Incorrecto')
      }
    const articuloIndice=articulosDevolver.findIndex(articulo => articulo.id==id)
    
    if (articuloIndice == -1)
    {
       return response.status (400).json('Articulo no encontrado')
    }
     console.log(articuloValidado.data)
    const nuevoArticulo={
      ...articulosDevolver[articuloIndice],
      ...articuloValidado.data
    }
     articulosDevolver[articuloIndice] = nuevoArticulo;
     response.json(nuevoArticulo)
 })
   
   
 app.listen(PORT,()=>{
      console.log("Servidor a la espera");
 })*/
      import express from "express";
      import {routerArticulo} from "./routes/articulosRoutes.js";
      import { ArticuloModel } from "./models/ArticuloDB.js";
      import { routerCliente } from "./routes/clientesRoutes.js";
      import { ClienteModel } from "./models/ClienteDB.js";
      import { routerUsuario } from "./routes/usuariosRoutes.js";
      import { UsuarioModel } from "./models/UsuariosDB.js";
      import { conexion } from "./helpers/conexion.js";
      import cors from "cors";
      

      const app= express();
      
      app.use(express.json());
      const PORT=3030;
      conexion();
      app.use(cors({ origin: 'http://localhost:5173' }));
      app.use('/api/articulos',routerArticulo(ArticuloModel));
      app.use('/api/clientes', routerCliente(ClienteModel));
      app.use('/api/usuarios', routerUsuario(UsuarioModel));
      app.listen(PORT,()=>{
           console.log("Servidor a la espera");
      })
      