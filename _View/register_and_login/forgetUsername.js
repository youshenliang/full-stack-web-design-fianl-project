$(document).ready(() => {
    $('#btnSendMail').hide();

    $.ajax({
        type: "get",
        url:"http://localhost:3000/captcha/generate",
        
        success:(result=>{
            console.log("讀取圖片");
            console.log(result);
            var url = result.url;
            var id  = result.id;
            $(".id").val(id);
            $(".captchaImage").attr("src",url);
        }),
        error:(err=>{
            console.log(err);
        })
    })

    // 設定在輸入框按下enter時，會觸發登入按鈕事件
    $("#mailBox").keypress((e) => {
        if (e.which === 13 && !e.shiftKey) {
            $("#btnSendMail").click();
            e.preventDefault();
        }
    });

    // post 資料到登入介面
    $("#btnSendMail").click(() => {
        var userData = {
            email: $("#mailBox").val(),
        }
        console.log("userData: ", userData);
        if (valid()) {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/forgetUsername",
                data: userData,
                success: (msg) => {
                    console.log(`send res: ${msg}`);
                    if(msg == "not found") {
                        Swal.fire({
                            icon: 'error',
                            title: '錯誤',
                            text: '請檢查電子郵件是否輸入錯誤',
                          })
                    } else if(msg == "sent") {
                        Swal.fire({
                            icon: 'success',
                            text: '您的使用者名稱已寄到您的信箱',
                          })
                    }
                }
            })
        }
    })
})

function submit_captcha() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/captcha/answer",
        data: {
            "captcha": $("#captcha").val(),
            "id": $(".id").val(),
        },
        success: (msg) => {
            if(msg == "輸入正確") {
                $('#btnSendMail').show();
                $(".captchaDiv").hide();
            }else if(msg == "輸入錯誤") {
                Swal.fire({
                    icon: 'error',
                    text: '驗證碼輸入錯誤',
                  })
            }
        }
    })
}

function valid() {
    var pass = true;

    // 用正則表示式檢查 email 格式
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

    return pass;
}