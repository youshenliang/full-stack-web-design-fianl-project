var whether_search = 0;
function init_load(which) {

    $(".tr_class").empty();
    if (which == null) show_products_list("#products_list");
    else if (which == "#users_list") show_users_list(which)
    else if (which == "#products_list") show_products_list(which)
    else if (which == "#orders_list") show_orders_list(which)
    else if (which == "#orders_list") show_service_list(which)
    $("#product_table").text("1");

    // 查詢所有訂單
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/admin/orderList",
        success: (result => {
            create_order_list(result);
        }),
    })

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/admin/initial",
        success: (result => {

            console.log("成功接收變數");

            console.log(result);

            product = result.product;
            allcategory = result.allcategory;
            lastcate = result.last_cate;

            //商品頁面            
            show_product_table(1);

            //新增商品的分類
            $("#new_cate_parent").append("<option value=\"0\">0-總類</option>")
            $("#alter_cate").append("<option value=\"0\">0-總類</option>")
            for (var i = 0; i < allcategory.category_id.length; i++) {
                $("#new_product_cate").append("<option value=\"" + allcategory.category_id[i] + "\">" + allcategory.category_id[i] + "-" + allcategory.category_name[i] + "</option>")
                $("#new_cate_parent").append("<option value=\"" + allcategory.category_id[i] + "\">" + allcategory.category_id[i] + "-" + allcategory.category_name[i] + "</option>")
                $("#alter_cate").append("<option value=\"" + allcategory.category_id[i] + "\">" + allcategory.category_id[i] + "-" + allcategory.category_name[i] + "</option>")
            }

        }),
        error: (err => {
            console.log(err);
        })

    });
}
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
//RWD側邊菜單按鈕
function toggle_aside() {
    aside_status = $(".aside").css("display");
    if (aside_status == "block") $(".aside").css("display", "none");
    else if (aside_status == "none") $(".aside").css("display", "block");
}
//取消搜尋 返回商品清單
function reload() {
    if ($(".search_input").val().length == 0) {
        if ($("#users_div").css("display") == "flex") page = "#user_list";
        else if ($("#products_div").css("display") == "flex") page = "#product_list";
        else if ($("#orders_div").css("display") == "flex") page = "#order_list";
        whether_search = 0;
        init_load(page);
    }
    else search();
}
//查詢商品資料，根據名稱搜尋
function search() {
    if ($("#users_div").css("display") == "flex") nowpage = "user";
    else if ($("#products_div").css("display") == "flex") nowpage = "product";
    else if ($("#orders_div").css("display") == "flex") nowpage = "order";
    console.log("現在頁面   :" + nowpage);
    if ($(".search_input").val().length > 0) {
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/admin/consult",
            data:
            {
                nowpage: nowpage,
                keywords: $(".search_input").val(),
            },
            success: (result => {
                consult = [];
                consult = result;

                console.log(consult);
                Toast.fire({
                    icon: 'success',
                    title: '查詢成功',
                })
                whether_search = 1;
                show_product_table(1);
                $("#product_table").text("1");
                /*
                for( var i = 1; i<11;i++)
                {        
                    $("#tr"+i).empty();
                    if( (i <= consult.length)  )
                    {
                        $("#tr"+i).append("<td>"+ consult[i-1].product_id +"</td>");
                        $("#tr"+i).append("<td>"+ allcategory.category_name[(lastcate[i-1].category_id)-1] +"</td>");
                        $("#tr"+i).append("<td><img class=\"table_img\" src=\""+ consult[i-1].product_img +"\"></td>");
                        $("#tr"+i).append("<td>"+ consult[i-1].product_name +"</td>");
                        $("#tr"+i).append("<td>"+ consult[i-1].product_spec +"</td>");
                        $("#tr"+i).append("<td>"+ consult[i-1].product_stock +"</td>");
                        $("#tr"+i).append("<td>"+ consult[i-1].product_price +"</td>");
                    }
                    
                }
                */

            }),
            error: (err => {
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title: '查詢失敗',
                })
            })

        })
    }
    else {
        Swal.fire(
            '請輸入一個字元以上',
            '',
            'error'
        )
    }

}
//側邊菜單使用者列表按鈕
function show_users_list(which) {
    //$(".main").load("./users_list.html");
    $(".aside_list").css("border", "0");
    $(which).css("border-left", "12px #1b5c88 solid");
    $(".content_div").css("display", "none");
    $("#users_div").css("display", "flex");
    $("section").removeClass("chatroom");
    $("html,body").animate({ scrollTop: $(".content").offset().top });
}
//側邊菜單商品列表按鈕
function show_products_list(which) {
    //$(".main").load("./products_list.html");
    $(".aside_list").css("border", "0");
    $(which).css("border-left", "12px #1b5c88 solid");
    $(".content_div").css("display", "none");
    $("#products_div").css("display", "flex");
    $("section").removeClass("chatroom");
    $("html,body").animate({ scrollTop: $(".content").offset().top });
}
//顯示商品清單
function show_product_table(index) {

    for (var i = 0; i < product.product_spec.length; i++)
        console.log(`spec of id ${i}: ${product.product_spec[i]}`);

    if (whether_search == 0) {
        for (var i = index; i < (index + 10); i++) {
            $(`#tr${i - index + 1}`).empty;  // 清空 tr1~tr10
            if ((i <= product.product_id.length) && (i <= lastcate.length)) {
                var current_id = product.product_id[i - 1];
                console.log("cur id:", current_id);
                // 塞入商品序號
                $(`#tr${i - index + 1}`).append(`<td> ${product.product_id[i - 1]} </td>`)
                // 塞入商品分類
                $(`#tr${i - index + 1}`).append(`<td> ${allcategory.category_name[(lastcate[i - 1].category_id) - 1]} </td>`)
                // 塞入商品圖片
                console.log(`id: ${product.product_id[i - 1]}, img: ${product.product_img[current_id]}`);
                if (product.product_img[current_id].indexOf(",") != -1) {  // 若圖片不只一張，則取第一張當縮圖
                    img = product.product_img[current_id].split(",")[0];
                    $(`#tr${i - index + 1}`).append(`
                        <td>
                            <img class="table_img" src="${img}">
                        </td>
                    `)
                }
                else {  // 若只有一張則直接塞進表格中
                    $(`#tr${i - index + 1}`).append(`
                        <td>
                            <img class="table_img" src="${product.product_img[current_id]}">
                        </td>
                    `);
                }

                // 塞入商品名稱
                $(`#tr${i - index + 1}`).append(`<td> ${product.product_name[i - 1]} </td>`);
                // 塞入商品規格
                $(`#tr${i - index + 1}`).append(`<td> ${product.product_spec[current_id]} </td>`);
                // 塞入商品數量
                $(`#tr${i - index + 1}`).append(`<td> ${product.product_stock[current_id]} </td>`);
                // 塞入商品價格
                $(`#tr${i - index + 1}`).append(`<td> ${product.product_price[i - 1]} </td>`);
                // 塞入修改功能按鈕
                $(`#tr${i - index + 1}`).append(`
                    <td>
                        <button class="table_btn" onclick="product_change(this)">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                    </td>
                `);

                // 塞入刪除功能按鈕
                $(`#tr${i - index + 1}`).append(`
                    <td>
                        <button class="table_btn" onclick="product_delete(this)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `);

            } else {
                break;
            }
        }
    }

    else if (whether_search == 1) {
        page = (index * 10) + 1;
        for (var i = 1; i < page; i++) {
            $("#tr" + i).empty();
            if ((i <= consult.length)) {

                $("#tr" + i).append("<td>" + consult[i - 1 + page - 11].product_id + "</td>");
                $("#tr" + i).append("<td>" + allcategory.category_name[(consult[i - 1 + page - 11].lastcate) - 1] + "</td>");
                $("#tr" + i).append("<td><img class=\"table_img\" src=\"" + consult[i - 1].product_img[0] + "\"></td>");
                $("#tr" + i).append("<td>" + consult[i - 1 + page - 11].product_name + "</td>");
                $("#tr" + i).append("<td>" + consult[i - 1 + page - 11].product_spec + "</td>");
                $("#tr" + i).append("<td>" + consult[i - 1 + page - 11].product_stock + "</td>");
                $("#tr" + i).append("<td>" + consult[i - 1 + page - 11].product_price + "</td>");
                $("#tr" + product.product_id[i - index]).append("<td><button class=\"table_btn\" onclick=\"product_change(this)\">  <svg class=\"table_btn_svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z\"/></svg> </button>" + "<button class=\"table_btn\" onclick=\"product_delete(this)\">  <svg class=\"table_btn_svg\"  xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path d=\"M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z\"/></svg> </button></td>");
            }

        }
    }

}
//側邊菜單訂單列表
function show_orders_list(which) {
    //$(".main").load("./orders.html");
    $(".aside_list").css("border", "0");
    $(which).css("border-left", "12px #1b5c88 solid");
    $(".content_div").css("display", "none");
    $("#orders_div").css("display", "flex");
    $("section").removeClass("chatroom");
    $("html,body").animate({ scrollTop: $(".content").offset().top });
}
//側邊菜單訂單列表
function show_service_list(which) {
    //$(".main").load("./orders.html");
    $(".aside_list").css("border", "0");
    $(which).css("border-left", "12px #1b5c88 solid");
    $(".content_div").css("display", "none");
    $("section").addClass("chatroom");
    $("#chatroom_div").css("display", "flex");
    $("html,body").animate({ scrollTop: $(".content").offset().top });
}
//更改商品資料
function product_change(which) {
    $(".alter_window_div").attr("id", "open");
    $("input[type='checkbox']").prop("checked", false);  // 重新打開修改視窗時，取消所有已選項
    $(".alter_div").css("display", "none");  // 重新打開修改視窗時，關閉所有alter_div
    $("#alter_table_div").css("display", "none");
    //console.log($(which).attr("class"))
    console.log("本次更改商品ID為   " + $(which).parent().parent().children(":first-child").text());
    id = parseInt($(which).parent().parent().children(":first-child").text());
    $(".alter_window_div").css("display", "block");
    $("#alter_btn").css("display", "block");
    $("#cancel_btn").css("display", "block");

    //清空圖片及規格欄位
    $("#original_img").empty();
    $("#alter_spec_div").empty();

    $("#alter_title").text("商品編號 " + id);

    var real_id = id - product.product_id[0]; // 實際id
    console.log(`real id: ${real_id}`)
    $("#original_name").text(product.product_name[real_id]);
    $("#original_cate").text(allcategory.category_id[(lastcate[real_id].category_id) - 1] + "-" + allcategory.category_name[(lastcate[real_id].category_id) - 1]);
    $("#original_price").text(product.product_price[real_id]);
    $("#original_description").text(product.product_description[real_id]);
    $("#original_detail").text(product.product_detail[real_id]);

    //預設為原本資料
    $("#alter_name").val(product.product_name[real_id]);
    $("#alter_cate").val(allcategory.category_id[(lastcate[real_id].category_id) - 1]);
    $("#alter_price").val(product.product_price[real_id]);
    $("#alter_description_input").val(product.product_description[real_id]);
    $("#alter_detail_input").val(product.product_detail[real_id]);

    index = 0;
    console.log(`id: ${id}`);
    if (product.product_img[id].indexOf(",", index) != -1) {
        while (product.product_img[id].indexOf(",", index) != -1) {
            img = product.product_img[id].slice(index, product.product_img[id].indexOf(",", index));
            index = product.product_img[id].indexOf(",", index) + 1;
            $("#original_img").append("<img class=\"alter_img\" src=\"" + img + "\">");
        }
        img = product.product_img[id].slice(index, product.product_img[id].length);
        $("#original_img").append("<img class=\"alter_img\" src=\"" + img + "\">");
    }
    else {
        $("#original_img").append("<img class=\"alter_img\" src=\"" + product.product_img[id] + "\">");
    }
    spec_index = 0;
    stock_index = 0;
    i = 1;

    if (product.product_spec[id].indexOf(",", spec_index) != -1) {
        while (product.product_spec[id].indexOf(",", spec_index) != -1) {
            spec = product.product_spec[id].split(",");
            spec = product.product_spec[id].slice(spec_index, product.product_spec[id].indexOf(",", spec_index));
            spec_index = product.product_spec[id].indexOf(",", spec_index) + 1;
            stock = product.product_stock[id].slice(stock_index, product.product_stock[id].indexOf(",", stock_index));
            stock_index = product.product_stock[id].indexOf(",", stock_index) + 1;
            $("#alter_spec_div").append("<label class=\"spec_label\"><span><B>商品(規格/數量)" + i + "</B></span><div class=\"spec_input_div\"><input id=\"alter_spec" + i + "\"><input id=\"alter_stock" + i + "\"></div></label>")
            $("#alter_spec" + i).val(spec);
            $("#alter_stock" + i).val(stock);
            i++
        }
        spec = product.product_spec[id].slice(spec_index, product.product_spec[id].length);
        stock = product.product_stock[id].slice(stock_index, product.product_stock[id].length);
        $("#alter_spec_div").append("<label class=\"spec_label\"><span><B>商品(規格/數量)" + i + "</B></span><div class=\"spec_input_div\"><input id=\"alter_spec" + i + "\"><input id=\"alter_stock" + i + "\"></div></label>")
        $("#alter_spec" + i).val(spec);
        $("#alter_stock" + i).val(stock);
    }
    else {
        $("#alter_spec_div").append("<label class=\"spec_label\"><span><B>商品(規格/數量)" + i + "</B></span><div class=\"spec_input_div\"><input id=\"alter_spec" + i + "\"><input id=\"alter_stock" + i + "\"></div></label>")
        $("#alter_spec" + i).val(product.product_spec[id]);
        $("#alter_stock" + i).val(product.product_stock[id]);
    }
}
//更改商品資料視窗，根據選擇的項目顯示相應的內容
function show_div(which) {
    //console.log($(which).attr("id"))

    if ($(which).attr("id").slice(9) == "name" || "cate" || "price") {
        if ($('#checkbox_name_cate_price').is(":checked")) {
            if ($("#alter_table_div").css("display") == "none") $("#alter_table_div").css("display", "block");
        }
        else {
            $("#alter_table_div").css("display", "none");
        }
    }
    if ($(which).attr("id").slice(9) == "description") {
        if ($("#alter_description").css("display") == "none") $("#alter_description").css("display", "block");
        else $("#alter_description").css("display", "none");
    }
    if ($(which).attr("id").slice(9) == "detail") {
        if ($("#alter_detail").css("display") == "none") $("#alter_detail").css("display", "block");
        else $("#alter_detail").css("display", "none");
    }
    if ($(which).attr("id").slice(9) == "img") {
        if ($("#alter_img").css("display") == "none") $("#alter_img").css("display", "block");
        else $("#alter_img").css("display", "none");
    }
    if ($(which).attr("id").slice(9) == "spec") {
        if ($("#alter_spec").css("display") == "none") $("#alter_spec").css("display", "block");
        else $("#alter_spec").css("display", "none");
    }
}
//更改商品資料，新增規格
function alter_newSpec() {
    id = $("#alter_title").text().slice(5) - 1;
    index = 0;
    original_value = 1;
    while (product.product_spec[id].indexOf(",", index) != -1) {
        index = product.product_spec[id].indexOf(",", index) + 1;
        original_value++;
    }
    i = $("#alter_spec_div").children().length + 1;
    $("#alter_spec_div").append("<label class=\"spec_label\"><span><B>商品(規格/數量)" + i + "</B></span><div class=\"spec_input_div\"><input id=\"alter_spec" + i + "\"><input id=\"alter_stock" + i + "\"></div></label>")

}
//更改商品資料，刪除規格
function alter_deleteSpec() {
    id = $("#alter_title").text().slice(5) - 1;
    index = 0;
    original_value = 1;
    while (product.product_spec[id].indexOf(",", index) != -1) {
        index = product.product_spec[id].indexOf(",", index) + 1;
        original_value++;
    }
    i = $("#alter_spec_div").children().length + 1;
    if (i > original_value + 1) {
        $("#alter_spec_div").children(":last-child").remove();
    }
}
//更改商品資料，確認按鈕
function alter_yes() {
    //console.log($("#checkbox_name").val())
    alter_data = {};
    alter_spec_array = [];
    alter_stock_array = [];
    var formData = new FormData();
    if ($('#checkbox_name_cate_price').is(":checked")) {
        alter_data.product_name = $("#alter_name").val();
        alter_data.product_cate = $("#alter_cate").val();
        alter_data.product_price = $("#alter_price").val();
    }
    if ($('#checkbox_description').is(":checked")) alter_data.product_description = $("#alter_description_input").val();
    if ($('#checkbox_detail').is(":checked")) alter_data.product_detail = $("#alter_detail_input").val();
    if ($('#checkbox_img').is(":checked")) {
        if($("#alter_img_input").val().length > 0) {
            alter_data.product_img = $("#alter_img_input").val();
            for (var i = 0; i < $("#alter_img_input").prop("files").length; i++) {
                formData.append('imgs', $("#alter_img_input").prop("files")[i]);
            }
        }
    }

    if ($('#checkbox_spec').is(":checked")) //alter_data.product_name = $("#alter_name").val();
    {
        for (var i = 0; i < $("#alter_spec_div").children().length; i++) {
            alter_spec_array[i] = $("#alter_spec" + (i + 1)).val();
            alter_stock_array[i] = $("#alter_stock" + (i + 1)).val();
        }
        alter_data.product_spec = alter_spec_array;
        alter_data.product_stock = alter_stock_array;
    }

    for (var i = 0; i < Object.keys(alter_data).length; i++) {
        formData.append(Object.keys(alter_data)[i], alter_data[(Object.keys(alter_data)[i])]);
    }

    if (Object.keys(alter_data).length != 0) {
        id = $("#alter_title").text().slice(5);
        console.log("本次修改商品id:    " + id);
        alter_data.product_id = id;
        formData.append("product_id", id);

        $.ajax({
            type: "PUT",
            url: "http://localhost:3000/admin/alter_product",
            data: formData,
            processData: false,
            contentType: false,
            success: (result => {
                console.log("修改成功");
                Toast.fire({
                    icon: 'success',
                    title: '修改商品成功',
                })

                init_load("#products_list");
                alter_cancel();
            }),
            error: (err => {
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title: '修改商品失敗',
                })
            })

        });
    }
    else {
        Swal.fire(
            '欄位為空',
            '',
            'error'
        )

    }
}
//更改商品資料，取消按鈕
function alter_cancel() {
    $(".alter_window_div").attr("id", "close");

    /*
    $(".alter_window_div").css("display","none");
    $("#alter_btn").css("display","none");
    $("#cancel_btn").css("display","none");    */
}

//刪除商品
function product_delete(which) {
    //console.log($(which).attr("class"))
    //console.log($(which).parent().parent().children(":first-child").text());
    delete_product_id = $(which).parent().parent().children(":first-child").text();

    Swal.fire({
        title: '確定刪除?',
        text: "即將刪除商品編號為" + $(which).parent().parent().children(":first-child").text() + "的商品",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定刪除'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                '刪除成功!',
                "刪除商品編號為" + $(which).parent().parent().children(":first-child").text() + "的商品",
                'success'
            )
            $.ajax({
                type: "DELETE",
                url: "http://localhost:3000/admin/delete_product",
                data:
                {
                    delete_product_id: delete_product_id,
                },
                success: (result => {
                    console.log("刪除成功");
                    Toast.fire({
                        icon: 'success',
                        title: '刪除商品成功',
                    })
                    init_load("#products_list");
                }),
                error: (err => {
                    console.log(err);
                    Toast.fire({
                        icon: 'error',
                        title: '刪除商品失敗',
                    })
                })

            });
        }
    })

}
//商品清單上頁
function last_ten_product() {
    if (whether_search == 0) index = Number($("#tr1").children(":first-child").text()) - 10 - 1;
    else if (whether_search == 1) index = Number($("#product_table").text()) - 1;
    if (index > 0) {
        $(".tr_class").empty();
        show_product_table(index);
        $("html,body").animate({ scrollTop: $(".content_table").offset().top });
    }
    if (Number($("#product_table").text() > 1)) $("#product_table").text(Number($("#product_table").text()) - 1);

}
//商品清單下頁
function next_ten_product() {
    if (whether_search == 0) {
        //console.log($("#tr10").children(":first-child").text());    
        index = Number($("#tr10").children(":first-child").text());
        //console.log(index)
        //console.log(product.product_id.length)
        if (index <= product.product_id.length && index != 1) {
            $(".tr_class").empty();
            show_product_table(index);
            $("#product_table").text(Number($("#product_table").text()) + 1);
            $("html,body").animate({ scrollTop: $(".content_table").offset().top });
        }
    }
    else if (whether_search == 1) {
        index = Number($("#product_table").text());
        if (index * 10 < consult.length) {
            $(".tr_class").empty();
            show_product_table(index);
            $("#product_table").text(Number($("#product_table").text()));
            $("html,body").animate({ scrollTop: $(".content_table").offset().top });
        }
    }

}
//新增商品資料，新增規格
function newSpec() {
    //console.log($(".newproduct_spec").children(":last-child").attr("id"));
    spec_index = Number($(".newproduct_spec").children(":last-child").attr("id").slice(8)) + 1;
    //console.log(spec_index);
    $(".newproduct_spec").children(":last-child").after("<div class=\"spec_div\" id=\"spec_div" + spec_index + "\"><label><span>商品規格</span><input id=\"new_spec" + spec_index + "\"></label><label><span>商品數量</span><input id=\"new_stock" + spec_index + "\"></label></div>")
}
//新增商品資料，取消規格
function deleteSpec() {
    if ($(".newproduct_spec").children(":last-child").attr("id") != "spec_div1") $(".newproduct_spec").children(":last-child").remove();
}
//新增商品資料，確認按鈕
function create_product() {
    console.log($("#new_img").prop("files"));

    var new_spec_array = [];
    var new_stock_array = [];
    var new_img_array = [];
    //有幾張圖片
    img_index = $("#new_img").prop("files").length;
    for (var i = 0; i < img_index; i++) {
        new_img_array[i] = $("#new_img").prop("files")[i];
    }
    //有幾種規格
    spec_index = $(".newproduct_spec").children().length - 1;
    for (var i = 0; i < spec_index; i++) {
        new_spec_array[i] = $("#new_spec" + (i + 1)).val();
        new_stock_array[i] = $("#new_stock" + (i + 1)).val();
    }
    var new_product =
    {
        new_product_name: $("#new_name").val(),
        new_product_desscription: $("#new_product_desscription").val(),
        new_product_detail: $("#new_product_detail").val(),
        new_product_cate: $("#new_product_cate").val(),
        new_product_price: $("#new_price").val(),
        //new_product_img:            new_img_array,
        new_product_spec: new_spec_array,
        new_product_stock: new_stock_array,
    }
    console.log(new_product);

    var formData = new FormData();
    for (var i = 0; i < $("#new_img").prop("files").length; i++) {
        formData.append('imgs', $("#new_img").prop("files")[i]);//e.target.files[i]
        console.log($("#new_img").prop("files")[i])
    }

    for (var i = 0; i < Object.keys(new_product).length; i++) {
        formData.append(Object.keys(new_product)[i], new_product[(Object.keys(new_product)[i])]);
    }
    if ($("#new_name").val() != "" && $("#new_product_cate") != 0 && $("#new_price").val() != "" && new_img_array != "" && new_spec_array != "" && new_stock_array != "") {

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/admin/create_product",
            data: formData,
            processData: false,
            contentType: false,
            success: (result => {
                console.log("新增成功");
                Toast.fire({
                    icon: 'success',
                    title: '新增商品成功',
                })
                init_load("#products_list");
                cancel_product();
            }),
            error: (err => {
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title: '新增商品失敗',
                })
            })

        });
    }
    else {
        Swal.fire(
            '欄位為空',
            '',
            'error'
        )

    }

}
//新增商品資料，清除按鈕
function cancel_product() {
    $("#new_name").val("");
    $("#new_product_desscription").val("");
    $("#new_product_detail").val("");
    $("#new_product_cate")[0].selectedIndex = 0;
    $("#new_price").val("");
    $("#new_img").val("");
    $("#new_spec1").val("");
    $("#new_stock1").val("");
    console.log($(".newproduct_spec").children().length);
    for (var i = 0; i < ($(".newproduct_spec").children().length); i++) {
        deleteSpec();
    }
    Toast.fire({
        icon: 'success',
        title: '清空欄位',
    })

}
//新增分類，確認按鈕
function create_cate() {

    var new_cate =
    {
        new_cate_name: $("#new_cate_name").val(),
        new_cate_parent: $("#new_cate_parent").val(),
    }

    if ($("#new_cate_name").val() != "") {
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/admin/create_cate",
            data: new_cate,
            success: (result => {
                console.log("新增分類成功");
                Toast.fire({
                    icon: 'error',
                    title: '新增分類成功',
                })
                init_load("#products_list");
                cancel_cate();
            }),
            error: (err => {
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title: '新增分類失敗',
                })
            })

        })
    }
    else {
        Swal.fire(
            '欄位為空',
            '',
            'error'
        )
    }

}
//新增分類，清除按鈕
function cancel_cate() {
    $("#new_cate_name").val("");
    $("#new_cate_parent")[0].selectedIndex = 0;
    Toast.fire({
        icon: 'success',
        title: '清空欄位',
    })
}


// 顯示訂單清單
function create_order_list(data) {
    console.log(data);
    for(var i in data){
        $("#order_list_admin").append(`
            <tr>
                <td> ${data[i].orderID} </td>
                <td> 
                    <img class="table_img" src="${data[i].product_img}">
                </td>
                <td> ${data[i].product_name} </td>
                <td> ${data[i].amount} </td>
                <td> ${data[i].product_price * data[i].amount}  </td>
            </tr>
        `)
    }
}