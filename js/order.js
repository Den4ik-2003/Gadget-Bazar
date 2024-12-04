document.addEventListener("DOMContentLoaded", () => {
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

    function setCookie(key, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000)); 
        document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires.toUTCString()}; path=/`;
    }

    function addToCart(item) {
        let cart = getCookie("cart") || []; 

        const existingItemIndex = cart.findIndex(cartItem => cartItem.itemName === item.itemName && cartItem.itemColor === item.itemColor);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(item);
        }

        setCookie("cart", cart, 7); 
        displayCart(); 
    }

    function displayCart() {
        const cart = getCookie("cart");
        const cartContainer = document.getElementById("cartContainer");
        const oplataContainer = document.querySelector(".oplata");

        if (!cartContainer) {
            console.error("Елемент з id 'cartContainer' не знайдений!");
            return;
        }

        cartContainer.innerHTML = '';

        let totalPrice = 0;
        let hasItems = false;

        if (cart && cart.length > 0) {
            hasItems = true;
            cart.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("bask");

                const productInfo = document.createElement("div");
                productInfo.classList.add("flex");

                const productImg = document.createElement("img");
                productImg.classList.add("productImg");
                productImg.src = item.itemImage;
                productImg.alt = item.itemName;

                const pInfo = document.createElement("div");
                pInfo.classList.add("pInfo");

                const name = document.createElement("p");
                name.textContent = item.itemName;

                const price = document.createElement("p");
                price.textContent = `${item.price} грн`;

                pInfo.appendChild(name);
                pInfo.appendChild(price);

                productInfo.appendChild(productImg);
                productInfo.appendChild(pInfo);

                itemDiv.appendChild(productInfo);

                const countDiv = document.createElement("div");
                countDiv.classList.add("flex", "count");

                const minus = document.createElement("p");
                minus.textContent = "-";
                minus.addEventListener("click", () => updateQuantity(item, -1));

                const quantity = document.createElement("p");
                quantity.textContent = item.quantity;

                const plus = document.createElement("p");
                plus.textContent = "+";
                plus.addEventListener("click", () => updateQuantity(item, 1));

                countDiv.appendChild(minus);
                countDiv.appendChild(quantity);
                countDiv.appendChild(plus);

                itemDiv.appendChild(countDiv);

                const priceDiv = document.createElement("div");
                priceDiv.classList.add("flex");

                const pPrice = document.createElement("p");
                pPrice.classList.add("pPrice");
                pPrice.textContent = `${item.price * item.quantity} грн`;

                const deleteImg = document.createElement("img");
                deleteImg.classList.add("delet");
                deleteImg.src = "../icons/delete.svg";
                deleteImg.alt = "Delete";
                deleteImg.addEventListener("click", () => removeFromCart(item));

                priceDiv.appendChild(pPrice);
                priceDiv.appendChild(deleteImg);

                itemDiv.appendChild(priceDiv);

                cartContainer.appendChild(itemDiv);

                totalPrice += item.price * item.quantity;
            });
        } else {
            document.getElementById("basktxt2").style.display = "none"
            const basktxt = document.getElementById("basktxt")
            const emptyMessage = document.createElement("p");
            emptyMessage.style.fontSize = "36px"
            emptyMessage.style.fontWeight = "800"
            emptyMessage.textContent = "Ваш кошик порожній";
            basktxt.appendChild(emptyMessage);
        }

        if (hasItems) {
            createOplataBlock(totalPrice, cart);
        } else {
            const oplataContainer = document.querySelector(".oplata");
            oplataContainer.style.backgroundColor = "white"
            oplataContainer.innerHTML = ''; 
        }
    }

    function updateQuantity(item, change) {
        const cart = getCookie("cart");
        const index = cart.findIndex(cartItem => cartItem.itemName === item.itemName && cartItem.itemColor === item.itemColor);
        if (index !== -1) {
            cart[index].quantity = Math.max(1, cart[index].quantity + change);
            setCookie("cart", cart, 7); 
            displayCart(); 
        }
    }

    function removeFromCart(item) {
        let cart = getCookie("cart");
        cart = cart.filter(cartItem => !(cartItem.itemName === item.itemName && cartItem.itemColor === item.itemColor));
        setCookie("cart", cart, 7); 
        displayCart(); 
    }

    function createOplataBlock(totalPrice, cart) {
        const oplataContainer = document.querySelector(".oplata");

        oplataContainer.innerHTML = '';

        const totalDiv = document.createElement("div");
        totalDiv.classList.add("flex", "spaceBetween");

        const totalLabel = document.createElement("h3");
        totalLabel.textContent = "Всього";

        const totalAmount = document.createElement("div");
        totalAmount.classList.add("flex");

        const totalPriceElement = document.createElement("p");
        totalPriceElement.textContent = totalPrice;

        const totalCurrency = document.createElement("p");
        totalCurrency.textContent = "грн";

        totalAmount.appendChild(totalPriceElement);
        totalAmount.appendChild(totalCurrency);

        totalDiv.appendChild(totalLabel);
        totalDiv.appendChild(totalAmount);

        oplataContainer.appendChild(totalDiv);

        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("flex", "spaceBetween", "mt10");

            const itemName = document.createElement("p");
            itemName.textContent = `${item.itemName} (${item.itemColor})`;

            const itemQuantity = document.createElement("p");
            itemQuantity.textContent = `x${item.quantity}`;

            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemQuantity);

            oplataContainer.appendChild(itemDiv);
        });

        const orderButton = document.createElement("input");
        orderButton.classList.add("btnBuyBasket");
        orderButton.type = "button";
        orderButton.value = "Оформити замовлення";
        orderButton.addEventListener("click", () => {
            window.location.href = "../pages/buy.html";
        });

        oplataContainer.appendChild(orderButton);
    }

    displayCart();
});


