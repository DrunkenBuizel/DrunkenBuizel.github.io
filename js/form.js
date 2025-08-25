

const persona = {
    id: 0,
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    ciudad: "",
    pais: ""

}

function guardarDatos(e){

    persona.nombre = document.forms['fcontact']['nombre'].value;
    persona.apellido = document.forms['fcontact']['apellido'].value;
    persona.telefono = document.forms['fcontact']['telefono'].value;
    persona.email = document.forms['fcontact']['email'].value;
    persona.ciudad = document.forms['fcontact']['ciudad'].value;
    persona.pais = document.forms['fcontact']['pais'].value;

    if (persona.id <= 0){

        persona.id = new Date().valueOf();
    }

    var personaJSON = JSON.stringify(persona);
    localStorage.setItem(persona.id,personaJSON);
    
    e.preventDefault();
    showContact();
    resetForm();
}


//Funcion para conocer datos del local Storage dentro de la pagina en la vista de desarrollador 

function knowStorage(){

    var values =[];
    keys = Object.keys(localStorage);
    i = keys.length;

    while (i--) {

        values.push(localStorage.getItem(keys[i]));

    }
    return values;  
}

function verDetalle(){
    
    let contactoID = obtenerParametroUrl();
    let contacto = localStorage.getItem(contactoID);

    if (contacto.length > 0){
        let personaObjeto = JSON.parse(contacto);
        document.getElementById("nombre").innerText = personaObjeto.nombre;
        document.getElementById("apellido").innerText = personaObjeto.apellido;
        document.getElementById("numeroTelefono").innerText = personaObjeto.telefono;
        document.getElementById("email").innerText = personaObjeto.email;
        document.getElementById("ciudad").innerText = personaObjeto.ciudad;
        document.getElementById("pais").innerText = personaObjeto.pais;
    }
}

//Funcion de obtencion de parametro desde la URL
function obtenerParametroUrl(){

    let url = window.location.href;
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let parameterID = 0;

    for (let pair of queryString.entries()){
        console.log("Key is: " + pair[0]);
        console.log("Value is: " + pair[1]);
        parameterID = Number(pair[1]);
    }

    return parameterID;
}

function modificarDatos(id){
    let contacto = localStorage.getItem(id);

    if (contacto.length > 0){
        let personaObjeto = JSON.parse(contacto);
        document.getElementById("nombre").value = personaObjeto.nombre;
        document.getElementById("apellido").value = personaObjeto.apellido;
        document.getElementById("telefono").value = personaObjeto.telefono;
        document.getElementById("email").value = personaObjeto.email;
        document.getElementById("ciudad").value = personaObjeto.ciudad;
        document.getElementById("pais").value = personaObjeto.pais;

        persona.id = id;
    }

    showContact()
}

function eliminar(id){
    let contacto = localStorage.getItem(id);

    if(contacto.length > 0){
        localStorage.removeItem(id);
        alert ("Contacto eliminado con éxito");
        showContact()
    }
}

//Funcion para mostrar lista de contactos
function showContact(){

    //Inicializo el header de la lista
    let dinamicTable = "";
    dinamicTable += "<table class = 'table table-striped'>";

    dinamicTable += "<tr>";

        dinamicTable += "<th> ID </th>";
        dinamicTable += "<th> Nombre </th>";
        dinamicTable += "<th> Apellido </th>";
        dinamicTable += "<th> Teléfono </th>";
        dinamicTable += "<th> Email </th>";
        dinamicTable += "<th class = 'text-center'> Acción </th>";

    dinamicTable += "</tr>";

    //Ciclo for para agregar los datos que me entrega el arreglo de personaArray

    var aux = [];
    aux = knowStorage();

    for(let i = 0; i < aux.length; i = i + 1){
    
    let personaObjeto = JSON.parse(aux[i]);

    dinamicTable += "<tr>";

        dinamicTable += "<td>";
        dinamicTable += personaObjeto.id;
        dinamicTable += "</td>";

        dinamicTable += "<td>";
        dinamicTable += personaObjeto.nombre;
        dinamicTable += "</td>";

        dinamicTable += "<td>";
        dinamicTable += personaObjeto.apellido;
        dinamicTable += "</td>";

        dinamicTable += "<td>";
        dinamicTable += personaObjeto.telefono;
        dinamicTable += "</td>";

        dinamicTable += "<td>";
        dinamicTable += personaObjeto.email;
        dinamicTable += "</td>";

        // ?=id  le envia un parametro a la siguiente vista
        dinamicTable += "<td class = 'text-center'>"
        dinamicTable += '<a class = "btn btn-primary rounded me-2" href="./detalle.html?id='+ personaObjeto.id +'"> Ver datos </a>';
        dinamicTable += '<a class = "btn btn-primary rounded me-2" id = "botonEdit" href="javascript:modificarDatos('+ personaObjeto.id +');"> Editar </a>';
        dinamicTable += '<a class = "btn btn-primary rounded" href="javascript:eliminar('+ personaObjeto.id +');"> Eliminar </a>';
        dinamicTable += "</td>";

   

    dinamicTable += "</tr>";
    }
    

    dinamicTable += "</table>";

    document.getElementById('tablaContacto').classList.add('scrollable-area');
    
    document.getElementById("tablaContacto").innerHTML = dinamicTable;
}

function resetForm(){

    document.forms["fcontact"].reset();
    persona.id = 0;
    
}
