setInterval(openModalDetection,500)

function newBookRequest() {
	var book = {
		'bookName': document.getElementById('nomeLivro').value
	    }
	   console.log(book)

	   $.ajax({
	url: "/newbookpage",
	type: 'POST',
	contentType: 'application/json',
	dataType : 'json',
	data: JSON.stringify(book),   // converts js value to JSON string
	})
	.done(function(result){     // on success get the return object from server
	    console.log(result)     // do whatever with it. In this case see it in console
	    if (result == 'ok') {
			window.openedBook = book['bookName']
			$('#modalNovoLivro').modal('close');
			document.getElementById('errorResult').innerHTML = ""
		    document.getElementById('book-name').innerHTML = document.getElementById('nomeLivro').value;
		    console.log('Deletando todos os capitulos')
		    deleteAll();
		    console.log("Criando capitulo intro")
		    addCap("intro");
		    console.log(capitulos)
		    console.log("mudando para o capitulo intro")
			selectCap(0);
			addSes()
			selectSes(0)
			saveBook()
		}
		else if (result == 'already exist'){
			document.getElementById('errorResult').innerHTML = "Erro: Nome já está em uso."
		}
	})
}

function deleteAll() {
	document.getElementById('capList').innerHTML = ''
	capitulos = {};
	totalCapnum = 0;
}

function openModalDetection() {
	if ($('#modalNovoLivro').hasClass('open') === false) {
		document.getElementById('errorResult').innerHTML = "";
	}
}
