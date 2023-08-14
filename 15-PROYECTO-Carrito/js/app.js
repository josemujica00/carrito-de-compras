// ! PROYECTO CARRITO DE COMPRAS

// ? Creando variables
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const btn = document.querySelector('#vaciar-carrito');
const lista = document.querySelector('#lista-carrito tbody');
let articulosCarrito = [];

// ? Eventos
registroEventos();

function registroEventos(){
    // Agregar cursos al carrito
    cursos.addEventListener('click', agregarCarrito);

    // Elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    btn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    });
}

// ? Funciones
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id'); 

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        // console.log(articulosCarrito);
        // console.log(cursoId);
        agregarHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

function agregarCarrito(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// ? Leer el contenido del curso y extraer información
function leerDatosCurso(curso){
    //console.log(curso);

    // Crea un objeto con los datos del curso
    infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe) {
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Retorna valor actualizado
            } else{
                return curso; // Retorna valor no duplicado
            }
        });
        articulosCarrito = [...cursos];
    } else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(existe);
    // console.log(articulosCarrito);

    agregarHTML();
}

// Crear HTML y mostrarlo en el carrito
function agregarHTML (){
    // Limpiar el HTML
    limpiarHTML();

    // Recorrer el carrito y crear HTML
    articulosCarrito.forEach(curso => {
        const {imagen, nombre, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src= "${imagen}" width= "100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;

        lista.appendChild(row);
    });
}

// Limpiar HTML
function limpiarHTML(){
    // Forma más lenta
    // lista.innerHTML = '';

    // Forma más rapida o Con mejor performance
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
}

