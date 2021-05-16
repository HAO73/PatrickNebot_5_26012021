main () 

async function main() {

const articles = await getArticles()
for (article of articles){
  displayArticle(article)

}
}

//Fonction qui recupère les articles du back-end

function getArticles(){

   
return fetch("https://ab-p5-api.herokuapp.com/api/teddies")
.then(function(httpBodyResponse){
return httpBodyResponse.json()
})
.then(function(articles){
return articles

})
.catch(function(error){

    alert(error)

})
}

//Fonction qui affiche les articles récupérés

function displayArticle(article) {

const templateElt = document.getElementById("templateArticle");
const cloneElt = document.importNode(templateElt.content, true);



cloneElt.getElementById("adress").setAttribute("href", "produit.html?_id=" + article._id) 
cloneElt.getElementById("imageProduct").setAttribute("src", article.imageUrl) 
cloneElt.getElementById("nameProduct").textContent= article.name
cloneElt.getElementById("descriptionProduct").textContent= article.description
cloneElt.getElementById("priceProduct").textContent= article.price /100 + "€" 


document.getElementById("containerProduct").appendChild(cloneElt);

}

