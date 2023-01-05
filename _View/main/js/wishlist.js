$(document).ready(() => {
    // 如果尚未登入，則提示登入後才可許願
    console.log(`user: ${USER_ID}`)
    if(USER_ID < 1) {
        $(".wish_div").html(`
            <h2>許願池</h2>
            <p class="mt-5">請先 <cc onclick="window.location.href='http://localhost:3000/login';" style="color: rgb(27, 92, 136); cursor: pointer;"> 登入 </cc> 以使用許願功能 </p>
        `);
    } else {
        $(".wish_div").html(`
            <h2>許願池</h2>
            <p class="mt-5">許願想要的商品，有機會在本站上看到您許願的商品！</p>
            <div class="form-group">
                <input type="text" class="form-control mt-2" id="wish_link"  placeholder="願望商品參考網址">
                <input type="text" class="form-control mt-2" id="wish_name" placeholder="願望商品名稱">
                <input type="number" class="form-control mt-2" id="wish_price" placeholder="期望之販售金額">
            </div>
            <button type="submit" class="btn btn-primary send-btn mt-2 float-end"  id="wish-btn" onclick="add_wish()">送出</button>
        `)
    }
})

//sweetalert2好看的訊息
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
//新增願望的按鈕事件
function add_wish() {

    //讀取輸入的資料
    var userID = 1;
    var wish_link = $("#wish_link").val();
    var wish_name = $("#wish_name").val();
    var wish_price = $("#wish_price").val();

    //判斷有輸入資料才執行
    if (wish_link != "" && wish_name != "" && wish_price != "") {
        //把資料包成物件傳送
        wish_object =
        {
            userID: userID,
            wish_link: wish_link,
            wish_name: wish_name,
            wish_price: wish_price,
        }

        $.ajax({
            type: "get",
            url: "http://localhost:3000/wishlist/makewish",
            data: wish_object,
            success: (result => {
                console.log(result);

                Toast.fire({
                    icon: 'success',
                    title: '新增願望成功',
                })
                //每次新增完清空輸入框的欄位
                clear();

            }),
            error: (err => {
                console.log(err);
                Toast.fire({
                    icon: 'error',
                    title: '新增願望失敗',
                })
            })
        })
    }
    //欄位沒有輸入資料，輸出警告訊息
    else {
        Toast.fire({
            icon: 'error',
            title: '欄位不能為空',
        })
    }
}


function clear() {
    $("#wish_link").val("");
    $("#wish_name").val("");
    $("#wish_price").val("");
}

