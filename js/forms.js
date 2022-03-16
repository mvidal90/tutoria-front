function ocultarElemento(elemento) {
    var x = document.getElementById(elemento);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
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