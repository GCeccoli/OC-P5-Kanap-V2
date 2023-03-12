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

let choiceQuantity = document.getElementById("quantity");
let colorChoice = document.getElementById("colors");
let sendToCart = document.getElementById("addToCart");

sendToCart.addEventListener("click", (event)=>{
    event.preventDefault();

    //On va chercher le panier dans le stockage local
    function getBasket(){
        return JSON.parse(localStorage.getItem("basket"));
    };
    let basket = getBasket()||[];

    //On enregistre le panier dans le stockage local
    function saveBasket(basket){
        localStorage.setItem("basket", JSON.stringify(basket));
    };

    //On ajoute les produits dans le panier
    function addToBasket(product){
        let details = {
            idKanap: id,
            colorKanap: colorChoice.value,
            quantityKanap: choiceQuantity.value
        };

        // On recherche si le produit est déjà présent dans le panier
        let foundKanap = basket.find(p=> p.idKanap == id && p.colorKanap == colorChoice.value);

        //On vérifie que le produit est déjà présent dans le panier, si il n'est pas présent, on l'incrémente
        if (isNaN.quantityKanap == choiceQuantity.value || choiceQuantity.value < 1){
            alert("Entrez une quantité valide !")
        } else if (choiceQuantity.value > 100){
            alert("Vous ne pouvez pas sélectionner plus de 100 produits !")
        } else if (colorChoice.value === ""){
            alert("Vous devez choisir une couleur !")
        } else if (foundKanap !== undefined){
            foundKanap.quantityKanap = parseInt(foundKanap.quantityKanap) + parseInt(choiceQuantity.value)
        } else {
            basket.push(details);
            alert("Produit ajouté au panier");
        }
        saveBasket(basket);
    }
    addToBasket(product);
});

