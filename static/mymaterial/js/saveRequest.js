function saveBook(){
	// inclui o capitulo atual na variavel de todos os capitulos
	capitulos[capAtual] = [
		document.getElementById('capTitle').value,
		document.getElementById('capContent').value
		]

	var book = {
		'bookName': document.getElementById('book-name').innerHTML,
	    'capitulos': capitulos
	    }
	   console.log(book)

	$.ajax({
	url: "/savepage",
	type: 'POST',
	contentType: 'application/json',
	dataType : 'json',
	data: JSON.stringify(book),   // converts js value to JSON string
	})
	.done(function(result){     // on success get the return object from server
	    console.log(result)     // do whatever with it. In this case see it in console
	    if (result=='Error undefined') {
	    	alert('Erro: Nenhum livro aberto')
	    } else {
	    	alert('Livro salvo com sucesso')
	    }
	})
}