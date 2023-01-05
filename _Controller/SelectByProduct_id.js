const productQuery = require('./productQuery.js');

function select_product_id(product_id) {
    return new Promise((resolve, reject) => {
        var product_spec_array = [];
        var product_stock_array = [];
        var product_img_array = [];
        var product = {
            product_id: product_id,
            product_name: "",
            product_description: "",
            product_detail: "",
            product_price: "",
            product_spec: product_spec_array,
            product_stock: product_stock_array,
            product_img: product_img_array
        }

        var product_name_query = productQuery.ProductNameQuery(product_id).then((data) => {
            product.product_name = data[0].product_name;
        }).catch((err) => {
            console.log(err);
        })

        var product_description_query = productQuery.ProductDescriptionQuery(product_id).then((data) => {
            product.product_description = data[0].product_description;
            product.product_detail = data[0].product_detail;
        }).catch((err) => {
            console.log(err);
        })

        var product_price_query = productQuery.ProductPriceQuery(product_id).then((data) => {
            product.product_price = data[0].product_price;
        }).catch((err) => {
            console.log(err);
        })

        var product_spec_query = productQuery.ProductSpecQuery(product_id).then((data) => {
            //console.log(data.length);
            var index = 0;

            for (var i = 0; i < data.length; i++) {
                product_spec_array[i] = data[i].product_spec;
                product_stock_array[i] = data[i].product_stock;
                /*
                var search_index = 0;
                //排序照片順序
                if(data[i].product_img.indexOf(",",search_index) != -1){
                    while(data[i].product_img.indexOf(",",search_index) != -1)
                    {                                            
                        product_img_array[i+index] = data[i].product_img.slice(search_index,data[i].product_img.indexOf(",",search_index));
                        index = index + 1;
                        search_index = data[i].product_img.indexOf(",",search_index) + 1;
                    }
                    product_img_array[i+index] = data[i].product_img.slice(search_index,data[i].product_img.length);
                    //search_index = data[i].product_img.indexOf(",",search_index) + 1;
                }else{
                    product_img_array[i+index] = data[i].product_img;
                }   */
            }
        }).catch((err) => {
            console.log(err);
        })

        var product_img_query = productQuery.ProductImgQuery(product_id).then((data) => {
            for (var i = 0; i < data.length; i++) {
                product_img_array[i] = data[i].product_img;
            }
            //product.product_img = data[0].product_img;

        }).catch((err) => {
            console.log(err);
        })


        Promise.all([product_name_query, product_description_query, product_price_query, product_spec_query, product_img_query]).then(() => {
            resolve(product);
        }).catch((err) => {
            console.log(`err at promise.all: ${err.message}`);
            reject(`err at promise.all: ${err.message}`);
        })
    })
}

function select_All_product() {
    return new Promise((resolve, reject) => {

        var product_id = [];
        var product_name = [];
        var product_description = [];
        var product_detail = [];
        var product_price = [];
        var product_spec_array = [];
        var product_stock_array = [];
        var product_img_array = [];
        
        var product = {
            product_id: product_id,
            product_name: product_name,
            product_description: product_description,
            product_detail: product_detail,
            product_price: product_price,
            product_spec: product_spec_array,
            product_stock: product_stock_array,
            product_img: product_img_array
        }

        var product_name_query = productQuery.ProductNameQuery().then((data) => {
            for (var i = 0; i < data.length; i++) {
                product_id[i] = data[i].product_id;
                product_name[i] = data[i].product_name;
            }
        }).catch((err) => {
            console.log(err);
        })

        var product_description_query = productQuery.ProductDescriptionQuery().then((data) => {
            for (var i = 0; i < data.length; i++) {
                product_description[i] = data[i].product_description;
                product_detail[i] = data[i].product_detail;
            }
        }).catch((err) => {
            console.log(err);
        })

        var product_price_query = productQuery.ProductPriceQuery().then((data) => {
            for (var i = 0; i < data.length; i++) {
                product_price[i] = data[i].product_price;
            }
        }).catch((err) => {
            console.log(err);
        })

        var product_spec_query = productQuery.ProductSpecQuery().then((data) => {
            //console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                if (product_spec_array[(data[i].product_id)] == null) {
                    product_spec_array[(data[i].product_id)] = data[i].product_spec;
                    product_stock_array[(data[i].product_id)] = data[i].product_stock;
                }
                else {
                    product_spec_array[(data[i].product_id)] = product_spec_array[(data[i].product_id)] + "," + data[i].product_spec;
                    product_stock_array[(data[i].product_id)] = product_stock_array[(data[i].product_id)] + "," + data[i].product_stock;
                }
            }
        }).catch((err) => {
            console.log(err);
        })

        var product_img_query = productQuery.ProductImgQuery().then((data) => {
            for (var i = 0; i < data.length; i++) {
                if (product_img_array[(data[i].product_id)] == null) {
                    product_img_array[(data[i].product_id)] = data[i].product_img;
                }
                else {
                    product_img_array[(data[i].product_id)] += "," + data[i].product_img;
                }
            }
        }).catch((err) => {
            console.log(err);
        })



        Promise.all([product_name_query, product_description_query, product_price_query, product_spec_query, product_img_query]).then(() => {
            resolve(product);
        }).catch((err) => {
            console.log(`err at promise.all: ${err.message}`);
            reject(`err at promise.all: ${err.message}`);
        })
    })
}
function consult(keywords) {
    return new Promise((resolve, reject) => {
        if (keywords == null) keywords = "";
        productQuery.ConsolutProduct(keywords).then((data) => {
            console.log(data);
            var consult_array = [];
            console.log("共幾有   " + data.length + "   筆資料");

            for (var i = 0; i < data.length; i++) {
                //console.log(data[i].product_id);
                /* 
                var result = select_product_id(data[i].product_id);
                result.then((data)=>{
                    //console.log("data:  "+ JSON.stringify(data));
                    
                    consult_array[i] = JSON.stringify(data);
                })*/
                consult_array[i] = select_product_id(data[i].product_id);
            }
            const resultPromiseAll = Promise.all(consult_array);
            resultPromiseAll.then(() => {
                resolve(resultPromiseAll);
            })


        })
    }).catch((err) => {
        console.log("查詢失敗   :" + err);
        reject(err);
    })
}

module.exports =
{
    select_product_id,
    select_All_product,
    consult,
}
