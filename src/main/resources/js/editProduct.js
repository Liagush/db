
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
    var divBetweenSpace = document.createElement("div");
    divBetweenSpace.setAttribute("class", "between-space");
    var inputVendorCode = document.createElement("input");
    var inputProductName = document.createElement("input");
    var div = document.createElement("div");
    inputVendorCode.setAttribute("class", "vendorCode");
    inputVendorCode.setAttribute("type", "text");
    inputVendorCode.setAttribute("name", "vendorCode");
    inputVendorCode.setAttribute("class", "vendor-code input-text-auto-width");
    inputProductName.setAttribute("class", "productName");
    inputProductName.setAttribute("type", "text");
    inputProductName.setAttribute("name", "productName");
    inputProductName.setAttribute("class", "product-name input-text-auto-width");


    var addOneProduct = document.getElementsByClassName("addOneProduct");
    div.appendChild(inputVendorCode);
    div.appendChild(inputProductName);
    deleteButton(div);
    divBetweenSpace.appendChild(div);
    addOneProduct[0].appendChild(divBetweenSpace);

    autoWidtInput();
}

// Модуль добавления кнопки построчного удаления
function deleteButton(div) {
    var deleteProductButton = document.createElement("input");
    deleteProductButton.setAttribute("class", "deleteProductButton");
    deleteProductButton.setAttribute("name", "deleteProductButton");
    deleteProductButton.setAttribute("type", "button");
    var deleteProductButtonBox = document.createElement("div");
    deleteProductButtonBox.setAttribute("class", "deleteProductButtonBox");
    var a = document.createElement("a");
    a.setAttribute("class", "close");
    a.setAttribute("href", "#");
    a.onclick = deleteOneProduct;
    deleteProductButtonBox.appendChild(a);
    deleteProductButtonBox.appendChild(deleteProductButton);
    div.appendChild(deleteProductButtonBox);
}

// Модуль удаления продуктов по одной позиции
function deleteOneProduct(event) {

    $(this).parent().parent().parent().remove();

}

//модуль загрузки из CSV
function loadListProducts(data) {
    for (var i=0; i < data.length; i++) {
        var divBetweenSpace = document.createElement("div");
        divBetweenSpace.setAttribute("class", "between-space");
        productEditList[0].appendChild(divBetweenSpace);
        var div = document.createElement("div");
        divBetweenSpace.appendChild(div);

        for (var g=0; g < data[i].length; g++) {
            console.log(data[i][g]);
            switch (g) {
                case 0:
                    var input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("class", "vendor-code input-text-auto-width");
                    input.setAttribute("name", "vendorCode");
                    input.setAttribute("value", data[i][g]);
                    div.appendChild(input);
                    break;
                case 1:
                    var input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("class", "product-name input-text-auto-width");
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
    autoWidtInput();
}


// Схлопывающиеся блоки

$('.toggle').filter(':first').next().show();

$('.toggle').click(function(e) {
    e.preventDefault();

    var $this = $(this);

    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
});



// делаем ширину input по тексту
function autoWidtInput() {

    var inputAutoWidth = document.getElementsByClassName('input-text-auto-width'); // get the input element
    for (var i = 0; i < inputAutoWidth.length; i++) {
        inputAutoWidth[i].addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
        resizeInput.call(inputAutoWidth[i]); // immediately call the function

        function resizeInput() {

            this.style.width = this.value.length + 'ch';
            allInputAutoWidth();
        }

    }

    function allInputAutoWidth() {

        var maxWidthVendorCode = Math.max.apply(Math, $('.vendor-code').map(function(){
            return $(this).val().length;
        }).get());

        var d = $(".vendor-code");
        for (var j = 0; j < d.length; j++) {
            if(maxWidthVendorCode < 3){
                maxWidthVendorCode = 3
                d[j].style.width = maxWidthVendorCode + 4 + 'ch';
            } else {
                d[j].style.width = maxWidthVendorCode + 4 + 'ch';
            }

        }

        var maxWidthProductName = Math.max.apply(Math, $('.product-name').map(function(){
            return $(this).val().length;
        }).get());

        var g = $(".product-name");
        for (var m = 0; m < g.length; m++) {
            if(maxWidthProductName < 15){
                maxWidthProductName = 15
                g[m].style.width = maxWidthProductName + 2 + 'ch';
            } else {
                g[m].style.width = maxWidthProductName + 2 + 'ch';
            }
        }
    }
}

autoWidtInput();


// Изменение label при выборе файла

var inputAutoWidth = document.getElementsByClassName('file_inp');

$(document).ready( function() {
    $(".file_inp input[type=file]").change(function(){
        var filename = $(this).val().replace(/.*\\/, "");
        if(filename==''){
            $(this).next().text('Выберите файл');
        }else{
            $(this).next().text(filename);
        }
    });
});



// стилизация Select

/*Dropdown Menu*/
$('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});
/*End Dropdown Menu*/


$('.dropdown-menu li').click(function () {
    var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
        msg = '<span class="msg">Hidden input value: ';
    $('.msg').html(msg + input + '</span>');
});



function addDeleteProductRowButton () {
    var $this = $('.deleteProductRowButton');
    if (!$this.hasClass('show')) {
        $this.toggleClass('show');
        $this.slideDown(350);
    }
}

function delDeleteProductRowButton() {
    var $this = $('.deleteProductRowButton');
    if ($this.hasClass('show')) {
        $this.removeClass('show');
        $this.slideUp(350);
    }
}


// устанавливает все значения чекбоксов в списке продуктов из базы в значение true или false
// по нажатию на главный чекбокс в заголовке таблицы
// так же добавляет и убирает кнопку добавления выбранных продуктов
$('.checkbox-circle-input.mainCheckboxOfProductList').change(function() {
    if(this.checked) {
        $('.checkbox-circle-input').prop('checked', true);
        if(!$('.deleteProductRowButton').hasClass('show')) {
            addDeleteProductRowButton();
        }

    } else {
        $('.checkbox-circle-input').prop('checked', false);
        delDeleteProductRowButton();
    }
});


// устанавливает значение главного чекбокса в заголовке таблицы в false
// если из всех продуктов из списка снимается выделение хотя бы одного из них
$('.checkbox-circle-input').change(function() {
    var chekProduct = this;
    if($('.checkbox-circle-input.mainCheckboxOfProductList').prop("checked")) {
        if(!chekProduct.checked) {
            $('.checkbox-circle-input.mainCheckboxOfProductList').prop('checked', false);
        }
    }
});


// проверяет есть ли выбранные строки продуктов для удаления и добавляет кнопку удаления
// и наоборот если нет выбранных чекбоксов то убирает кнопку удаления из формы
$('.checkbox-circle-input').change(function() {
    if(this.checked) {
        if(!$('.deleteProductRowButton').hasClass('show')) {
            addDeleteProductRowButton();
        }
    } else {
        var checkboxChecked = 0;
        $('.checkbox-circle-input').each(function( index ) {
            if ($(this).prop('checked')){
                checkboxChecked = 1;
            }
        });

        if (checkboxChecked == 0) {
            if($('.deleteProductRowButton').hasClass('show')) {
                delDeleteProductRowButton();
            }
        }

    }
});


// function addDeleteProductRowButton () {
//     var deleteProductRowButton = document.createElement('input');
//     deleteProductRowButton.setAttribute('class', 'deleteProductRowButton');
//     deleteProductRowButton.setAttribute('type', 'submit');
//     deleteProductRowButton.setAttribute('formaction', 'deleteProductRow');
//     deleteProductRowButton.setAttribute('value', 'удалить выбранные строки');
//     $('.productlListForm').prepend(deleteProductRowButton);
// }
//
// function delDeleteProductRowButton() {
//     $('.deleteProductRowButton').remove();
// }


// устанавливает все значения чекбоксов в списке продуктов из базы в значение true или false
// по нажатию на главный чекбокс в заголовке таблицы
// так же добавляет и убирает кнопку добавления выбранных продуктов
// $('.checkbox-circle-input.mainCheckboxOfProductList').change(function() {
//     if(this.checked) {
//         $('.checkbox-circle-input').prop('checked', true);
//         if(!$('.deleteProductRowButton').length) {
//             addDeleteProductRowButton();
//         }
//
//     } else {
//         $('.checkbox-circle-input').prop('checked', false);
//         delDeleteProductRowButton();
//     }
// });
//
//
// // устанавливает значение главного чекбокса в заголовке таблицы в false
// // если из всех продуктов из списка снимается выделение хотя бы одного из них
// $('.checkbox-circle-input').change(function() {
//     var chekProduct = this;
//     if($('.checkbox-circle-input.mainCheckboxOfProductList').prop("checked")) {
//         if(!chekProduct.checked) {
//             $('.checkbox-circle-input.mainCheckboxOfProductList').prop('checked', false);
//         }
//     }
// });
//
//
// // проверяет есть ли выбранные строки продуктов для удаления и добавляет кнопку удаления
// // и наоборот если нет выбранных чекбоксов то убирает кнопку удаления из формы
// $('.checkbox-circle-input').change(function() {
//     if(this.checked) {
//         if(!$('.deleteProductRowButton').length) {
//             addDeleteProductRowButton();
//         }
//     } else {
//         var checkboxChecked = 0;
//         $('.checkbox-circle-input').each(function( index ) {
//             if ($(this).prop('checked')){
//                 checkboxChecked = 1;
//             }
//         });
//
//         if (checkboxChecked == 0) {
//             if($('.deleteProductRowButton').length) {
//                 delDeleteProductRowButton();
//             }
//         }
//
//     }
// });








