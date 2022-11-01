//fonction pour appeler un produit
const quantity = document.querySelector("#quantity");
let id = new URLSearchParams(window.location.search);
let colors = document.querySelector("#colors").value;


fetch("http://localhost:3000/api/products/${id}")
    .then((response) => response.json())
    .then((product) => {
        console.log(product);
        //images
        let imageItem = document.querySelector(".item__img");
        const Img = document.createElement("img");
        imgSofa.src = product.imageUrl;
        imgSofa.alt = product.altTxt;
        imageItem.appendChild(imgSofa);
        //appel produit
        let nameProduct = document.querySelector("#title");
        nameProduct.innerText = product.name;
        let price = document.querySelector("#price");
        price.innerText = product.price;
        let description = document.querySelector("#description");
        description.innerText = product.description;
        quantity.value = 1;

        //color choosing
        product.colors.forEach(element => {
            let option = document.createElement("option");
            color.appendChild(option);
            option.setAttribute("value", element);
            option.innerText = element;
        });

        //add au panier

        let btn = document.querySelector("#addToCart");

        btn.addEventListener("click", function () {
            //product
            let product = {

                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                altTxt: product.altTxt,
                id: parseInt(id),
                color: colors,
                Qty: quantity,

            };

            let productInLocalStorage = [];
            //vérification de quantité
            if ((quantity.value >= 0 && quantity.value <= 100) && choiceColor == "") {
                console.log("SVP, choisissez une couleur");
                console.log("Choisissez un nombre d'articles entre 1 et 100");
            } else if ((quantity.value < 0 && quantity.value > 100) || choiceColor !== "") {
                console.log("La quantité saisie doit être correcte et la couleur saisie !");
            } else {
                let cartStorage = JSON.parse(localStorage.getItem("cart"));
                if (cartStorage) {
                    const getProductCart = cartStorage;
                    if (getProductCart) {
                        getProductCart.quantite += product.quantite;
                        localStorage.setItem("cart", JSON.stringify(cartStorage));
                        console.log("Ajout au panier !");
                    }
                    cartStorage.push(product);
                } else {
                    cartStorage = [];
                    cartStorage.push(product);
                }
                localStorage.setItem("cart", JSON.stringify(cartStorage));
                console.log("Ajout au panier !");

            }

        });
    })

