

// модуль добавления новых категорий
function switchOnAddNewCategoryProduct() {

    $('.dropdown').find('input').removeAttr('value');
    $('.dropdown').find('span').text('выберите категорию');
    // удаляем класс active и имя category у выбранных элементов формы
    $(".active").removeClass("active");
    $('.dropdown').find('input').removeAttr("name");

    // добавляем класс active и имя category к выбранным элементам формы
    addNewCategory[0].classList.add("active");
    var addName = addNewCategory[0].getElementsByTagName("input");
    addName[0].setAttribute("name","categoryName");
}

// модуль выбора категории из списка
function switchOnListCategoryProduct() {

    // удаляем класс active и имя category у выбранных элементов формы
    $(".active").removeClass("active");
    $(".addNewCategory #categoryName").removeAttr("name");

    // добавляем класс active и имя category к выбранным элементам формы
    listCategory[0].classList.add("active");
    var addName = $('.dropdown').find('input');
    addName[0].setAttribute("name","categoryId");
}


