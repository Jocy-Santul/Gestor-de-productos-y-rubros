//utilizando localstorage,crear una app que permita gestionar una lista de productos y los rubros a los cuales pertenecen.
//Agarra la tabla para despues poder poner o sacar los elementos de la tabla.
let tbody= document.getElementById("Tabla")
let formulario= document.querySelector(".FormularioProductos")
let tabla= document.querySelector(".Tabla")
let inicio = document.querySelector(".inicio")
let Dialog = document.getElementById("formEditar")
let botonEditar = document.getElementById("editarBoton")
let input1 = document.getElementById("PrecioEditado")
let input2 = document.getElementById("StockEditado")

let Productos= JSON.parse(localStorage.getItem("Producto")) || [];
let Rubros= [] 
//oculta el formulario y la tabla de productos y me deja en em principio
function VolverInicio() {
    inicio.removeAttribute("hidden")
    tabla.setAttribute("hidden", true)
    formulario.setAttribute("hidden", true)
}
//muestra el formulario para agregar los productos
function MostrarFormulario() {
    formulario.removeAttribute("hidden")
    inicio.setAttribute("hidden", true)
    tabla.setAttribute("hidden", true)
}
//muestra la tabla
function MostrarTabla() {
    tabla.removeAttribute("hidden")
    inicio.setAttribute("hidden", true)
    formulario.setAttribute("hidden", true)
    AgrTabla(Productos)
}


//se agregan los productos y los rubros.
function Agregar(nombre, precio, stock, rubro) {
    if (nombre === Productos.Nombre) {
        alert("El producto ya existe")
    } else {
        Productos.push({
            Nombre: nombre,
            Precio: parseFloat(precio),
            Stock: parseInt(stock),
            Rubro: rubro
        })
        //agrega los productos al array de productos
        Rubros.push(rubro)
        AgrTabla(Productos)
        alert("El producto se agrego")
        //se guarda en el localStorage
        localStorage.setItem("Producto", JSON.stringify(Productos))
    }
}
//agrega los productos en la tabla
function AgrTabla(productos) {
    tbody.innerHTML = "";
    productos.forEach((elemento, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${elemento.Nombre}</td>
                <td>$${elemento.Precio}</td>
                <td>${elemento.Stock}</td>
                <td>${elemento.Rubro}</td>
                <td class="acciones">
                    <button
                    title="Borrar producto"
                    onclick="Borrar(${index})"><img src="./img/delete.png">
                    </button>
                </td>
                <td class="acciones">
                    <button 
                    title="Editar producto" 
                    onclick="Editar(${index})"><img src="./img/write.png">
                    </button>
                </td>
            </tr>
        `;
    });
}

function Borrar(index) {
    // se elimina el producto del array
    Productos.splice(index, 1); 
    localStorage.setItem("Producto", JSON.stringify(Productos));
    AgrTabla(JSON.parse(localStorage.getItem("Producto")));
}


function Editar(index) {
    // let edita = JSON.parse(localStorage.getItem("Producto")) || [];
    // let EditarStock = parseInt(prompt("stock"))
    // let EditarPrecio = parseFloat(prompt("precio"))
    // if ((EditarStock === "") && (EditarPrecio === "")) {
    //     edita[index].Stock = edita[index].Stock
    //     edita[index].Precio = edita[index].Precio 
    // } 
    // else{
    //     edita[index].Stock = EditarStock
    //     edita[index].Precio = EditarPrecio
    //     localStorage.setItem("Producto", JSON.stringify(edita))
    //     return AgrTabla(JSON.parse(localStorage.getItem("Producto")));
    // }
    Dialog.showModal()
    botonEditar.addEventListener("click", () => {
        
        if ((!input1.value) || (!input2.value)) {
            Productos[index].Precio = input1.value || Productos[index].Precio
            Productos[index].Stock = input2.value || Productos[index].Stock
            localStorage.setItem("Producto", JSON.stringify(Productos))
            AgrTabla(Productos)
            Dialog.close()
        }
        else{ 
            Productos[index].Precio = input1.value 
            Productos[index].Stock = input2.value 
            localStorage.setItem("Producto", JSON.stringify(Productos))
            AgrTabla(Productos)
            Dialog.close()
        }
    })
}

console.log(JSON.parse(localStorage.getItem("Producto")))

document.addEventListener("DOMContentLoaded", AgrTabla)