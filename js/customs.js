const message = alertBox => {
    document.getElementById("alert").innerText = alertBox;
}
const SearchBtn = document.getElementById('searchBtn');
SearchBtn.addEventListener('click', () => {
    message("");
    document.getElementById("details").style.display = 'none';

    const inputText = document.getElementById('searchItem').value.trim();
    document.getElementById('searchItem').value = "";


    if (inputText === "") {
        message('Please Enter a Meal Name!');
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    getInput(data);
                }
                else {
                    message(`No results.`)
                }

            })
    }
})

const getInput = data => {
    const mealsIeam = document.getElementById('list-items');
    document.getElementById('list-items').innerText = "";

    data.meals.forEach(meal => {
        const mealsArea = document.createElement('div');

        const foodInfo = `
        <div onclick='getMealDetails("${meal.idMeal}")' class="meal-area">
            <img src="${meal.strMealThumb}" class="meal-image">
            <p class="meal-title">${meal.strMeal}<p>
        </div>
        `
        mealsArea.innerHTML = foodInfo;
        mealsIeam.appendChild(mealsArea);
    });

}
function displayMeal(meal){
    document.getElementById('show-details').innerHTML = `
    <div class="text-center">
        <h3 class="details-title">${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" class="details-image">
        <div>
            <h4 id="ingredient-title">  Ingredients</h4>
            <ul id="ingredient-list">

            </ul>
        </div>
    </div>
    
    `
    for(let i=0;i<7;i++){
        let mealName = 'strIngredient'+i;
        let itemNo = 'strMeasure'+i;
        if(meal[mealName] === ""|| meal[mealName]==null){
            break;
        }
        const list = document.createElement("li");
        list.innerHTML = `
        <li>${i}:  ${meal[itemNo]} ${meal[mealName]}</li>
        `;
        document.getElementById("ingredient-list").appendChild(list)
    }
    document.getElementById("details").style.display = "block";
}

const getMealDetails = find => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${find}`)
        .then(response => response.json())
        .then(data => {
            displayMeal(data.meals[0]);
        })
}


