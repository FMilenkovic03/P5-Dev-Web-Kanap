//fonction pour appeler un produit

function callProduct(){
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
callProduct();
    
//add au panier



