function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks,jsonResponse;
    var xhttp = new XMLHttpRequest();
    var urlGenesFenotipo= "http://127.0.0.1:5500/json/genesFenotipo.json";
    xhttp.responseType = 'json';

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        jsonResponse = xhttp.response;
        renderTable(jsonResponse);
      }
    };
   
    if(tabName == 'genesFenotipo'){
      xhttp.open("GET", urlGenesFenotipo, true);
      xhttp.send();
    }
}

function renderTable(jsonArray){

  // Obtener la referencia del elemento body
var body = document.getElementsByTagName("body")[0];

// Crea un elemento <table> y un elemento <tbody>
var tabla = document.getElementById("genesFenTable");
var tblBody = document.createElement("tbody");

// Crea las celdas
for (var i = 0; i < 51; i++) {
  // Crea las hileras de la tabla
  var hilera = document.createElement("tr");
  var myArr = jsonArray[i];

  Object.entries(myArr).forEach(([key, value]) => {
    // Crea un elemento <td> y un nodo de texto, haz que el nodo de
    // texto sea el contenido de <td>, ubica el elemento <td> al final
    // de la hilera de la tabla
    var celda = document.createElement("td");
    console.log( "Value "+value );
    var textoCelda = document.createTextNode(value);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
  });


  // agrega la hilera al final de la tabla (al final del elemento tblbody)
  tblBody.appendChild(hilera);
}

// posiciona el <tbody> debajo del elemento <table>
tabla.appendChild(tblBody);
// appends <table> into <body>
body.appendChild(tabla);
// modifica el atributo "border" de la tabla y lo fija a "2";
tabla.setAttribute("border", "2");
}

const showIDs = () => { 
  var text ="id";
  for (let i = 0; i < 12; i++) {
      document.getElementById(text.concat(i.toString())).style.display="block";
    }

}


let activeSection = "Historic";

const selectSection = (section) => {
    activeSection = section;

    switch (activeSection) {
        case "Historic":
            
            break;

        case "Filters":
            
            break;
        case "Panel":
            
            break;
    
        default:
            
            break;
    }
}