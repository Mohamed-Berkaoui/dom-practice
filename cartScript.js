var $section = document.querySelector("section");
var $total=document.querySelector('.total')
var cart = localStorage.getItem("cart");
cart = JSON.parse(cart);

function createCartBox(item) {
  var $cartBox = document.createElement("div");
  //  $cartBox.className="cartBox"
  // $cartBox.classList.add('cartBox')
  $cartBox.setAttribute("class", "cartBox");
  var $titleContainer = document.createElement("div");
  $titleContainer.classList.add("title");
  var $productImg = document.createElement("img");
  $productImg.src = item.product.image;
  var $price=document.createElement('p')
  $price.textContent=item.product.price + "$"
  var $title = document.createElement("h3");
  $title.textContent = item.product.title;
  $titleContainer.append($productImg, $title,  $price);
  var $buttonsContainer = document.createElement("div");
  $buttonsContainer.classList.add("buttons");
  var $incBtn = document.createElement("button");
  $incBtn.textContent = "+";

  $incBtn.addEventListener("click", function () {
    for (let i = 0; i < cart.length; i++) {
      if (item.product.id == cart[i].product.id) {
        cart[i].qty++;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      $section.textContent = "";
      drawui();
      calcTotal()
    }
  });

  var $decBtn = document.createElement("button");
  $decBtn.textContent = "-";

  $decBtn.addEventListener("click", function () {
    for (let i = 0; i < cart.length; i++) {
      if (item.product.id == cart[i].product.id) {
        if (cart[i].qty > 1) {
          cart[i].qty--;
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      $section.textContent = "";
      drawui();
      calcTotal()
    }
  });

  var $deleteBtn = document.createElement("button");
  $deleteBtn.textContent = "delete";

  $deleteBtn.addEventListener("click", function () {
    var newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id !== item.product.id) {
        newCart.push(cart[i]);
      }
    }
    cart=newCart
    localStorage.setItem("cart", JSON.stringify(cart));
    $section.textContent = "";
    drawui();
    calcTotal()
  });

  var $qty = document.createElement("h5");
  $qty.textContent = item.qty;
  $buttonsContainer.append($incBtn, $qty, $decBtn, $deleteBtn);
  $cartBox.append($titleContainer, $buttonsContainer);
  return $cartBox;
}

function drawui() {
  for (let i = 0; i < cart.length; i++) {
    var box = createCartBox(cart[i]);
    $section.appendChild(box);
  }
}

function calcTotal(){
var tot=0
for (let i = 0; i < cart.length; i++) {
    tot=tot+(cart[i].product.price * cart[i].qty)
}
$total.textContent=tot
}


drawui();
calcTotal()