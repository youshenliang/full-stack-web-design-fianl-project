var total_price = 0;
var cartList = new Map();
var cartItem = new Map();

$(document).ready(() => {

    $.ajax({
        url: "http://localhost:3000/cart",
        method: "POST",
        success: (data) => {
            $(".cart_tb").html("");  // 清空購物車顯示清單

            for (var i = 0; i < data.length; i++) {

                console.log(data[i]);

                cartItem = new Map();
                cartItem.set("cart_id", data[i][0][0]["cart_id"]);
                cartItem.set("product_id", data[i][0][0]["product_id"]);
                cartItem.set("product_name", data[i][1]["product_name"]);
                cartItem.set("product_img", data[i][2]["product_img"]);
                cartItem.set("product_price", data[i][4]["product_price"]);
                cartItem.set("spec", data[i][0][0]["spec"]);
                cartItem.set("amount", data[i][0][0]["amount"]);
                cartItem.set("stock", data[i][3][0]["product_stock"]);
                cartItem.set("subtotal", data[i][4]["product_price"] * data[i][0][0]["amount"]);

                cartList.set(data[i][0][0]["cart_id"], mapToObj(cartItem));

                var tr = document.createElement("tr");

                // 塞入移除按鈕
                $(tr).append(`
                    <td class="product-remove" style="cursor: pointer;" onclick="remove_from_cart(${data[i][0][0]["cart_id"]})">
                        <i class="fa-solid fa-xmark"></i>
                    </td>
                `)

                // 塞入商品圖片
                $(tr).append(`
                    <td class="product-thumbnail">
                        <a href="product.html">
                            <img src="${data[i][2]["product_img"]}" width="50%" style="max-width: 50%;" class="img-fluid">
                        </a>
                    </td>
                `)

                // 塞入商品名稱
                $(tr).append(`
                    <td class="product-name">
                        <a href="product.html">${data[i][1]["product_name"]}</a>
                    </td>
                `)

                // 塞入商品規格
                $(tr).append(`
                    <td class="product-spec"> ${data[i][0][0]["spec"]}</td>
                `)

                // 塞入商品價格
                $(tr).append(`
                    <td class="product-price">${data[i][4]["product_price"]}</td>
                `)

                // 塞入購買數量
                $(tr).append(generate_stock_stock_options(data[i][0][0]["amount"], data[i][3][0]["product_stock"], data[i][0][0]["cart_id"]))

                // 塞入總金額
                $(tr).append(`
                    <td class="product-subtotal pp">${calc_cost(data[i][4]["product_price"], data[i][0][0]["amount"], data[i][0][0]["cart_id"])}</td>
                `)

                $(".cart_tb").append(tr);

                calc_total_price();
            }
        },
        error: (err) => {
            console.log(`err getting data from /cart: ${err}`)
        }
    })
})

function mapToObj(inputMap) {
    let obj = {};

    inputMap.forEach(function (value, key) {
        obj[key] = value
    });

    return obj;
}

function checkout() {

    var data = JSON.stringify(mapToObj(cartList));

    $.ajax({
        url: "http://localhost:3000/cart/checkout",
        type: "POST",
        data: { "cartList": data },
        success: (msg) => {
            if (msg == "checkout") {
                window.location.href = "http://localhost:3000/cart/checkout";
            }
        },
        error: (err) => {
            console.log("結帳時發生了問題: ", err);
        }
    })
}

function generate_stock_stock_options(a, n, id) {
    var res = `<td class="product-quantity"> <select id="selector${id}" onchange="change(this)" class="amount_select">`;
    var stock_options = "";
    for (var i = 1; i <= n; i++) {
        if (i == a) stock_options += `<option value=${i} selected="selected"> ${i} </option>`;
        else stock_options += `<option value=${i}> ${i} </option>`;
    }
    res += stock_options;
    res += "</select> </td>";
    return res;
}

function change(e) {
    var amount = parseInt($(`#${e.id}`).val());
    var price = parseInt($(`#${e.id}`).parent().siblings(".product-price").text());
    var cart_id = parseInt(e.id.replace("selector", ""));
    $.ajax({
        url: "http://localhost:3000/cart/editAmount",
        method: "POST",
        data: { "cart_id": cart_id, "new_amount": amount },
        success: (msg) => {
            console.log(msg);
            location.reload();
        },
        error: (err) => {
            console.log(err);
        }
    })
    calc_cost(price, amount, e.id);
}

function calc_cost(price, amount, id) {
    console.log(`calccost: ${id}`);
    $(`#${id}`).parent().siblings(".product-subtotal").text(price * amount);
    calc_total_price();
    return price * amount;
}

function calc_total_price() {
    total_price = 0;
    $(".pp").each(function () {
        console.log($(this).text());
        total_price += parseInt($(this).text());
    })
    $("#total_price").text(total_price);
}

function remove_from_cart(cart_id) {

    Swal.fire({
        text: "確定要從購物車移除此項商品?",
        icon: "question",
        focusDeny: true,
        confirmButtonColor: "#912943",
        denyButtonColor: "#1b5c88",
        width: "50vw",
        confirmButtonText: '取消',
        showDenyButton: true,
        denyButtonText: '確定',
    }).then((result) => {
        // 這邊因為deny btn和confirm btn位置對調所以要判斷isDenied
        if (result.isDenied) {
            $.ajax({
                url: "http://localhost:3000/cart/remove",
                method: "POST",
                data: { "cart_id": cart_id },
                success: () => {
                    Swal.fire({
                        text: "已成功將您選擇的商品移出購物車",
                        icon: "success",
                        focusDeny: true,
                        confirmButtonColor: "#1b5c88",
                        confirmButtonText: '確定',
                    }).then(result => {
                        location.reload();
                    })
                },
                error: (err) => {
                    console.log(`移除購物車編號 ${cart_id} 時發生了問題`);
                }
            })
        }
    })


}