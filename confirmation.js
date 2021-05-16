const urlActive = window.location.search;

const urlSearchParams = new URLSearchParams(urlActive)
const id = urlSearchParams.get("id")
const orderPrice = urlSearchParams.get("orderPrice")

const confirmationContainer = document.getElementById("confirmationContainer")

const confirmation = `<h1 class="text-center mt-5">Orinoco vous remercie pour cette commande n° ${id} d'un montant total de ${orderPrice} €.</h1>` 
confirmationContainer.insertAdjacentHTML("beforeend", confirmation);