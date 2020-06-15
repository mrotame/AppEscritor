done = undefined
setInterval(autoSave,2000)

$("#autoSaveCheckBoxInput").click(function () {
    return false;
});

function saveBook(){

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
	    	//alert('Erro: Nenhum livro aberto')
	    } else {
	    	//alert('Livro salvo com sucesso')
	    }
	})
}

function autoSave() {
	try{
		checkBox = (localStorage.getItem('autoSaveCheckBox')=== "true")
		document.getElementById('autoSaveCheckBoxInput').checked = checkBox
	} catch{
		checkBox = false;
	}
	if (localStorage.getItem('autoSaveCheckBox') == "true" && window.openedBook !== undefined) {
		saveBook()
	} else {
	}

}

function autoSaveCheckBox(){
	document.getElementById('autoSaveCheckBoxInput').checked = !document.getElementById('autoSaveCheckBoxInput').checked
	localStorage.setItem('autoSaveCheckBox',document.getElementById('autoSaveCheckBoxInput').checked)
}