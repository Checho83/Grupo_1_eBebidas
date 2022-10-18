window.addEventListener("load", function(){

    let total = document.querySelectorAll(".total");
    let price = document.querySelectorAll(".price");
    let qty = document.querySelectorAll(".qty");
    let discount = document.querySelectorAll(".discount");
    let cartTotal = document.querySelector(".cartTotal");

   let cartSum = 0;
    

   for (let i = 0;i<total.length;i++) {
        total[i].innerHTML = ((price[i].innerHTML)*(qty[i].innerHTML)*(100 - discount[i].innerHTML))/100;
        cartSum = cartSum + Number(total[i].innerHTML);       
   }     

   cartTotal.innerHTML = "$" + cartSum;

})