const ServicioPG = require("../services/postgres")

/**
 * Valida la información de la página
 * @param {*} pagina JSON de la página
 */
let validarPagina = async pagina =>{
    if(!pagina){
        throw new Error("La información es obligatoria")
    } else if(!pagina.url) {
        throw new Error("Debe ingresar una URL válida")
    } else if(!pagina.nombre) {
        throw new Error("Debe ingresar un nombre válido")
    }
    
    return obtenerPaginas()
    .then(lista => {
        if(lista.rows.findIndex(target => target.url == pagina.url) != -1){
            throw new Error("La página ya existe") 
        } 
    })
    .catch(error =>{
        throw error
    })
}

/**
 * Guarda en la base de datos la página
 * @param {*} pagina JSON de la página
 */
let guardarPagina = async pagina =>{
    let _servicio = new ServicioPG()
    let sql = `INSERT INTO public.marcadores(id, url, nombre, descripcion)
        VALUES (nextval('autoincrement'), '${pagina.url}','${pagina.nombre}', '${pagina.descripcion}')`
    let respuesta = await _servicio.ejecutarSql(sql)
    return respuesta
}

/**
 * Retorna todas las páginas de la base de datos
 */
let obtenerPaginas = async () =>{
    let _servicio = new ServicioPG()
    let sql = `SELECT * FROM public.marcadores`
    let respuesta = await _servicio.ejecutarSql(sql)
    return respuesta
}

/**
 * Retorna una sola página con la id especificada
 * @param {*} id página a buscar
 */
let obtenerPagina = async (id) =>{
    let _servicio = new ServicioPG()
    let sql = `SELECT * FROM public.marcadores WHERE id = '${id}'`
    let respuesta = await _servicio.ejecutarSql(sql)
    return respuesta
}

/**
 * Edita en la base de datos una página
 * @param {*} id página a editar
 * @param {*} nuevoNombre nombre nuevo para la página
 * @param {*} nuevoDesc nombre nuevo para la página
 */
let editarPagina = async (id, nuevoNombre, nuevoDesc) =>{
    let _servicio = new ServicioPG()
    let sql = `UPDATE public.marcadores
        SET nombre = '${nuevoNombre}', 
        descripcion = '${nuevoDesc}'
        WHERE id = '${id}'`
    let respuesta = await _servicio.ejecutarSql(sql)
    return respuesta
}

/**
 * Borra de la base de datos la página especificada
 * @param {*} id página a borrar
 */
let borrarPagina = async (id) =>{
    let _servicio = new ServicioPG()
    let sql = `DELETE FROM public.marcadores
        WHERE id = '${id}'`
    let respueta = await _servicio.ejecutarSql(sql)
    return respueta
}

module.exports = {validarPagina, guardarPagina, obtenerPaginas, obtenerPagina, editarPagina, borrarPagina}