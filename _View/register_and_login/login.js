$(document).ready(() => {

    /* 設定 toastr */
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    $("#btnRegister").click(() => {
        window.location.href = "./register";
    })

    // post 資料到登入介面
    $("#btnLogin").click(() => {
        var userData = {
            userName: $("#usernameBox").val(),
            password: $("#pwdBox").val(),
        }
        console.log("userData: ", userData);
        if (valid()) {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/login",
                data: userData,
                success: (msg) => {
                    console.log("msg: ", msg);
                    if (msg == "尚未註冊") {
                        Swal.fire({
                            text: "您似乎尚未註冊為我們的會員，點擊確定讓我們帶您到註冊頁面",
                            icon: "warning",
                            focusDeny: true,
                            confirmButtonColor: "#912943",
                            denyButtonColor: "#1b5c88",
                            width: "50vw",
                            confirmButtonText: '取消',
                            showDenyButton: true,
                            denyButtonText: '確定',
                        }).then((result) => {
                            // 這邊因為deny btn和confirm btn位置對調所以要判斷isDenied
                            if(result.isDenied) window.location.href = "./register";
                        })
                    }else if (msg == "登入成功") {
                        Swal.fire({
                            text: `歡迎回來，讓我們為您跳轉至商品頁面`,
                            icon: "success",
                            confirmButtonColor: "#1b5c88",
                            width: "50vw",
                            confirmButtonText: '確定'
                        }).then((result) => {
                            if(result.isConfirmed) window.location.href = "/";
                        })
                    } else if (msg == "密碼錯誤") {
                        Swal.fire({
                            text: "密碼輸入錯誤，請確認後重新嘗試",
                            icon: "error",
                            confirmButtonColor: "#1b5c88",
                            width: "50vw",
                            confirmButtonText: '確定',
                        })
                    }
                },
                error: (err) => {
                    console.log(`err at register_and_login/login.js: ${err.message}`);
                }
            });
        }
    })
})

function valid() {
    var pass = true;
    toastr.remove();

    // 檢查使用者名稱是否空白 
    if ($("#usernameBox").val().replace(" ", "").length <= 0) {
        toastr.error("請輸入使用者名稱");
        pass = false;
    }

    return pass;
}