$(document).ready(() => {
    $("#btn_changeUserInfo").on('click', () => {
        if (valid()) {
            Swal.fire({
                text: "確定更改資料?",
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
                if (result.isDenied){
                    $.ajax({
                        url: "http://localhost:3000/member",
                        method: "POST",
                        data: {
                            id: Cookies.get("userID"),
                            email: $("#mailBox").val(),
                            phone: $("#phoneBox").val()
                        },
                        success: (msg) => {
                            if(msg == "updated successfully") {
                                Swal.fire({
                                    text: "已成功更新資料",
                                    icon: "success",
                                    confirmButtonColor: "#1b5c88",
                                    width: "50vw",
                                })
                            }
                        },
                        error: (err) => {
                            console.log(`err at member.js, post to /member: ${err}`);
                        }
                    })
                }
            })
        }
    })
})

function valid() {
    var pass = true;

    // 用正則表示式檢查 email 格式 (參考網頁：https://ithelp.ithome.com.tw/articles/10094951)
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if ($("#mailBox").val().search(emailRule) == -1) {
        Swal.fire({
            text: "電子郵件欄位格式有誤，請檢查後重新輸入",
            icon: "warning",
            confirmButtonColor: "#1b5c88",
            width: "50vw",
        })
        pass = false;
    }

    // 用正則表示式檢查手機號碼格式
    const phoneRule = /^09[0-9]{2}-[0-9]{6}$/;
    if ($("#phoneBox").val().search(phoneRule) == -1) {
        Swal.fire({
            text: "手機號碼格式有誤，請檢查後重新輸入",
            icon: "warning",
            confirmButtonColor: "#1b5c88",
            width: "50vw",
        })
        pass = false;
    }

    return pass;
}