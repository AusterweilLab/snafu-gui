// Grab excluded words from JSON of opening page
var words_excluded = window.opener.data_properties.word_freq_excluded;
var listnums = window.opener.data_properties.listnums;
words_excluded.forEach(function(list, listindex) {
    if (list.length > 0) {
        document.write("<span class='listnum'>Subject " + listnums[listindex][0] + ", List " + listnums[listindex][1] + "</span>");
    }
    list.forEach(function(item) {
        document.write(item + "<br>");
    });
});
