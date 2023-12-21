//requêter l'API pour les produits


fetch('http://localhost:3000/api/products')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

  
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
            const items = document.getElementById('items');
            const a = document.createElement('a');
            const Url = "./product.html?id=" + product._id;
            const article = document.createElement('article');
            const img = document.createElement('img');
            const h3 = document.createElement('h3');
            const p = document.createElement('p');
            
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
    