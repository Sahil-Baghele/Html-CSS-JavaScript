const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const closeBtn = document.querySelector('.close-btn')


const fetchRecipes = async (query) => {
    try {
        
    recipeContainer.innerHTML ="<h1>Loading Recipes...</h1>"
    const app = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await app.json();
 
recipeContainer.innerHTML="";
    
    response.meals.forEach(meals => {
     const recipeDiv = document.createElement('div');
     recipeDiv.classList.add('recipe');
     recipeDiv.innerHTML = `
     <img src="${meals.strMealThumb}">
     <h1>${meals.strMeal}</h1>
     <p><span>${meals.strArea} Dish</span></p>
     <p>Belongs to <span>${meals.strCategory}</span> Category</p>
     
     `
     const button = document.createElement('button');
     button.textContent = "View Recipe"
recipeDiv.appendChild(button);

   button.addEventListener('click', () => {
  openRecipePopup(meals);
   });
     recipeContainer.appendChild(recipeDiv);
    });
} catch (error) {
    recipeContainer.innerHTML ="<h1>No Results Available...</h1>"
}
}



const fetchIngredients = (meals) => {
let ingredientsList = "";
for(let i=1; i<=20; i++){
    const ingredient = meals[`strIngredient${i}`];
    if(ingredient){
        const measure = meals[`strMeasure${i}`];
        ingredientsList += `<li> ${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
}
return ingredientsList;
};

const openRecipePopup = (meals) =>{
       recipeDetailsContent.innerHTML = `
       <h2 class="recipe-name">${meals.strMeal}</h2>
       <br>
       <h3 class="head">Ingredients : </h3>
       <br>
       <ul class="ingredient-list">${fetchIngredients(meals)}</ul>
       <br>
       <div class="instruction">
       <h3 class="head2">Instructions :</h3>
       <p>${meals.strInstructions}</p>
       </div>
       `
       
       recipeDetailsContent.parentElement.style.display = "block";
};

closeBtn.addEventListener('click', () =>{
recipeDetailsContent.parentElement.style.display ="none";
}
);
searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the Meal you want to search.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});