var $dropdownText = document.querySelector(".dropdown-text");
var $dropdown = document.querySelector(".dropdown"); //hiddn > visible //visible> hidden

function handleDropdown() {
  if ($dropdown.style.visibility == "hidden") {
    $dropdown.style.visibility = "visible";
  } else {
    $dropdown.style.visibility = "hidden";
  }
}

$dropdownText.addEventListener("click", handleDropdown);
// create boxes for the products
var $section = document.getElementsByTagName("section")[0];
var cart = JSON.parse(localStorage.getItem("cart")) || [];
var $qty = document.querySelector(".qty");
var quantity = 0;
for (let i = 0; i < cart.length; i++) {
  quantity += cart[i].qty;
}
$qty.textContent = quantity;

function handleAddToCart(product) {
  var test = false;
  for (let i = 0; i < cart.length; i++) {
    if (product.id == cart[i].product.id) {
      cart[i].qty += 1;
      test = true;
    }
  }
  if (test == false) {
    cart.push({ product: product, qty: 1 });
  }
  alert("added to cart");
  localStorage.setItem("cart", JSON.stringify(cart));
  var quantity = 0;
  for (let i = 0; i < cart.length; i++) {
    quantity += cart[i].qty;
  }
  $qty.textContent = quantity;
}

function createBox(product) {
  var $box = document.createElement("div");
  $box.classList.add("box");
  var $image = document.createElement("img");
  // $image.src=product.image
  $image.setAttribute("src", product.image);
  $image.setAttribute("alt", product.title);
  var $title = document.createElement("h4");
  $title.textContent = product.title;
  var $price = document.createElement("p");
  $price.textContent = product.price + " $";
  var $btn = document.createElement("button");
  $btn.textContent = "add to cart";
  $btn.addEventListener("click", function () {
    handleAddToCart(product);
  });
  $box.append($image, $title, $price, $btn);

  return $box;
}

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    for (let i = 0; i < products.length; i++) {
      var box = createBox(products[i]);
      $section.appendChild(box);
    }
  });
