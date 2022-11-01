//fonction pour appeler un produit
const quantity = document.querySelector("#quantity");
let adresse = new URLSearchParams(window.location.search);


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
        let prix = document.querySelector("#price");
        let description = document.querySelector("#description");
        let imgCadre = document.querySelector(".item__img");
        let color = document.querySelector("#colors");
        let imgProduct = document.createElement("img");
        let photo = "";
        quantity.value = 1;
        //product modification
        nameProduct.innerText = product.name;
        prix.innerText = product.price;
        description.innerText = product.description;
        //img append        
        imgCadre.appendChild(imgProduct);
        imgProduct.setAttribute("src", product.imageUrl);
        photo = product.imageUrl;
        imgProduct.setAttribute("alt", product.altTxt);
        //console.log();
        //color choosing
        product.colors.forEach(element => {
            let option = document.createElement("option");
            color.appendChild(option);
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
        let products = {
            colors: choiceColor,
            id: idProduct,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            description: product.description,
            altTxt: product.altTxt,
            quantity: quantity.value,

        };
        let cartStorage = JSON.parse(localStorage.getItem("Panier"));
        if (cartStorage) {
            const getProductCart = cartStorage;
            if (getProductCart) {
                getProductCart.quantite += products.quantite;
                localStorage.setItem("Panier", JSON.stringify(cartStorage));
                console.log("Ajout au panier !");
            }
            cartStorage.push(products);
        } else {
            cartStorage = [];
            cartStorage.push(products);
        }
        localStorage.setItem("Panier", JSON.stringify(cartStorage));
        console.log("Ajout au panier !");

    }

});


