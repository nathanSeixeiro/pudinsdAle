//carrinho

let cart = document.querySelector('.cart')
let cartIcon = document.querySelector('#cart-icon')
let closeCart = document.querySelector('#close-cart')

// abrir
cartIcon.onclick = () =>{
    cart.classList.add("active")
};

// fechar
closeCart.onclick = () =>{
    cart.classList.remove("active")
};

// excução do carrinho

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
  ready();
}

function ready(){
  // add no carrinho
  var addCart = document.getElementsByClassName("cart-add");
  
  for (let i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //remove item
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);

  for (let i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // quantity changes
  var qtInputs = document.getElementsByClassName("cart-qt");

  for (let i = 0; i < qtInputs.length; i++) {
    var input = qtInputs[i];
    input.addEventListener("change", quantityChanged);
  }


  // Finalizar compra
  document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);

}

// Botao 
function buyButtonClicked(){
    alert('Compra finlizada!')

    var cartContent = document.getElementsByClassName('cart-content')[0]

    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    
    updateTotal();
}

// remove cart items 
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    
    updateTotal();
}


// quantity Changed
function quantityChanged(event){
    var input = event.target

    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal()
}

// add no carrinho
function addCartClicked(event){
    var button = event.target
    var shopProds = button.parentElement
    
    var title = shopProds.getElementsByClassName('poduct-title')[0].innerText
    var price = shopProds.getElementsByClassName('price')[0].innerText
    var prodImg = shopProds.getElementsByClassName("product-img")[0].src;

    addProductToCard(title,price,prodImg);
    console.log(title,price);
    updateTotal();

    // console.log(title, price, prodImg);
}

function addProductToCard(title, price, prodImg){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add('cart-box') 

  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-prod-title");

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === title) {
      alert("Adicionado ao carrinho");
      return;
    }
  }
  //ERRO em  adicionar ao carrinho
  
  var cartBoxContent = `<img src='${prodImg}' alt="" class="cart-img">
                        <div class="detail-box">
                        <div class="cart-prod-title">${title}</div>
                        <div class="cart-price">${price}</div>
                          <input type="number" value="1" class="cart-qt">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove' ></i> `;
                    // <!-- remover do carrinho -->
                    
  cartShopBox.innerHTML = cartBoxContent

  cartItems.append(cartShopBox);
    cartShopBox
      .getElementsByClassName('cart-remove')[0]
      .addEventListener('click', removeCartItem)
    cartShopBox
      .getElementsByClassName('cart-qt')[0]
      .addEventListener('change', quantityChanged)
                    
}

//update total 
function updateTotal(){

  var cartContent = document.getElementsByClassName('cart-content')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-box')
  var total = 0

  for (let i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];

    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var qtElement = cartBox.getElementsByClassName("cart-qt")[0];

    var price = parseFloat(priceElement.innerHTML.replace("R$","00"));
    var quantity = qtElement.value;

    total = total + price * quantity;
 }

  /*valor quebrado
    total = Math.round(total 100) / 100 */

  document.getElementsByClassName("total-price")[0].innerText = "R$" + total;
}