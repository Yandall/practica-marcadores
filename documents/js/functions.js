const request = new Request('/crud/all', {method: 'GET'})

function obtenerPaginas(){
    fetch(request)
    .then(res =>{
        return res.json()
    }).then(response =>{
        console.log(response)
    })
    .catch(error =>{
        
    })
}

