
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
renderizarCarrito(carrito)

fetch("./productos.json")
    .then(respuesta => respuesta.json())
    .then(productos => {
        renderizarProductos(productos)
        let inputs = document.getElementsByClassName("checks")
        for (const ind of inputs) {
            ind.addEventListener("click", () =>
                filtrarCategoria(productos, inputs))
        }
        let botonVaciar = document.getElementById('limpiar-carrito')
        botonVaciar.addEventListener("click", limpiarCarrito)

    })


function renderizarProductos(array) {
    let contenedor = document.getElementById("contenedor-productos")
    contenedor.innerHTML = ""
    array.forEach(producto => {
        let cards = document.createElement("div")
        cards.className = "cards"
        cards.innerHTML = `
            <div class=card-image> <img src=${producto.img}> </div>
            <div class=card-text> 
            <p class=card-meal-type> ${producto.categoria} </p>
            <h2 class=card-title> ${producto.nombre} </h2>
            <p class=card-body> ${producto.descripcion} </p>
            <button class=card-boton id=${producto.id}>Agregar</button>
            </div>
            <div class=card-price> $ ${producto.precio} </div>
            `
        contenedor.appendChild(cards)
        let boton = document.getElementById(producto.id)
        boton.addEventListener("click", (e) => {
            agregarProductoAlCarrito(e, array)

        })


    })
}

function agregarProductoAlCarrito(e, productos) {
    let seEncuentra = carrito.some(producto => producto.id === Number(e.target.id))
    if (seEncuentra) {
        lanzarToastify("Este producto ya está en el carrito")
    } else {
        let productoParaAgregar = productos.find(producto => producto.id === Number(e.target.id))
        carrito.push(productoParaAgregar)
    }
    renderizarCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}



function limpiarCarrito() {
    carrito.length = 0
    precioTotal.innerText = "0"
    localStorage.removeItem("carrito")
    renderizarCarrito(carrito)
}


function renderizarCarrito(array) {
    let carritoD = document.getElementById("contenedor-carrito")
    carritoD.innerHTML = ""

    array.forEach(producto => {
        let divCarrito = document.createElement("div")
        divCarrito.className = "productoEnElCarrito"
        divCarrito.innerHTML += `
        <table>  
        <tr id=tabla>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td> <p id=cantidad>  ${producto.cantidad} </p></td>
        <td> 
        <button id="agregar${producto.id}" class=button>
        <iconify-icon icon="material-symbols:add"></iconify-icon>
        </button>
        </td>
        <td>
        <button id="eliminar${producto.id}" class=button>
        <iconify-icon icon="ph:x-bold"></iconify-icon>
        </button>
        </td>
        </table>
        `
        carritoD.appendChild(divCarrito)

        let botonBorrar = document.getElementById(`eliminar${producto.id}`)
        botonBorrar.addEventListener("click", (e) => {
            eliminarProductoDelCarrito(e, array)
        })
        let botonAgregar = document.getElementById(`agregar${producto.id}`)
        botonAgregar.addEventListener("click", () => {
            aumentarCantidadDelCarrito(producto.id, array)
        })

        array.innerText = array.length
        let precioTotal = document.getElementById("precioTotal")
        precioTotal.innerText = array.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

    })
}

function aumentarCantidadDelCarrito(prodId, carrito) {
    let productoSelecionado = carrito.find(producto => producto.id === prodId)
    let indicex = carrito.findIndex(producto => producto.id === productoSelecionado.id)
    carrito[indicex].cantidad++
    renderizarCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function eliminarProductoDelCarrito(e, array) {
    let buscandoProducto = array.find(producto => producto.id === Number(e.target.id))
    let indiceDelProducto = array.indexOf(buscandoProducto)
    array.splice(indiceDelProducto, 1)
    precioTotal.innerText = "0"
    renderizarCarrito(array)
}

function filtrarCategoria(productos, inputs) {
    let filtros = []
    for (const ind of inputs) {
        if (ind.checked) {
            filtros.push(ind.id)
        }
    }
    let arrayFiltrado = productos.filter(producto => filtros.includes(producto.categoria))
    if (arrayFiltrado.length > 0) {
        renderizarProductos(arrayFiltrado)
    } else {
        renderizarProductos(productos)
    }
}

let finalizaCompra = document.getElementById("comprar")
finalizaCompra.addEventListener("click", terminarCompra)
function terminarCompra() {
    let carritoDo = document.getElementById("contenedor-carrito")
    carritoDo.innerHTML = ""
    lanzarToastify("Gracias por su compra!")
    localStorage.removeItem("carrito")
    precioTotal.innerText = "0"
}

function lanzarToastify(text) {
    Toastify({
        text: text,
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "tostada",
    }).showToast();
}



