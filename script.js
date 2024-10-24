
const receipe_Api = `https://www.themealdb.com/api/json/v1/1/search.php?s=`

const receipe_Name = document.querySelector("#name");
const category = document.getElementById("category");
const area = document.querySelector("#area");
const image = document.querySelector("img")
const button = document.querySelector("#receipe")
const search = document.querySelector("#search")
const youtubeLink = document.querySelector(".card-link")
const loader = document.getElementById("loader")
const all = document.getElementById("all")
const burgerBtn = document.getElementById("burgerBtn")
const pasta = document.getElementById("pasta")
const Salad = document.getElementById("Salad")

burgerBtn.addEventListener("click" , ()=>{
    getRecipe("burger").then(show);

})
all.addEventListener("click" , ()=>{
    getRecipe("").then(show);

})
pasta.addEventListener("click" , ()=>{
    getRecipe("pasta").then(show);

})
Salad.addEventListener("click" , ()=>{
    getRecipe("Salad").then(show);

})
loader.style.display ="none" // show 

async function getRecipe(name) {
    try {
        loader.style.display ="block" // show 
         const result = await axios.get(receipe_Api  + name)
        console.log(result.data.meals)
        loader.style.display ="none" // show 

        return result.data.meals



    } catch (err) {
        console.log(err)
        const div = document.createElement("div")
        const p = document.createElement("p")
        p.innerText ="  please try again it's network issue"
        div.append(p)
        loader.style.display ="none" // show 

    }

}

getRecipe("").then(show);

// for search any receipe as you want
search.addEventListener("click", async (e) => {
    e.preventDefault()
    let name = document.querySelector("#input")
    
 if(!name.value.trim()){
    alert("Oops! please enter any dish ")
 }else {
    const details = await getRecipe(name.value.trim());
    
    console.log(details)
    // check if recipe not found
    if(details.length){
        show(details);

    }else{
        alert("Recipe not found , Try different recipe like burger salad ")
    }
 }

 name.value = ""

})
 


//  function for all show receipe 
async function show(details) {
    const container = document.querySelector(".receipeshow")
    container.innerHTML = ""  // clear  previous recipe
        details.forEach(detail => {
            const cardDiv = document.createElement("div")
            cardDiv.innerHTML = `
            <div class="card "  style="width: 18rem;">
              <img src="${detail.strMealThumb}" class="card-img-top" alt="..." >
             <div class="card-body">
               <h5 class="card-title" id="name">${detail.strMeal}</h5>
               <p class="card-text">This delicious recipe belongs to the <span id="area"> <b>${detail.strArea}</b> </span>  and falls under the <span id="category"><b>${detail.strCategory}</b></span> category.</p>
               <a href="${detail.strYoutube}" class="link" id="recipe">youtube video</a> 
             </div>
            </div>`
            const viewbtn = document.createElement("button")
            viewbtn.innerText = "show ingredient"
            viewbtn.classList.add("btn", "search-btn", "m-2")
            viewbtn.addEventListener("click", () => {
                showIngredients(detail)
        });
        cardDiv.querySelector(".card-body").appendChild(viewbtn)
        container.appendChild(cardDiv)
        })

}

let showIngredients = (detail) => {
    const cardingredients = document.querySelector("#show");
    cardingredients.innerHTML = ""; // Clear previous ingredients
    cardingredients.style.display = "block";

    const recipeName = document.createElement("h3");
    recipeName.innerText = detail.strMeal;
    cardingredients.appendChild(recipeName);

    const close = document.createElement("a")
    close.innerHTML = `<i class="fa-solid fa-xmark" class="close"> </i>`
    close.classList.add("close")
    console.log(close.innerHTML)
    cardingredients.prepend(close)
    close.addEventListener("click" ,()=>{
        cardingredients.style.display = "none"
    })




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

}


