//fonction pour appeler un produit

function getOneProduct(){
    fetch("http://localhost:3000/api/products")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then((product) => {
            //appel elt
            let imgCadre = document.querySelector(".item__img");
            let nomProduit = document.querySelector("#title");
            let prix = document.querySelector("#price");
            let description = document.querySelector("#description");
            let couleur = document.querySelector("#colors");
            let imgProduit = document.createElement("img");
            img.src = product.imageUrl;
            img.alt = product.altTxt;
            //product modification
            nomProduit.innerText = `${product.name}`;
            prix.innerText = `${product.price}`;
            description.innerText = `${product.description}`;
            //img append        
            imgCadre.appendChild(imgProduit);
            imgProduit.setAttribute("src", product.imageUrl);
            imgProduit.setAttribute("alt", product.altTxt)
            //color choosing
            product.couleur.forEach(element => {
                let option = document.createElement("option");
                couleur.appendChild(option);
                option.setAttribute("value", element);
                option.innerText = element;
            });
        })
        .catch((error) => {
            console.log(error);
        });
}
getOneProduct();
    
//add au panier

let btn = document.querySelector("#addToCart");
btn.addEventListener("click", () => {
    let Qty = document.querySelector("#quantity");
    let choiceColor = document.querySelector("#colors");
    //vérification de quantité
    if((Qty => 0 && Qty <= 100) && choiceColor == "") {
        console.log("SVP, choisissez une couleur");
        console.log("Choisissez un nombre d'articles entre 1 et 100");
    } else {
        console.log ("La quantité saisie doit être correcte et la couleur saisie !");
    }




});


