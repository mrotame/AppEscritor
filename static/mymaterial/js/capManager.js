var capitulos = {};
var totalCapnum = 0;
var capAtual = undefined;

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
	capitulos[totalCapnum] = [capName,{}]
	newCap = true
	totalCapnum += 1
	// Insere o html com a devida formatação
	if(newCap == true){
		var element = document.getElementById('capList');
		element.innerHTML = element.innerHTML+`
		<div id="div-cap`+totalCapnum+`">
		<a href="#!" onClick="deleteCap(`+totalCapnum+`)" class="waves-effect btn-tiny">
		<i style="color:#c62828" class="tiny material-icons">delete_forever</i>
	</a> 
	<a href="#!" onClick="alterCap(`+totalCapnum+`)" class="waves-effect btn-tiny">
		<i style="color:#4caf50" class="tiny material-icons">border_color</i>
	</a> 
	&nbsp;&nbsp; 
	<a href="#!" onClick='changeCap(`+(totalCapnum-1)+`)' id='cap`+totalCapnum.toString()+`'>`+capName+`</a>
	<br>
	</div>`
	}
	
	//console.log(capNum)
	console.log("capitulo "+capName+capNum+" criado")
	changeCap((totalCapnum-1),	capAtual)
}

function deleteCap(capName) {
	$('#modalDeleteCapitulo').modal('open');
	window.toDelete = capName
}
function removeCap(capName) {
	
	if (capName === 'last') {
		// Deleta o capitulo
		delete capitulos[totalCapnum-1];
		totalCapnum -= 1
		// Remove do html 
		var elem = document.getElementById('div-cap'+totalCapnum.toString());
		elem.parentNode.removeChild(elem);
		return true
	}
	capName = window.toDelete
	console.log(capName)
	// Deleta o capitulo
	delete capitulos[capName-1];
	totalCapnum -= 1
	// Remove do html 
	
	var elem = document.getElementById('div-cap'+(capName).toString());
    elem.parentNode.removeChild(elem);

    // Altera o capitulo se o deletado estiver selecionado
    if (capAtual == totalCapnum-1) {
    	changeCap(capAtual-1)
    }
    
	console.log("capitulo "+capName+" removido")
	$('#modalDeleteCapitulo').modal('close');
	return true
}

function alterCap(capNum) {
	console.log("Alterando capNum:",capNum)
	window.editing = capNum
	obj = $('#cap'+(window.editing).toString()).html()
	console.log("obj:",obj)

	$("#modalAlterarCapitulo > .modal-content > .input-field > #capName").val(obj)
	$('#modalAlterarCapitulo').modal('open');
}
function alterCapName() {
	let capNum = window.editing
	let newName = $("#modalAlterarCapitulo > .modal-content > .input-field > #capName").val()
	let toChange = 	$('#cap'+(capNum).toString())
	capitulos[capNum-1][0] = newName
	$('#cap'+(capNum).toString()).html(newName)
	$('#modalAlterarCapitulo').modal('close');
}

function changeCap(newCap){
	
}
// Muda o titulo do capitulo ao clicar fora dele

