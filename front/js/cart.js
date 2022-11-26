//récup' produit 
let productInLocalStorage = JSON.parse(localStorage.getItem("Products"));
let url = "http://localhost:3000/api/products/8906";


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


if (productInLocalStorage == null) {
    productInLocalStorage = [];
} else {
    for (i = 0; i < productInLocalStorage.length; i++) {
        document.getElementById("cart__items").innerHTML += `
            <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage[i].color}">
                        <div class="cart__item__img">
                          <img src="${productInLocalStorage[i].imageUrl}" alt="${productInLocalStorage[i].altTxt}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${productInLocalStorage[i].name}</h2>
                            <p>${productInLocalStorage[i].color}</p>
                            <p>${productInLocalStorage[i].price} €</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" product=${productInLocalStorage[i].quantity}>
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                        </div>
                      </article>`;
    }
}


//call of quantity
function totalQuantity(productInLocalStorage) {
    const Qty = [];
    for (let iterator of productInLocalStorage) {
        Qty.push(iterator.quantity);
        const addition = (previousQty, currentQty) =>
            previousQty + currentQty;
        const totalQuantity = Qty.reduce(addition);
        document.getElementById("totalQuantity").innerText = totalQuantity;
    }
    if (Qty.length === 0) {
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
        totalPriceQty = iterator.price * iterator.Qty;
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

erase.forEach((button) => {
    const buttonClosest = button.closest("article");
    const id = buttonClosest.dataset.id;
    const article = buttonClosest;
    const color = buttonClosest.dataset.color;

    button.addEventListener("click", (event) => {
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
    let newQuantity = "";
    const id = modifierClosest.dataset.id;
    const color = modifierClosest.dataset.color;

    modifier.addEventListener("change", (event) => {
        event.preventDefault();
        newQuantity = Number(modifier.value);
        productInLocalStorage.forEach((elt) => {


            if (elt.id == id && elt.color == color) {
                elt.qty = newQuantity;
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

document.addEventListener("DOMContentLoaded", function() {
     //récupérer la liste des id produits (c fait)
     alert("toto");
     console.log(productInLocalStorage);
    let products = [];
    for (i = 0; i < productInLocalStorage.length; i++) {
        console.log(productInLocalStorage[i].id);
        products.push(productInLocalStorage[i].id);
    }
    console.log(products);
    //pr chaque produit, appeler une url du backend pour recup détail produit
    products.forEach((id) => {
        alert(id);
        fetch(`http://localhost:3000/api/products/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.json())
        .then((product) => {
            document.getElementById("cart__items").innerHTML += `
            <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                        <div class="cart__item__img">
                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${product.name}</h2>
                            <p>${product.color}</p>
                            <p>${product.price} €</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" product=${product.quantity}>
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
    
    //stocker dans un array pour l'afficher à un utilisateur
   
  });

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