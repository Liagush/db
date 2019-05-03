$(document).ready(function () {

    // Переключение между вкладками авторизации и регистрации
    $(".dws-form").on("click", ".tab", function() {

        // удаляем классы active у всех элементов dws-form
        $(".dws-form").find(".active").removeClass("active");

        console.log($(this).index());

        // Добавляем класс active элементу dws-form по которому совершен клик
        $(this).addClass("active");
        $(".tab-form").eq($(this).index()).addClass("active");
    });
});