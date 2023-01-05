$(document).ready(() => {

    $("#btnResetPWD").click(() => {
        if (valid()) {

            var pwd = $("#pwdBox").val();

            $.ajax({
                type: "POST",
                url: "http://localhost:3000/resetpwd",
                data: { "userPWD": pwd },
                success: (msg) => {
                    console.log(msg);
                    if (msg == "密碼更改成功") {
                        Swal.fire({
                            icon: 'success',
                            text: '密碼更改成功！',
                        }).then(() => {
                            window.location.href = "http://localhost:3000/login";
                        })
                    }
                },
                error: (err) => {
                    console.log(`err at register.js: ${err}`);
                }
            })
        }
    })
})

function valid() {
    var pass = true;
    // 檢查兩次密碼輸入是否相同
    if ($("#pwdBox").val() != $("#confirmpwdBox").val()) {
        Swal.fire({
            icon: 'error',
            text: '請確認兩次輸入之密碼相同',
        })
        pass = false;
    }
    return pass;
}