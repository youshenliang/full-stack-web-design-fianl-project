/*  
    //var abc = document.getElementsByClassName(".product_name");
    //abc.innerHTML   ="ABC";
    document.getElementsByClassName("product-name").innerHTML ="new text";

    //$(".product-name").textContent("ABC");*/

const e = require("express");


/*
var product = {
    product_name: "",
    product_description: "",
    product_detail: "",
    product_price: "",
    product_spec: "",
    product_stock: "",
    product_img: ""
}*/
var stock = 0;
var img_index;
function load(){    
    product_id = window.location.search
    $.ajax({
        type: "POST",
        url:"http://localhost:3000/product",
        data: 
        {
            "product_id": product_id
        },
        success:(result=>{
            console.log("成功接收變數");
            console.log(result);
            if(result == "No Product")window.location.replace("http://localhost:3000/")
            product = result.product;
            
            console.log("res: ", product);
            
            //更改html名稱
            //document.getElementsByClassName("product-name")[0].innerHTML = product_name;
            $(".shop").text(product.product_name);
            $(".product-name").text(product.product_name);
            $(".product-name").css("font-weight","bold");
            $(".product-brief").text(product.product_description);           
            $(".product-content").text(product.product_detail);
            $(".product-price").text(product.product_price);
            for(var i=0;i<product.product_spec.length;i++)  $(".product-spec").append("<button class=\"spec_btn\" id=spec" +(i+1)+ " onclick=\"spec_button(this)\">"+product.product_spec[i]+"</button>");
            for(var i=0;i<product.product_stock.length;i++) stock = stock + product.product_stock[i];
            $(".product-stock").text(stock);
            $(".product-img").attr("src",product.product_img[0]);

            for(var i = 0; i < 3; i++){                
                $("#thumbnail"+[i+1]).attr("src", product.product_img[i]);
                if(product.product_img[i] == null)
                {
                    $("#thumbnail"+[i+1]).css("display","none");                    
                }
                //$(".img-div").append("<img class=\"thumbnail\" id=\"thumbnail" +[i+1]+"\" onclick=\"img_button(this)\" src=\"" + product.product_img[i] +"\")>");
            }
            
            
            if(product.product_img.length == 1) $(".img-btn").attr("onclick","");           
            
            //商品縮圖預設為第一張
            img_index = "thumbnail1";
            $(".product-img").attr("src",thumbnail1.src);
            $("#thumbnail1").css("border","5px rgb(5, 91, 161) solid");

            

            
            //商品種類表
            var Firstcate = [];
            var Secondcate = [];
            var Thirdcate = [];
            var Fourthcate = [];
            var Fifthcate = [];
            allcategory = result.allcategory;
            //console.log(allcategory.category_id.length);
            for(var i=0; i < allcategory.category_id.length; i++){
                //console.log(allcategory.category_id[i]);
                if (Number(allcategory.parent_category_id[i]) == 0){
                    Firstcate[Firstcate.length] = allcategory.category_id[i];
                    //console.log("一級  "+allcategory.category_id[i]);
                    $(".ul_first-cate").append("<li class=\"li_first-cate\"  id =\"li_firstcate"+ Firstcate.length +"\"></li>");
                    $("#li_firstcate"+ Firstcate.length).append("<a id=\"a_firstcate"+ Firstcate.length +"\"  href=\"http://localhost:3000/category/childcate?category="+allcategory.category_id[i]+"\"></a>");
                    $("#li_firstcate"+ Firstcate.length).append("<ul class=\"ul_second-cate\" id=\"ul_"+Firstcate.length+"_secondcate\"></ul>");
                    $("#a_firstcate"+Firstcate.length).text(allcategory.category_name[i]);

                    //菜單的商品分類
                    $(".cate-menu").append("<li><a href=\"http://localhost:3000/category/childcate?category_id="+allcategory.category_id[i]+"\">"+allcategory.category_name[i]+"</a></li>")
                }
                
                if(Firstcate.indexOf(allcategory.parent_category_id[i]) != -1){
                    //console.log("二級  "+allcategory.category_id[i]+"   且他的parent為   "+Firstcate[Firstcate.indexOf(allcategory.parent_category_id[i])]);
                    //console.log(Firstcate.indexOf(allcategory.parent_category_id[i]));
                    Secondcate[Secondcate.length] = allcategory.category_id[i];
                    //console.log(Firstcate[Firstcate.indexOf(allcategory.parent_category_id[i])]);
                    $("#ul_"+ (Firstcate.indexOf(allcategory.parent_category_id[i])+1) +"_secondcate").append("<li class=\"li_second-cate\" id=\"li_secondcate"+ Secondcate.length +"\"></li>");
                    $("#li_secondcate"+Secondcate.length).append("<a id=\"a_secondcate"+ Secondcate.length +"\" href=http://localhost:3000/category/childcate?category_id="+ allcategory.category_id[i] +"></a>");
                    $("#a_secondcate"+Secondcate.length).text(allcategory.category_name[i]);
                    $("#li_secondcate"+Secondcate.length).append("<ul class=\"ul_third-cate\" id=\"ul_"+Secondcate.length+"_thirdcate\"></ul>")
                }
                if(Secondcate.indexOf(allcategory.parent_category_id[i]) != -1){
                    //console.log("三級  "+allcategory.category_id[i]+"   且他的parent為   "+Secondcate[Secondcate.indexOf(allcategory.parent_category_id[i])]);
                    //console.log(Firstcate.indexOf(allcategory.parent_category_id[i]));
                    Thirdcate[Thirdcate.length] = allcategory.category_id[i];
                    //console.log(Secondcate[Secondcate.indexOf(allcategory.parent_category_id[i])]);
                    $("#ul_"+ (Secondcate.indexOf(allcategory.parent_category_id[i])+1) +"_thirdcate").append("<li class=\"third-cate\" id=\"li_thirdcate"+ Thirdcate.length +"\"></li>");
                    $("#li_thirdcate"+Thirdcate.length).append("<a id=\"a_thirdcate"+ Thirdcate.length +"\" href=http://localhost:3000/category/childcate?category_id="+ allcategory.category_id[i] +"></a>");
                    $("#a_thirdcate"+Thirdcate.length).text(allcategory.category_name[i]);
                    $("#li_thirdcate"+Thirdcate.length).append("<ul class=\"ul_fourth-cate\" id=\"ul_"+Thirdcate.length+"_fourthcate\"></ul>")
                }
            }

            //此商品細項分類
            cate_detail = result.cate_detail;            
            //console.log(result.cate_detail);
            for(var i = result.cate_detail.length-1; i>0;i--){
                //console.log(i);
                //console.log(result.allcategory.category_name[result.cate_detail[i-1]-1]);
                $(".cate-detail").append("<a class=\"p_cate-detail\" href=\"http://localhost:3000/category/childcate?category_id="+ result.cate_detail[i-1] +"\">"+ result.allcategory.category_name[result.cate_detail[i-1]-1] +"   \\  "+"</a>");
            }

        }),
        error:(err=>{
            console.log("GG")
            console.log(err);
        })
        
    });
    /*
    //判斷分類表是否要出現
    if($(window).width()> 768) category_status = "flex";
    else category_status ="none";
    console.log(category_status);
    console.log($(window).width());
    console.log("初始化");*/
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
function search_input(){
    //console.log("sear");
    //console.log("in1    "+$("#input1").val())
    //console.log("in2    "+$("#input2").val())
    if($(".input-div").css("display")!= "none"){
        console.log("in1    "+$("#input1").val())
        window.location = "http://localhost:3000/search?search_name="+$("#input1").val();
        //console.log($("#input1").val());
    }
    else{
        console.log("in2    "+$("#input2").val())
        window.location = "http://localhost:3000/search?search_name="+$("#input2").val();
        //console.log($("#input2").val());
    }
    //var inf = $(".search-input").val();
    //console.log($("#input2").val());
}


function category_btn(){
    console.log($(".category").css("display"));
    if ($(".category").css("display") == "none"){
      $(".category").css("display","flex");
    }
    else {
        $(".category").css("display","none");
    }
}

function img_button(which){
    //console.log("原來的邊框消失 :"+img_index);
    $("#"+img_index).css("border","0px rgb(5, 91, 161) solid");
    
    img_index = which.id;
    //console.log("新的邊框 :"+img_index);
    $(".product-img").attr("src",which.src);
    $(which).css("border","5px rgb(5, 91, 161) solid");
}

var img_indexnow = 1;
function img_left_btn(){
    if((img_index.slice(9) > 1) && img_indexnow != 1)
    {        
        $("#thumbnail"+img_indexnow).css("border","0px rgb(5, 91, 161) solid");                
        img_indexnow = Number(img_indexnow) - 1;
        $("#thumbnail"+img_indexnow).css("border","5px rgb(5, 91, 161) solid");        
        img_index ="thumbnail" + (Number(img_index.slice(9)) - 1);
        $(".product-img").attr("src",product.product_img[img_index.slice(9)-1]);
    }
    else if( (img_index.slice(9) > 1) && img_indexnow == 1)
    {        
        img_index ="thumbnail" + (Number(img_index.slice(9)) - 1);
        $("#thumbnail3").attr("src",thumbnail2.src);
        $("#thumbnail2").attr("src",thumbnail1.src);
        $("#thumbnail1").attr("src",product.product_img[img_index.slice(9)-1]);
        $(".product-img").attr("src",product.product_img[img_index.slice(9)-1]);        
    }
    //console.log(img_indexnow);
    //console.log(img_index);
}
function img_right_btn(){
    if((img_index.slice(9) < product.product_img.length) && img_indexnow != 3)
    {     
        $("#thumbnail"+img_indexnow).css("border","0px rgb(5, 91, 161) solid");                
        img_indexnow = Number(img_indexnow) + 1;
        $("#thumbnail"+img_indexnow).css("border","5px rgb(5, 91, 161) solid");
        img_index ="thumbnail" + (Number(img_index.slice(9)) + 1);
        $(".product-img").attr("src",product.product_img[img_index.slice(9)-1]);
    }
    else if( (img_index.slice(9) < product.product_img.length )&& img_indexnow == 3)
    {        
        img_index ="thumbnail" + (Number(img_index.slice(9)) + 1);
        $("#thumbnail1").attr("src",thumbnail2.src);
        $("#thumbnail2").attr("src",thumbnail3.src);
        $("#thumbnail3").attr("src",product.product_img[img_index.slice(9)-1]);
        $(".product-img").attr("src",product.product_img[img_index.slice(9)-1]);        
    }
    //console.log(img_indexnow);
    //console.log(img_index);
}
function imgnow_btn(which){
    $("#thumbnail1").css("border","0px rgb(5, 91, 161) solid");
    $("#thumbnail2").css("border","0px rgb(5, 91, 161) solid");
    $("#thumbnail3").css("border","0px rgb(5, 91, 161) solid");
    $("#"+which.id).css("border","5px rgb(5, 91, 161) solid");
    
    img_index = "thumbnail" + (Number(img_index.slice(9)) + Number(which.id.slice(9)) - img_indexnow);
    img_indexnow = which.id.slice(9);    
    $(".product-img").attr("src",product.product_img[img_index.slice(9)-1]);
    //console.log(img_indexnow);
    //console.log(img_index);
}


var choose_spec = 0;
function spec_button(which){
    $(".spec_btn").css("border","white");
    $(which).css("border","1px black solid");
    choose_spec = which.id;

    //根據對應的規格更改顯示數量
    $(".product-stock").text(product.product_stock[Number(choose_spec.slice(4))-1]);
    
    $(".stock_selector").empty();
    for(var i =0; i < Number(product.product_stock[(which.id.slice(4))-1]);i++){
        $(".stock_selector").append("<option value=\""+(i+1)+"\">"+ (i+1) +"</option>");
    }
    //$(".stock_selector").append("<p>123</p>")'
}
function add_cart(){
    if (choose_spec!=0){
        /*console.log(product.product_spec[choose_spec.slice(4)-1]);
        console.log($(".stock_selector").val())
        var purchase_spec = product.product_spec[choose_spec.slice(4)-1];
        var purchase_stock = $(".stock_selector").val();*/
        var cart = {
            product_id :    product.product_id,
            purchase_spec:  product.product_spec[choose_spec.slice(4)-1],
            purchasebtn:    $(".stock_selector").val(),
        }
        console.log(cart)
        
        $.ajax({
            type: "POST",
            url:"http://localhost:3000/cart/add",
            data:
            {
                cart
            },
            success:(result=>{
                console.log(result);

                Toast.fire({
                    icon: 'success',
                    title:'已將商品加入購物車',        
                }) 

            }),
            error:(err=>{
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title:'加入失敗',        
                })
            })
        })
    }
    else{
        Toast.fire({
            icon: 'error',
            title:'尚未選取商品規格',        
        })   
    }
}
function purchase(){
    console.log("chsp:", choose_spec);
    if (choose_spec && choose_spec.length > 0){
        /*console.log(product.product_spec[choose_spec.slice(4)-1]);
        console.log($(".stock_selector").val())
        var purchase_spec = product.product_spec[choose_spec.slice(4)-1];
        var purchase_stock = $(".stock_selector").val();*/
        var purchasebtn = 
        {
            product_id :    product.product_id,
            purchase_spec:  product.product_spec[choose_spec.slice(4)-1],
            purchasebtn:    $(".stock_selector").val(),
        }
        console.log(purchasebtn);

        if(USER_ID > 0) {
            Toast.fire({
                icon: 'success',
                title:'跳轉到購買頁面',
            })
        } else{
            Swal.fire({
                icon: 'warning',
                text: '您尚未登入，讓我們帶您到登入頁面',
            }).then(() => {
                window.location.href = "http://localhost:3000/login";
            })
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title:'尚未選取商品規格',        
        })    
    }
}

