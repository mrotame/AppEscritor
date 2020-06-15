function blado() {
    console.log("blado")
}
/*
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "\o/";
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage;                            //Webkit, Safari, Chrome
  });
*/

window.addEventListener("unload", function logData() {
    navigator.sendBeacon("/close", 'true');
})