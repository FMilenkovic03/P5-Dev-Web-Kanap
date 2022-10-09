//requêter l'API pour les produits

fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if(res.ok){
            return res.json();
        }
    })

    // Récupération des produits
    .then(function(produits){
        produits.forEach(product => {
            let items = document.getElementById('items'); // item est select
            a = document.createElement('a');
            article = document.createElement('article');
            img = document.createElement('img');
            h3 = document.createElement('h3').classList.add("productName");
            p = document.createElement('p').classList.add("productDescription");
        })
        .catch((error) => {
            console.log(error);
        })
    })