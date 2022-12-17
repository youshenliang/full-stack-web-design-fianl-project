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

    $("#birthdayBox").click((event) => {
        const input = event.srcElement.previousElementSibling;
        try {
            input.showPicker();
        } catch (error) {
            window.alert(error);
        }
    })

    $("#btnLogin").click(() => {
        window.location.href = "./login.htm";
    })

    $("#btnRegister").click(() => {
        if (valid()) {
            var userData = {
                userName: $("#usernameBox").val(),
                userPWD: $("#pwdBox").val(),
                userEmail: $("#mailBox").val(),
                userPhoneNumber: $("#phoneBox").val(),
                userGender: $("#genderBox").val(),
                userBirthday: $("#birthdayBox").val(),
            }

            console.log("userData", userData);
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/register",
                data: userData,
                success: (msg) => {
                    if (msg == "使用者名稱重複") {
                        Swal.fire({
                            text: "這個名稱已經被使用過了",
                            icon: "warning",
                            confirmButtonColor: "#1b5c88",
                            width: "50vw",
                        })
                    } else if (msg == "Email重複") {
                        Swal.fire({
                            text: "這個Email已經註冊過了",
                            icon: "warning",
                            confirmButtonColor: "#1b5c88",
                            width: "50vw",
                        })
                    } else if (msg == "註冊成功") {
                        Swal.fire({
                            title: "恭喜！",
                            text: "歡迎您成為我們的新會員，祝您購物愉快！",
                            icon: "success",
                            iconColor: "#378c74",
                            confirmButtonColor: "#1b5c88",
                            width: "50vw",
                        })
                    }
                },
                error: (err) => {
                    console.log(`err at register.js: ${err}`);
                }
            })
            /* 往商品頁面或使用者上一個操作頁面 */
        }
    })

    keepDatalistOptions(".genderList");  // 讓選單被點選時即便已經有值也能顯示所有選項
})

function valid() {
    var pass = true;
    toastr.remove();
    // 檢查使用者名稱是否重複
    /* todo */
    if ($("#usernameBox").val().replace(" ", "").length <= 0) {
        toastr.error("請輸入使用者名稱");
        pass = false;
    }

    // 檢查密碼長度是否介於 8~20 位數
    var pwd = $("#pwdBox").val();
    if (pwd.length < 8 || pwd.length > 20) {
        toastr.error("密碼需為介於8~20位數之間之英數字");
        pass = false;
    }

    // 檢查兩次密碼輸入是否相同
    if ($("#pwdBox").val() != $("#confirmpwdBox").val()) {
        toastr.error("請確認兩次輸入之密碼相同");
        pass = false;
    }

    // 用正則表示式檢查 email 格式 (參考網頁：https://ithelp.ithome.com.tw/articles/10094951)
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if ($("#mailBox").val().search(emailRule) == -1) {
        toastr.error("電子郵件欄位格式有誤，請檢查後重新輸入");
        pass = false;
    }

    // 檢查性別欄位
    var gender = $("#genderBox").val();
    if (gender.length <= 0 || (gender != "男性" && gender != "女性" && gender != "其他" && gender != "不願透露")) {
        toastr.error("性別欄位請選擇提供選項之一且不可為空");
        pass = false;
    }

    // 檢查生日欄位，不可大於目前日期
    var d = new Date($("#birthdayBox").val());
    if (Object.prototype.toString.call(d) === "[object Date]") {
        // it is a date
        if (isNaN(d)) { // d.getTime() or d.valueOf() will also work
            toastr.error("輸入之日期格式有誤");
            pass = false; // date object is not valid
        } else {
            // date object is valid
            if (d.getTime() > new Date().getTime()) {
                toastr.error("請確認生日輸入無誤");
                pass = false;
            }
        }
    } else {
        pass = false; // not a date object
        toastr.error("輸入之日期格式有誤");
    }


    // 用正則表示式檢查手機號碼格式
    const phoneRule = /^09[0-9]{2}-[0-9]{6}$/;
    if ($("#phoneBox").val().search(phoneRule) == -1) {
        toastr.error("手機號碼格式有誤，請檢查後重新輸入");
        pass = false;
    }
    return pass;
}

// 讓選單被點選時即便已經有值也能顯示所有選項
// 參考網頁：https://stackoverflow.com/questions/37478727/how-can-i-make-a-browser-display-all-datalist-options-when-a-default-value-is-se
function keepDatalistOptions(selector = '') {
    let datalistInputs = document.querySelectorAll(selector);;
    if (datalistInputs.length) {
        for (let i = 0; i < datalistInputs.length; i++) {
            let input = datalistInputs[i];
            input.addEventListener("input", function (e) {
                e.target.setAttribute("placeholder", e.target.value);
                e.target.blur();
            });
            input.addEventListener("focus", function (e) {
                e.target.setAttribute("placeholder", e.target.value);
                e.target.value = "";
            });
            input.addEventListener("blur", function (e) {
                e.target.value = e.target.getAttribute("placeholder");
            });
        }
    }
}
