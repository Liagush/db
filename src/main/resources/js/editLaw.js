var wrapped = document.getElementById("editLaw");

// Модуль добавления существующих законов
function existingLaw() {
    var br = document.createElement("br");
    var elementSelect = document.createElement("select");
    var elementOption = document.createElement("option");
    var div = document.createElement("div");

    elementSelect.setAttribute("name", "chapterLaw");
    elementOption.setAttribute("th:each", "law : ${choiceOfLaw}");
    elementOption.setAttribute("th:value", "${law.id}");
    elementOption.setAttribute("th:text", "law : ${law.lawChapter}");
    elementSelect.onchange = selectChoiceChapterOfLaw;
    div.setAttribute("name", "lawsFormContainer");
    elementSelect.setAttribute("name","choiceOfLaw");
    elementSelect.appendChild(elementOption);
    div.appendChild(elementSelect);
    deleteButton(div);
    wrapped.appendChild(div);
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

// Модуль отображения законов по выбранной категории
function selectChange() {
    var chapterLaw = $('.chapterLaw').val();
    $.get( "/editlawform.php", chapterLaw);
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

// Модуль выбора законов из базы
function choiceChapterOfLaw() {

}

function choiceArticleOfLaw() {

}