//requêter l'API pour les produits

fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if(res.ok){
            return res.json();
        }
    })
    .catch((error) => {
        console.log(error);
    })
    // Récupération des produits
    .then(function(produits){
        produits.forEach(product => {

        })
    })