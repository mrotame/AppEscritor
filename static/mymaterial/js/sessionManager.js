var sessões = {};
var totalsesnum = 0;
var sesAtual = undefined;

function addSes(prename='') {
    if (capAtual == undefined) {
        alert("Erro, crie um capitulo primeiro")
        return false 
    }
	var newses = false;
	var sesNum = 1;
	// Verifica se é um nome predefinido ou generico
	if (prename != '') {
		sesName = prename
		sesNum = ""
	} else {
		sesName = "Novo título"
	}
	

	sessões[totalsesnum] = [sesName,""]
	newses = true
	totalsesnum += 1

	// Insere o html com a devida formatação
	if(newses == true){
		var element = document.getElementById('sesList');
		element.innerHTML = element.innerHTML+"<a href='#!' onClick='changeSes("+(totalsesnum-1)+",sesAtual)' id='ses"+totalsesnum.toString()+"'>"+sesName+"</a>"+"<br>"
	}
	
	console.log(sesNum)
	console.log("sesitulo "+sesName+sesNum+" criado")
	changeSes((totalsesnum-1),	sesAtual)
}

function removeSes(sesName) {
	// Remove do html 
	var elem = document.getElementById('ses'+totalsesnum.toString());
    elem.parentNode.removeChild(elem);

    // Altera o sesitulo se o deletado estiver selecionado
    if (sesAtual == totalsesnum-1) {
    	changeSes(sesAtual-1)
    }
    // Deleta o sesitulo
	delete sessões[totalsesnum-1];
	totalsesnum -= 1



	console.log("sesitulo "+sesName+" removido")
	return false
}

function alterSes(oldname,newname,content) {
	console.log("sesitulo "+oldname+" alterado")
}

function changeSes(newses,oldses='235464fdsfsdf654er13'){
	console.log(newses,oldses)	
	if (oldses == '235464fdsfsdf654er13') {
		console.log('if')
		sesAtual = newses
		document.getElementById('sesTitle').value = sessões[newses][0]
		document.getElementById('sesContent').value = sessões[newses][1]

	}else {
		console.log('else')
		console.log(document.getElementById('sesTitle').value)
		console.log(document.getElementById('sesContent').value)
		
		sessões[oldses] = [
		document.getElementById('sesTitle').value,
		document.getElementById('sesContent').value
		]
		console.log("oldses:",oldses)
		document.getElementById('ses'+(oldses+1).toString()).innerHTML = document.getElementById('sesTitle').value+`<br>`,
		document.getElementById('sesTitle').value = sessões[newses][0]
		document.getElementById('sesContent').value = sessões[newses][1]
		
		sesAtual = newses
		console.log('sesAtual = '+sesAtual)
	}
	M.textareaAutoResize($('#sesContent'));
}
// Muda o titulo do sesitulo ao clicar fora dele

window.addEventListener('click', function(e){  
	title = document.getElementById('sesTitle') 
  if (title.contains(e.target)){
    console.log('dentro do titulo')
  } else{
  	// if( totalsesnum >= 5) {
	    console.log("fora do titulo");
	    sesToChangeName = sesAtual+1
	    old = document.getElementById('ses'+sesToChangeName.toString()).innerHTML;
	    newOne = document.getElementById('sesTitle').value;
	    //console.log(old)
		//console.log(newOne)	
		
		if (newOne == "") {
			//console.log("Mudado if");
			name =  "Novo titulo<br>";
		} else{
			//console.log("Mudado else");
			name =  title.value+"<br>";
		}
		document.getElementById('ses'+sesToChangeName.toString()).innerHTML = name
		this.console.log("ses pra mudar:",sesToChangeName.toString())
	}
    
  // }
});

