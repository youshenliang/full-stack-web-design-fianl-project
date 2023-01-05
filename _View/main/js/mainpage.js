$(document).ready(() => {

    // 讀取前四個分類，放到首頁
    $.ajax({
        url: "http://localhost:3000/category/get4cate",
        type: "POST",
        success: (data) => {
            for (var i = 1; i < data.length; i++) {
                console.log(data[i]);
                $("#homepage_4cate").append(`
                    <div class="col">
                        <div class="card card-deck mt-2 product-categories h-90">
                            <a href="http://localhost:3000/category/childcate?category_id=${data[i].category_id}" class="card">
                                <img class="card-img-top" src="./images/services_${i}.jpg" alt="${data[i].category_name}">
                                <div class="card-body bg-dark">
                                    <h4 class="card-title text-white text-center"> ${data[i].category_name} </h4>
                                </div>
                            </a>
                        </div>
                    </div>
                `)
            }
        }
    })
})