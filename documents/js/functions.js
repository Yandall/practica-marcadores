const getRequest = new Request('/crud/all', {method: 'GET'})
var paginaActiva = ""

actualizar()

/**
 * Actualiza la lista para ver todos los marcadores
 */
async function actualizar(){
    let lista = await obtenerPaginas()
    let data = ""
    for(let i = 0; i < lista.length; i++){
        let pagina = lista[i]
        data += `
            <tr>
            <td> ${i+1} </td>
            <td> ${pagina.url} </td>
            <td> ${pagina.nombre} </td>
            <td> ${pagina.descripcion} </td>
            <td> <button type="button" onclick="cargarPagina(${pagina.id})" class="btn btn-warning btn-sm">Editar</button>
            <button type="button" onclick="eliminarPagina(${pagina.id})" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
            </tr>
        `
    }
    document.getElementById("listaPaginas").innerHTML = data    
}

/**
 * Obtiene todas las páginas de la base de datos
 */
async function obtenerPaginas() {
    return fetch(getRequest)
    .then(res =>{
        return res.json()
    })
    .catch(error =>{
        console.log(error)    
    })
}

/**
 * Obtiene y retorna los valores escritos en el formulario
 */
function obtenerValores(){
    let url = document.getElementById("url").value
    let nombre = document.getElementById("nombre").value
    let descripcion = document.getElementById("desc").value
    return {url, nombre, descripcion}
}

/**
 * Carga en el formulario la información de la página con la id
 * @param {*} id pagina para cargar
 */
function cargarPagina(id){
    let getPagina = new Request(`/crud/${id}`, {method: 'GET'})
    fetch(getPagina)
    .then(res =>{
        return res.json()
    }).then(res =>{
        res = res[0]
        document.getElementById("url").value = res.url
        document.getElementById("url").disabled = true
        document.getElementById("nombre").value = res.nombre
        document.getElementById("desc").value = res.descripcion

        document.getElementById("btnEditar").style.display = "inline"
        document.getElementById("btnCrear").style.display = "none"
        paginaActiva = id
    })
}

/**
 * Intenta crear la página con la información en el formulario
 */
function crearPagina(){
    let pagina = obtenerValores()
    let postRequest = new Request('/crud', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(pagina)})
    fetch(postRequest)
    .then(res =>{
        if(res.status === 200){
            return res.json()
        }
    }).then(res =>{
        
            if(res.ok=="true"){
                actualizar()
                limpiarFormulario()
                alert(res.mensaje)
            } else if(res.ok=="false"){
                alert(res.Error)
            }
        
        
    }).catch(error =>{
        console.log(error)
        alert("Error inesperado")
    })
}


/**
 * Edita la página a partir de la id guardada en paginaActiva
 */
function editarPagina(){
    let pagina = obtenerValores()
    pagina.id = paginaActiva
    let putPagina = new Request('/crud', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(pagina)})
    fetch(putPagina)
    .then(res =>{
        return res.json()
    }).then(res =>{
        actualizar()
        alert(res.mensaje)
    })
    .catch(error =>{
        console.log(error)
    })
    limpiarFormulario()

}

/**
 * Elimina de la base de datos la página con la id
 * @param {*} id página para eliminar 
 */
function eliminarPagina(id){
    let deletePagina = new Request(`/crud/${id}`, {method: 'DELETE'})
    fetch(deletePagina)
    .then(res =>{
        actualizar()
        alert("Se eliminó correctamente")
    })
    .catch(error =>{
        console.log(error)
    })
    limpiarFormulario()
}

/**
 * Regresa el formulario a un estado inicial
 */
function limpiarFormulario(){
    document.getElementById("url").value = ""
    document.getElementById("url").disabled = false
    document.getElementById("nombre").value = ""
    document.getElementById("desc").value = ""
    document.getElementById("btnCrear").style.display = "inline"
    document.getElementById("btnEditar").style.display = "none"

}

