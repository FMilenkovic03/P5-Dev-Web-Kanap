//var globales
const str = window.location.href;
var url = new URL(str);
let id = url.searchParams.get("id");
let Url = `http://localhost:3000/api/products/${id}`;


//fetch
fetch(Url)
    .then((response) => response.json())
    .then((product) => {
        console.log(product);
        //images
        let imageItem = document.querySelector(".item__img");
        const imgSofa = document.createElement("img");
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
        let selectedColor = document.querySelector("select");
        //boucle for, qui va reprendre chaque couleur
        for (i = 0; i < product.colors.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", product.colors[i]);
            option.textContent = product.colors[i];
            selectedColor.appendChild(option);
        }

        //add au panier

        let btn = document.querySelector("#addToCart");

        btn.addEventListener("click", function () {
            //product
            let selectedProduct = {

                id: parseInt(id),
                color: document.querySelector("#colors").value,
                qty: document.querySelector("#quantity").value,

            };
            //déclaration du storage
            let productInLocalStorage = [];
            //vérif quantité et couleurs
            if (selectedProduct.color < 1) {
                alert("Choisissez une couleur !");
            } else {
                //
                if (selectedProduct.qty < 1 || selectedProduct > 100) {
                    alert("Choisissez une quantitée entre 1 et 100 ");
                    //sinon (ou si les conditions remplies, on passe à l'ajout au panier)
                } else {
                    if (localStorage.getItem("Products")) {
                        productInLocalStorage = JSON.parse(
                            localStorage.getItem("Products")
                        );
                        //on vérifie le produit 
                        const alreadyChosen = productInLocalStorage.filter(
                            (product) =>
                                product.color === selectedProduct.color &&
                                product.id === selectedProduct.id
                        );
                        //On rajoute le nouveau à l'ancien si doublon
                        if (alreadyChosen.length) {
                            let sum = selectedProduct.qty + alreadyChosen[0].qty;

                            console.log(
                                "Ce canapé était déjà dans votre panier, vous en avez maintenant  : ",
                                sum
                            );

                            const indexAlreadyChosen = productInLocalStorage.indexOf(
                                alreadyChosen[0]
                            );

                            productInLocalStorage[indexAlreadyChosen].qty = sum;
                        } else {
                            //sinon, on push le selected produit dans le storage
                            productInLocalStorage.push(selectedProduct);
                        }
                        localStorage.setItem(
                            "Products",
                            JSON.stringify(productInLocalStorage)
                        );
                    } else {
                        productInLocalStorage.push(selectedProduct);
                        localStorage.setItem(
                            "Products",
                            JSON.stringify(productInLocalStorage)
                        );
                        console.log(productInLocalStorage);
                    }

                    console.log("Produit ajouté : ", selectedProduct);
                    alert("Votre produit est ajouté au panier.");
                }
            }

        });
    });