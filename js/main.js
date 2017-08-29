$(document).ready(function () {

    var search = '';
    var titles = [];
    var texts = [];
    var links = [];
    var languages = ['en', 'hr', 'de', 'es', 'fr', 'zh', 'ru', 'pt', 'it'];

    for(var i = 0; i < languages.length; i++) {
        var html = "<option value='" + languages[i] + "'>" + languages[i].toUpperCase() + "</option>";
        $('#languageMenu').append(html);
    }

    $("#searchButton").click(function () {
        search = document.querySelector('#searchTerm').value;
        language = document.querySelector('#languageMenu').value;

        $.ajax({
            type: "GET",
            url: "https://cors-anywhere.herokuapp.com/https://"+ language +".wikipedia.org/w/api.php?action=opensearch&format=json&search=" + search,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                $("#content").empty();
                titles = data[1].map(function (x) {
                    return x;
                });
                texts = data[2].map(function (x) {
                    return x;
                });
                links = data[3].map(function (x) {
                    return x;
                });
            },
            error: function (errorMessage) {}
        });

        for (var index = 0; index < titles.length; index++) {
            var html = "<div class='content" + index + "'><h3 class='title" + index + "'><a href='" + links[index] + "' target='_blank'>" + titles[index] + "</a></h3>" +
                "<p class='paragraph" + index + "'>" + texts[index] + "</p></div>";
            $('#content').append(html);
        }

        return false;
    });
});
