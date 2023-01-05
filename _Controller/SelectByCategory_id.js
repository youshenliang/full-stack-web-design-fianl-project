const categoryQuery = require('./categoryQuery.js');

function SelectCateByProduct_id(product_id) {
    return new Promise((resolve, reject) => {
        
        var categoryArray = categoryQuery.CategoryNameByProduct_IdQuery(product_id).then((data) => {            
            resolve(data);
        }).catch((err) => {
            console.log(err);
            reject("err:    "+err);
        })    
    })
}
function SelectLastCate(product_id) {
    return new Promise((resolve, reject) => {
        
        var categoryArray = categoryQuery.CategoryLastQuery().then((data) => {            
            resolve(data);
        }).catch((err) => {
            console.log(err);
            reject("err:    "+err);
        })    
    })
}

function CreateNewCate(category_name,parent_category_id) {
    return new Promise((resolve, reject) => {        
        var CreateCate = categoryQuery.NewCategory(category_name,parent_category_id).then((data) => {
            resolve("新增成功");
        }).catch((err) => {
            console.log(err);
            reject("err:    "+err);
        })    
    })
}

function SelectAllCategory() {
    return new Promise((resolve, reject) => {
        
        var categoryArray = categoryQuery.CategoryNameAll().then((data) => {
            var category_id_Array = [];
            var categoryname_Array = [];
            var parent_category_id_Array = [];
            var category = {
                category_id:        category_id_Array,
                category_name:      categoryname_Array,
                parent_category_id: parent_category_id_Array
            }
            var index ;
            for(var i = 0; i<data.length; i++)
            {                
                index = Number(data[i].category_id);
                category_id_Array[index-1] = data[i].category_id;
                categoryname_Array[index-1] = data[i].category_name;
                parent_category_id_Array[index-1] = data[i].parent_category_id;
            }
            resolve(category);
        }).catch((err) => {
            console.log(err);
            reject("err:    "+err);
        })

    
    })
}
module.exports = 
{
    SelectAllCategory,
    SelectCateByProduct_id,
    SelectLastCate,
    CreateNewCate
}
/*
var a = SelectByProduct_id(1);

a.then((data) => {
    //console.log(data);
  });*/