let products = [
    { name: "Airpods P9 MAX", color: "білий", src: "../images/n-w.jpg", price: 1499 },
    { name: "Airpods P9 MAX", color: "чорний", src: "../images/n-bl.jpg", price: 1499 },
    { name: "Airpods P9 MAX", color: "синій", src: "../images/n-b.jpg", price: 1499 },
    { name: "Airpods P9 MAX", color: "зелений", src: "../images/n-g.jpg", price: 1499 },
    { name: "Airpods P9 MAX", color: "червоний", src: "../images/n-r.jpg", price: 1499 }
];

let buttons = [
    document.getElementById("buy1"), 
    document.getElementById("buy2"), 
    document.getElementById("buy3"), 
    document.getElementById("buy4"), 
    document.getElementById("buy5")
];
console.log(buttons);  

function setCookie(key, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000)); 
    document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires.toUTCString()}; path=/`;
}

function getCookie(key) {
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1); 
        }
        if (c.indexOf(name) === 0) {
            return JSON.parse(c.substring(name.length, c.length)); 
        }
    }
    return null; 
}

function addToCart(itemData) {
    let cart = getCookie("cart") || [];

    console.log("Поточний кошик:", cart);

    const existingItemIndex = cart.findIndex(item => item.itemName === itemData.itemName && item.itemColor === itemData.itemColor);

    console.log("Індекс існуючого товару:", existingItemIndex); 

    if (existingItemIndex !== -1) {

        cart[existingItemIndex].quantity += 1;
    } else {

        cart.push(itemData);
    }

    console.log("Оновлений кошик:", cart);  

    setCookie("cart", cart, 7);
}

buttons.forEach((button, index) => {
    if (button) {
        button.addEventListener("click", () => {
            const product = products[index];
            const itemData = {
                itemName: product.name,
                itemColor: product.color,
                itemImage: product.src,
                price: product.price, 
                quantity: 1
            };

            console.log(`Додавання товару: ${itemData.itemName} (${itemData.itemColor})`); 

            addToCart(itemData);
            console.log(`Товар ${itemData.itemName} (${itemData.itemColor}) додано до кошика`);
        });
    } else {
        console.error(`Кнопка з індексом ${index + 1} не знайдена!`);
    }
});

function getCookie(key) {
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1); 
        }
        if (c.indexOf(name) === 0) {
            return JSON.parse(c.substring(name.length, c.length)); 
        }
    }
    return null; 
}

function updateBasketIcon() {
    const cart = getCookie("cart"); 

    const basketIcon = document.getElementById("basketIcon");

    if (cart && cart.length > 0) {
        basketIcon.src = "./icons/basket.svg"; 
    } else {
        basketIcon.src = "./icons/backetNull.svg"; 
    }
}

updateBasketIcon();

