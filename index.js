const transcript = 5;
const primaryKeys = [ "CHROM", "POS", "REF", "ALT", "GT", "AD", "DP", "ID", "GENE", "HGVS_C", "HGVS_P", "FEATUREID"];
let rows;

const openTab = (evt, tabName) => {
  // Declare all variables
  let i, tabcontent, tablinks;
  const xhttp = new XMLHttpRequest();
  const urlGenesFenotipo = "http://127.0.0.1:5500/json/genesFenotipo.json";
  xhttp.responseType = 'json';

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResponse = 
        xhttp.response.map( obj => ({
          ...obj,
          "GENE": obj["GENE"].split(",")[transcript], 
          "HGVS_C": obj["HGVS_C"].split(",")[transcript], 
          "HGVS_P": obj["HGVS_P"].split(",")[transcript], 
          "FEATUREID": obj["FEATUREID"].split(",")[transcript], 
          "EFFECT": obj["EFFECT"].split(",")[transcript], 
          "IMPACT": obj["IMPACT"].split(",")[transcript], 
          "HDIV_pred": obj["HDIV_pred"].split(",")[transcript], 
          "HVAR_pred": obj["HVAR_pred"].split(",")[transcript], 
          "SIFT_pred": obj["SIFT_pred"].split(",")[transcript], 
          "Taster_pred": obj["Taster_pred"].split(",")[transcript],
          "Assessor_pred": obj["Assessor_pred"].split(",")[transcript]
        }));

      rows = jsonResponse;
      renderTable(jsonResponse);
    }
  };

  if (tabName == 'genesFenotipo') {
    xhttp.open("GET", urlGenesFenotipo, true);
    xhttp.send();
  }
}

const renderTable = (jsonArray) => {

  // Crea un elemento <table> y un elemento <tbody>
  const tabla = document.getElementById("genesFenTable");
  const tblBody = document.createElement("tbody");
  // Crea las celdas
  for (let i = 0; i < jsonArray.length; i++) {
    // Crea las hileras de la tabla
    const hilera = document.createElement("tr");
    const objGen = jsonArray[i];

    Object.entries(objGen).forEach(([key, value]) => {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      const celda = document.createElement("td");

      if (primaryKeys.includes(key)) {
        celda.id = `celda-key-${key}-${i}`;
      }
      // console.log( "Value "+value )
      const textoCelda = document.createTextNode(value || "");
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    });
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}

const showIDs = () => {
  const textHead = "id";
  const textTr = "celda-key-";
  for (let i = 0; i < primaryKeys.length; i++) {
    const head = document.getElementById(textHead.concat(i.toString()));
    if (head.style.display === "none") {
      head.style.display = "block";
    } else {
      head.style.display = "none"
    }
  }
  
  for (let i = 0; i < rows.length; i++) {
    for (let k = 0; k < primaryKeys.length; k++) {
      const celda = document.getElementById(`${textTr}${primaryKeys[k]}-${i}`);
      if (celda.style.display === "none") {
        celda.style.display = "block";
      } else {
        celda.style.display = "none"
      }
    }
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