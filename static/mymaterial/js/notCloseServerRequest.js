setInterval(notCloseRequest,10000)

function notCloseRequest() {
    $.ajax({
        url: "/notClose",
        type: 'POST',
        contentType: 'application/json',
        dataType : 'json',
        data: JSON.stringify('Dont close!'),   // converts js value to JSON string
        })
        .done(function(result){     // on success get the return object from server
            //console.log('result: '+result)     // do whatever with it. In this case see it in console
        })
}