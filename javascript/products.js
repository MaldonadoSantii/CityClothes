// Variables globales
let cartItems = {};
let isCartExpanded = false;


  const cartData = localStorage.getItem('cart');
  if (cartData) {
   
    cartItems = JSON.parse(cartData);
    
    updateCartDisplay();
  }



loadCartFromLocalStorage();


function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}





function addToCart(productId) {
  getProductInfo(productId)
    .then((productInfo) => {
      if (cartItems[productId]) {
        cartItems[productId].quantity++;
      } else {
        cartItems[productId] = {
          name: productInfo.name,
          price: productInfo.price,
          quantity: 1,
        };
      }
      updateCartDisplay();

      saveCartToLocalStorage();
    })
    .catch((error) => {
      console.error(error);
    });
}

function removeFromCart(productId) {
  if (cartItems[productId]) {
    cartItems[productId].quantity -= 1;
    if (cartItems[productId].quantity <= 0) {
      delete cartItems[productId];
    }
    updateCartDisplay();

    saveCartToLocalStorage();
  }
}

function loadProductData(productId) {
  const productDataUrl = '../javascript/products.json';

  fetch(productDataUrl)
    .then((response) => response.json())
    .then((data) => {
      const product = data[productId];
      if (product) {
        if (cartItems[productId]) {
          cartItems[productId].quantity += 1;
        } else {
          cartItems[productId] = {
            product: product,
            quantity: 1,
          };
        }

        updateCartDisplay();
      } else {
        console.error("Producto no encontrado");
      }
    })
    .catch((error) => {
      console.error("Error al cargar los datos del producto: " + error);
    });
}

function updateCartDisplay() {
  const cartItemsList = document.getElementById('cartItems');
  cartItemsList.innerHTML = ''; 
  let totalAmount = 0; 

  for (const productId in cartItems) {
    const cartItem = document.createElement('li');
    const product = cartItems[productId].product;
    const quantity = cartItems[productId].quantity;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => removeFromCart(productId));

    const productPrice = product.price * quantity;
    cartItem.textContent = `${product.name} - $${product.price} (Cantidad: ${quantity}) `;
    cartItem.appendChild(deleteButton);

    cartItemsList.appendChild(cartItem);

    totalAmount += productPrice;
  }

  const totalAmountElement = document.getElementById('totalAmount');
  totalAmountElement.innerText = `Total: $${totalAmount.toFixed(2)}`;

  const cartItemCount = document.getElementById('cartItemCount');
  const totalQuantity = Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
  cartItemCount.innerText = totalQuantity.toString();
}

function completePurchase() {
  alert('¡Compra finalizada! Gracias por tu compra.');
}

function toggleCart() {
  const cartDropdown = document.getElementById("cartDropdown");
  isCartExpanded = !isCartExpanded;
  cartDropdown.style.display = isCartExpanded ? "block" : "none";
}


// Función para completar la compra con SweetAlert
function completePurchase() {
  // Limpia el carrito
  cartItems = {};
  saveCartToLocalStorage(); // Guarda el carrito vacío en el almacenamiento local

  // Actualiza la visualización del carrito
  updateCartDisplay();

  // Muestra una alerta personalizada con SweetAlert
  Swal.fire({
    icon: 'success',
    title: '¡Compra finalizada!',
    text: 'Gracias por tu compra.',
  });
}

