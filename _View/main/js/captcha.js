function init_load(){
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
}
