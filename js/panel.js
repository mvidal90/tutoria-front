const loadPanel  = () => {

    let url = "/json/panel.json"
    const xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const jsonResponse = xhttp.response;
            console.log(jsonResponse);
            renderTable(jsonResponse);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();

}

const renderTable = (jsonArray) => {

    // Crea un elemento <table> y un elemento <tbody>
    const tabla = document.getElementById("panel");
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
        const textoCelda = document.createTextNode(value || "");
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
    });
    }
}