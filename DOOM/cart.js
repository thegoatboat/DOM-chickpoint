let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y) => x+y,0);
}
calculation();
    
let generateCartItem = ()=>{
    if(basket.length !==0){
        return (shoppingCart.innerHTML= basket.map((x)=>{
            let {id , item} = x;
            let search =shopItemData.find((w)=>w.id === id) || [];
            return `
    
            <div class ="cart-item">
            <img width="100" src=${search.img} alt=""width="75" height="100"/>
            <div class="details"></div>
            <div class="title-price-x">

                <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">$ ${search.price}</p>

                </h4>
                <i class="bi bi-x-circle"></i>
                </div>

                <div class="buttons">
                    <i  class="bi bi-suit-heart"></i>
                    <i onclick="decrement(${id})" class="bi bi-dash-circle-dotted"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-circle-dotted"></i>
                </div>
                
            <h3>$ ${item * search.price}</h3>
            </div>  
            `;
        }).join(''));
    }
    else{
        shoppingCart.innerHTML =``;
        label.innerHTML =`
        <h2>cart is Empty</h2> 
        <a href="index.html">
            <button class="homeBtn">Back to home</button>
        </a>
        `
    }
}
generateCartItem();

let increment = (id) => {
    let selectedTtem =id;
    let search =basket.find((x)=> x.id === selectedTtem.id);

    if(search === undefined){
        basket.push({
            id:selectedTtem.id,
            item: 1,
        });
    }
    else{
        search.item += 1;
    }
    generateCartItem();

    update(selectedTtem.id);
    localStorage.setItem("data", JSON.stringify(basket));

};
let decrement = (id) => {
    let selectedTtem =id;
    let search =basket.find((x)=> x.id === selectedTtem.id);
    if (search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    update(selectedTtem.id);
    basket = basket.filter((x)=>x.item !==0);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));

};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.item) ;
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

let heart =document.getElementsByClassName('bi-suit-heart');
for(let i of heart) {
    i.addEventListener("click" ,function(){
    if (i.style.color === "grey"){
        i.style.color = "red";
    }
    else{
        i.style.color = "grey";
    }
    })
}