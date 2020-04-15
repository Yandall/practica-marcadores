const express = require("express")
const router = express.Router()
const path = require("path")
const _controlador = require("../controller/crud")

router.get("/crud", (req, res) =>{
    
    res.sendFile(path.join(__dirname, "../documents/crud.html"))

})

router.get("/functions.js", (req, res) =>{
  res.sendFile(path.join(__dirname, "../documents/js/functions.js"))
})

router.get("/styles.css", (req, res) =>{
  res.sendFile(path.join(__dirname, "../documents/css/styles.css"))
})

router.get("/crud/:id", (req, res) =>{
  let id = req.params.id
  if(id == "all"){
    _controlador
    .obtenerPaginas()
    .then(resultado => {
      res.send(resultado.rows)
    })
    .catch(error =>{
      res.send(error)
    })  
  } else {
    _controlador
    .obtenerPagina(id)
    .then(resultado =>{
      res.send(resultado.rows)
      
    }).catch(error =>{
      res.send(error)
    })
  }
  
})

router.get("/crud/all", (req, res) =>{
  try{
    
    
  } catch (error) {
    res.send(error)
  }
})

router.post("/crud", (req, res) =>{
    (async () => {
      try {
        let pagina = req.body        
        await _controlador.validarPagina(pagina)
        await _controlador.guardarPagina(pagina)
        res.send({ok:"true" ,mensaje: "Página guardada con exito", info: pagina})

      } catch (error) {
        res.send({ok:"false", Error: error.message})
      }
    })()
})

router.put("/crud", (req, res) =>{
  (async () => {
    try{
      let nuevaPagina = req.body
      if(!nuevaPagina.nombre){
        throw new Error("Debes ingresar un nombre válido")
      }
      let respuesta = await _controlador.editarPagina(nuevaPagina.id, nuevaPagina.nombre, nuevaPagina.descripcion)
      res.send({mensaje: `Se editaron ${respuesta.rowCount} paginas`})
    } catch (error) {
      res.send({mensaje: error.message})
    }
  })()
})

router.delete("/crud/:id", (req, res) =>{
  (async () =>{
    try{
      let id = req.params.id
      let respuesta = await _controlador.borrarPagina(id)
      res.send({mensaje: `Se eliminaron ${respuesta.rowCount} paginas`})
    } catch (error){
      res.send(error.message)
    }
  })()
})

module.exports = router
