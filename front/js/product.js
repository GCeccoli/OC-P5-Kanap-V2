// recuperation de la chaine de requète dans l'url
const queryString_url_id = window.location.search;
// On extrait l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");
//Creation d'une variable vide pour stocker le produit par rapport à son id
let product;

// Fonction qui récupère les produits à partir de l'API
function getProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then ((response) => {
        return response.json();
    })
    .then(async function (apiResult){
        product = await apiResult;
        if(product){
            getPost(product);
        }
    })
}

getProduct();

function getPost(product) {
    //Intégration de l'image + texte alternatif
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;
    // Integration du titre du produit
    let productName = document.getElementById("title");
    productName.innerHTML = product.name;
    //Integration du prix
    let productPrice = document.getElementById("price");
    productPrice.innerHTML = product.price;
    //Integration de la description
    let productDescription = document.getElementById("description");
    productDescription.innerHTML = product.description;
    // Insertion des options de couleurs
    for (let colors of product.colors){
        let productColors = document.createElement("option");
        document.getElementById("colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
};


