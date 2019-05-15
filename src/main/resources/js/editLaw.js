
var wrapped = document.getElementById("editLaw");
var br = document.createElement("br");
var listCategory = document.getElementsByClassName("listCategory");
var addNewCategory = document.getElementsByClassName("addNewCategory");

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
