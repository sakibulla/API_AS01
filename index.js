const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayLesson(json.categories));
};

const loadAllWords = () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.plants));
};
window.onload = () => {
  loadAllWords();
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }

};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`
  fetch(url)
    .then(res => res.json())
    .then((data) => displayLevelWord(data.plants));
};

let cart = [];

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
<div class="max-w-xs rounded-2xl shadow-md bg-white p-3">
  <div class="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
    <img src="${word.image}" alt="${word.name}" class="object-cover w-full h-full rounded-lg" />
  </div>

  <div class="mt-3">
    <h2 onclick="loadWordDetail(${word.id})" class="text-slate-900 font-semibold hover:underline cursor-pointer">
      ${word.name}
    </h2>
    <p class="text-slate-600 text-sm">${word.description}</p>

    <div class="flex items-center justify-between mt-2">
      <span class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">${word.category}</span>
      <span class="text-slate-900 font-semibold">৳${word.price}</span>
    </div>

    <button onclick='addToCart(${JSON.stringify(word)})'
      class="mt-3 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-full">
      Add to Cart
    </button>
  </div>
</div>`;
    wordContainer.append(card);
  });
  manageSpinner(false);
};


function addToCart(word) {
  cart.push(word);
  updateCart();
}


function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}


function updateCart() {
  const cartSection = document.getElementById("section-b");
  cartSection.innerHTML = `
    <h3 class="mx-2 text-slate-900 font-semibold">Your Cart</h3>
    <div id="cart-items" class="mt-3 space-y-2"></div>
    <div id="cart-total" class="mt-3 font-bold text-slate-900"></div>
  `;

  const cartItems = document.getElementById("cart-items");
  let total = 0;

  cart.forEach((item, index) => {
    total += parseFloat(item.price);

    const row = document.createElement("div");
    row.className = "flex items-center justify-between bg-gray-100 p-2 rounded-lg";

    row.innerHTML = `
      <span>${item.name}</span>
      <div class="flex items-center gap-3">
        <span class="font-semibold">৳${item.price}</span>
        <button onclick="removeFromCart(${index})"
          class="text-red-500 hover:text-red-700 font-bold">✕</button>
      </div>
    `;

    cartItems.appendChild(row);
  });


  document.getElementById("cart-total").innerText = `Total: ৳${total}`;
}


const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.plants);

};
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
      <h2 class="text-2xl font-bold">${word.name}</h2>
<img src="${word.image}" alt="${word.name}" 
     class="w-100 max-h-50 object-contain rounded-lg mx-auto"  />


      <p><span class="font-bold">Category:</span>${word.category}</p>
      <p><span class="font-bold">Price:</span> ৳${word.price}</p>
      <p><span class="font-bold">Description:</span> ${word.description}</p>
            <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Close</button>
        </form>
      </div>
      `;
  document.getElementById("word_modal").showModal();
}



const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick=loadLevelWord(${lesson.id}) class="w-full text-left  px-3 py-2  hover:bg-green-700 active:bg-green-700 focus:bg-green-700
               active:text-white focus:text-white">
        ${lesson.category_name}
      </button>`;
    levelContainer.append(btnDiv);
  }
};

loadLessons("some-id");
