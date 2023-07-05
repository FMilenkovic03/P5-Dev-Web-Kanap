//récup' produit 
let productInLocalStorage = JSON.parse(localStorage.getItem("Products"));
let url = "http://localhost:3000/api/products/";


//declaration
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

const submitButton = document.getElementById("order");
const regexNameCity = /^[a-zA-ZÀ-ÿ_-]{2,60}$/;
const regexAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;
const regexEmail = /^[^@\s]{2,30}@[^@\s]{2,30}\.[^@\s]{2,5}$/;

//afficher les produits du panier

document.addEventListener("DOMContentLoaded", function () {
    //récupérer la liste des id produits (c fait)
    console.log(productInLocalStorage);
    let products = [];
    for (let i = 0; i < productInLocalStorage.length; i++) {
        console.log(productInLocalStorage[i].id);
        products.push(productInLocalStorage[i].id);
    }
    //console.log(products);
    //pr chaque produit, appeler une url du backend pour recup détail produit (fait)
    products.forEach((id) => {
        alert(id);
        fetch(`http://localhost:3000/api/products/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((product) => {
                
                let selectedColor = productInLocalStorage.filter(
                    (productInStorage) =>
                        productInStorage.id === product._id
                )[0].color;
                
                document.getElementById("cart__items").innerHTML += `
           <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                       <div class="cart__item__img">
                         <img src="${product.imageUrl}" alt="${product.altTxt}">
                       </div>
                       <div class="cart__item__content">
                         <div class="cart__item__content__description">
                           <h2>${product.name}</h2>
                           <p>${selectedColor}</p>
                           <p>${product.price} €</p>
                         </div>
                         <div class="cart__item__content__settings">
                           <div class="cart__item__content__settings__quantity">
                             <p>Qté : </p>
                             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" product=${product.qty}>
                           </div>
                           <div class="cart__item__content__settings__delete">
                             <p class="deleteItem">Supprimer</p>
                           </div>
                         </div>
                       </div>
                     </article>`;
            })
            .catch((error) =>
                alert("erreur de type:" + error)
            );
    })
});

//call of quantity
function totalQuantity(productInLocalStorage) {
    const arrayQty = [];
    for (let iterator of productInLocalStorage) {
        arrayQty.push(iterator.qty);
        const addition = (previousQty, currentQty) =>
            previousQty + currentQty;
        const totalQuantity = arrayQty.reduce(addition);
        document.getElementById("totalQuantity").innerText = totalQuantity;
    }
    if (arrayQty.length === 0) {
        document.querySelector("h1").innerText = "Panier vide";
        totalQuantity = "";
        document.getElementById("totalQuantity").innerText = totalQuantity;
    }
}

//call of price

function priceTotal(productInLocalStorage) {
    let totalPriceQty = "";
    let priceArray = [];
    for (let iterator of productInLocalStorage) {
        totalPriceQty = iterator.price * iterator.arrayQty;
        priceArray.push(totalPriceQty);
        const addition = (previousPrice, currentPrice) =>
            previousPrice + currentPrice;
        const totalPrice = priceArray.reduce(addition);
        document.getElementById("totalPrice").innerText = totalPrice;
    }
    if (priceArray.length === 0) {
        totalPriceQty = "";
        document.getElementById("totalPrice").innerText = totalPriceQty;
    }
}

//bouton delete 

let erase = document.querySelectorAll(".deleteItem");
console.log(erase);
erase.forEach((button) => {
    const buttonClosest = button.closest("article");
    const id = buttonClosest.dataset.id;
    const article = buttonClosest;
    const color = buttonClosest.dataset.color;

    button.addEventListener("click", (event) => {
        console.log(event);
        event.preventDefault;
        productInLocalStorage.forEach((iterator) => {
            if (iterator.id == id && iterator.color == color) {
                let index = productInLocalStorage.indexOf(iterator);
                if (confirm("Supprimer l'article ?")) {
                    article.remove();
                    productInLocalStorage.splice(index, 1);
                }
            }
        });
        localStorage.setItem("Products", JSON.stringify(productInLocalStorage));
        priceTotal(productInLocalStorage);
        totalQuantity(productInLocalStorage);
    });
});

//Modification de quantité 

const qtyModifier = document.querySelectorAll(".itemQuantity");
qtyModifier.forEach((modifier) => {
    const modifierClosest = modifier.closest("article");
    let newQty = "";
    const id = modifierClosest.dataset.id;
    const color = modifierClosest.dataset.color;

    modifier.addEventListener("change", (event) => {
        event.preventDefault();
        newQty = Number(modifier.value);
        productInLocalStorage.forEach((iterator) => {


            if (iterator.id == id && iterator.color == color) {
                iterator.qty = newQty;
            }
        });
        localStorage.setItem("Products", JSON.stringify(productInLocalStorage));
        priceTotal(productInLocalStorage);
        totalQuantity(productInLocalStorage);
    });
});


//formulaire remplissage et envoi

function formSubmit(productInLocalStorage, contact) {
    let products = [];
    for (i = 0; i < productInLocalStorage; i++) {
        let Id = productInLocalStorage.id;
        products.push(Id);
    }
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, products }),
    })
        .then((response) => response.json())
        .then((product) => {
            console.log(products);
            window.location = `confirmation.html?orderId=${product.orderId}`;
        })
        .catch((error) =>
            alert("erreur de type:" + error)
        );

}



//event listener au clic pour la récup de données des formulaires
//regex

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    firstNameVerify = document.querySelector("#firstName").value;
    lastNameVerify = document.querySelector("#lastName").value;
    addressVerify = document.querySelector("#address").value;
    cityVerify = document.querySelector("#city").value;
    emailVerify = document.querySelector("#email").value;

    verifyForm(firstNameVerify, firstNameErrorMsg, regexNameCity);
    verifyForm(lastNameVerify, lastNameErrorMsg, regexNameCity);
    verifyForm(addressVerify, addressErrorMsg, regexAddress);
    verifyForm(cityVerify, cityErrorMsg, regexNameCity);
    verifyForm(emailVerify, emailErrorMsg, regexEmail);

    const contact = {
        firstName: firstNameVerify,
        lastName: lastNameVerify,
        address: addressVerify,
        city: cityVerify,
        email: emailVerify,
    };
    if (verifyForm(firstNameVerify, firstNameErrorMsg, regexNameCity) &&
        verifyForm(lastNameVerify, lastNameErrorMsg, regexNameCity) &&
        verifyForm(addressVerify, addressErrorMsg, regexAddress) &&
        verifyForm(cityVerify, cityErrorMsg, regexNameCity) &&
        verifyForm(emailVerify, emailErrorMsg, regexEmail) &&
        productInLocalStorage.length >= 1) {
        formSubmit(productInLocalStorage, contact);
    } else {
        alert("Formulaire invalide ! Vérifiez vos informations.");
    }
});

//verif infos selon regex
function verifyForm(eltFormulaire, eltError, eltRegex) {
    //si input vide
    if (eltFormulaire.length === 0) {
        eltError.innerText = "Veuillez renseigner ce champ";
        return false;
    } else if (!eltRegex.test(eltFormulaire)) {
        // si input nonvide regex invalide
        eltError.innerText = "Format incorrect";
        return false;
    } else {
        // sinon regex et input sont corrects
        eltError.innerText = "";
        return true;
    }
}