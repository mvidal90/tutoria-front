
let transcript = 5;
const primaryKeys = ["CHROM", "POS", "REF", "ALT", "GT", "AD", "DP", "ID", "GENE", "HGVS_C", "HGVS_P", "FEATUREID"];
const editables = ["HPO", "Herencia", "Relación_Fenotipo", "Candidata"];
let rows, tableName;

const changeRowState = (e) => {
  const row = e.path[3];
  const tooltip = e.path[2];
  if ((e.target.id.includes("editable-key-Candidata-") || e.target.id.includes("editable-key-Relación_Fenotipo-")) && e.target.value == "SI") {
    row.style["background-color"] = "rgb(255, 153, 153)";
    if (e.target.id.includes("editable-key-Candidata-") && e.target.value === "SI") {
      tooltip.title="Encontrado en 5 pacientes"
    }
  }
  if (e.target.id.includes("editable-key-Candidata-") && !e.target.value) {
    row.style["background-color"] = "transparent";
    tooltip.title=""
  }
}

function openTab(evt, tabName) {
  // Declare all variables
  let i, tabcontent, tablinks, url;

  const xhttp = new XMLHttpRequest();
  xhttp.responseType = 'json';

  if (tabName == 'genesFenotipo') {
    url = "/json/genesFenotipo.json";
  } else if (tabName == 'pathogenic') {
    url = "/json/pathogenic.json";
  } else if (tabName == 'incidental') {
    url = "/json/incidental.json";
  } else {
    url = "/json/todos.json";
  }

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
  document.getElementById(`${tabName}Section`).style.display = "block";
  evt.currentTarget.className += "active";

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const jsonResponse = xhttp.response.map(obj => ({
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
        "Assessor_pred": obj["Assessor_pred"].split(",")[transcript],
        "ExAC_AF": obj["ExAC_AF"] ? parseFloat(obj["ExAC_AF"]).toFixed(4) : "",
      }));

      rows = jsonResponse;
      tableName = tabName;
      renderTable(jsonResponse);
    }
  };

  xhttp.open("GET", url, true);
  xhttp.send();
}

const renderTable = (jsonArray) => {
  // Crea un elemento <table> y un elemento <tbody>
  const tabla = document.getElementById(tableName);
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

      const textoCelda = document.createTextNode(value || "");

      //código con input editable

      if (key != "HPO" && key != "Herencia" && key != "Relación_Fenotipo" && key != "Candidata") {
        celda.appendChild(textoCelda);
      } else {
        const inputEditable = document.createElement("input");
        const tooltip = document.createElement("span");
        inputEditable.className = "editable-cell";
        inputEditable.id = `editable-key-${key}-${i}`;
        inputEditable.value = value || "";
        inputEditable.onchange = changeRowState;
        if (key == "Relación_Fenotipo" && value == "SI") {
          tooltip.title="Encontrado en 3 pacientes"
        }
        if (key == "Candidata" && value == "SI") {
          tooltip.title="Encontrado en 3 pacientes"
        }
        tooltip.appendChild(inputEditable);
        celda.appendChild(tooltip);
      }

      hilera.appendChild(celda);

      //código alerta variante candidata y relación con el fenotipo si/no

      if (key == "Relación_Fenotipo" && value == "SI") {
        hilera.style["background-color"] = "rgb(255, 153, 153)";
      }
      
      if (key == "Candidata" && value == "SI") {
        hilera.style["background-color"] = "rgb(255, 153, 153)";
      }

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
      head.style.display = "table-cell";
    } else {
      head.style.display = "none"
    }
  }

  for (let i = 0; i < rows.length; i++) {
    for (let k = 0; k < primaryKeys.length; k++) {
      const celda = document.getElementById(`${textTr}${primaryKeys[k]}-${i}`);
      if (celda.style.display === "none") {
        celda.style.display = "table-cell";
      } else {
        celda.style.display = "none";
      }
    }
  }

}

const filtraPorTranscripto = () => {
  transcript = document.getElementById("transcriptoNro").value;
  openTab({}, tableName);
}