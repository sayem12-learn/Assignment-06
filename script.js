const allPlants = ()=>{
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
    .then(res => res.json())
    .then(plants =>{
        showPlants(plants.plants)
    })
}


const showPlants = (show)=>{
    const plantsContainer = document.getElementById('plants-container');
    plantsContainer.innerHTML = '';

    show.forEach(plant => {
        const div = document.createElement('div')
        div.innerHTML = `

         <div class="  bg-white shadow-lg rounded-md text-center p-3 w-[300px]">

                <div><img class=" h-[250px] w-full  rounded-lg" src="${plant.image} " alt=""></div>
                
                    <h1 class="font-semibold text-xl text-left mt-3"> ${plant.name} </h1>
                    <p class="text-left text-[0.8rem]"> ${plant.description} </p>
                
                <div class="flex justify-between items-center mt-2">
                    <button class="text-[0.8rem] border-1 border-[#a1edbc] p-2 rounded-3xl"> ${plant.category}</button>
                    <button class="font-medium "> ${plant.price} tk</button>
                </div>
                <button class="bg-[#15803d] text-white font-medium py-1 px-4 rounded-2xl w-full mt-2">Add to Cart</button>
            </div>        
        `;
        plantsContainer.append(div)
        
    });



}


const allCategories = ()=>{
    const url = 'https://openapi.programming-hero.com/api/categories'
    fetch(url)
    .then(res => res.json())
    .then(categories =>{
        showCategories(categories.categories)
    })
}

const showCategories = show =>{
    const categoriesContainer = document.getElementById('categories-container')
    categoriesContainer.innerHTML = '';

    show.forEach(data=>{
        const li = document.createElement('li')
        li.innerHTML = `
        
         <button id="categories-Btn-${data.category_name}" onclick="categoriesBtn('${data.id}')" class=" hover:bg-[#15803d] py-1 px-4 hover:text-white rounded-lg font-medium categories-Btn">${data.category_name}</button>
        
        
        
        
        `;
        categoriesContainer.append(li)
    })
}

const categoriesBtn = (id)=>{
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(plants=>{
        plantsDisplay(plants.plants)
    })
}
const plantsDisplay = (display)=>{
    const categoriesPlants = document.getElementById('categories-plants')
     const plantsContainer = document.getElementById('plants-container');
     plantsContainer.innerHTML = '';

    categoriesPlants.innerHTML ='';


    display.forEach(plant=>{
        const div = document.createElement('div')
        div.innerHTML =  `

         <div class="  bg-white shadow-lg rounded-md text-center p-3 w-[300px]">

                <div><img class=" h-[250px] w-full  rounded-lg" src="${plant.image} " alt=""></div>
                
                    <h1 class="font-semibold text-xl text-left mt-3"> ${plant.name} </h1>
                    <p class="text-left text-[0.8rem]"> ${plant.description} </p>
                
                <div class="flex justify-between items-center mt-2">
                    <button class="text-[0.8rem] border-1 border-[#a1edbc] p-2 rounded-3xl"> ${plant.category}</button>
                    <button class="font-medium "> ${plant.price} tk</button>
                </div>
                <button class="bg-[#15803d] text-white font-medium py-1 px-4 rounded-2xl w-full mt-2">Add to Cart</button>
            </div>        
        
        `;
        categoriesPlants.append(div)
    })
}




 allCategories()

allPlants()