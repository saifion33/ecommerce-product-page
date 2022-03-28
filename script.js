"use strict"

// ############################################ MOBILE MENU AND IMAGE CHANGE RELATED FUNCTIONS ######################################
const menuIcon = document.getElementById('menu-icon');
const menuCloseIcon = document.getElementById('menu-close-icon');
const mobileMenu = document.getElementById('mobile-menu');
const mobilePreviousBtn = document.getElementById('mobile-previous-icon');
const mobileNextBtn = document.getElementById('mobile-next-icon');

// ****************************** Show and Hide mobile menu ******************************************
// This function translate navbar to it's original position basically it's visible
function menuDisplayer() {
  mobileMenu.style.transform = 'translateX(0%)';
}
// This function translate navbar -100% from it's original position basically is'nt visible any more
function menuHider() {
  mobileMenu.style.transform = 'translateX(-100%)'
}
// Add a click event listener on menu icon. When user click on menu icon it call menuDisplayer function
menuIcon.addEventListener('click', () => {
  menuDisplayer()
});
// Add a click event listener on close menu icon. When user click on close menu icon it call menuHider function
menuCloseIcon.addEventListener('click', () => {
  menuHider()
})

// ***************************** Change Image Functions **************************************************
// Set thubnail image id to 0
let thumbnailImageId = 0;
mobilePreviousBtn.addEventListener('click', () => {

  if (thumbnailImageId == 0) {
    imageChanger(3)
  }
  else {
    imageChanger(thumbnailImageId - 1);
  }
});
// Add click event listener on next btn to change light box image
mobileNextBtn.addEventListener('click', () => {
  if (thumbnailImageId == 3) {
    imageChanger(0)
  }
  else {
    imageChanger(thumbnailImageId + 1)
  }
})

// ############################################ CART RELATED FUNCTIONS #############################################
let cartDisplayHidden = true;
// Grab cart container
const cartContainer = document.getElementById('cart-container');
// Grab add to cart icon
const addToCartBtn = document.getElementById('add-to-cart-btn');
// Grab cart
const cart = document.getElementById('cart');
// This fucnction hide and show cart container
function cartDisplayerAndHider() {
  if (cartDisplayHidden) {
    cartContainer.style.display = 'flex';
    cartDisplayHidden = false;
  } else {
    cartContainer.style.display = 'none';
    cartDisplayHidden = true;
  }
}
// Grab cart icon
const cartIcon = document.getElementById('cart-icon');
// Add click event listener on cart icon
cartIcon.addEventListener('click', cartDisplayerAndHider);

// ******************************** add item in cart **********************************************
// This is a cart item template
const cartItemTemplate = `<div class="cart-item">
<div class="cart-product-image-container">
  <img src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
</div>
<div class="cart-prouduct-details">
  <p>Fall Limited Edition Sneaker</p>
  <p>$125.00x <span id="item-quantity">0</span> <span id="total-price">0</span></p>
</div>
<div id="delete-icon">
  <img id="delete-icon"  src="./images/icon-delete.svg" alt="delete-icon">
</div>
</div>
<button class="checkout-btn">Checkout</button>
`;
// itemQuntity is value of quantity selector 
const itemQunatity = document.getElementById('quantity');
// minus icon for reduse the quantity
const minusIcon = document.getElementById('minus-icon');
// plus icon use for increase the quantity
const plusIcon = document.getElementById('plus-icon');
// This is a small box on corner of cart icon it shows how much items added in cart when item is 0 is'nt visible
const itemCountDisplay = document.getElementById('item-count-display');

/*
This temp item quantity variable use for quantity selector.
when user click on minus icon it reduse by 1 and increase by 1 on click plus icon.
Cart item adder function add tempItemQuantity as quantity of item when user click on add to cart btn
*/
let tempItemQuantity = 1;

/*
Add click event listener on minus icon when user click on it.
it reduse tempItemQuantity by 1 if tempItemQuantity is 1 then it do nothing
and update on itemQunatity selector
*/
minusIcon.addEventListener('click', () => {
  // 2 use here to prevent to display 0 item on cart when 0 item in cart then cart should be empty
  if (tempItemQuantity >= 2) {
    tempItemQuantity -= 1;
    itemQunatity.innerText = tempItemQuantity;
  }
});
/*
Add click event listener on plus icon when user click on it.
it increase tempItemQuantity by 1 and update on itemQunatity selector
*/
plusIcon.addEventListener('click', () => {
  tempItemQuantity += 1;
  itemQunatity.innerText = tempItemQuantity;
});

// initilize  item count 0
let itemCount = 0;
// initilize total price 0
let totalPrice = 0;

// Add click event listener on add to cart btn. When user click on it. It call cart item adder function
addToCartBtn.addEventListener('click', cartItemAdder);

/* 
This function use to add item into cart.
If item count is 0 then run else block.
If there is item in cart run if block
*/
function cartItemAdder() {
  // if cart is not empty then run this block
  if (itemCount != 0) {
    /* update item count =tempItemQuntity to how many item user want to add into cart
    or many item user select on quantity selector*/
    itemCount += tempItemQuantity;
    // evaluate total price. Price of 1 item is 125
    totalPrice = 125 * itemCount;
    // item quantity in cart present on right side of product image so we update it according to item count variable
    document.getElementById('item-quantity').innerText = itemCount;
    // update inner text according to item count
    document.getElementById('total-price').innerText = `$${totalPrice}.00`;
    // update item count on cornor of cart icon
    itemCountDisplay.innerText = itemCount;
  }

  // if cart is empty the run this block
  else {
    // firstly insert item in cart
    cart.innerHTML = cartItemTemplate;
    // Get delete icon to remove item from cart
    const deleteIcon = document.getElementById('delete-icon');
    // Add click event litener. it call cart item remover function
    deleteIcon.addEventListener('click', cartItemRemover)
    // set item count equal to temp item quantity
    itemCount += tempItemQuantity;
    // set total price in multiple of item count
    totalPrice = 125 * itemCount;
    // set item quantity in cart item 
    document.getElementById('item-quantity').innerText = itemCount;
    // set total price in cart item
    document.getElementById('total-price').innerText = `$${totalPrice}.00`;
    // when first item added in cart. visible the item count display(orange background) on corner of cart icon
    itemCountDisplay.style.display = 'block';
    // set item count as inner text on corner of cart icon
    itemCountDisplay.innerText=itemCount;
  }
}
// This function remove item from cart it runs when user click on delete icon which placed in cart item
function cartItemRemover() {
  // if item count greater then 1 it remove 1 item on every click
  if (itemCount != 1) {
    // set item count equal to item count-1
    itemCount -= 1;
    // reduse price of 1 item from total price
    totalPrice -= 125;
    // update item quantity in cart item
    document.getElementById('item-quantity').innerText = itemCount;
    // update new price after remove one item
    document.getElementById('total-price').innerText = `$${totalPrice}.00`;
    // update item count on corner of cart icon
    itemCountDisplay.innerText = itemCount;
  }
  // If there is only only 1 item in cart and user click on delete icon then this block run
  else {
    // replace cart item by your cart is empty
    cart.innerHTML = `<h1>Your cart is empty</h1>`;
    // hide item count display from corner of cart icon
    itemCountDisplay.style.display = 'none';
    // set item count to 0 means there is no item left in cart
    itemCount = 0;
  }
}


// ########################################## IMAGE CHANGING RELATED FUNCTION ##########################################
let image = document.getElementById('main-image');;
const imagePath = ['./images/image-product-1.jpg', './images/image-product-2.jpg', './images/image-product-3.jpg', './images/image-product-4.jpg']


function imageActivater(imageId) {
  document.getElementById(thumbnailImageId).classList.remove('active-image');
  document.getElementById(imageId).classList.add('active-image');
  thumbnailImageId = imageId;
}
// This function take thumbnail and imageType(there are two image main page and lightbox image) and change them according to clicked thumnail id
function imageChanger(thumbnailId) {
  imageActivater(thumbnailId);
  console.log(typeof thumbnailId)
  if (typeof thumbnailId != 'number') {
    thumbnailId = thumbnailId.charAt(thumbnailId.length - 1);
  }
  // console.log(thumbnailId)
  thumbnailId = Number(thumbnailId);
  image.setAttribute('src', imagePath[thumbnailId]);
}

// Grab thumbnail image to add click event listner
const thumbnailHtmlCollection = document.getElementsByClassName('thumbnail-image');
// convert html collection into array
const thumbnailArray = Array.from(thumbnailHtmlCollection);
// Grab thumbnail one by one and add event listener
thumbnailArray.forEach((thumbnail) => {
  document.getElementById(thumbnail.id).addEventListener('click', (event) => imageChanger(event.target.id));
})

// ############################################ LIGHTBOX RELATED FUNCTION ##########################################

const lightBoxHtml = `<div>
<div class="cancal-icon-container">
  <img id="cancal-icon" src="./images/icon-close.svg" alt="cancal icon" tabindex="0">
</div>
<div class="image-container">
  <img class="icons" id="previous-icon" src="./images/icon-previous.svg" alt="previous icon" tabindex="1">
  <img id="lightbox-image" src="./images/image-product-1.jpg" alt="product image">
  <img class="icons" id="next-icon" src="./images/icon-next.svg" alt="next icon" tabindex="2">
</div>
<div class="lightbox-thumbnail-container">
  <div class="thumbnail" >
    <img class="thumbnail-image active-image" id="0"  src="./images/image-product-1-thumbnail.jpg" alt="product image 1 thumbnail">
  </div>
  <div class="thumbnail">
    <img class="thumbnail-image" id="1"   src="./images/image-product-2-thumbnail.jpg" alt="product image 2 thumbnail">
  </div>
  <div class="thumbnail">
    <img class="thumbnail-image" id="2"   src="./images/image-product-3-thumbnail.jpg" alt="product image 3 thumbnail">
  </div>
  <div class="thumbnail" >
    <img class="thumbnail-image" id="3"   src="./images/image-product-4-thumbnail.jpg" alt="product image 4 thumbnail">
  </div>
</div>
</div>`;
// Grab lightbox
const lightBox = document.getElementById('light-box');
// add event listener on main image to show up lightBox
image.addEventListener('click', () => {
  // check screen width if screen width less than 800px then lightbox will not showed
  if (screen.width > 800) {
    // Change lightbox display none to flex
    lightBox.style.display = 'flex';
    // Insert html template in lightbox
    lightBox.innerHTML = lightBoxHtml;
    // Get lightbox thumbnail image html collection
    const thumbnailHtmlCollection = document.getElementsByClassName('thumbnail-image');
    // Convert html collection into array
    const thumbnailArray = Array.from(thumbnailHtmlCollection);
    // Apply forEach loop on thumnail array
    thumbnailArray.forEach((thumbnail) => {
      // Get thumbnail one by one and add event listener and call image changer function and pass tumbnail id
      document.getElementById(thumbnail.id).addEventListener('click', (event) => imageChanger(event.target.id));
    })
    // Change imgage variable value main-image to lightbox-image for change lightbox image
    image = document.getElementById('lightbox-image');
    // Set thumbnailImageId to 0
    thumbnailImageId = 0;
    // Grab cancal icon
    const cancalIcon = document.getElementById('cancal-icon');
    // Add click event listener on cancal icon
    cancalIcon.addEventListener('click', () => {
      // Change image variable to it's default value
      image = document.getElementById('main-image');
      // Change lightbox display flex to none for hide it
      document.getElementById('light-box').style.display = 'none';
    })
    // Grab next and previous button
    const previousBtn = document.getElementById('previous-icon');
    const nextBtn = document.getElementById('next-icon');

    // Add click event listener on previous btn to change light box image
    previousBtn.addEventListener('click', () => {
      if (thumbnailImageId == 0) {
        imageChanger(3)
      }
      else {
        imageChanger(thumbnailImageId - 1);
      }
    });
    // Add click event listener on next btn to change light box image
    nextBtn.addEventListener('click', () => {
      if (thumbnailImageId == 3) {
        imageChanger(0)
      }
      else {
        imageChanger(thumbnailImageId + 1)
      }
    })
  }
}
)
