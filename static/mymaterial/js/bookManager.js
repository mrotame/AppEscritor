function confirmDeleteBook(title) {
    $('#modalDeleteBook').modal('open');
    window.bookToDelete = title
}
function deleteBook() {
    $.ajax({
        url: "/deleteBook",
        type: 'POST',
        contentType: 'application/json',
        dataType : 'json',
        data: JSON.stringify(window.bookToDelete),   // converts js value to JSON string
        })
        .done(function(result){     // on success get the return object from server
            console.log(result);
            $('#modalDeleteBook').modal('close');
            if(window.bookToDelete === window.openedBook) {
                window.openedBook = undefined;
                sesAtual = undefined;
                $('#modalOpenBook').modal('close');
            } else {
                openBook();
            }

            //console.log('result: '+result)     // do whatever with it. In this case see it in console
        })
}