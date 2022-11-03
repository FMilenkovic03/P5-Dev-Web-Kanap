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
            //vérif quantité et couleurs
            if(product.color < 1){
                alert("SVP, Choisissez une couleur");
            }
            if(product.Qty < 1 || product.Qty > 100){
                alert("Choisissez une quantité entre 1 et 100.");
            }
            

        });
    })

