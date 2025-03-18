const callRecipes = async () => {
  try {
    const response = await fetch(
      "/php_Data/recetas.json"
    ); // Ruta del JSON
    const data = await response.json();
    showRecipes(data);
  } catch (error) {
    console.error("Error al cargar las recetas:", error);
  }
};

const mainContainer = document.querySelector(".main"); // Obtener el contenedor principal del HTML (recipes)
const showRecipes = (data) => {
  const containerRecipes = document.createElement("section");
  containerRecipes.classList.add("recipes");

  Object.entries(data.recipes).forEach(([key, recipe]) => {
    // Extraemos la clave y el objeto receta 

    const containerRecipesRight = document.createElement("section");
    containerRecipesRight.classList.add("recipesRight");

    containerRecipesRight.innerHTML = `
      <aside class="recipesRight__container-img">
        <img src="${recipe.image}" alt="${recipe.title}">
      </aside>    
      <article class="recipesRight__container-info">
        <header>
          <h2>${recipe.title}</h2>
        </header>
        <div class="container-ingredients">
          <h3>Ingredientes</h3>
           <ul>
           ${recipe.ingredients
             .map((ingrediente) => `<li>${ingrediente}</li>`)
             .join("")}
           </ul>
        </div>
        <div class="container-preparation">
          <h3>Preparación</h3>
           <ol type="1">
           ${recipe.preparation.map((pasos) => `<li>${pasos}</li>`).join("")}
           </ol>
        </div>
      </article>
    `;

    containerRecipes.appendChild(containerRecipesRight);
  });

  mainContainer.appendChild(containerRecipes);
};
callRecipes();


//////////////////

