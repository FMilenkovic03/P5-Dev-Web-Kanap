fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then(function(canapes) {
        console.log(canapes)

        canapes.forEach(function(canape) {
            // Create new elements
            let a = document.createElement('a');
            let article = document.createElement('article');
            let img = document.createElement('img');
            let h3 = document.createElement('h3');
            let p = document.createElement('p');

            // Set attributes and content
            a.href = `./product.html?id=${canape._id}`;
            img.src = canape.imageUrl;
            img.alt = canape.altTxt;
            h3.className = 'productName';
            h3.textContent = canape.name;
            p.className = 'productDescription';
            p.textContent = canape.description;

            // Append elements
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);
            a.appendChild(article);
            document.getElementById("items").appendChild(a);
        });

    })
    .catch((error) => {
        console.log(error)
    }) 