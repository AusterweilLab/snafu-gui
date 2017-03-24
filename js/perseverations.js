// Grab perseverations from JSON of opening page
var perseverations = window.opener.data_properties.perseverations;
perseverations.forEach(function(list, listindex) {
    if (list.length > 0) {
        document.write("<span class='listnum'>List "+listindex+"</span>");
    }
    list.forEach(function(item) {
        document.write(item + "<br>");
    });
});
