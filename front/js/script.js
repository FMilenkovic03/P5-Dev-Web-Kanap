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
            let h3 = document.createElement('h3');
            let p = document.createElement('p');
            
            //lien a
            a.href = Url;
            //appel des elements
            
            img.src = product.imageUrl;
            img.alt = product.altTxt;
            h3.textContent = product.name;
            p.textContent = product.description;
            
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);
            a.appendChild(article);
            items.appendChild(a);

        })

    })
    .catch((error) => {
        console.log(error);
    });
    