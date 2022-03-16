function mostrarElemento(event, elemento) {
    event.preventDefault();  
  
    const discleimer = document.getElementById(elemento);
    if (discleimer.style.display === 'block') {
      discleimer.style.display = 'none';
    } else {
      discleimer.style.display = 'block';
    }
  }


function mostrarValorFrecuencia(){
  const valorFrecuencia = document.getElementById("frecuenciaPoblacional").value;
  document.getElementById("valorFrecuencia").innerHTML = Number.parseFloat(valorFrecuencia).toFixed(2);
}

function filtarPorPredictoresBionformaticos(){}

function filtarPorImpactoFuncional(){}

function filtrarPorTranscripto(){
  document.getElementById(colTrans).innerHTML = document.getElementById("transcriptoNro").value;
}