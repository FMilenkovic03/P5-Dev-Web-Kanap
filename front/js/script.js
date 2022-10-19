//requêter l'API pour les produits

fetch('http://localhost:3000/api/products')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })

    // Récupération des produits
    .then(function (produits) {
        produits.forEach(product => {
            //declaration et ajout de classe
            let items = document.getElementById('items');
            let a = document.createElement('a');
            let Url = "./product.html?id=" + product._id;
            let article = document.createElement('article');
            let img = document.createElement('img');
            let h3 = document.createElement('h3').classList.add("productName");
            let p = document.createElement('p').classList.add("productDescription");
            //assignation enfant parent
            items.appendChild(a);
            a.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);
            //lien a
            a.setAttribute('href', Url);
            //appel des elements
            a = product._id;
            img.src = product.imageUrl;
            img.alt = product.altTxt;
            h3.innerHTML = product.name;
            p.innerHTML = product.description;
            

        })

    })
    .catch((error) => {
        console.log(error);
    });