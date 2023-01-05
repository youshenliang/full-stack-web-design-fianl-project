var purchaseList;
$(document).ready(() => {
    // 撈出cookie中紀錄的購買清單
    purchaseList = Cookies.get("checkout").match(/^s:j:(.*)\..*$/)[1];
    var purchaseListJson = JSON.parse(purchaseList);
    var all_price = 0;

    // 清空訂單表格
    $("#order_list_checkout").html("");

    for (var i in purchaseListJson) {
        console.log(purchaseListJson[i]);
        all_price += purchaseListJson[i].subtotal;
        $("#order_list_checkout").append(`
            <tr>
                <td>
                    ${purchaseListJson[i].product_name} x ${purchaseListJson[i].amount}
                </td>

                <td>
                    NT$ ${purchaseListJson[i].subtotal}
                </td>
            </tr>
        `)
    }

    $("#order_list_checkout").append(`
        <tr>
            <td>小計</td>
            <td>NT$ ${all_price}</td>
        </tr>
        <tr>
            <td>運送方式</td>
            <td>
                <div class="form-check">
                    <input id="Expenses" name="tran-expenses" type="radio"
                        class="form-check-input" checked>
                    <label class="form-check-label">郵局：NT$&nbsp;80</label>
                </div>
            </td>
        </tr>
        <tr>
            <td>總計</td>
            <td>NT$ ${all_price + 80}</td>
        </tr>
    `)
})

function purchase() {

    if (valid()) {

        var receiver_ = {
            name: $("#LastName").val() + $("#FirstName").val(),
            email: $("#EMail").val(),
            phone: $("#tel").val(),
            address: $("#Address").val()
        }

        console.log("receiver: ", receiver);
        console.log("receiver to json: ", JSON.stringify(receiver_));

        var receiver = JSON.stringify(receiver_);

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/order/purchase",
            data: {
                "receiver": receiver,
                "purchaseList": purchaseList,
            },
            success: (msg) => {
                if (msg == "下單成功") {
                    Swal.fire({
                        text: "感謝您的訂購！",
                        icon: "success",
                        focusDeny: true,
                        width: "50vw",
                        confirmButtonText: '確定',
                    }).then(() => {
                        location.href="http://localhost:3000/orderlist"
                    })
                }
            },
            error: (err) => {
                console.log("下單購買時發生了錯誤: ", err);
            }
        })
    }
}

function valid() {
    var pass = true;
    var errMsg = "";

    // 檢查姓氏欄位
    if ($("#LastName").val().replace(" ", "").length <= 0) {
        errMsg += "姓氏欄位不可留空\n";
        pass = false;
    }

    // 檢查名字欄位
    if ($("#FirstName").val().replace(" ", "").length <= 0) {
        errMsg += "名字欄位不可留空\n";
        pass = false;
    }


    // 用正則表示式檢查 email 格式 (參考網頁：https://ithelp.ithome.com.tw/articles/10094951)
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if ($("#EMail").val().search(emailRule) == -1) {
        errMsg += "電子郵件欄位格式有誤\n";
        pass = false;
    }

    // 用正則表示式檢查手機號碼格式
    const phoneRule = /^09[0-9]{2}-[0-9]{6}$/;
    if ($("#tel").val().search(phoneRule) == -1) {
        errMsg += "手機號碼格式有誤\n";
        pass = false;
    }

    if (!pass) {
        Swal.fire({
            html: '<pre>' + errMsg + '</pre>',
            icon: "error",
            focusDeny: true,
            width: "50vw",
            confirmButtonText: '確定',
            customClass: {
                popup: 'format-pre'
            }
        })
    }

    return pass;
}