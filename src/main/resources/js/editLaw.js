
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

    //$("#productEditing").find(".active").removeClass("active");
    //$("#productEditing").find("").removeClass("active");
    //addNewCategory.classList.add("active");

    // удаляем класс active и имя category у выбранных элементов формы
    var activeDel = document.getElementsByClassName("active");
    activeDel.classList.remove("active");
    var delName = activeDel.getElementsByTagName("select");
    delName.removeAttribute("name");
    //var nameDel = document.getElementsByName("category");

    // добавляем класс active и имя category к выбранным элементам формы
    addNewCategory.classList.add("active");
    var addName = addNewCategory.getElementsByTagName("input");
    addName.setAttribute("name","category");
}

function switchOnListCategoryProduct() {

    // удаляем класс active и имя category у выбранных элементов формы
    var activeDel = document.getElementsByClassName("active");
    activeDel.classList.remove("active");
    var delName = activeDel.getElementsByTagName("input");
    delName.removeAttribute("name");

    // добавляем класс active и имя category к выбранным элементам формы
    listCategory.classList.add("active");
    var addName = addNewCategory.getElementsByTagName("select");
    addName.setAttribute("name","category");
}
