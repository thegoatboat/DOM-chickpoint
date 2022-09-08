var shop = document.getElementById('shop');


let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateshop =() => {
    return (shop.innerHTML=shopItemData.map((x)=>{
        let { id, name , price , desc, img }=x;
        let search = basket.find((x)=>x.id === id) || [] ;
        return `
        <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="jewerly"width="200" height="300" />
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
               <h2>${price}</h2> 
               <div class="buttons">
               <i class="bi bi-suit-heart"></i>
               <i onclick="decrement(${id})" class="bi bi-dash-circle-dotted"></i>
                <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-circle-dotted"></i>
               </div>

            </div>
        </div>
        </div>`
    }).join(""));
};


generateshop();

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
    //console.log(basket);
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
    //console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));

};


let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.item) ;
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y) => x+y,0);
}

calculation();

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
