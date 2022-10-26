//fonction pour appeler un produit


fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then((product) => {
        //appel elt
        let nomProduit = document.querySelector("#title");
        let prix = document.querySelector("#price");
        let description = document.querySelector("#description");
        let imgCadre = document.querySelector(".item__img");
        let couleur = document.querySelector("#colors");
        let imgProduit = document.createElement("img");
        let photo = "";
        //product modification
        nomProduit.innerText = product.name;
        prix.innerText = product.price;
        description.innerText = product.description;
        //img append        
        imgCadre.appendChild(imgProduit);
        imgProduit.setAttribute("src", product.imageUrl);
        photo = product.imageUrl;
        imgProduit.setAttribute("alt", product.altTxt);
        //console.log();
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



//add au panier

    let btn = document.querySelector("#addToCart");
    let adresse = new URLSearchParams(window.location.search);
    let idProduit = adresse.get("id");

    btn.addEventListener("click", () => {
        let Qty = document.querySelector("#quantity").value;
        let choiceColor = document.querySelector("#colors").value;
        //vérification de quantité
        if((Qty => 0 && Qty <= 100) && choiceColor == "") {
            console.log("SVP, choisissez une couleur");
            console.log("Choisissez un nombre d'articles entre 1 et 100");
        } else if((Qty < 0 && Qty > 100) || choiceColor !== "") {
            console.log ("La quantité saisie doit être correcte et la couleur saisie !");
        } else {
            let produit = {
                Image: product.imageUrl,
                name: product.name,
                prixProduit: product.price,
                alt: product.altTxt,
                id: idProduit,
                couleur: choiceColor,
                quantite: Qty,
                

            };
            let cartStorage = JSON.parse(localStorage.getItem("Panier"));
            if (cartStorage) {
                const getProductCart = cartStorage;
                    if(getProductCart) {
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
        
        
