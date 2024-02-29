// show all phone in display
const loadPhone = async (searchText = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

// append to div in html //////
const displayPhones = (phones, isShowAll) => {
  const card = document.getElementById("card-add");
  card.textContent = "";
  // condition see more btn er
  const seeMoreBtn = document.getElementById("see-more-btn");
  if (phones.length > 12 && !isShowAll) {
    seeMoreBtn.classList.remove("hidden");
  } else {
    seeMoreBtn.classList.add("hidden");
  }
  // slice kor a just 12ta dek ha jab e
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
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
   
   
    <div class="card-actions justify-center m-0 p-0">
      <button onclick="showDetails('${phone.slug}')" class="btn btn-primary ">Show Details</button>
    </div>
  </div>`;
    card.appendChild(phoneCard);
  });
  toggleSpinner(false);
};
//  search filed start to search phone here
const handClickSearch = (isShowAll) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-filed");
  const value = searchField.value;
  loadPhone(value, isShowAll);
  // console.log(value);
};

//  show Details phone

const showDetails = async (id) => {
  // console.log(id, "hi");
  // load a single phone
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  // console.log(data.data);
  showModal(data.data);
};

// show the details phone in modal
const showModal = (phone) => {
  console.log(phone);
  // const phoneName = document.getElementById("phone-details-name");
  // phoneName.innerText = phone.name;
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <img src='${phone.image}' />
  <h2>${phone.name}</h2>
  <p><span class='text-[red] font-bold '>Display Size: </span>${
    phone.mainFeatures.displaySize
  }</p>
  <p>${`<span class="text-[red] font-bold ">Storage: </span>${phone.mainFeatures.memory}`}</p>
  <p>${`<span class="text-[red] font-bold ">chipSet: </span>${phone.mainFeatures.chipSet}`}</p>
  <p>${`<span class="text-[red] font-bold ">Memory: </span>${phone.mainFeatures.memory}`}</p>
  <p>${`<span class="text-[red] font-bold ">Slug: </span>${phone.mainFeatures.chipSet}`}</p>
  <p>${`<span class="text-[red] font-bold ">Sensors:</span>${phone.mainFeatures.sensors}`}</p>
  <p>${`<span class="text-[red] font-bold ">Release Date: </span>${phone.releaseDate}`}</p>
  <p>${`<span class="text-[red] font-bold ">GPS: </span>${
    phone?.others?.GPS || " Not Aviable Now"
  }`}</p>
  <p>${`<span class="text-[red] font-bold ">WLAN: </span>${
    phone?.others?.WLAN || " Not Aviable Now"
  }`}</p>

   `;
  show_details_modal.showModal();
};

// click function toggle

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("loading-spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// show all

const handleShowAll = () => {
  // console.log("hi");
  handClickSearch(true);
};

// displayPhones show function call
loadPhone();
