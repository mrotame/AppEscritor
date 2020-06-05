
function openBook() {
	var bookList = []
	getBookList();
	$('#textarea1').val('New Text');
	M.textareaAutoResize($('#capContent'));
}

function openIt(bookToOpen) {
	$.ajax({
		url: "/openpage",
		type: 'POST',
		contentType: 'application/json',
		dataType : 'json',
		data: JSON.stringify(bookToOpen),   // converts js value to JSON string
		})
		.done(function(result){     // on success get the return object from server
		    
		    console.log('result: ')     // do whatever with it. In this case see it in console
		    console.log(result)
		    document.getElementById('book-name').innerHTML = bookToOpen;
		    document.getElementById('capList').innerHTML = "";
		    capNum = 1;
		    totalCapNum = 0;
		    bookList = [];
		    for(var item in result){
		    	addCap(result[item][0])
		    	console.log()
		    	capitulos[item][1] = result[item][1]
		    	changeCap(0);
		    	$('#modalOpenBook').modal('close');

			}
	})
}

function bookListToHtml(bookList) {
	var html = ''
	console.log("bookList[1][0]")
	console.log(bookList[1])
	for (var item in bookList[1]){
		console.log(bookList[1][item])
		var title = bookList[1][item]
		html += ''+
		'<li class="collection-item avatar dark-bg">'+
	    '  <i class="material-icons circle">import_contacts</i>'+
	      '<span class="title">'+title+'</span>'+
	      '<div class="row">'+
		    '<div class="col s10"><p>'+//First Line <br> Second Line+
		   '   </p>'+
		     ' </div>'+
		   '   <div class="col s1"><a onClick="openIt('+"'"+title+"'"+')" href="#!"><i class="small material-icons">send</i></a></div>'+
			'</div>'+
		'</li>'
		
	}
	document.getElementById('bookList').innerHTML = html
	$('#modalOpenBook').modal('open');
}

function getBookList() {
	$.ajax({
	url: "/openpage",
	type: 'GET',
	contentType: 'application/json',
	dataType : 'json',
	data: JSON.stringify('books please'),   // converts js value to JSON string
	})
	.done(function(result){     // on success get the return object from server
	    bookListToHtml(result);
	    //console.log('result: '+result)     // do whatever with it. In this case see it in console
	})

}
