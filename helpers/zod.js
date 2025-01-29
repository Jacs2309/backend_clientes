import zod from 'zod';
const articuloSchema=zod.object({
    titulo: zod.string(),
    cuerpo: zod.string(),
    usuario: zod.string(),
})

export const validarArticulo =(articulo)=>{
   return articuloSchema.safeParse(articulo);
}

export const validarParcial=(articulo)=>{
    return articuloSchema.partial().safeParse(articulo);
}

const clienteSchema=zod.object({
    nombre: zod.string(),
    edad: zod.number(),
    telefono: zod.string(),
    direccion: zod.string(),
    email: zod.string(),
})
export const validarCliente =(cliente)=>{
    return clienteSchema.safeParse(cliente);
}
 
 export const validarParCli=(cliente)=>{
     return clienteSchema.partial().safeParse(cliente);
}

//esquema usuarios
const usuariosSchema = zod.object({
    usuario: zod.string(),
    email: zod.string(),
    constraseña: zod.string(),
})
export const validarUsuario =(usuario)=>{
    return usuariosSchema.safeParse(usuario);
}
 
 export const validarParUser=(usuario)=>{
     return usuariosSchema.partial().safeParse(usuario);
}
