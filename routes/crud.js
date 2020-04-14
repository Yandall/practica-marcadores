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

router.get("/crud/all", (req, res) =>{
  try{
    _controlador
    .obtenerPaginas()
    .then(resultado => {
      res.send(resultado.rows)
    })
    .catch(error =>{
      res.send(error)
    })
    
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
        res.send({mensaje: "Página guardada con exito", info: pagina})

      } catch (error) {
        res.send({ Error: error.message})
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

      let respuesta = await _controlador.editarPagina(nuevaPagina.url, nuevaPagina.nombre, nuevaPagina.descripcion)
      res.send({mensaje: `Se editaron ${respuesta.rowCount} paginas`})
    } catch (error) {
      res.send({ Error: error.message})
    }
  })()
})

router.delete("/crud", (req, res) =>{
  (async () =>{
    try{
      let pagina = req.body
      let respuesta = await _controlador.borrarPagina(pagina.url)
      res.send({mensaje: `Se eliminaron ${respuesta.rowCount} paginas`})
    } catch (error){
      res.send({ Error: error.message})
    }
  })()
})

module.exports = router
