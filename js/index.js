const selectSection = (section) => {
  switch (section) {
    case "Historic":
      document.getElementById("main-section").src = "/pages/historiaClinica.html";
      return;

    case "Filters":
      document.getElementById("main-section").src = "/pages/filtradoDeVariantes.html";
      return;

    case "InformeRes":
      document.getElementById("main-section").src = "/pages/informeResultados.html";
    return;

    case "InformeCli":
      document.getElementById("main-section").src = "/pages/informeClinico.html";
    return;  
   
    case "Panel":
      document.getElementById("main-section").src = "/pages/panelBioinformatico.html";
      return;  
    
    default:
      document.getElementById("main-section").src = "/pages/presentacion.html";
      return; 
  }
}