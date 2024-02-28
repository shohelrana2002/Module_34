// show all phone in display
const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);
};

// append to div in html //////
const displayPhones = (phones) => {
  const card = document.getElementById("card-add");
  card.textContent = "";
  // condition see more btn er
  const seeMoreBtn = document.getElementById("see-more-btn");
  if (phones.length > 12) {
    seeMoreBtn.classList.remove("hidden");
  } else {
    seeMoreBtn.classList.add("hidden");
  }
  // slice kor a just 12ta dek ha jab e
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = ` <figure>
    <img
      src="${phone.image}"
      alt="Shoes"
    />
  </figure>
  <div class="card-body">
  <h4 class='mt-0 mb-0 text-red-600'>${phone.brand}</h4>
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>${phone.slug}</p>
   
    <div class="card-actions justify-center m-0 p-0">
      <button class="btn btn-primary ">Buy Now</button>
    </div>
  </div>`;
    card.appendChild(phoneCard);
  });
};
//  search filed start to search phone here
const handClickSearch = () => {
  const searchField = document.getElementById("search-filed");
  const value = searchField.value;
  loadPhone(value);
  console.log(value);
};

// click function toggle

const toggleSpinner = () => {
  const spinner = document.getElementById("loading-spinner");
};

// displayPhones show function call
loadPhone();
