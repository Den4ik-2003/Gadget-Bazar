document.addEventListener('DOMContentLoaded', function () {
    const btnBuy = document.getElementById('btnBuy');
    const orderModal = document.getElementById('orderModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('orderForm');
    const goBackLink = document.getElementById('goBackLink');

    const title = document.getElementById("title");
    const content = document.getElementById("content"); 
    const save = document.getElementById("save"); 

    function getCartItems() {
        const cartCookie = document.cookie.split('; ').find(row => row.startsWith('cart='));
        if (!cartCookie) return [];
        const cartValue = cartCookie.split('=')[1];
        try {
            return JSON.parse(decodeURIComponent(cartValue));
        } catch (e) {
            console.error("Помилка при розборі куки:", e);
            return [];
        }
    }

    function calculateTotalPrice() {
        const cartItems = getCartItems();
        let totalPrice = 0;

        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });

        return totalPrice;
    }

    function displayTotalPrice() {
        const totalPrice = calculateTotalPrice();
        const endPriceElement = document.getElementById('endPrice');
        if (endPriceElement) {
            endPriceElement.innerHTML = `${totalPrice} грн`;
        }
    }

    function displayOrderItems() {
        const cartItems = getCartItems();
        const orderItemsList = document.getElementById('orderItemsList'); 

        if (orderItemsList) {
            orderItemsList.innerHTML = ''; 

            cartItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `${item.itemName} - ${item.quantity} x ${item.price} грн`;
                orderItemsList.appendChild(listItem);
            });
        }
    }

    displayTotalPrice();
    displayOrderItems();

    btnBuy.addEventListener('click', function (event) {
        event.preventDefault(); 

        const lastName = document.getElementById("lastName").value;
        const name = document.getElementById("name").value;
        const twoName = document.getElementById("twoName").value;
        const telephone = document.getElementById("telephone").value;
        const city = document.getElementById("city").value;
        const del = document.getElementById("del").value;
        const street = document.getElementById("street").value;
        const deliveryChecked = document.querySelector('input[name="delivery"]:checked') !== null;

        const lastNamePattern = /^[A-Za-zА-Яа-яЁё]{3,15}$/;
        const namePattern = /^[A-Za-zА-Яа-яЁё]{3,15}$/;
        const telephonePattern = /^\+380\d{9}$/;
        const cityPattern = /^[A-Za-zА-Яа-яЁёіІїЇєЄ0-9\s\-]+$/;
        const streetPattern = /^[A-Za-zА-Яа-яЁёіІїЇєЄ0-9\s\-]+$/;
        const delPattern = /^\d{1,7}$/;

        let isValid = true;

        if (!lastName.match(lastNamePattern)) {
            alert("Прізвище вказано не вірно");
            isValid = false;
        } else if (!name.match(namePattern)) {
            alert("Ім'я вказано не вірно");
            isValid = false;
        } else if (!twoName.match(namePattern)) {
            alert("По батькові вказано не вірно");
            isValid = false;
        } else if (!telephone.match(telephonePattern)) {
            alert("Телефон має бути у форматі +380XXXXXXXXX");
            isValid = false;
        } else if (!city.match(cityPattern)) {
            alert("Місто вказано не вірно");
            isValid = false;
        } else if (!deliveryChecked) {
            alert("Виберіть метод доставки");
            isValid = false;
        } else if (!del.match(delPattern)) {
            alert("Відділення вказано не вірно");
            isValid = false;
        } else if (!street.match(streetPattern)) {
            alert("Вулиця має бути від 3 до 20 символів.");
            isValid = false;
        }
        if (!isValid) {
            return; 
        }
        orderModal.style.display = 'flex';
        content.style.display = "none"; 

        
        document.getElementById("zamNone").style.display = "none"
        goBackLink.addEventListener('click', function () {
            clearAllCookies();
            window.location.href = "../pages/order.html";
        });

        closeModalBtn.addEventListener('click', function () {
            clearAllCookies();
            window.location.href = "../index.html";
        });
    });

    function clearAllCookies() {
        const cookies = document.cookie.split("; ");
        cookies.forEach(cookie => {
            const cookieName = cookie.split("=")[0];
            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        });
    }
});
