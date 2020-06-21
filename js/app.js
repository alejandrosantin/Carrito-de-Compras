//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');



//EventListeners
cargarEventListeners();

function cargarEventListeners() {
    //Dispara cuando se hace click en 'Agregar al Carrito'
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //Al cargar documento, mostrar LS
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}







//Funciones
//Funcion que añade el curso al carrito 
function comprarCurso(e) {
    e.preventDefault();
    //Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}
//Leer los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCurso(infoCurso);

}

//Muestra el curso seleccionado en el carrito
function insertarCurso(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src = "${curso.imagen}"width = 100 >
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href = "#" class = "borrar-curso" data-id = "${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//Elimina el Curso del carrito
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
}

//Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    //Forma lenta
    //listaCursos.innerHTML = '';
    //Forma rapida (recomendada)
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    //Vaciar Local Storage
    vaciarLocalStorage();

    return false;
}

//Guardar cursos del carrito en el Local Storage
function guardarCursoLocalStorage(curso) {
    let cursos;

    //Toma el valor de un arreglo con datos del LocalStorage o vacio
    cursos = obtenerCursosLocalStorage();

    //El curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

//Comprueba que haya elementos en LocalStorage
function obtenerCursosLocalStorage() {
    let cursosLS;

    //Comprobamos si hay algo en LocalStorage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//Imprime los cursos de LS en el carrito al cargar pagina
function leerLocalStorage() {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(function(curso) {
        //Construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = "${curso.imagen}"width = 100 >
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href = "#" class = "borrar-curso" data-id = "${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    });
}

//Elimina el curso del Local Storage usando el id
function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    //Obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    //Iteramos comparando el ID del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS, index) {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    console.log(cursosLS);
    //Añadimos el arreglo actual a LS
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//Elimina todos los cursos de Local Storage
function vaciarLocalStorage() {
    localStorage.clear();
}