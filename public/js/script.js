// Deleting Error and Warning Messages After 5 Seconds

setTimeout(() => {
  alertMessage = document.getElementsByClassName("alert");
  var index;
  for (index = 0; index < alertMessage.length; index++) {
    alertMessage[index].style.display = "none";
  }
}, 5000);
