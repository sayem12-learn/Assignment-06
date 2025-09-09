const managespinner = (status)=>{
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('plants-container').classList.add('hidden')
        document.getElementById('categories-container').classList.add('hidden')
       

    }
    else{
         document.getElementById('spinner').classList.add('hidden')
        document.getElementById('categories-container').classList.remove('hidden')
       

    }
}

const allPlants = () => {
     managespinner(true)
    const url = 'https://openapi.programming-hero.com/api/plants';
    fetch(url)
        .then(res => res.json())
        .then(plants => {
            showPlants(plants.plants)
        })
}

const showPlants = (show) => {
    const plantsContainer = document.getElementById('plants-container');
    plantsContainer.innerHTML = '';

    show.forEach(plant => {
        const div = document.createElement('div')
        div.innerHTML = `
         <div class="bg-white shadow-lg rounded-md text-center p-3 w-[300px]">

            <div>
                <img class="h-[250px] w-full rounded-lg" src="${plant.image}" alt="">
            </div>
            
            <h1 class="font-semibold text-xl text-left mt-3">${plant.name}</h1>
            <p class="text-left text-[0.8rem]">${plant.description}</p>
            
            <div class="flex justify-between items-center mt-2">
                <button onclick="loadPlantsDetails(${plant.id})" class="text-[0.8rem] bg-[#a1edbc] p-2 rounded-3xl">${plant.category}</button>
                <button class="font-medium plant-price">${plant.price} tk</button>
            </div>

            <button class="bg-[#15803d] text-white font-medium py-1 px-4 rounded-2xl w-full mt-2 addCartD">Add to Cart</button>
        </div>`;
        plantsContainer.append(div)
    });
     
 managespinner(false)
   
}

// Plants Detail
const loadPlantsDetails = (id) => {

    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then(res => res.json())
        .then(details => {
            showPlantsDetails(details.plants)
        })
}

const showPlantsDetails = (plants) => {
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
    <div class="bg-white shadow-lg rounded-md text-center p-3 w-full">
        <div>
            <img class="h-[250px] w-full rounded-lg" src="${plants.image}" alt="">
        </div>
        <h1 class="font-semibold text-xl text-left mt-3">${plants.name}</h1>
        <p class="text-left text-[0.8rem]">${plants.description}</p>
        <div class="flex justify-between items-center mt-2">
            <button class="font-medium">${plants.price} tk</button>
        </div>
    </div>`;
    document.getElementById('my_modal_5').showModal()
}

// Categories
const allCategories = () => {
     
    const url = 'https://openapi.programming-hero.com/api/categories'
    fetch(url)
        .then(res => res.json())
        .then(categories => {
            showCategories(categories.categories)
        })
}

const showCategories = show => {
    const categoriesContainer = document.getElementById('categories-container')
    categoriesContainer.innerHTML = '';

    show.forEach(data => {
        const li = document.createElement('li')
        li.innerHTML = `
            <button id="categories-Btn-${data.id}" onclick="categoriesBtn('${data.id}')" class="hover:bg-[#15803d] py-1 px-4 hover:text-white rounded-lg font-medium categories-Btn">${data.category_name}</button>
        `;
        categoriesContainer.append(li)
    })
     managespinner(false)

   
}

const removeActiveBtn = () => {
    const removeBtn = document.querySelectorAll('.categories-Btn')
    removeBtn.forEach(btn => {
        btn.classList.remove('active')
    })
}

const categoriesBtn = (id) => {
    managespinner(true)
     
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(plants => {
            removeActiveBtn()
            const clickBtn = document.getElementById(`categories-Btn-${id}`)
            clickBtn.classList.add('active')
            plantsDisplay(plants.plants)
             managespinner(false)
        })
       
}

const plantsDisplay = (display) => {
    const categoriesPlants = document.getElementById('categories-plants')
    const plantsContainer = document.getElementById('plants-container');
    plantsContainer.innerHTML = '';
    categoriesPlants.innerHTML = '';

    display.forEach(plant => {
        const div = document.createElement('div')
        div.innerHTML = `
         <div class="bg-white shadow-lg rounded-md text-center p-3 w-[300px]">

            <div>
                <img class="h-[250px] w-full rounded-lg" src="${plant.image}" alt="">
            </div>
            
            <h1 class="font-semibold text-xl text-left mt-3">${plant.name}</h1>
            <p class="text-left text-[0.8rem]">${plant.description}</p>
            
            <div class="flex justify-between items-center mt-2">
                <button onclick="loadPlantsDetails(${plant.id})" class="text-[0.8rem] bg-[#a1edbc] p-2 rounded-3xl">${plant.category}</button>
                <button class="font-medium plant-price">${plant.price} tk</button>
            </div>

            <button class="bg-[#15803d] text-white font-medium py-1 px-4 rounded-2xl w-full mt-2 addCartD">Add to Cart</button>
        </div>`;
        categoriesPlants.append(div)
    })
   
}


let cartArr = [];

const renderCart = () => {
    const cartContainer = document.getElementById('cart-container');


    const itemsHTML = cartArr.map((item, index) => `
        <div class="flex justify-between bg-white gap-10 mt-3 p-3 rounded-lg">
            <div>
                <h3 class="font-semibold">${item.name}</h3>
                <p class="font-semibold">${item.price} tk</p>
            </div>
            <button class="remove-cart-item" data-index="${index}" aria-label="Remove">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `).join('');

   let total = 0; 
   for (let i = 0; i < cartArr.length; i++) { total += Number(cartArr[i].price) || 0; }


    cartContainer.innerHTML = `
        <h2 class="font-bold text-2xl">Your Cart</h2>
        <div id="cart-items">
            ${itemsHTML || `<p class="mt-3 ml-2"></p>`}
        </div>
        <h3 id="cart-total" class="mt-3 ml-2 font-semibold">Total ${total} Tk</h3>
    `;
};


document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.addCartD');
    if (addBtn) {
        
        const card = addBtn.closest('.bg-white.shadow-lg.rounded-md');
        if (!card) return;

        const nameEl = card.querySelector('h1');
        const priceEl = card.querySelector('.plant-price');

        const name = nameEl ? nameEl.textContent.trim() : 'Unknown';
        const priceText = priceEl ? priceEl.textContent.trim() : '0';
       const price = parseInt(priceText) || 0;


        cartArr.push({ name, price });
        renderCart();
    }
});






const cartContainerStatic = document.getElementById('cart-container');
if (cartContainerStatic) {
    cartContainerStatic.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-cart-item');
        if (removeBtn) {
            const idx = parseInt(removeBtn.dataset.index, 10);
            if (!isNaN(idx)) {
                cartArr.splice(idx, 1);
                renderCart();
            }
        }
    });
}


renderCart();
allCategories();
allPlants();


