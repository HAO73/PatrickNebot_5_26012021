
//////Rapatriement element du local storage

let checkLocalStorage = JSON.parse(localStorage.getItem("orderElement"));

console.log(checkLocalStorage)


const containerProductCart = document.getElementById("containerProductCart");

const containerForm = document.getElementById("containerForm");

//----Affichage produit panier ----- 

if (checkLocalStorage === null || checkLocalStorage == 0) {

  document.getElementById("statusCart").textContent = "Le panier est vide"


} else {

  let cart = [];

  for (i = 0; i < checkLocalStorage.length; i++) {

    cart = cart + `
        <div class="row p-2 bg-light border m-3">
        <div class="col-2">
            <img src="${checkLocalStorage[i].productImage}" class="img-fluid" id="imageProduct"/>
        </div>
        <div class="col-4">
            <h3 id="nameProduct">${checkLocalStorage[i].productName}</h3>
            <h3 id="colorProduct">${checkLocalStorage[i].productOption}</h3>
            
        </div>
        <div class="col-1">
    

           
        </div>
        <div class="col-1">
            <h3 id="priceProduct">${checkLocalStorage[i].productPrice} €</h3>
        
        </div>
        <div class="col-1">
            <button class="cancelProduct btn btn-dark">Supprimer</button> 
        
        </div>
    </div>    `;
  }
  if (i === checkLocalStorage.length) {
    containerProductCart.innerHTML = cart;

  }

}

/////////Bouton Supprimer Article ///////////

let btn_cancel = document.querySelectorAll(".cancelProduct");
console.log(btn_cancel)

for (let j = 0; j < btn_cancel.length; j++) {

  btn_cancel[j].addEventListener("click", (event) => {

    event.preventDefault();

    let productCancel = checkLocalStorage[j].productId;
    console.log(productCancel)

    checkLocalStorage = checkLocalStorage.filter(element => element.productId !== productCancel)
    console.log(checkLocalStorage)

    localStorage.setItem("orderElement", JSON.stringify(checkLocalStorage));


    alert("Ce produit a été supprimer du panier");
    window.location.href = "panier.html";

  })

}

//////////////Montant total du panier////////////////////////////////

let cartProductsPrice = []

for (let k = 0; k < checkLocalStorage.length; k++) {

  let cartProductPrice = checkLocalStorage[k].productPrice


  cartProductsPrice.push(cartProductPrice)

}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalAmount = cartProductsPrice.reduce(reducer, 0)

const totalAmountDisplay = `<h3 class=" text-center p-2 bg-light border m-3"> Le prix total est de : ${totalAmount} € </h3>`

containerProductCart.insertAdjacentHTML("beforeend", totalAmountDisplay)

///////////////////// Formulaire //////////////////////////////////

const displayFormHtml = () => {

  const form = `     <form class="row p-2 bg-light border m-3">
<div class="form-row">
    <div class="col-md-4 mb-3">
        <label for="validationTooltip01">Prénom</label>
        <input type="text" class="form-control" id="validationTooltip01" placeholder="First name" required>
        <div class="valid-tooltip">
          Looks good!
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <label for="validationTooltip02">Nom</label>
        <input type="text" class="form-control" id="validationTooltip02" placeholder="Last name" required>
        <div class="valid-tooltip">
          Looks good!
        </div>
      </div>
  <div class="form-group col-md-6">
    <label for="inputEmail4">Email</label>
    <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
  </div>
  </div>
<div class="form-group">
  <label for="inputAddress">Addresse</label>
  <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
</div>
<div class="form-row">
  <div class="form-group col-md-6">
    <label for="inputCity">Ville</label>
    <input type="text" class="form-control" id="inputCity">
  </div>
  <div class="form-group col-md-4">
    <label for="inputState">Country</label>
    <input type="text" class="form-control" id="inputCountry">
  </div>
  <div class="form-group col-md-2">
    <label for="inputZip">Code Postal</label>
    <input type="text" class="form-control" id="inputZip">
  </div>
</div>
<div class="form-group">

</div>
<button id="FormSend" class="btn btn-dark mt-3">Passer la Commande</button>
</form> `;

  containerForm.insertAdjacentHTML("beforeend", form);

}

displayFormHtml();

const btn_FormSend = document.getElementById("FormSend");

btn_FormSend.addEventListener("click", (event) => {
  event.preventDefault();

  const formValues = {

    firstName: document.getElementById("validationTooltip01").value,
    lastName: document.getElementById("validationTooltip02").value,
    email: document.getElementById("inputEmail4").value,
    adress: document.getElementById("inputAddress").value,
    city: document.getElementById("inputCity").value,
    country: document.getElementById("inputCountry").value,
    zip: document.getElementById("inputZip").value,

  };

  //////////////////Formulaire bien renseigné //////////////////////

  const textAlert = (value) => {

    return `${value} : Chiffre et symbole ne sont pas autorisé \n min 3 caractères, max 20 caractères`
  }



  const regEx = (value) => {

    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)
  }

  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
  }


  function checkFirstName() {

    const checkFirstName = formValues.firstName

    if (regEx(checkFirstName)) {
      return true;

    } else {
      alert(textAlert("Prénon"));
      return false;

    }

  };


  function checkLastName() {

    const checkLastName = formValues.lastName

    if (regEx(checkLastName)) {
      return true;

    } else {
      alert(textAlert("Nom"));
      return false;

    }

  };


  function checkEmail() {

    const checkEmail = formValues.email

    if (regExEmail(checkEmail)) {
      return true;

    } else {
      alert("Email n'est pas valide");
      return false;

    }

  };


  function checkCity() {

    const checkCity = formValues.city

    if (regEx(checkCity)) {
      return true;

    } else {
      alert("Le nom de la ville est incorrecte, caractère speciaux et chiffres non admis");
      return false;

    }

  };

  function checkCountry() {

    const checkCountry = formValues.country

    if (regEx(checkCountry)) {
      return true;

    } else {
      alert("Le nom du pays est incorrecte, caractère speciaux et chiffres non admis");
      return false;

    }

  };


  if (checkFirstName() && checkLastName() && checkEmail() && checkCity() && checkCountry()) {
    localStorage.setItem("formValues", JSON.stringify(formValues));


    ////////////////////////////envois des donnnées au serveur///////////////
    let contact = {

      firstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.adress,
      city: formValues.city,
      email: formValues.email,
    }


    let products = []

    for (let m = 0; m < checkLocalStorage.length; m++) {
      products.push(checkLocalStorage[m].productId)
    }

    const sendDataServer = {
      contact,
      products
    }


    const promise01 = fetch("https://ab-p5-api.herokuapp.com/api/teddies/order", {
      method: "POST",
      body: JSON.stringify(sendDataServer),

      headers: {
        "Content-Type": "application/json",

      },

    });

    promise01.then(async (response) => {

      try {

        console.log(response)
        const contenu = await response.json();
        console.log(contenu)
        window.location.href = "confirmation.html?id=" + contenu.orderId + "&orderPrice=" + totalAmount;

      } catch (e) {

        console.log(e)

      }

///////////////////Supression du panier ////////////////////

      localStorage.removeItem("orderElement")

    })


  } else {

    alert("Veuillez bien remplir le formulaire");

  }



})





