//var globales
const str = window.location.href;
var url = new URL(str);
let id = url.searchParams.get("id");
let Url = `http://localhost:3000/api/products/${id}`;

let colors = document.querySelector("#colors").value;
const quantity = document.querySelector("#quantity");

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
        let selectColor = document.querySelector("select")

        product.colors.forEach(element => {
            let option = document.createElement("option");
            colors.appendChild(option);
            option.setAttribute("value", element);
            option.innerText = element;
        });

        //add au panier

        let btn = document.querySelector("#addToCart");

        btn.addEventListener("click", function () {
            //product
            let selectedProduct = {

                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                altTxt: product.altTxt,
                id: parseInt(id),
                color: colors,
                Qty: quantity,

            };

            let productInLocalStorage = [];
            //vérif quantité et couleurs
            if (selectedProduct.color < 1) {
                alert("SVP, Choisissez une couleur");
            }
            if (selectedProduct.Qty < 1 || selectedProduct.Qty > 100) {
                alert("Choisissez une quantité entre 1 et 100.");
            }
            //vérification présence dans cart
            if (localStorage.getItem("Products")) {
                productInLocalStorage = JSON.parse(
                    localStorage.getItem("Products")
                );
                let alreadyChosen = productInLocalStorage.filter(
                    (product) =>
                        product.color === selectedProduct.color &&
                        product.id == selectedProduct.id
                );
                if (alreadyChosen.length) {
                    let sum = selectedProduct.Qty + alreadyChosen[0].Qty;
                    console.log(
                        "Ce canapé était déjà dans le panier, vous en avez maintenant :", sum
                    );
                    const indexAlreadyChosen = ProduitInLocalStorage.indexOf(
                        DejaPresent[0]
                    );
                    productInLocalStorage[indexAlreadyChosen] = productInLocalStorage.indexOf(
                        alreadyChosen[0]
                    );
                    productInLocalStorage[indexAlreadyChosen].Qty = sum;
                }
            } else {
                productInLocalStorage.push(selectedProduct);
                localStorage.setItem(
                    "Products",
                    JSON.stringify(productInLocalStorage)
                );
                console.log(productInLocalStorage);
            }
            console.log("Ajout de :", selectedProduct);
            alert("Produit ajouté au panier !");

        }


        );
    })
