/* что делает это приложение?
1) отправляет на api запрос в формате
https://bibinbot.herokuapp.com/api/searchwork/search?url=https://pp.userapi.com/c637122/v637122468/64c54/hcb8pi75bJc.jpg
и получаем ответ в формате
[
    {
        "title":"Popular Percolation Water-Buy Cheap Percolation Water lots from ...",
        "description":"",
        "image":"https:\/\/encrypted-tbn3.gstatic.com\/images?q=tbn:ANd9GcTxWuf1LUjKC_B3C-XRN_IbZc_HdXZ2P9n_O5sYNRfvjhjI0aPBcgIN",
        "url":"https:\/\/www.aliexpress.com\/popular\/percolation-water.html"
    }
]

выводим список по этому ответу. по клику на любой элемент из этого списка идет переход по внешней ссылке
требуемые модули для этого:
*/
var search = searchModule;

$('#searchButton').click(function() {
    var imgUrl = $('#searchInput').val();

    if (imgUrl.length > 0) {

        search.search(imgUrl);
        
    }
})

document.addEventListener('DOMContentLoaded', function() {

    $( "img" ).bind( "hover", function() {
       console.log(this.attr('src'));
    });
}, false);

