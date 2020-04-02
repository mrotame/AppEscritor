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
		capName = "capítulo"
	}
	
	// Verifica a contagem de numer ode capitulos para inserir o numero correto no nome do capitulo
	if (prename == '') {
		while (true){
			var actualNum = capNum
			for(var i in capitulos) {
				if (capitulos[i][0] == capName+" "+capNum){
					capNum += 1
				}
			}
			if (actualNum == capNum) {
				break
			}
		}
	}

	capitulos[totalCapnum] = [capName+" "+capNum,""]
	newCap = true
	totalCapnum += 1

	if (prename != "" && capNum == 1) {
		capNum = ""
	}
	// Insere o html com a devida formatação
	if(newCap == true){
		var element = document.getElementById('capList');
		element.innerHTML = element.innerHTML+"<a href='#!' onClick='changeCap("+(totalCapnum-1)+",capAtual)' id='cap"+totalCapnum.toString()+"'>"+capName+" "+capNum+"<br></a>"
	}
	
	console.log(capNum)
	console.log("capitulo "+capName+capNum+" criado")
}

function removeCap(capname) {
	// Remove do html 
	var elem = document.getElementById('cap'+totalCapnum.toString());
    elem.parentNode.removeChild(elem);

    // Altera o capitulo se o deletado estiver selecionado
    if (capAtual == totalCapnum-1) {
    	changeCap(capAtual-1)
    }
    // Deleta o capitulo
	delete capitulos[totalCapnum-1];
	totalCapnum -= 1



	console.log("capitulo "+capname+" removido")
	return false
}

function alterCap(oldname,newname,content) {
	console.log("capitulo "+oldname+" alterado")
}

function changeCap(newCap,oldCap='sabado'){
	console.log(newCap,oldCap)	
	if (oldCap == 'sabado') {
		console.log('if')
		capAtual = newCap
		document.getElementById('capTitle').value = capitulos[newCap][0]
		document.getElementById('capContent').value = capitulos[newCap][1]

	}else {
		console.log('else')
		console.log(document.getElementById('capTitle').value)
		console.log(document.getElementById('capContent').value)
		
		capitulos[oldCap] = [
		document.getElementById('capTitle').value,
		document.getElementById('capContent').value
		]
		document.getElementById('capTitle').value = capitulos[newCap][0]
		document.getElementById('capContent').value = capitulos[newCap][1]
		
		capAtual = newCap
		console.log('capAtual = '+capAtual)
	}
}

window.addEventListener('click', function(e){   
  if (document.getElementById('capTitle').contains(e.target)){
    console.log('dentro do titulo')
  } else{
  	// if( totalCapnum >= 5) {
	    console.log("fora do titulo");
	    capToChangeName = capAtual+1
	    old = document.getElementById('cap'+capToChangeName.toString()).innerHTML;
	    newOne = document.getElementById('capTitle').value;
	    console.log(old)
	    console.log(newOne)	
	    if (old != newOne) {
	    	if (newOne == "") {
	    		document.getElementById('cap'+capToChangeName.toString()).innerHTML = "Novo capitulo<br>";
	    	} else{
	    		document.getElementById('cap'+capToChangeName.toString()).innerHTML = document.getElementById('capTitle').value+"<br>";
	    	}
	    }
	}
    
  // }
});

