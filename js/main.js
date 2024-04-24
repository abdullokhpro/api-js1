const API_URL = "https://fakestoreapi.com";

const hamburgerBtn = document.querySelector(".header__hamburger");
const headerList = document.querySelector(".header__list");
const generalCard = document.querySelector(".cards");
const loading = document.querySelector(".loading");
const seeMore = document.querySelector(".see-more__btn");

let limitCount = 8;
let multpileCount = 1;

async function fetchData(url) {
  let data = await fetch(
    `${url}/products?limit=${limitCount * multpileCount}`,
    {
      method: "GET",
    }
  );

  data
    .json()
    .then((res) => mapData(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
      seeMore.innerHTML = "See more";
      seeMore.removeAttribute("disabled");
    });
}

fetchData(API_URL);

seeMore.addEventListener("click", (evt) => {
  multpileCount++;
  fetchData(API_URL);
  seeMore.innerHTML = "loading...";
  seeMore.setAttribute("disabled", true);
});

generalCard.addEventListener("click", (evt) => {
  if (evt.target.className === "card__image") {
    let id = evt.target.dataset.id;
    window.open(`../pages/cart.html?=${id}`, "_self");
  }
});

function mapData(data) {
  let card = "";
  data.forEach((el) => {
    card += `
            <div class="card">
              <div class="card__top">
                <img class = "card__image" src="${el.image}" alt="" data-id=${el.id}/>
                <p class="card__sale"></p>
              </div>
              <div class="card__bottom">
                <div class="card__stars">
                  <img src="images/card/star.svg" alt="" />
                  <img src="images/card/star.svg" alt="" />
                  <img src="images/card/star.svg" alt="" />

                  <p class="card__star__text">${el.rating.rate}</p>
                </div>
                <p class="card__desc">${el.title}</p>
                <p class="card__price">${el.price}₽</p>
              </div>
            </div>
    `;
  });

  generalCard.innerHTML = card;
}

function createLoading(data) {
  let loadingItem = "";
  for (let i = 0; i < data; i++) {
    loadingItem += `
            <div class="loading__item">
              <div class="loading__img bg__animation"></div>
              <div class="loading__title bg__animation"></div>
              <div class="loading__price bg__animation"></div>
            </div>
        `;
  }

  loading.innerHTML = loadingItem;
}

createLoading(limitCount);

hamburgerBtn.addEventListener("click", () => {
  headerList.classList.toggle("header__show__list");
});
