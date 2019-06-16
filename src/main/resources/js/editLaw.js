var wrapped = document.getElementById("editLaw");
var g = 1;

// Модуль добавления существующих законов
// выбор главы закона из выпадающего списка
function chapterOfLawSelection() {

    var div = document.createElement("div");
    if($('select[name=chapterLawSelect]').length > 0){
        div.setAttribute("name", "lawsFormContainer" + g);
        g = g + 1;
    } else {
        div.setAttribute("name", "lawsFormContainer");
    }

    // var lastLawsFormContainer = $(this).children().last();
    var elementSelect = document.createElement("select");
    var divSelect = document.createElement("div");

    elementSelect.setAttribute("name", "chapterLawSelect");
    elementSelect.onchange = articleOfLawSelection;
    divSelect.setAttribute("name", "divSelect");
    divSelect.appendChild(elementSelect);
    div.appendChild(divSelect);
    deleteButton(div);

    $(div).find("select[name=chapterLawSelect]").append($('<option selected></option>').val('').text(' -- выберите главу -- '));


    $.get( "/getlistchapterlaw", function(data) {
        for(var i = 0; i < data.length; i++ ) {
            $(div).find("select[name=chapterLawSelect]").append($("<option/>").val(data[i].id).text(data[i].chapter));
        }
    }, "json" );

    wrapped.appendChild(div);
}

// Выбор статьи закона из выпадающего списка
function articleOfLawSelection(event) {
    var parentSelect = $(this).parent();

    if($(parentSelect).find('select[name=articleLawSelect]').length == false) {
        var elementSelect = document.createElement("select");
        elementSelect.setAttribute("name", "articleLawSelect");
        elementSelect.onchange = textOfTheLawOutput;
        $(parentSelect).append(elementSelect);
    } else {
        $(parentSelect).find('select[name=articleLawSelect]').empty();
    }

    $(parentSelect).find("select[name=articleLawSelect]").append($('<option selected></option>').val('').text(' -- выберите статью -- '));



    var chapterLaw = $(parentSelect).find('select[name=chapterLawSelect] option:selected').val();

    $.get( "/getlistarticlelaw", {chapterLawSelect: chapterLaw}, function(data) {
        for(var i = 0; i < data.length; i++ ) {
            $(parentSelect).find("select[name=articleLawSelect]").append($("<option/>").val(data[i].id).text(data[i].article));
        }
    }, "json" );
}

// Вывод текста закона после выбора статьи закона из выпадающего списка
function textOfTheLawOutput(event) {
    var parentParagraph = $(this).parent();

    var br = document.createElement("br");
    var elementParagraph = document.createElement("p");
    elementParagraph.setAttribute("name", "textOfTheLawSelect");

    var articleLaw = $(parentParagraph).find('select[name=articleLawSelect] option:selected').val();
    $(parentParagraph).append(elementParagraph);

    $.get( "/getParagraphlaw", {articleLawSelect: articleLaw}, function(data) {
            $(parentParagraph).find("p[name=textOfTheLawSelect]").text(data.lawText);
    }, "json" );

}

// Модуль отображения законов по выбранной категории
function selectChoiceChapterOfLaw() {
    $('input[name=chapterLaw] option:selected').each(function(){
        $(this).val('');
    });
    document.getElementById("categoryChoice").submit();
}

// Модуль добавления новых законов
function addNewLaw() {

    var div = document.createElement("div");
    var br = document.createElement("br");
    var elementForm = document.createElement("div");
    var inputHeadOfLaw = document.createElement("input");
    var inputArticleOfTheLaw = document.createElement("input");
    var inputTextOfTheLaw = document.createElement("input");

    elementForm.setAttribute("name", "newLawForm");
    inputHeadOfLaw.setAttribute("name", "chapterOfLaw");
    inputHeadOfLaw.setAttribute("placeholder", "Глава закона");
    inputArticleOfTheLaw.setAttribute("name", "articleOfTheLaw");
    inputArticleOfTheLaw.setAttribute("placeholder", "Статья закона");
    inputTextOfTheLaw.setAttribute("name", "textOfTheLaw");
    inputTextOfTheLaw.setAttribute("placeholder", "Текст закона");


    div.appendChild(inputHeadOfLaw);
    div.appendChild(inputArticleOfTheLaw);
    div.appendChild(inputTextOfTheLaw);
    deleteButton(div);
    div.appendChild(br);
    elementForm.appendChild(div);
    wrapped.appendChild(elementForm);
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

// Модуль отображения законов по выбранной категории
function selectChange() {
    $('input[type=text]').each(function(){
        $(this).val('');
    });
    document.getElementById("categoryChoice").submit();
}