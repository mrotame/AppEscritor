setInterval(visibleSideBar,100)
window.capitulos = {};
var totalCapnum = 0;
var capAtual = undefined;
var selectedCap = undefined

var paintedCap = undefined
var paintedSes = undefined
setInterval(selectionCss,10)


function addCap(prename='') {
	var newCap = false;
	var capNum = 1;
	// Verifica se é um nome predefinido ou generico
	if (prename != '') {
		capName = prename
		capNum = ""
	} else {
		capName = "Novo capítulo"
	}
	window.capitulos[totalCapnum] = {'nome':capName,'conteudo':{}}
	newCap = true
	totalCapnum += 1
	// Insere o html com a devida formatação
	if(newCap == true){
		var element = document.getElementById('capList');
		element.innerHTML = element.innerHTML+`
		<div id="div-cap`+totalCapnum+`">
		<p id="overflowed">
				<a href="#!" onClick="deleteCap(`+totalCapnum+`)" class="waves-effect btn-tiny">
					<i style="color:#c62828" class="tiny material-icons">delete_forever</i>
				</a> 
				<a href="#!" onClick="alterCap(`+totalCapnum+`)" class="waves-effect btn-tiny">
					<i style="color:#4caf50" class="tiny material-icons">border_color</i>
				</a> 
			<a href="#!" onClick='selectCap(`+(totalCapnum-1)+`)' class="title" id='overflowed cap`+totalCapnum.toString()+`'>`+capName+`</a>
		</p>
		<br>
		</div>`
	selectCap(totalCapnum-1)
	}
	
	//console.log(capNum)
	console.log("capitulo "+capName+capNum+" criado")
	//selectCap((totalCapnum-1),	capAtual)
}

function deleteCap(capName) {
	$('#modalDeleteCapitulo').modal('open');
	window.toDelete = capName
}
function removeCap(capName) {
	if (totalCapnum >= 1){
		toDelCap = selectedCap
		if (selectedCap == totalCapnum-1) {
			selectCap(selectedCap-1)
			selectSes(0);
		}
		if (capName === 'last') {
			// Altera o capitulo se o deletado estiver selecionado

			// Deleta o capitulo
			delete window.capitulos[totalCapnum-1];	
			// Remove do html 
			var elem = document.getElementById('div-cap'+totalCapnum.toString());
			elem.parentNode.removeChild(elem);
			totalCapnum -= 1
			return true
		} else {
			capName = window.toDelete
			console.log(capName)
			// Deleta o capitulo
			delete window.capitulos[capName-1];
			totalCapnum -= 1
			// Remove do html 
			
			var elem = document.getElementById('div-cap'+(capName).toString());
			elem.parentNode.removeChild(elem);

			console.log("capitulo "+capName+" removido")
			$('#modalDeleteCapitulo').modal('close');
			return true
		}
	}
}

function alterCap(capNum) {
	console.log("Alterando capNum:",capNum)
	window.editing = capNum
	obj = $('#div-cap'+(window.editing).toString() +'> #overflowed > .title').html()
	console.log("obj:",obj)

	$("#modalAlterarCapitulo > .modal-content > .input-field > #capName").val(obj)
	$('#modalAlterarCapitulo').modal('open');
}
function alterCapName() {
	let capNum = window.editing
	let newName = $("#modalAlterarCapitulo > .modal-content > .input-field > #capName").val()
	if (newName == ""){
		newName = "Novo capítulo"
	} 
	//let toChange = 	$('#cap'+(capNum).toString() )
	window.capitulos[capNum-1]['nome'] = newName
	$('#div-cap'+(window.editing).toString() +'> #overflowed > .title').html(newName)
	$('#modalAlterarCapitulo').modal('close');
}

function selectCap(capNum){
	window.selectedCap = capNum
	window.totalsesnum = Object.keys(capitulos[capNum]['conteudo']).length
	if (window.totalsesnum === undefined){window.totalsesnum = 0}
	htmlList = ''
	console.log(window.totalsesnum)
	for(i=0; i < window.totalsesnum; i++) {
		
		htmlList += `
		<div id='div-ses-root`+(i)+`'>
			<div onClick='selectSes(`+i+`,window.sesAtual)' id='div-ses`+(i).toString()+`'>
				<a href="#!" >
					<p id='overflowed'>
					`+capitulos[capNum]['conteudo'][i]['nome']+`
					</p>
				</a>
			</div>
			<br>
		</div>`
	}
	var element = document.getElementById('sesList');
	element.innerHTML = htmlList
	//selectSes(0,window.sesAtual, capNum)
	if (window.totalsesnum === 0) {
		console.log("if")
		document.getElementById('sesTitle').value = ""
		document.getElementById('sesContent').value = ""
		sesAtual = undefined
	} else {
		selectFirstSes(window.selectedCap,sesAtual,capNum,0)
		sesAtual = 0
	}
	
}

function selectFirstSes(oldcap, oldses,newcap ,newses) {
	newcap = capitulos[newcap];
	console.log(newses)

	// Muda para sessão nova
	//document.getElementById('ses'+(oldses+1).toString()).innerHTML = document.getElementById('sesTitle').value+``,
	document.getElementById('sesTitle').value = newcap['conteudo'][newses]['nome']
	document.getElementById('sesContent').value = newcap['conteudo'][newses]['texto']
	M.textareaAutoResize($('#sesContent'));
}

function selectionCss() {
	// verifica os capitulos
	if(paintedCap !== selectedCap) {
		// Tira o background se não selecionado
		if (paintedCap !== undefined) {
			let oldElem = document.getElementById('div-cap'+(paintedCap+1).toString())
			if(oldElem != null){oldElem.style.backgroundColor = ''}
		}
		let newElem = document.getElementById('div-cap'+(selectedCap+1).toString())
		newElem.style.backgroundColor = '#424242'
		//elem.style.backgroundColor= 'red'
		paintedCap = selectedCap
	}

	// pinta as sessões
	// Tira o background se não selecionado
	if (paintedSes !== undefined) {
		let oldElem = document.getElementById('div-ses'+(paintedSes).toString())
		if(oldElem != null){oldElem.style.backgroundColor = ''}
	}
	if (sesAtual !== undefined) {
		let newElem = document.getElementById('div-ses'+(sesAtual).toString())
		newElem.style.backgroundColor = '#424242'
		paintedSes = sesAtual
	}

}

function visibleSideBar() {
	if (window.openedBook === undefined) {
		document.getElementById('sessionLine').style.visibility = 'hidden';
		document.getElementById('capLine').style.visibility = 'hidden';
		document.getElementById('bookTitle').style.visibility = 'hidden';
		document.getElementById('initialTitle').style.display = 'block';
	} else {
		document.getElementById('sessionLine').style.visibility = 'visible';
		document.getElementById('capLine').style.visibility = 'visible';
		document.getElementById('bookTitle').style.visibility = 'visible';
		document.getElementById('initialTitle').style.display = 'none';
	}

}