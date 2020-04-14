const ServicioPG = require("../services/postgres")

/**
 * Valida la información de la página
 * @param {*} pagina información de la página
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

let guardarPagina = async pagina =>{
    let _servicio = new ServicioPG()
    let sql = `INSERT INTO public.marcadores(
        url, nombre, descripcion)
        VALUES (
            '${pagina.url}',
            '${pagina.nombre}',
            '${pagina.descripcion}')`
    let respuesta = await _servicio.ejecutarSql(sql)
    return respuesta
}

let obtenerPaginas = async () =>{
    let _servicio = new ServicioPG()
    let sql = `SELECT * FROM public.marcadores`
    let respuesta = await _servicio.ejecutarSql(sql)
    return respuesta
}

let editarPagina = async (url, nuevoNombre, nuevoDesc) =>{
    let _servicio = new ServicioPG()
    let sql = `UPDATE public.marcadores
        SET nombre = '${nuevoNombre}', 
        descripcion = '${nuevoDesc}'
        WHERE url = '${url}'`
        console.log(url, nuevoNombre, nuevoDesc)
    let respuesta = await _servicio.ejecutarSql(sql)
    return respuesta
}

let borrarPagina = async (url) =>{
    let _servicio = new ServicioPG()
    let sql = `DELETE FROM public.marcadores
        WHERE url = '${url}'`
    let respueta = await _servicio.ejecutarSql(sql)
    return respueta
}

module.exports = {validarPagina, guardarPagina, obtenerPaginas, editarPagina, borrarPagina}