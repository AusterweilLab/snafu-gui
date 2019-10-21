// Grab intrusions from JSON of opening page
var spell_corrected = window.opener.data_properties.spell_corrected;
var listnums = window.opener.data_properties.listnums;
spell_corrected.forEach(function(list, listindex) {
    if (list.length > 0) {
        document.write("<span class='listnum'>Subject " + listnums[listindex][0] + ", List " + listnums[listindex][1] + "</span>");
    }
    list.forEach(function(item) {
        document.write(item[0] + " &rarr; " + item[1] + "<br>");
    });
});
