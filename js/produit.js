const urlActive = window.location.search;

console.log(urlActive)

const urlSearchParams = new URLSearchParams(urlActive)
const id = urlSearchParams.get("_id")
console.log(id)

///////////////////Affichage produit selectionné///////////////


fetch(`https://ab-p5-api.herokuapp.com/api/teddies/${id}`)
        .then(response => response.json())
        .then(response2 => {
                document.getElementById("color1").textContent = response2.colors[0]
                document.getElementById("color2").textContent = response2.colors[1]
                document.getElementById("color3").textContent = response2.colors[2]
                document.getElementById("color4").textContent = response2.colors[3]
                document.getElementById("imageProduct").setAttribute("src", response2.imageUrl)
                document.getElementById("nameProduct").textContent = response2.name
                document.getElementById("descriptionProduct").textContent = response2.description
                document.getElementById("priceProduct").textContent = response2.price / 100 + "€"

        })

// 

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










