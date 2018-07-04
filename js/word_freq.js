// Grab excluded words from JSON of opening page
var words_excluded = window.opener.data_properties.word_freq_excluded;
words_excluded.forEach(function(list, listindex) {
    if (list.length > 0) {
        document.write("<span class='listnum'>List "+(listindex+1)+"</span>");
    }
    list.forEach(function(item) {
        document.write(item + "<br>");
    });
});
