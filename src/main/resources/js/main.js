// Схлопывающиеся блоки

//$('.expand-block').filter(':first').next().show();

$('.content-item-button.expand-button').click(function(e) {
    e.preventDefault();

    var contentItemText = $(this).parent().parent().find('.content-item-text-snippet');
    var expandButton = $(this).parent().parent().find('.content-item-button.expand-button');

    if (contentItemText.hasClass('expend-block')) {
        contentItemText.removeClass('expend-block');


        setTimeout(function () {
            expandButton.text('развернуть');
        }, 1000);

    } else {
        contentItemText.addClass('expend-block');
        setTimeout(function () {
            expandButton.text('свернуть');
        }, 1000);
    }
});