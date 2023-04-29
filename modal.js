const contenedorModal = document.getElementsByClassName("contenedorDelCarrito")[0]
const botonAbrir = document.getElementById("abrirCarrito")
const botonCerrar = document.getElementById("cerrarCarrito")
const modalCarrito = document.getElementsByClassName("contenedorCarritoHijo")[0]


botonAbrir.addEventListener("click", ()=>{
    contenedorModal.classList.toggle("active")
})
botonCerrar.addEventListener("click", ()=>{
    contenedorModal.classList.toggle("active")
})

contenedorModal.addEventListener("click", () =>{
    contenedorModal.classList.toggle("active")

})
modalCarrito.addEventListener("click", (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})