var wrapped = document.getElementById("editLaw");
var g = 1;

// Модуль добавления существующих законов
// выбор главы закона из выпадающего списка
function chapterOfLawSelection() {

    var lawsFormContainer = document.createElement("div");
    var divCommonInner = document.createElement("div");
    var divForSelectWithButton = document.createElement("div");
    var divDropdown = document.createElement("div");
    var divSelect = document.createElement("div");
    var span = document.createElement("span");
    var i = document.createElement("i");
    var inputChapterLawSelect = document.createElement("input");
    var ulDropdownMenu = document.createElement("ul");
    //var liLawOption = document.createElement("li");

    lawsFormContainer.setAttribute("class", "lawsFormContainer between-space");
    lawsFormContainer.setAttribute("name", "lawsFormContainer");

    divCommonInner.setAttribute("name", "divSelect");

    divDropdown.setAttribute("class", "dropdown");

    divSelect.setAttribute("class", "select");

    //span.textContent("выберите главу");
    //span.innerText("выберите главу");
    span.innerHTML = 'выберите главу';


    i.setAttribute("class", "fa fa-chevron-left");

    inputChapterLawSelect.setAttribute("name", "chapterLawSelect");
    inputChapterLawSelect.setAttribute("type", "hidden");
    // inputChapterLawSelect.onchange = articleOfLawSelection;

    ulDropdownMenu.setAttribute("class", "dropdown-menu");


    divSelect.appendChild(span);
    divSelect.appendChild(i);
    //ulDropdownMenu.appendChild(liLawOption);
    divDropdown.appendChild(divSelect);
    divDropdown.appendChild(inputChapterLawSelect);
    divDropdown.appendChild(ulDropdownMenu);
    divForSelectWithButton.appendChild(divDropdown);
    deleteLawButtonFromDB(divForSelectWithButton);
    divCommonInner.appendChild(divForSelectWithButton);
    lawsFormContainer.appendChild(divCommonInner);
    wrapped.appendChild(lawsFormContainer);

    $.get( "/getlistchapterlaw", function(data) {
        for(var i = 0; i < data.length; i++ ) {
            var liLawOption = document.createElement("li");
            liLawOption.setAttribute("id", data[i].id);
            liLawOption.innerHTML = data[i].chapter;
            ulDropdownMenu.appendChild(liLawOption);
            //$(lawsFormContainer).find(".dropdown-menu").append($("<ul/>").val(data[i].id).text(data[i].chapter));
            liLawOption.onclick = onclickLi;
            liLawOption.onclick = articleOfLawSelection;
        }
    }, "json" );

    dropdownAddClick();



    // var div = document.createElement("div");
    // if($('select[name=chapterLawSelect]').length > 0){
    //     div.setAttribute("name", "lawsFormContainer" + g);
    //     g = g + 1;
    // } else {
    //     div.setAttribute("name", "lawsFormContainer");
    // }

    // var elementSelect = document.createElement("select");
    // var divSelect = document.createElement("div");

    // elementSelect.setAttribute("name", "chapterLawSelect");
    // elementSelect.onchange = articleOfLawSelection;
    // divSelect.setAttribute("name", "divSelect");
    // divSelect.appendChild(elementSelect);
    // div.appendChild(divSelect);
    // deleteLawButton(div);

    // $(div).find("select[name=chapterLawSelect]").append($('<option selected></option>').val('').text(' -- выберите главу -- '));


    // $.get( "/getlistchapterlaw", function(data) {
    //     for(var i = 0; i < data.length; i++ ) {
    //         $(div).find("select[name=chapterLawSelect]").append($("<option/>").val(data[i].id).text(data[i].chapter));
    //     }
    // }, "json" );

    // wrapped.appendChild(div);
}

// Выбор статьи закона из выпадающего списка
function articleOfLawSelection(event) {

    var parentSelect = $(this).parent().parent().parent().parent();

    if($(parentSelect).find('div[name=articleLawSelect]').length == false) {

        var divDropdown = document.createElement("div");
        var divSelect = document.createElement("div");
        var span = document.createElement("span");
        var i = document.createElement("i");
        var inputArticleLawSelect = document.createElement("input");
        var ulDropdownMenu = document.createElement("ul");


        divDropdown.setAttribute("class", "dropdown");

        divSelect.setAttribute("class", "select");

        span.innerHTML = 'выберите статью';

        i.setAttribute("class", "fa fa-chevron-left");

        inputArticleLawSelect.setAttribute("name", "articleLawSelect");
        inputArticleLawSelect.setAttribute("type", "hidden");

        ulDropdownMenu.setAttribute("class", "dropdown-menu");


        divSelect.appendChild(span);
        divSelect.appendChild(i);
        divDropdown.appendChild(divSelect);
        divDropdown.appendChild(inputArticleLawSelect);
        divDropdown.appendChild(ulDropdownMenu);

        dropdownAddClick();

    } else {
        // $(parentSelect).find('div[name=articleLawSelect]').empty();
    }

    var chapterLaw = $(parentSelect).find('input[name=chapterLawSelect]').val();

    $.get( "/getlistarticlelaw", {chapterLawSelect: chapterLaw}, function(data) {
        for(var i = 0; i < data.length; i++ ) {
            var liArticleOption = document.createElement("li");
            liArticleOption.setAttribute("id", data[i].id);
            liArticleOption.innerHTML = data[i].article;
            ulDropdownMenu.appendChild(liArticleOption);
            liArticleOption.onclick = onclickLi;
            liArticleOption.onclick = textOfTheLawOutput;
        }
    }, "json" );




    // var parentSelect = $(this).parent();
    //
    // if($(parentSelect).find('select[name=articleLawSelect]').length == false) {
    //     var elementSelect = document.createElement("select");
    //     elementSelect.setAttribute("name", "articleLawSelect");
    //     elementSelect.onchange = textOfTheLawOutput;
    //     $(parentSelect).append(elementSelect);
    // } else {
    //     $(parentSelect).find('select[name=articleLawSelect]').empty();
    // }
    //
    // $(parentSelect).find("select[name=articleLawSelect]").append($('<option selected></option>').val('').text(' -- выберите статью -- '));
    //
    //
    //
    // var chapterLaw = $(parentSelect).find('select[name=chapterLawSelect] option:selected').val();
    //
    // $.get( "/getlistarticlelaw", {chapterLawSelect: chapterLaw}, function(data) {
    //     for(var i = 0; i < data.length; i++ ) {
    //         $(parentSelect).find("select[name=articleLawSelect]").append($("<option/>").val(data[i].id).text(data[i].article));
    //     }
    // }, "json" );
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

    var lawsFormContainer = document.createElement("div");
    var div = document.createElement("div");
    var chapterOfLaw = document.createElement("input");
    var articleOfTheLaw = document.createElement("input");
    var textOfTheLaw = document.createElement("textarea");


    lawsFormContainer.setAttribute("name", "newLawForm");
    lawsFormContainer.setAttribute("class", "lawsFormContainer between-space");

    chapterOfLaw.setAttribute("name", "chapterOfLaw");
    chapterOfLaw.setAttribute("placeholder", "Глава закона");

    articleOfTheLaw.setAttribute("name", "articleOfTheLaw");
    articleOfTheLaw.setAttribute("placeholder", "Статья закона");

    textOfTheLaw.setAttribute("name", "textOfTheLaw");
    textOfTheLaw.setAttribute("placeholder", "Текст закона");

    div.appendChild(chapterOfLaw);
    div.appendChild(articleOfTheLaw);
    div.appendChild(textOfTheLaw);
    deleteLawButton(div);
    lawsFormContainer.appendChild(div);
    wrapped.appendChild(lawsFormContainer);

}

// Модуль добавления кнопки построчного удаления НОВЫХ законов
function deleteLawButton(div) {

    var deleteButtonLawBox = document.createElement("div");
    var close = document.createElement("a");
    var deleteLawButton = document.createElement("input");

    deleteButtonLawBox.setAttribute("class", "deleteButtonLawBox");
    close.setAttribute("class", "close");
    close.setAttribute("href", "#");
    deleteLawButton.setAttribute("class", "deleteLawButton");
    deleteLawButton.setAttribute("name", "deleteLawButton");
    deleteLawButton.setAttribute("type", "button");

    deleteButtonLawBox.onclick = deleteOneLaw;
    deleteButtonLawBox.appendChild(close);
    deleteButtonLawBox.appendChild(deleteLawButton);
    div.appendChild(deleteButtonLawBox);

}

// Модуль добавления кнопки построчного удаления СУЩЕСТВУЮЩИХ законов
function deleteLawButtonFromDB(div) {

    var deleteButtonLawBox = document.createElement("div");
    var close = document.createElement("a");
    var deleteLawButton = document.createElement("input");

    deleteButtonLawBox.setAttribute("class", "deleteButtonLawBox");
    close.setAttribute("class", "close");
    close.setAttribute("href", "#");
    deleteLawButton.setAttribute("class", "deleteLawButton");
    deleteLawButton.setAttribute("name", "deleteLawButton");
    deleteLawButton.setAttribute("type", "button");

    deleteButtonLawBox.onclick = deleteOneLawFromDB;
    deleteButtonLawBox.appendChild(close);
    deleteButtonLawBox.appendChild(deleteLawButton);
    div.appendChild(deleteButtonLawBox);

}

// Модуль удаления НОВЫХ законов по одной позиции
function deleteOneLaw(event) {

    $(this).parent().parent().remove();

}

// Модуль удаления СУЩЕСТВУЮЩИХ законов по одной позиции
function deleteOneLawFromDB(event) {

    $(this).parent().parent().parent().remove();

}


// Модуль отображения законов по выбранной категории
function selectChange() {
    $('input[type=text]').each(function(){
        $(this).val('');
    });
    document.getElementById("categoryChoice").submit();
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




// стилизация Select

function dropdownAddClick() {

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


    // $('.dropdown-menu li').click(function () {
    //     var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
    //         msg = '<span class="msg">Hidden input value: ';
    //     $('.msg').html(msg + input + '</span>');
    // });
}

function onclickLi (event) {

    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
}



