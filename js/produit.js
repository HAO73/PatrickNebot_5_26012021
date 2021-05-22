const urlActive = window.location.search;

console.log(urlActive)

const urlSearchParams = new URLSearchParams(urlActive)
const id = urlSearchParams.get("_id")
console.log(id)

///////////////////Affichage produit selectionné///////////////

const containerProduct = document.getElementById("containerProduct")


fetch(`https://ab-p5-api.herokuapp.com/api/teddies/${id}`)
        .then(response => response.json())
        .then(response2 => {

                let productDisplay = `  <div class="row p-2 bg-light border m-3">
              <div class="col-3">
                  <img class="img-fluid" id="imageProduct" src="${response2.imageUrl}"/>
              </div>
              <div class="col-6">
                  <h3 id="nameProduct">${response2.name}</h3>
                  <h4 id="descriptionProduct">${response2.description}</h4>
              </div>
              <div class="col-3">
                  <h3 id="priceProduct">${response2.price / 100 + "€"}</h3>
  
                  <div class="form-group">
                      <label for="exampleFormControlSelect1">Selection Couleur</label>
                      <select class="form-control" id="exampleFormControlSelect1">
                      ${response2.colors.map(colors => "<option value=" + colors + ">" + colors + "</option>")}
                      
                      </select>
                  </div>
                  <button id="addCart" class="btn btn-dark">Ajouter au Panier</button>
              </div>
  
          </div>`


                containerProduct.innerHTML = productDisplay

        })



function getArticle() {

        return fetch(`https://ab-p5-api.herokuapp.com/api/teddies/${id}`)
                .then(function (httpBodyResponse) {
                        return httpBodyResponse.json()
                })
                .then(function (article) {
                        return article

                })
                .catch(function (error) {

                        alert(error)
                })
}


let product;
getArticle().then(result => {
        product = result;

        const optionColor = document.getElementById("exampleFormControlSelect1");
        const btn_sendCart = document.getElementById("addCart");

//Ecouter panier et envois panier  & // recuperation produit details

        btn_sendCart.addEventListener("click", (event) => {
                event.preventDefault();

                const userChoice = optionColor.value;

                let productCart = {

                        productImage: product.imageUrl,
                        productName: product.name,
                        productPrice: product.price / 100,
                        productId: product._id,
                        productQuantity: 1,
                        productOption: userChoice

                }
                //-----------------------------Local Storage -----------------------------------//
                let checkLocalStorage = JSON.parse(localStorage.getItem("orderElement")) || []

                console.log(checkLocalStorage)


                checkLocalStorage.push(productCart);
                localStorage.setItem("orderElement", JSON.stringify(checkLocalStorage));
                window.location.href = "panier.html";

                console.log('product', product);
        })
})


//--------------------------------Gestion du panier-----------------------------------------










