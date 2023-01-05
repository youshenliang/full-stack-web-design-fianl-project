var USER_ID = -1;  // 宣告為全域變數且放在其他js前載入，其他js檔就可以抓到
$(document).ready(() => {
    $("#PorductSearch").on('keypress', (e) => {
        if (e.which == 13) {
            var keyword = $("#PorductSearch").val();
            window.location.href = `http://localhost:3000/search?search_name=${keyword}`;
        }
    })

    if (Cookies.get("userID")) {
        // 若已經登入，則根據cookie抓取目前登入的使用者
        // 用正規表示式撈出userID
        USER_ID = Cookies.get("userID").match(/^s:(.*)\..*$/)[1];
        // 若已經登入，則更改導覽列的登入按鈕
        $("#div_userDropdown").html(`
            
            <a href="http://localhost:3000/cart" class="btn btn-outline-success my-2 my-sm-0 dropdown-item">購物車</a>
            <a href="http://localhost:3000/orderlist" class="btn btn-outline-success my-2 my-sm-0 dropdown-item">我的訂單</a>
            <a href="http://localhost:3000/member" class="btn btn-outline-success my-2 my-sm-0 dropdown-item">編輯會員資料</a>
            <a href="http://localhost:3000/wishlist" class="btn btn-outline-success my-2 my-sm-0 dropdown-item">許願池</a>
            <a onclick="resetPwd()" style="color: #d94848 !important;" class="btn btn-outline-success my-2 my-sm-0 dropdown-item">修改密碼</a>
            <a onclick="logout()" style="color: #d94848 !important;" class="btn btn-outline-success my-2 my-sm-0 dropdown-item">登出</a>
        `);
    } else {
        USER_ID = -1;
        console.log("not login");
        $("#div_userDropdown").html(`            
            <a href="http://localhost:3000/login" class="btn btn-outline-success my-2 my-sm-0 dropdown-item">登入</a>
            <a href="http://localhost:3000/register" class="btn btn-outline-success my-2 my-sm-0 dropdown-item">註冊</a>
        `);
    }
})

function logout() {

    Swal.fire({
        text: "是否確定要登出目前帳號?",
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
                type: "POST",
                url: "http://localhost:3000/logout",
                success: (msg) => {
                    if (msg == "logout") {
                        Swal.fire(
                            '登出成功',
                            '將帶您回到商城首頁',
                            'success'
                        ).then(() => {
                            window.location.href = "http://localhost:3000"
                        })
                    }
                },
                error: (err) => {
                    console.log("無法登出: ", err);
                }
            })
        }
    })
}

function resetPwd() {
    window.location.href = "http://localhost:3000/resetpwd";
}