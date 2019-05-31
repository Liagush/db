

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
