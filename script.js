
const receipe_Api = `https://www.themealdb.com/api/json/v1/1/search.php?s=`



const receipe_Name = document.querySelector("#name");
const category = document.getElementById("category");
const area = document.querySelector("#area");
const image = document.querySelector("img")
const button = document.querySelector("#receipe")
const search = document.querySelector("#search")
const youtubeLink = document.querySelector(".card-link")

async function getRecipe(name) {
    try {
        const result = await axios.get(receipe_Api + name)
        console.log(result.data.meals)
        return result.data.meals


    } catch (err) {
        console.log(err)
    }
}

// for search any receipe as you want
search.addEventListener("click", async (e) => {
    e.preventDefault()
    let name = document.querySelector("#input").value.trim()

    const details = await getRecipe(name);
    console.log(details)
    show(details);
    //   name.value.trim() = "";

})


//  function for all show receipe 
async function show(details) {
    const container = document.querySelector(".container")

    container.innerHTML = ""  // for empty after single receipe search then show another dish
    // for(let i = 0; i < details.length; i++){ 
    for (detail of details) {
        // const detail = details[i];
        const cardDiv = document.createElement("div")

        cardDiv.innerHTML = `
        <div class="card "  style="width: 18rem;">
          <img src="${detail.strMealThumb}" class="card-img-top" alt="..." >
         <div class="card-body">
           <h5 class="card-title" id="name">${detail.strMeal}</h5>
           <p class="card-text">This delicious recipe belongs to the <span id="area"> <b>${detail.strArea}</b> </span>  and falls under the <span id="category"><b>${detail.strCategory}</b></span> category.</p>
           <a href="${detail.strYoutube}" class="" id="recipe">youtube video</a> 
         </div>
        </div>`
        const viewbtn = document.createElement("button")
        viewbtn.innerText = "show ingredient"
        viewbtn.classList.add("btn", "button-62", "m-2")
        viewbtn.addEventListener("click", () => {
            showIngredients(detail)
        })
        cardDiv.querySelector(".card-body").appendChild(viewbtn)
        container.appendChild(cardDiv)

    }

}

let showIngredients = (detail) => {
    const cardingredients = document.querySelector("#show");
    cardingredients.innerHTML = ""; // Clear previous ingredients
    cardingredients.style.display = "block";

    const recipeName = document.createElement("h3");
    recipeName.innerText = detail.strMeal;
    cardingredients.appendChild(recipeName);

    // cardingredients.appendChild(close);



    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("list", "mt-2");

    for (let i = 1; i <= 20; i++) {

        let ingredient = detail[`strIngredient${i}`]
        if (ingredient) {
            const measure = detail[`strMeasure${i}`]
            let li = document.createElement("li")
            li.classList.add("list");
            li.innerHTML = `<span>${measure} </span> <span>${ingredient} </span> `

            ingredientsList.appendChild(li)
            

        } else {
            break;
        }

    }

    cardingredients.appendChild(ingredientsList);
    const instructions = document.createElement("p")
    instructions.classList.add("para")
    const oneInstruction = detail.strInstructions

    instructions.innerHTML = `<b>Instructions:</b> ${oneInstruction}`;
    console.log(instructions.innerHTML)
    cardingredients.append(instructions)




    // close icon 
    
    const close = document.querySelector("#icon")

    // close.addEventListener("click", ()=> {
    //     cardingredients.style.display = "none"
    //     cardingredients.innerHTML = "";
    //     console.log("working")
    // })

}


