var page_number;
function init_load() {

    //判斷當前網址該處理搜尋商品名稱還是分類號碼
    console.log(window.location.href)
    var status = (window.location.href).split("/")[3];
    status = status.split("?")[0];
    console.log("status " + status)

    if (status == "Category" || status == "category") {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/category/initial",
            success: (result => {

                console.log("成功接收變數");

                console.log(result);

                category_id = result.allcategory.category_id;
                category_name = result.allcategory.category_name;
                parent_category_id = result.allcategory.parent_category_id;
                pro_cate = result.last_cate;
                product = result.product;

                //判斷當前網址該處理搜尋商品名稱還是分類號碼
                console.log(window.location.href)
                var status = (window.location.href).split("/")[3];
                status = status.split("?")[0];
                console.log("status " + status)


                //計算屬於該分類底下的子分類號碼
                search_cate = window.location.search;
                search_cate = search_cate.split("=")[1];
                var ans_cate_array = [Number(search_cate)];

                for (var i = 0; i < category_id.length; i++) {
                    //console.log("i  "+i)
                    //console.log("parent "+parent_category_id[i]);
                    if (parent_category_id[i] == search_cate) {
                        //console.log("bingo and cate:    "+category_id[i])
                        ans_cate_array.push(category_id[i]);
                    }
                    else {
                        var cate = parent_category_id[i];
                        var lastcate = cate;
                        var temp_array = [];
                        while (1) {
                            //console.log("cate   "+cate)
                            if (cate == 0) break;
                            else if (cate == search_cate) ans_cate_array.push(temp_array);
                            temp_array.push(cate);
                            lastcate = cate;
                            cate = parent_category_id[cate - 1];
                        }
                    }
                }

                //計算屬於該分類底下的商品號碼
                var conform_product = 0;
                product_list = [];
                console.log(`procate len:${pro_cate.length}`)
                for (var i = 0; i < product.product_id.length; i++) {
                    console.log(`id[${i}]: ${product.product_id[i]}`);
                    var temp;
                    temp = pro_cate[i].category_id;
                    //console.log(temp)              
                    if (ans_cate_array.indexOf(temp) != -1) {
                        //console.log("bingo  ")
                        conform_product++;
                        //console.log(conform_product)
                        product_list.push(product.product_id[i])
                    }
                }

                keywords = category_name[search_cate - 1];
                console.log("當前搜尋的是分類")
                console.log("符合的分類號碼為    " + ans_cate_array)
                console.log("符合的商品號碼為    " + product_list)

                //顯示商品表跟分類表
                show_category();

                $("#page_1").addClass("selected")
                show_product(1);

                show_page_number();

            }),
            error: (err => {
                console.log(err);
            })

        });
    }
    else if (status == "Search" || status == "search") {
        search_name = (window.location.href).split("/")[3]
        search_name = search_name.split("search_name=")[1];
        if (search_name == null) search_name = "";
        console.log("搜尋名稱含有   " + search_name);


        $.ajax({
            type: "POST",
            url: "http://localhost:3000/search/",
            data:
            {
                "search_name": search_name
            },
            success: (result => {

                console.log("成功接收搜尋變數");

                console.log(result);

                category_id = result.allcategory.category_id;
                category_name = result.allcategory.category_name;
                parent_category_id = result.allcategory.parent_category_id;

                product_list = [];
                var id_temp = []
                var name_temp = [];
                var description_temp = [];
                var price_temp = [];
                var img_temp = [];
                for (var i = 0; i < result.consult.length; i++) {
                    product_list.push(i + 1)

                    id_temp.push(result.consult[i].product_id);
                    name_temp.push(result.consult[i].product_name);
                    description_temp.push(result.consult[i].product_description);
                    price_temp.push(result.consult[i].product_price);
                    var result_img_temp = "";
                    for (var j = 0; j < result.consult[i].product_img.length; j++) {
                        if (result_img_temp != "") result_img_temp = result_img_temp + ",";
                        result_img_temp = result_img_temp + result.consult[i].product_img[j];
                    }
                    img_temp.push(result_img_temp);
                }
                product =
                {
                    product_id: id_temp,
                    product_name: name_temp,
                    product_description: description_temp,
                    product_price: price_temp,
                    product_img: img_temp,
                }
                console.log(product)
                keywords = search_name;
                console.log("當前搜尋的是商品名稱")
                console.log("符合的商品有   " + product_list + "    個")

                //顯示分類表跟商品表
                show_category();

                show_page_number();
                show_product(1);



            }),
            error: (err => {
                console.log(err);
            })

        });




    }
}
function add_cart(which) {
    console.log("add_cart   " + which);

}
function show_page_number() {
    //頁碼
    page_number = Math.ceil(product_list.length / 9);
    console.log("共有   " + page_number + " 頁")
    for (var i = page_number; i > 0; i--) {
        if (page_number < 5) {
            $("#page-number").after(`
                <li onclick="show_product(${i})" class="page-item">
                   <a class="page-link pn" id="page_${i}" > ${i} </a>
                </li>
            `);
        }
        else {
            //if (i == page_number) $("#page-number").after("<li onclick=\"show_product(" + i + ")\" class=\"page-item\"><a class=\"page-link\" >" + i + "</a></li>");
            if (i == page_number){
                $("#page-number").after(`<li onclick="show_product(${i})" class="page-item"><a class="page-link pn" id="page_${i}" >${i}</a></li>`);
                $("#page-number").after(`<li class="page-item"><a disabled style="pointer-events: none;" class="page-link" >...</a></li>`);
            }
            //else if (i < 4) $("#page-number").after("<li onclick=\"show_product(" + i + ")\" class=\"page-item\"><a class=\"page-link\" >" + i + "</a></li>");
            else if (i < 4) $("#page-number").after(`
                <li onclick="show_product(${i})" class="page-item">
                   <a class="page-link pn" id="page_${i}" > ${i} </a>
                </li>
            `);
        }
    }
}
//顯示分類表
function show_category() {
    //商品種類表
    var Firstcate = [];
    var Secondcate = [];
    var Thirdcate = [];
    var Fourthcate = [];
    var Fifthcate = [];
    //console.log(category_id.length);
    for (var i = 0; i < category_id.length; i++) {
        //console.log(category_id[i]);
        if (Number(parent_category_id[i]) == 0) {
            Firstcate[Firstcate.length] = category_id[i];
            //console.log("一級  "+category_id[i]);
            $(".ul_first-cate").append("<li class=\"li_first-cate\"  id =\"li_firstcate" + Firstcate.length + "\"></li>");
            $("#li_firstcate" + Firstcate.length).append("<a id=\"a_firstcate" + Firstcate.length + "\"  href=\"http://localhost:3000/category/childcate?category_id=" + category_id[i] + "\"></a>");
            $("#li_firstcate" + Firstcate.length).append("<ul class=\"ul_second-cate\" id=\"ul_" + Firstcate.length + "_secondcate\"></ul>");
            $("#a_firstcate" + Firstcate.length).text(category_name[i]);
        }

        if (Firstcate.indexOf(parent_category_id[i]) != -1) {
            //console.log("二級  "+category_id[i]+"   且他的parent為   "+Firstcate[Firstcate.indexOf(parent_category_id[i])]);
            //console.log(Firstcate.indexOf(parent_category_id[i]));
            Secondcate[Secondcate.length] = category_id[i];
            //console.log(Firstcate[Firstcate.indexOf(parent_category_id[i])]);
            $("#ul_" + (Firstcate.indexOf(parent_category_id[i]) + 1) + "_secondcate").append("<li class=\"li_second-cate\" id=\"li_secondcate" + Secondcate.length + "\"></li>");
            $("#li_secondcate" + Secondcate.length).append("<a id=\"a_secondcate" + Secondcate.length + "\" href=http://localhost:3000/category/childcate?category_id=" + category_id[i] + "></a>");
            $("#a_secondcate" + Secondcate.length).text(category_name[i]);
            $("#li_secondcate" + Secondcate.length).append("<ul class=\"ul_third-cate\" id=\"ul_" + Secondcate.length + "_thirdcate\"></ul>")
        }
        if (Secondcate.indexOf(parent_category_id[i]) != -1) {
            //console.log("三級  "+category_id[i]+"   且他的parent為   "+Secondcate[Secondcate.indexOf(parent_category_id[i])]);
            //console.log(Firstcate.indexOf(parent_category_id[i]));
            Thirdcate[Thirdcate.length] = category_id[i];
            //console.log(Secondcate[Secondcate.indexOf(parent_category_id[i])]);
            $("#ul_" + (Secondcate.indexOf(parent_category_id[i]) + 1) + "_thirdcate").append("<li class=\"third-cate\" id=\"li_thirdcate" + Thirdcate.length + "\"></li>");
            $("#li_thirdcate" + Thirdcate.length).append("<a id=\"a_thirdcate" + Thirdcate.length + "\" href=http://localhost:3000/category/childcate?category_id=" + category_id[i] + "></a>");
            $("#a_thirdcate" + Thirdcate.length).text(category_name[i]);
            $("#li_thirdcate" + Thirdcate.length).append("<ul class=\"ul_fourth-cate\" id=\"ul_" + Thirdcate.length + "_fourthcate\"></ul>")
        }
    }
}

//當前頁碼
var index_page;

//顯示商品表
function show_product(page) {

    //console.log(ans_array)
    //console.log(product)
    //console.log(pro_cate)

    //紀錄當前頁數
    index_page = page;

    $(".pn").removeClass("active");
    $(`#page_${page}`).addClass("active");

    var last_product;
    //計算有幾個符合的商品
    for (var i = ((page - 1) * 9) + 1; i < (page * 9) + 1; i++) {
        //console.log("I  "+i)
        //console.log("page   "+(i-(page-1)*9))
        if ((i - 1) < product_list.length) {
            //console.log(product_list[i-1]-1)
            //console.log("A")
            //console.log("id     "+product.product_id[product_list[i-1]-1])
            //console.log("name     "+product.product_name[product_list[i-1]-1])
            //console.log("img     "+product.product_img[product_list[i-1]-1].indexOf(",") )

            $("#product" + (i - (page - 1) * 9)).css("display", "block");
            if (product.product_img[product_list[i - 1] - 1].indexOf(",") == -1) {
                $("#product-img" + (i - (page - 1) * 9)).attr("src", product.product_img[product_list[i - 1] - 1]);
            }
            else {
                $("#product-img" + (i - (page - 1) * 9)).attr("src", product.product_img[product_list[i - 1] - 1].split(",")[0]);
            }
            $("#product-name" + (i - (page - 1) * 9)).text(product.product_name[product_list[i - 1] - 1]);
            $("#product-description" + (i - (page - 1) * 9)).text(product.product_description[product_list[i - 1] - 1]);
            $("#product-price" + (i - (page - 1) * 9)).text(product.product_price[product_list[i - 1] - 1]);
            $("#product-href" + (i - (page - 1) * 9)).attr("href", "http://localhost:3000/product?product_id=" + product.product_id[product_list[i - 1] - 1]);
            //$("#product-addcart"+(i-(page-1)*9)).attr("href"," ");
            $("#product-addcart" + (i - (page - 1) * 9)).attr("onclick", "add_cart(" + product.product_id[product_list[i - 1] - 1] + ")");
            last_product = i;
        }
        else {
            //console.log("B")
            $("#product" + (i - (page - 1) * 9)).css("display", "none");
        }

    }

    //console.log("key    "+keywords)
    console.log(decodeURIComponent(keywords))
    if (keywords != "") $("#keywords-line").text("搜尋     " + decodeURIComponent(keywords));
    else $("#keywords-line").text("搜尋全部商品");

    $("#product-display").text("顯示 " + product_list.length + " 筆結果中的" + ((page - 1) * 9 + 1) + " - " + last_product + " 筆資料");



    //若沒有商品則返回文字
    if (product_list.length == 0) {
        $("#product-display").after().empty();
        $("#product-display").after("<h1>查無商品</h1>")
        $("#page-nav").empty();
    }
}

//下一頁
function next_9_product() {
    //console.log("目前   "+index_page)
    //console.log((index_page)*9)
    if ((index_page) * 9 < product_list.length) {
        //$("html,body").animate({ scrollTop:$("#html-top").offset().top});
        show_product(index_page + 1)
    }
    else {
        alert("目前為最後一頁")
    }
}
//上一頁
function last_9_product() {
    //console.log("目前   "+index_page)
    //console.log((index_page+1)*9)
    if (index_page > 1) {
        //$("html,body").animate({ scrollTop:$("#html-top").offset().top});
        show_product(index_page - 1)
    }
    else {
        alert("目前為第一頁")
    }
}
