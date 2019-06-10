var wrapped = document.getElementById("editLaw");

// Модуль добавления существующих законов
// выбор главы закона из выпадающего списка
function chapterOfLawSelection() {

    var elementSelect = document.createElement("select");
    var elementOption = document.createElement("option");
    var div = document.createElement("div");

    elementSelect.setAttribute("name", "chapterLawSelect");
    elementSelect.onchange = articleOfLawSelection;
    div.setAttribute("name", "lawsFormContainer");
    elementOption.setAttribute("name","chapterLawOption");
    elementSelect.appendChild(elementOption);
    div.appendChild(elementSelect);
    deleteButton(div);
    wrapped.appendChild(div);

    $.get( "/getlistchapterlaw", function( data ) {
        for(var i = 0; i < data.length; i++ ) {
            $(".chapterLawOption")
                .attr("value", data[i].id )
                .text(data[i].chapter);
        }
    }, "json" );
}

// Выбор статьи закона из выпадающего списка
function articleOfLawSelection() {

    var elementSelect = document.createElement("select");
    var elementOption = document.createElement("option");
    var div = document.getElementsByName("lawsFormContainer");

    elementSelect.setAttribute("name", "articleLawSelect");
    elementSelect.onchange = textOfTheLawOutput;
    elementOption.setAttribute("name","articleLawOption");
    elementSelect.appendChild(elementOption);
    div[0].appendChild(elementSelect);

    var articleLaw = $('.articleLawSelect').val();

    $.get( "/getlistarticlelaw", {articleLaw}, function( data ) {
        $(".articleLawOption")
            .attr( value, data.id )
            .text(data.value);
    }, "json" );
}

// Вывод текста закона после выбора статьи закона из выпадающего списка
function textOfTheLawOutput() {

    var br = document.createElement("br");
    var elementParagraph = document.createElement("p");
    var div = document.getElementsByName("lawsFormContainer");

    elementParagraph.setAttribute("name", "textOfTheLaw");
    div[0].appendChild(elementParagraph);
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

// Модуль выбора законов из базы
function choiceChapterOfLaw() {

}

function choiceArticleOfLaw() {

}

// Модуль отображения законов по выбранной категории
function selectChange() {
    $('input[type=text]').each(function(){
        $(this).val('');
    });
    document.getElementById("categoryChoice").submit();
    /*var chapterLaw = $('.chapterLaw').val();
    $.get( "/editlawform.php", chapterLaw);*/
}