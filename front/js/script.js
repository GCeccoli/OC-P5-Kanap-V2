//Appel de l'api et intégration des éléments
fetch("http://localhost:3000/api/products")
    //Récupération des données de l'api
    .then((res)=> {
        // On controle si l'api à bien répondu
        if(res.ok){
        // Si l'api répond elle retourne le fichier au format JSON
        return res.json()
        // On crée une liste avec les données récupérées
    .then (data => {
        data.map((products)=>{
             document
                 //On récupère l'élément HTML avec l'ID "items"
                 .getElementById("items")
                 // On intégre les données dans le fichier HTML
                 .insertAdjacentHTML("beforeend", //Aligne les éléments convenablement
                 `<a href="./product.html?id=${products._id}">
                     <article>
                       <img src="${products.imageUrl}" alt="${products.altTxt}">
                       <h3 class="productName">${products.name} </h3>
                       <p class="productDescription">${products.description}</p>
                     </article>
                   </a>`)
             })  
         })
        }
    })
    .catch((error) => {
        console.log(error)
    })