const urlConfirmation = window.location.search;
const urlSearchParams = new URLSearchParams(urlConfirmation);

let order = document.querySelector("#orderId");
order.innerHTML = urlSearchParams.get("orderId"); //récupère la clé orderId et l'insère dans le span
localStorage.clear(); // vide le localStorage