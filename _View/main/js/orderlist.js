$(document).ready(() => {
    $.ajax({
        url: "http://localhost:3000/orderlist",
        type: "POST",
        success: (data) => {
            create_order_table(data);
        }
    })
})

function create_order_table(data) {
    //$("#order_list_table").html("");
    console.log(data);
    var last_orderID = "";
    var color_cnt = 0;  // 紀錄列數，用以填色
    for (var i in data) {
        color_cnt++;
        $("#order_list_table").append(`
            <tr>
                <td class="${data[i].orderID}"> ${data[i].orderID} </td>
                <td> ${data[i].product_name}  </td>
                <td> ${data[i].spec} </td>
                <td> ${data[i].amount} </td>
                <td> ${data[i].product_price} </td>
                <td> ${data[i].receiver_name}  </td>
                <td> ${data[i].receiver_phone} </td>
                <td> ${data[i].receiver_address} </td>
            </tr>
        `)

        // 設定顏色

        // 如果某訂單編號中有多筆購買商品，則讓他們的orderID欄位共用
        if ($(`.${data[i].orderID}`).length > 1) {

            // 先將第一個的rowspan設為n(重複幾次)
            $(`.${data[i].orderID}`).attr("rowspan", $(`.${data[i].orderID}`).length);
            // 再將第一個以外的td全部移除
            $(`.${data[i].orderID}:not(:first)`).remove();
        }
    }
}