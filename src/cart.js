let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItem = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        return `
      
      <div class="cart-item">
        <img width="100px" src=${img} />
        <div><div class="details">
        <div class="title-price-x">
        <H4 class="name-price">
          <p>${name}</p>
          <p class="cart-price">$ ${price}</p>
        </H4>
        <i onclick="removeItem(${id})" class="bi bi-x-lg" ></i>
        
        </div>
        
        
        </div>
        <div class="cart-buttons">
              <i onclick="decreament(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increament(${id})"  class="bi bi-plus-lg"></i>
            </div>
            <h3 class="total-price">$ ${item * search.price} </H3>
          </div>
      </div>
      
      

      `;
      })
      .join(" "));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is empty</h2>
    <a href="index.html"><button class="home-button">Back To Home</button></a>

    `;
  }
};

generateCartItem();

let increament = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItem();
  update(selectedItem.id);
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
};

let decreament = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItem();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItem();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
      <h2>Total Bill: $ ${amount}</h2>
      <button class="checkOut">Checkout</button>
      <button class="removeAll" onclick="clearCart()">Clear cart</button>
      `;
  } else return;
};

totalAmount();
