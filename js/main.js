//---------------Functions----------------------------//
function addingItemToCart(iteminfo, shopcart){
    const itemId = iteminfo.id;
    let itemInCart = false;

    if(shopcart.length >= 1){
            $.each(shopcart, function(){
                if(this.id == itemId){
                    // console.log("bingo!");
                    itemInCart = true;
                    this.qty = parseInt(iteminfo.qty) + 1;
                    console.log("++ qty")
                    console.log(shopcart)
                }
            })

    }
    if(!itemInCart){
        iteminfo.qty = 1;
        shopcart.push(iteminfo);
    }

}
//////////////////////////////////////////////////////////////
var shopcart = [];

$(document).ready(function(){
    


    console.log(sessionStorage["sc"]);
    outputCart();

    // Clicking Product Item
    $(".productitem").click(function(e){
        e.preventDefault();

        const iteminfo = $(this.dataset)[0];
        console.log("dadawanie produktu");
        console.log(shopcart);
        addingItemToCart(iteminfo, shopcart);
        

        sessionStorage["sc"] = JSON.stringify(shopcart);
        outputCart();

        console.log(sessionStorage["sc"]);
        console.log(shopcart);
    })
})
/////////////////////////////////////////////////////////

// Functions
function outputCart() {
    if(sessionStorage["sc"] != null){
        shopcart = JSON.parse(sessionStorage["sc"].toString());
        console.log(sessionStorage["sc"]);
        console.log(shopcart);
    }

    let HTMLholder = "";
    let total = 0;
    $.each(shopcart, function() {
        console.log(this.name);
        let stotal = this.qty * this.price;
        total += stotal;
        HTMLholder = HTMLholder + this.name + " (" + this.s + ") " + formatMoney(this.price) + " " + this.qty + " " + formatMoney(stotal) + "<br>";
    })
    HTMLholder += formatMoney(total);
    $(".output").html(HTMLholder);
}

function formatMoney(n) {
    return "$" + (n/100);
}