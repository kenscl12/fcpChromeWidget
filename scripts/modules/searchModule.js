var searchModule = (function() {
  var results = []; // приватная переменная

    return { // методы доступные извне
        transformToResult: function(searchResult) {
            var html = "";

            $.each(searchResult, function(index, value) {
                html += "<li><a target='blank_' href='" + value.url + "'><img src='" + value.image + "' width=50 height=50 />" + value.title.substr(10 + "...") + "</a></li>";
            }); 

            return html;
        },

        search: function(imgUrl) {
            var url = "https://bibinbot.herokuapp.com/api/searchworkchrome/search";
            url = url + "?url=" + imgUrl;
            
            $.getJSON(url, function(result){
                result = JSON.parse(result);
                $('#results').html(searchModule.transformToResult(result));

                console.log(result);
            }).done(function( data ) {
                console.log(data);
            });

            // $.ajax({
            //     type: 'GET',
            //     url: url,
            //     crossDomain: true,
            //     dataType: "jsonp",
            //     success: function(data) {
                    
            //         // process data
            //     },
            //     complete: function(xhr, status){
            //         console.log(status);
            //         //this.result = JSON.parse(data);
            //     }
            // }).then(function(result){
            //     result = JSON.parse(result);
            //     $('#results').html(searchModule.transformToResult(result));

            //     console.log(result);
            // })
        }
    }
}());