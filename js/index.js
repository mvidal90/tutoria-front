const selectSection = (section) => {
  switch (section) {
    case "Historic":
      document.getElementById("main-section").src = "/pages/historia-clinica.html";
      return;

    case "Filters":
      document.getElementById("main-section").src = "/pages/variants-filtred.html";
      return;

    case "InformeRes":
      document.getElementById("main-section").src = "/pages/informeResultados.html";
    return;

    case "InformeCli":
      document.getElementById("main-section").src = "/pages/informeClinico.html";
    return;  
   
    case "Panel":
      document.getElementById("main-section").src = "/pages/panel-bioinformatico.html";
      return;  
    
    default:
      document.getElementById("main-section").src = "/pages/presentacion.html";
      return; 
  }
}