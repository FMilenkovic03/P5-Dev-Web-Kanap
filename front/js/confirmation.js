let id = new URLSearchParams.get("id");
console.log(id);

let orderId = document.getElementById('OrderId');
    orderId.innerHTML = id;
    localStorage.clear(id);

