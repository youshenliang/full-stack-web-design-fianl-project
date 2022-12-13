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
        valid();
    })
})

function valid() {
    // 檢查使用者名稱是否重複
    /* todo */

    // 檢查密碼長度是否介於 8~20 位數
    var pwd = $("#pwdBox").val();
    if(pwd.length < 8 || pwd.length > 20) {
        toastr.error("密碼需為介於8~20位數之間之英數字");
        return false;
    }else{
        Swal.fire({
            title: "恭喜！",
            text: "歡迎您成為我們的新會員，祝您購物愉快！",
            icon: "success",
            iconColor: "#1b5c88",
            confirmButtonColor: "#1b5c88",
            width: "50vw",
        })
    }
}