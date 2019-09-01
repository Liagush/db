
//$('.expand-block').filter(':first').next().show();

// растягивание блок выдачи поиска lawArticle по контенту
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


// схлопывающиеся блоки
$('.toggle').click(function(e){ toggleFunction($(this)); return false; });

function toggleFunction($this) {

    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
}






//Получить список законов в блоке выдачи поиска product
$('.content-item-button.list-of-law-expand-button').click(function(e){ downloadListOfLaw($(this)); return false; });

function downloadListOfLaw(buttonForAppendListOfLaw) {

    var contentItemProduct = buttonForAppendListOfLaw.parent().parent();

    if (!contentItemProduct.find('.main-toggle-container').length) {

        var mainToggleContainer = document.createElement('div');
        mainToggleContainer.setAttribute('class', 'main-toggle-container');
        var lawsListToggleForProductBlock = document.createElement('ul');
        lawsListToggleForProductBlock.setAttribute('class', 'laws-list-toggle-for-product-block');


        var idProductInput = $(contentItemProduct).find('input[type=hidden]').val();

        $.get("/getlistarticlelawOfReceivedCategory", {idProduct: idProductInput}, function (data) {
            var chapterOfRecivedCategory = new Array();

            for (var i = 0; i < data.length; i++) {
                if (!chapterOfRecivedCategory.includes(data[i].lawChapter.chapter)) {
                    chapterOfRecivedCategory.push(data[i].lawChapter.chapter);
                }
            }

            for (var m = 0; m < chapterOfRecivedCategory.length; m++) {

                // Главный список
                var lawsListToggleChapter = document.createElement('li');
                lawsListToggleChapter.setAttribute('class', 'laws-list-toggle-chapter');
                var aMainList = document.createElement('a');
                aMainList.setAttribute('class', 'toggle');
                aMainList.setAttribute('href', '#');
                var h2 = document.createElement('h2');
                h2.innerHTML = chapterOfRecivedCategory[m];
                var innerMainList = document.createElement('div');
                innerMainList.setAttribute('class', 'inner');

                for (var h = 0; h < data.length; h++) {

                    var x = data[h].lawChapter.chapter;
                    var y = chapterOfRecivedCategory[m];

                    if (x == y) {

                        // Подсписок
                        var lawsListToggleArticle = document.createElement('li');
                        lawsListToggleArticle.setAttribute('class', 'laws-list-toggle-article');
                        var aSecondList = document.createElement('a');
                        aSecondList.setAttribute('class', 'toggle');
                        aSecondList.setAttribute('href', '#');
                        var h5 = document.createElement('h5');
                        h5.innerHTML = data[h].article;
                        var innerSecondList = document.createElement('div');
                        innerSecondList.setAttribute('class', 'inner');
                        var lawsListToggleText = document.createElement('div');
                        lawsListToggleText.setAttribute('class', 'laws-list-toggle-text');


                        var articleLaw = data[h].id;


                        $.get("/getParagraphlaw", {articleLawSelect: articleLaw}, function (dataLawText) {
                            lawsListToggleText.innerHTML = dataLawText.lawText;
                        }, "json");

                        innerSecondList.appendChild(lawsListToggleText);
                        aSecondList.appendChild(h5);
                        lawsListToggleArticle.appendChild(aSecondList);
                        lawsListToggleArticle.appendChild(innerSecondList);
                        innerMainList.appendChild(lawsListToggleArticle);

                        $(aSecondList).click(function (e) {
                            toggleFunction($(this));
                            return false;
                        });

                    }
                }


                aMainList.appendChild(h2);
                lawsListToggleChapter.appendChild(aMainList);
                lawsListToggleChapter.appendChild(innerMainList);
                lawsListToggleForProductBlock.appendChild(lawsListToggleChapter);

                $(aMainList).click(function (e) {
                    toggleFunction($(this));
                    return false;
                });
            }
        }, "json");

        mainToggleContainer.appendChild(lawsListToggleForProductBlock);
        contentItemProduct.append(mainToggleContainer);
    }
}

//////////////////////////////////////////////

    //Получить список законов в блоке выдачи поиска product
    // $('.content-item-button.list-of-law-expand-button').click(function(e){ downloadListOfLaw($(this)); return false; });
    //
    // function downloadListOfLaw(buttonForAppendListOfLaw) {
    //
    //     var contentItemProduct = buttonForAppendListOfLaw.parent().parent();
    //
    //
    //     if (!contentItemProduct.find('.main-toggle-container').length) {
    //
    //         var mainToggleContainer = document.createElement('div');
    //         mainToggleContainer.setAttribute('class', 'main-toggle-container');
    //         var lawsListToggleForProductBlock = document.createElement('ul');
    //         lawsListToggleForProductBlock.setAttribute('class', 'laws-list-toggle-for-product-block');
    //
    //
    //         $.get("/getlistarticlelawOfReceivedCategory", {receivedCategory: recivedCategory}, function (data) {
    //             var chapterOfRecivedCategory = new Array();
    //
    //             for (var i = 0; i < data.length; i++) {
    //                 if (!chapterOfRecivedCategory.includes(data[i].lawChapter)) {
    //                     chapterOfRecivedCategory.push(data[i].lawChapter);
    //                 }
    //             }
    //             for (var m = 0; m < chapterOfRecivedCategory.length; m++) {
    //
    //                 // Главный список
    //                 var lawsListToggleChapter = document.createElement('li');
    //                 lawsListToggleChapter.setAttribute('class', 'laws-list-toggle-chapter');
    //                 var aMainList = document.createElement('a');
    //                 aMainList.setAttribute('class', 'toggle');
    //                 aMainList.setAttribute('href', '#');
    //                 var h2 = document.createElement('h2');
    //                 h2.innerHTML = chapterOfRecivedCategory[m].lawChapter;
    //                 var innerMainList = document.createElement('div');
    //                 innerMainList.setAttribute('class', 'inner');
    //
    //                 for (var h = 0; h < data.length; h++) {
    //
    //                     if (data[h].lawChapter == chapterOfRecivedCategory[i].lawChapter) {
    //
    //                         // Подсписок
    //                         var lawsListToggleArticle = document.createElement('li');
    //                         lawsListToggleArticle.setAttribute('class', 'laws-list-toggle-article');
    //                         var aSecondList = document.createElement('a');
    //                         aSecondList.setAttribute('class', 'toggle');
    //                         aSecondList.setAttribute('href', '#');
    //                         var h5 = document.createElement('h5');
    //                         h5.innerHTML = data[h].article;
    //                         var innerSecondList = document.createElement('div');
    //                         innerSecondList.setAttribute('class', 'inner');
    //                         var lawsListToggleText = document.createElement('div');
    //                         lawsListToggleText.setAttribute('class', 'laws-list-toggle-text');
    //
    //
    //                         var articleLaw = data[h].id;
    //
    //
    //                         $.get("/getParagraphlaw", {articleLawSelect: articleLaw}, function (dataLawText) {
    //                             lawsListToggleText.innerHTML = dataLawText.lawText;
    //                         }, "json");
    //
    //                         innerSecondList.appendChild(lawsListToggleText);
    //                         aSecondList.appendChild(h5);
    //                         lawsListToggleArticle.appendChild(aSecondList);
    //                         lawsListToggleArticle.appendChild(innerSecondList);
    //                         innerMainList.appendChild(lawsListToggleArticle);
    //
    //                         $(aSecondList).click(function (e) {
    //                             toggleFunction($(this));
    //                             return false;
    //                         });
    //
    //                     }
    //                 }
    //
    //                 aMainList.appendChild(h2);
    //                 lawsListToggleChapter.appendChild(aMainList);
    //                 lawsListToggleChapter.appendChild(innerMainList);
    //                 lawsListToggleForProductBlock.appendChild(lawsListToggleChapter);
    //
    //                 $(aMainList).click(function (e) {
    //                     toggleFunction($(this));
    //                     return false;
    //                 });
    //
    //             }
    //         }, "json");
    //
    //         mainToggleContainer.appendChild(lawsListToggleForProductBlock);
    //         contentItemProduct.append(mainToggleContainer);
    //     }
    // }



// Получить список законов в блоке выдачи поиска product
// $('.content-item-button.list-of-law-expand-button').click(function(e){ downloadListOfLaw($(this)); return false; });
//
// function downloadListOfLaw(buttonForAppendListOfLaw) {
//
//     var contentItemProduct = buttonForAppendListOfLaw.parent().parent();
//
//     if(!contentItemProduct.find('.main-toggle-container').length) {
//
//         var mainToggleContainer = document.createElement('div');
//         mainToggleContainer.setAttribute('class', 'main-toggle-container');
//         var lawsListToggleForProductBlock = document.createElement('ul');
//         lawsListToggleForProductBlock.setAttribute('class', 'laws-list-toggle-for-product-block');
//
//
//         $.get( "/getlistchapterlaw", function(data) {
//             for(var i = 0; i < data.length; i++ ) {
//                 // Главный список
//                 var lawsListToggleChapter = document.createElement('li');
//                 lawsListToggleChapter.setAttribute('class', 'laws-list-toggle-chapter');
//                 var aMainList = document.createElement('a');
//                 aMainList.setAttribute('class', 'toggle');
//                 aMainList.setAttribute('href', '#');
//                 // aMainList.setAttribute('href', 'javascript:void(0);');
//                 var h2 = document.createElement('h2');
//                 h2.innerHTML = data[i].chapter;
//                 var innerMainList = document.createElement('div');
//                 innerMainList.setAttribute('class', 'inner');
//
//
//                 var chapterLaw = data[i].id;
//
//                 $.get( "/getlistarticlelaw", {chapterLawSelect: chapterLaw}, function(dataArticle) {
//                     for(var g = 0; g < dataArticle.length; g++ ) {
//                         // Подсписок
//                         var lawsListToggleArticle = document.createElement('li');
//                         lawsListToggleArticle.setAttribute('class', 'laws-list-toggle-article');
//                         var aSecondList = document.createElement('a');
//                         aSecondList.setAttribute('class', 'toggle');
//                         // aSecondList.setAttribute('href', 'javascript:void(0);');
//                         aSecondList.setAttribute('href', '#');
//                         var h5 = document.createElement('h5');
//                         h5.innerHTML = dataArticle[g].article;
//                         var innerSecondList = document.createElement('div');
//                         innerSecondList.setAttribute('class', 'inner');
//                         var lawsListToggleText = document.createElement('div');
//                         lawsListToggleText.setAttribute('class', 'laws-list-toggle-text');
//
//
//                         var articleLaw = dataArticle[g].id;
//
//                         $.get( "/getParagraphlaw", {articleLawSelect: articleLaw}, function(dataLawText) {
//                             lawsListToggleText.innerHTML = dataLawText.lawText;
//                         }, "json" );
//
//                         innerSecondList.appendChild(lawsListToggleText);
//                         aSecondList.appendChild(h5);
//                         lawsListToggleArticle.appendChild(aSecondList);
//                         lawsListToggleArticle.appendChild(innerSecondList);
//                         innerMainList.appendChild(lawsListToggleArticle);
//
//                         $(aSecondList).click(function(e){ toggleFunction($(this)); return false; });
//                     }
//                 }, "json" );
//
//                 aMainList.appendChild(h2);
//                 lawsListToggleChapter.appendChild(aMainList);
//                 lawsListToggleChapter.appendChild(innerMainList);
//                 lawsListToggleForProductBlock.appendChild(lawsListToggleChapter);
//
//                 $(aMainList).click(function(e){ toggleFunction($(this)); return false; });
//             }
//         }, "json" );
//
//         mainToggleContainer.appendChild(lawsListToggleForProductBlock);
//         contentItemProduct.append(mainToggleContainer);
//     }
// }