var wrapped = document.getElementById("editLaw");
var g = 0;

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


    lawsFormContainer.setAttribute("class", "lawsFormContainer between-space");
    lawsFormContainer.setAttribute("name", "lawsFormContainer");
    divCommonInner.setAttribute("name", "divSelect");
    divDropdown.setAttribute("class", "dropdown");
    divSelect.setAttribute("class", "select");
    span.innerHTML = 'выберите главу';
    i.setAttribute("class", "fa fa-chevron-left");
    inputChapterLawSelect.setAttribute("name", "chapterLawSelect");
    inputChapterLawSelect.setAttribute("type", "hidden");
    ulDropdownMenu.setAttribute("class", "dropdown-menu");


    divSelect.appendChild(span);
    divSelect.appendChild(i);
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
            liLawOption.onclick = onclickLi;
        }
    }, "json" );

    dropdownAddClick(divDropdown);

}

// Выбор статьи закона из выпадающего списка
function articleOfLawSelection(li) {

    var parentSelect = li.parent().parent().parent().parent();

    if(!parentSelect.find('input[name=articleLawSelect]').length) {

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


        dropdownAddClick(divDropdown);
        divDropdown.appendChild(divSelect);
        divDropdown.appendChild(inputArticleLawSelect);
        divDropdown.appendChild(ulDropdownMenu);
        $(parentSelect).append(divDropdown);

    } else {

        $(parentSelect).find('input[name=articleLawSelect]').parent().find('ul').empty();
        $(parentSelect).find('input[name=articleLawSelect]').removeAttr('value');
        $(parentSelect).find('input[name=articleLawSelect]').parent().find('span').text('выберите статью');
        $(parentSelect).parent().find('div[name=textOfTheLawSelect]').remove();

    }


    var chapterLaw = parentSelect.find('input[name=chapterLawSelect]').val();

    $.get( "/getlistarticlelaw", {chapterLawSelect: chapterLaw}, function(data) {
        for(var i = 0; i < data.length; i++ ) {
            var liArticleOption = document.createElement("li");
            liArticleOption.setAttribute("id", data[i].id);
            liArticleOption.innerHTML = data[i].article;
            liArticleOption.onclick = onclickLi;
            $(parentSelect).find('input[name=articleLawSelect]').parent().find('ul').append(liArticleOption);
        }
    }, "json" );
}

// Вывод текста закона после выбора статьи закона из выпадающего списка
function textOfTheLawOutput(li) {

    var parentSelect = li.parent().parent().parent().parent();

    if(!parentSelect.find('div[name=textOfTheLawSelect]').length) {

        var divContainer = document.createElement("div");
        divContainer.setAttribute("name", "textOfTheLawSelect");
        divContainer.setAttribute("class", "textOfTheLawSelect");
        $(parentSelect).append(divContainer);

    } else {

        $(parentSelect).find('div[name=textOfTheLawSelect]').empty();

    }


    var articleLaw = parentSelect.find('input[name=articleLawSelect]').val();

    $.get( "/getParagraphlaw", {articleLawSelect: articleLaw}, function(data) {
        parentSelect.find("div[name=textOfTheLawSelect]").text(data.lawText);
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

    // if($('textarea').length > 1) {
    //     g = g + 1;
    //     textOfTheLaw.setAttribute("id", "summernote" + g);
    // } else if ($('textarea').length == 1 && g == 0){
    //     textOfTheLaw.setAttribute("id", "summernote");
    // } else if ($('textarea').length == 1 && g > 0) {
    //     textOfTheLaw.setAttribute("id", "summernote" + g);
    // }


    div.appendChild(chapterOfLaw);
    div.appendChild(articleOfTheLaw);
    div.appendChild(textOfTheLaw);
    deleteLawButton(div);
    lawsFormContainer.appendChild(div);
    wrapped.appendChild(lawsFormContainer);

    if($('textarea').length > 1) {
        g = g + 1;
        textOfTheLaw.setAttribute("id", "summernote" + g);
    } else if ($('textarea').length == 1 && g > 0) {
        textOfTheLaw.setAttribute("id", "summernote" + g);
    }

    if ($('textarea').length == 1 && g == 0) {
        textOfTheLaw.setAttribute("id", "summernote");
    }

    if(g == 0 && $('#summernote')) {
        $('#summernote').summernote();
    } else if (g > 0) {
        $('#summernote' + g).summernote();
    }

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

    var textareaId = $(this).parent().parent().find("textarea").attr('id');
    $(textareaId).summernote('destroy');
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

function dropdownAddClick(divDropdown) {
    /*Dropdown Menu*/
    $(divDropdown).click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $(divDropdown).focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
}

function onclickLi (event) {

    var li = $(this);
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    if (li.parent().parent().find('input').attr('name') == 'chapterLawSelect') {
        articleOfLawSelection(li);
    } else if (li.parent().parent().find('input').attr('name') == 'articleLawSelect') {
        textOfTheLawOutput(li);
    }
}

dropdownAddClick($('#editLaw .dropdown'));
$('#editLaw .dropdown').find("li").click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
})






