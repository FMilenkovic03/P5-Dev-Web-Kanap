//fonction pour appeler un produit
const quantity = document.querySelector("#quantity");
let adresse = new URLSearchParams(window.location.search);
let id = URLSearchParams.get("id");

fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then((product) => {
        console.log(product);
        //appel elt
        let nameProduct = document.querySelector("#title");
        let price = document.querySelector("#price");
        let description = document.querySelector("#description");
        let imgItem = document.querySelector(".item__img");
        let couleur = document.querySelector("#colors");
        let imgProduct = document.createElement("img");
        let photo = "";
        quantity.value = 1;
        //product modification
        nameProduct.innerText = product.name;
        price.innerText = product.price;
        description.innerText = product.description;
        //img append        
        imgItem.appendChild(imgProduct);
        imgProduct.setAttribute("src", product.imageUrl);
        photo = product.imageUrl;
        imgProduct.setAttribute("alt", product.altTxt);
        //console.log();
        //color choosing
        product.colors.forEach(element => {
            let option = document.createElement("option");
            couleur.appendChild(option);
            option.setAttribute("value", element);
            option.innerText = element;
        });
    })
    .catch((error) => {
        console.log(error);
    });



//add au panier

let btn = document.querySelector("#addToCart");


btn.addEventListener("click", () => {
    let choiceColor = document.querySelector("#colors").value;
    //vérification de quantité
    if ((quantity.value >= 0 && quantity.value <= 100) && choiceColor == "") {
        console.log("SVP, choisissez une couleur");
        console.log("Choisissez un nombre d'articles entre 1 et 100");
    } else if ((quantity.value < 0 && quantity.value > 100) || choiceColor !== "") {
        console.log("La quantité saisie doit être correcte et la couleur saisie !");
    } else {
        let produit = {
            id: idProduit,
            couleur: choiceColor,
            quantite: quantity.value,
        };
        let cartStorage = JSON.parse(localStorage.getItem("Panier"));
        if (cartStorage) {
            const getProductCart = cartStorage;
            if (getProductCart) {
                getProductCart.quantite += produit.quantite;
                localStorage.setItem("Panier", JSON.stringify(cartStorage));
                console.log("Ajout au panier !");
            }
            cartStorage.push(produit);
        } else {
            cartStorage = [];
            cartStorage.push(produit);
        }
        localStorage.setItem("Panier", JSON.stringify(cartStorage));
        console.log("Ajout au panier !");

    }

});


