// Grab perseverations from JSON of opening page
var perseverations = window.opener.data_properties.perseverations;
var listnums = window.opener.data_properties.listnums;

perseverations.forEach(function(list, listindex) {
    if (list.length > 0) {
        document.write("<span class='listnum'>Subject " + listnums[listindex][0] + ", List " + listnums[listindex][1] + "</span>");
    }
    list.forEach(function(item) {
        document.write(item + "<br>");
    });
});

