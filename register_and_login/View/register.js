$(document).ready(() => {

    /* 設定 toastr */
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
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

    $("#btnLogin").click(() => {
        window.location.href = "./login.htm";
    })

    $("#btnRegister").click(() => {
        if(valid()) {
            Swal.fire({
                title: "恭喜！",
                text: "歡迎您成為我們的新會員，祝您購物愉快！",
                icon: "success",
                iconColor: "#1b5c88",
                confirmButtonColor: "#1b5c88",
                width: "50vw",
            })
            /* 往商品頁面或使用者上一個操作頁面 */
        }
    })
})

function valid() {
    toastr.clear();
    // 檢查使用者名稱是否重複
    /* todo */
    if($("#usernameBox").val().replace(" ", "").length <= 0) {
        toastr.error("請輸入使用者名稱");
    }

    // 檢查密碼長度是否介於 8~20 位數
    var pwd = $("#pwdBox").val();
    if(pwd.length < 8 || pwd.length > 20) {
        toastr.error("密碼需為介於8~20位數之間之英數字");
    }

    if($("#pwdBox").val() != $("#confirmpwdBox").val()){
        toastr.error("請確認兩次輸入之密碼相同");
    }

    /* TODO: 檢查 email 格式 */

    var gender = $("#genderBox").val();
    console.log(gender, gender.length);
    if(gender.length <= 0 || (gender != "男性" && gender != "女性" && gender != "不願透露")){
        toastr.error("性別欄位請選擇提供選項之一且不可為空");
    }

}