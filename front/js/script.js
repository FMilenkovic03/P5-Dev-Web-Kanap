document.addEventListener("DOMContentLoaded", function () {
    const itemsSection = document.getElementById("items");
    fetchProducts();
  
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const products = await response.json();
  
        // Générer le contenu des produits
        let productsHTML = "";
        products.forEach((product) => {
          const { _id, imageUrl, name, description, altTxt } = product;
          const productHTML = `
              <a href="./product.html?id=${_id}">
                <article>
                  <img src="${imageUrl}" alt="${altTxt}">
                  <h3 class="productName">${name}</h3>
                  <p class="productDescription">${description}</p>
                </article>
              </a>
            `;
          productsHTML += productHTML;
        });
  
        // Ajouter le contenu des produits à la section "items"
        itemsSection.innerHTML = productsHTML;
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des produits :",
          error,
        );
      }
    }
  });