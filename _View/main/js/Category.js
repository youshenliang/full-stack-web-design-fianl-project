function init_load() {

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/category/initial",
        success: (result => {

            console.log("成功接收變數");

            console.log(result);

            category_id = result.allcategory.category_id;
            category_name = result.allcategory.category_name;
            parent_category_id = result.allcategory.parent_category_id;

            mother_category = [];
            son_category = {};

            for (var i = 0; i < category_id.length; i++) {
                if (parent_category_id[i] == 0) {
                    mother_category.push(category_id[i]);
                    son_category[i] = [];
                }
                else {
                    var cate = parent_category_id[i];
                    var lastcate = cate;
                    while (1) {
                        if (cate == 0) {
                            son_category[lastcate - 1].push(i+1)
                            //son_category[lastcate-1] = i
                            break;
                        }
                        lastcate = cate;
                        cate = parent_category_id[cate - 1];
                    }
                }
            }
            //console.log(mother_category);
            //console.log(son_category);

            show_cate_mom(mother_category);

        }),
        error: (err => {
            console.log(err);
        })

    });
}

function show_cate_mom() {
    for (var i = 1; i < mother_category.length + 1; i++) {
        //<img class=\"card-img-top\" src=\"../html/images/services_1.jpg\" alt=\"類別A\">
        $("#category-div").append("<div class=\"col\" onclick=\"show_cate_son(" + mother_category[i - 1] + ")\">  <div class=\"card card-deck mt-2 product-categories h-90\"> <a  class=\"card\">                      <div class=\"card-body bg-dark\">  <h4 class=\"card-title text-white text-center\">" + category_name[mother_category[i - 1] - 1] + "</h4>  </div>  </a>    </div>  </div>");
    }
}
function show_cate_son(which) {

    $("#soncate-div").empty();
    var index = which - 1;
    //console.log(index);
    //console.log(category_name[index])
    var temp = son_category[index];

    //console.log(temp)
    //console.log("len    "+temp.length)
    for (var i = 1; i < (temp.length + 1); i++) {
        //<img class=\"card-img-top\" src=\"../html/images/services_1.jpg\" alt=\"類別A\">
        $("#soncate-div").append("<div class=\"col\" onclick=\"location.href='http://localhost:3000/category/childcate?category_id=" + category_id[temp[i - 1] - 1] + "'\">  <div class=\"card card-deck mt-2 product-categories h-90\"> <a  class=\"card\">                     <div class=\"card-body bg-dark\">  <h4 class=\"card-title text-white text-center\">" + category_name[temp[i - 1] - 1] + "</h4>  </div>  </a>    </div>  </div>");
    }
}