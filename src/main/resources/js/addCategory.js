

// модуль добавления новых категорий
function switchOnAddNewCategoryProduct() {

    $("option:selected").prop("selected", false);
    // удаляем класс active и имя category у выбранных элементов формы
    $(".active").removeClass("active");
    $("#productEditing.listCategory").removeAttr("name");

    // добавляем класс active и имя category к выбранным элементам формы
    addNewCategory[0].classList.add("active");
    var addName = addNewCategory[0].getElementsByTagName("input");
    addName[0].setAttribute("name","categoryName");
}

// модуль выбора категории из списка
function switchOnListCategoryProduct() {

    // удаляем класс active и имя category у выбранных элементов формы
    $(".active").removeClass("active");
    $("#productEditing.addNewCategory").removeAttr("name");

    // добавляем класс active и имя category к выбранным элементам формы
    listCategory[0].classList.add("active");
    var addName = listCategory[0].getElementsByTagName("select");
    addName[0].setAttribute("name","categoryId");
}

