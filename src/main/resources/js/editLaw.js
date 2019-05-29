
var wrapped = document.getElementById("editLaw");
var br = document.createElement("br");
var listCategory = document.getElementsByClassName("listCategory");
var addNewCategory = document.getElementsByClassName("addNewCategory");
var productEditList = document.getElementsByClassName("productEditList");
var count = 0; // количество элементов input в списке продуктов

// Модуль добавления существующих законов
function existingLaw() {
    var elementSelect = document.createElement("select");
    var elementOption = document.createElement("option");

    elementSelect.setAttribute("name","choiceOfLaw");
    elementSelect.appendChild(elementOption);
    wrapped.appendChild(elementSelect);
}

// Модуль добавления новых законов
function addNewLaw() {

    var elementForm = document.createElement("div");
    var inputHeadOfLaw = document.createElement("input");
    var inputArticleOfTheLaw = document.createElement("input");
    var inputTextOfTheLaw = document.createElement("input");

    elementForm.setAttribute("name", "newLawForm");
    inputHeadOfLaw.setAttribute("name", "headOfLaw");
    inputHeadOfLaw.setAttribute("placeholder", "Глава закона");
    inputArticleOfTheLaw.setAttribute("name", "articleOfTheLaw");
    inputArticleOfTheLaw.setAttribute("placeholder", "Статья закона");
    inputTextOfTheLaw.setAttribute("name", "textOfTheLaw");
    inputTextOfTheLaw.setAttribute("placeholder", "Текст закона");


    elementForm.appendChild(inputHeadOfLaw);
    elementForm.appendChild(br);
    elementForm.appendChild(inputArticleOfTheLaw);
    elementForm.appendChild(br);
    elementForm.appendChild(inputTextOfTheLaw);
    elementForm.appendChild(br);
    wrapped.appendChild(elementForm);
}

// модуль добавления новых категорий
function switchOnAddNewCategoryProduct() {

    // удаляем класс active и имя category у выбранных элементов формы
    $(".active").removeClass("active");
    $("#productEditing.listCategory").removeAttr("name");

    // добавляем класс active и имя category к выбранным элементам формы
    addNewCategory[0].classList.add("active");
    var addName = addNewCategory[0].getElementsByTagName("input");
    addName[0].setAttribute("name","category");
}

function switchOnListCategoryProduct() {

    // удаляем класс active и имя category у выбранных элементов формы
    $(".active").removeClass("active");
    $("#productEditing.addNewCategory").removeAttr("name");

    // добавляем класс active и имя category к выбранным элементам формы
    listCategory[0].classList.add("active");
    var addName = listCategory[0].getElementsByTagName("select");
    addName[0].setAttribute("name","category");
}


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
    var deleteProductButton = document.createElement("input");
    var br = document.createElement("br");
    deleteProductButton.setAttribute("class", "deleteProductButton");
    deleteProductButton.setAttribute("name", "deleteProductButton");
    deleteProductButton.setAttribute("type", "button");
    deleteProductButton.setAttribute("value", "Удалить строку");
    deleteProductButton.setAttribute("onclick", deleteOneProduct);
    inputVendorCode.setAttribute("class", "vendorCode");
    inputProductName.setAttribute("class", "productName");
    inputVendorCode.setAttribute("name", "vendorCode");
    inputProductName.setAttribute("name", "productName");

    // inputVendorCode.setAttribute("id", "input" + String(count = count++));
    // inputProductName.setAttribute("id", "input" + String(count = count++));
    // br.setAttribute("id", "input" + String(count = count++));
    deleteProductButton.setAttribute("id", "input" + String(count = count++));

    var addOneProduct = document.getElementsByClassName("addOneProduct");
    addOneProduct[0].appendChild(inputVendorCode);
    addOneProduct[0].appendChild(inputProductName);
    addOneProduct[0].appendChild(deleteProductButton);
    addOneProduct[0].appendChild(br);
}

// Модуль удаления продуктов по одной позиции
function deleteOneProduct() {

    var Id = this.id
    var deleteProductButton = document.getElementById(Id);
    var inputVendorCode = $(".vendorCode").prev(Id);
    var inputProductName = $(".productName").prev(Id);
    var br = $(".vendorCode").after(Id);

    inputVendorCode.remove();
    inputProductName.remove();
    br.remove();
    deleteProductButton.remove();

}

//модуль загрузки из CSV
function loadListProducts(data) {
    for (var i=0; i < data.length; i++) {
        //console.log(data[i]);
        for (var g=0; g < data[i].length; g++) {
            console.log(data[i][g]);
            switch (g) {
                case 0:
                    var input = document.createElement("input");
                    //input.setAttribute("name", String(i) + String(g));
                    input.setAttribute("name", "vendorCode");
                    input.setAttribute("value", data[i][g]);
                    productEditList[0].appendChild(input);
                    break;
                case 1:
                    var br = document.createElement("br");
                    var input = document.createElement("input");
                    input.setAttribute("name", "productName");
                    input.setAttribute("value", data[i][g]);
                    productEditList[0].appendChild(input);
                    productEditList[0].appendChild(br);
                    break;
                default:
                    //alert( 'В файле должно быть только два столбца: Артикул и Наименование товара.' );
                    break;
            }

        }
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
