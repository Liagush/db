
var wrapped = document.getElementById("editLaw");
var br = document.createElement("br");
var listCategory = document.getElementsByClassName("listCategory");
var addNewCategory = document.getElementsByClassName("addNewCategory");
var productEditList = document.getElementsByClassName("productEditList");


// Модуль парсинга CSV файлов и вывода на страницу всего списка товаров
const input = document.querySelector('input[type = "file"]');
const reader = new FileReader();
reader.onload = function() {
    reader.readAsText(input.files[0]);
}

function readListProduct() {
    Papa.parse(input.files[0], {
        skipEmptyLines: true,
        complete: function(results) {
                //console.log(results.data);
                loadListProducts(results.data);
        }
    });
}

// модуль добавления продуктов по одной позиции
function addOneProduct() {
    var inputVendorCode = document.createElement("input");
    var inputProductName = document.createElement("input");
    var div = document.createElement("div");
    inputVendorCode.setAttribute("class", "vendorCode");
    inputProductName.setAttribute("class", "productName");
    inputVendorCode.setAttribute("name", "vendorCode");
    inputProductName.setAttribute("name", "productName");

    var addOneProduct = document.getElementsByClassName("addOneProduct");
    div.appendChild(inputVendorCode);
    div.appendChild(inputProductName);
    deleteButton(div);
    addOneProduct[0].appendChild(div);
}

// Модуль добавления кнопки построчного удаления
function deleteButton(div) {
    var deleteProductButton = document.createElement("input");
    deleteProductButton.setAttribute("class", "deleteProductButton");
    deleteProductButton.setAttribute("name", "deleteProductButton");
    deleteProductButton.setAttribute("type", "button");
    deleteProductButton.setAttribute("value", "Удалить строку");
    deleteProductButton.onclick = deleteOneProduct;
    div.appendChild(deleteProductButton);
}

// Модуль удаления продуктов по одной позиции
function deleteOneProduct(event) {

    $(this).parent().remove();

}

//модуль загрузки из CSV
function loadListProducts(data) {
    for (var i=0; i < data.length; i++) {
        var div = document.createElement("div");
        productEditList[0].appendChild(div);

        for (var g=0; g < data[i].length; g++) {
            console.log(data[i][g]);
            switch (g) {
                case 0:
                    var input = document.createElement("input");
                    input.setAttribute("name", "vendorCode");
                    input.setAttribute("value", data[i][g]);
                    div.appendChild(input);
                    break;
                case 1:
                    var input = document.createElement("input");
                    input.setAttribute("name", "productName");
                    input.setAttribute("value", data[i][g]);
                    div.appendChild(input);
                    break;
                default:
                    //alert( 'В файле должно быть только два столбца: Артикул и Наименование товара.' );
                    break;
            }
        }

        deleteButton(div);
    }
}

// Парсинг Papa parse на JQuery
// function readListProduct() {
//     $('input[type=file]').parse({
//         config: {
//             complete: function(results, file) {
//                 console.log("This file done:", file, results);
//             }
//         },
//             complete: function() {
//                 console.log("All files done!");
//         }
//     });
// }
