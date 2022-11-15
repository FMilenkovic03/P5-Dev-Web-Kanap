//recup url
const urlConfirmation = window.location.search;
const urlSearchParams = new URLSearchParams(urlConfirmation);
//recup de l'id pour insertion dans le span
let order = document.querySelector("#orderId");
order.innerHTML = urlSearchParams.get("orderId");
localStorage.clear();
// vide le localStorage