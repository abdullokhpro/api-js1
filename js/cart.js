const API_URL = "https://fakestoreapi.com";
const singleCard = document.querySelector(".single__card");

async function fetchData(url) {
  let param = new URLSearchParams(window.location.search);
  let id = param.get("id");

  const data = await fetch(`${url}/products/${id}`);
  data
    .json()
    .then((res) => createContent(res))
    .catch((err) => console.log(err));
}

fetchData(API_URL);

function createContent(data) {
  singleCard.innerHTML = `
         <div class="cart">
          <div class="cart__img">
            <img src="${data.image}" alt="" />
          </div>

          <div class="cart__content">
            <h1 class="cart__title">${data.title}</h1>
            <p class="cart__text">${data.description}</p>
            <p class="cart__price">${data.price}₽</p>
            <button class="cart__button">КОРЗИНКА</button>
          </div>
        </div> 
    `;
}
