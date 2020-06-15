setInterval(visibleText,100)
var sessões = {};
window.totalsesnum = 0;
window.sesAtual = undefined;
setInterval(changeText,100);
setInterval(changeName,100);

function addSes(prename='Novo título') {
    if (window.selectedCap === undefined) {
        alert("Erro, crie um capitulo primeiro")
        return false 
    }
	var newses = false;
	// Verifica se é um nome predefinido ou generico
	capitulos[window.selectedCap]['conteudo'][window.totalsesnum] = {"nome":prename,'texto':""}

	window.totalsesnum += 1

	// Insere o html com a devida formatação
	var element = document.getElementById('sesList');
	element.innerHTML = element.innerHTML+`
	<div id='div-ses-root`+(window.totalsesnum-1)+`'>
		<div onClick='selectSes(`+(window.totalsesnum-1)+`,window.sesAtual)' id='div-ses`+(window.totalsesnum-1).toString()+`'>
			<a href="#!">
				<p id='overflowed'>
				`+prename+`
				</p>
			</a>
		</div>
		<br>
	</div>`

	selectSes((window.totalsesnum-1),window.sesAtual)
	
}
/*
//Redo
function removeSes(sesName) {
	if (window.totalsesnum >= 1) {
		if (sesName === 'last') {
			// Deleta o sesitulo
			delete window.sesitulos[window.totalsesnum-1];
			// Remove do html 
			var elem = document.getElementById('div-ses-root'+window.totalsesnum.toString());
			elem.parentNode.removeChild(elem);
			window.totalsesnum -= 1
			return true
		}
		sesName = window.toDelete
		// Deleta o sesitulo
		delete capitulos[selectedCap]['conteudo'][sesAtual];
		window.totalsesnum -= 1
		// Remove do html 
		
		var elem = document.getElementById('div-ses-root'+(sesName).toString());
		elem.parentNode.removeChild(elem);

		// Altera o sesitulo se o deletado estiver selecionado
		if (window.sesAtual == window.totalsesnum-1) {
			selectses(window.sesAtual-1)
		}
		
		$('#modalDeletesesitulo').modal('close');
		return true
	}
}*/

function removeSes(sesToDel) {
	if (totalsesnum > 1){
		toDelCap = sesAtual
		if (sesAtual == totalsesnum-1) {
			selectSes(sesAtual-1)
		}
		if (sesToDel === 'last') {
			// Altera o capitulo se o deletado estiver selecionado

			// Deleta o capitulo
			delete capitulos[selectedCap]['conteudo'][totalsesnum-1];	
			// Remove do html 
			var elem = document.getElementById('div-ses-root'+(totalsesnum-1).toString());
			elem.parentNode.removeChild(elem);
			totalsesnum -= 1
			return true
		} else {
			sesToDel = window.toDelete
			console.log(sesToDel)
			// Deleta a sessão
			delete window.capitulos[sesToDel-1];
			totalsesnum -= 1

			// Remove do html 
			var elem = document.getElementById('div-ses-root'+(sesToDel).toString());
			elem.parentNode.removeChild(elem);

			console.log("capitulo "+sesToDel+" removido")
			$('#modalDeleteCapitulo').modal('close');
			return true
		}
	} else if(totalsesnum === 1) {
		delete capitulos[selectedCap]['conteudo'][totalsesnum-1];
		var elem = document.getElementById('div-ses'+(totalsesnum-1).toString());
		elem.parentNode.removeChild(elem);
		document.getElementById('sesTitle').value = '';
		document.getElementById('sesContent').value = '';
		sesAtual = undefined;
		totalsesnum -= 1
	}
}
//Redo
function alterSes(oldSesNum,newSesNam) {

}

function selectSes(newses,oldses="vazio"){
	if (totalsesnum == 0) {
		return true
	}

	if (oldses === "vazio") {
	
		document.getElementById('sesTitle').value = capitulos[window.selectedCap]['conteudo'][newses]['nome']
		document.getElementById('sesContent').value = capitulos[window.selectedCap]['conteudo'][newses]['texto']

	}else {

		cap = capitulos[window.selectedCap]
		// Muda para sessão nova
		//document.getElementById('ses'+(oldses+1).toString()).innerHTML = document.getElementById('sesTitle').value+``,
		document.getElementById('sesTitle').value = cap['conteudo'][newses]['nome']
		document.getElementById('sesContent').value = cap['conteudo'][newses]['texto']
		
		
		
	}
	window.sesAtual = newses

	M.textareaAutoResize($('#sesContent'));
}


// Muda o titulo da sessão
function changeName() {
	title = document.getElementById('sesTitle') 
	if(sesAtual !== undefined) {
		//console.log("fora do titulo");
		sesToChangeName = sesAtual
		old = document.getElementById('div-ses'+sesToChangeName.toString()).innerHTML;
		newOne = document.getElementById('sesTitle').value;
		
		if (newOne == "") {
			name =  "Novo título";
		} else{
			name =  title.value+"";
		}
		document.getElementById('div-ses'+sesAtual).innerHTML = "<p id='overflowed'>"+name+"</p>"
		capitulos[window.selectedCap]['conteudo'][sesAtual]['nome'] = name
	}
}

// Muda o texto da sessão
function changeText() {
	if(sesAtual !== undefined) {
		texto = document.getElementById('sesContent').value
		capitulos[window.selectedCap]['conteudo'][sesAtual]['texto'] = texto
	}
}

function visibleText() {
	if (sesAtual === undefined) {
		document.getElementById('escrever').style.visibility = 'hidden';
	} else {
		document.getElementById('escrever').style.visibility = 'visible';
	}

}