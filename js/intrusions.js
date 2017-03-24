// Grab intrusions from JSON of opening page
var intrusions = window.opener.data_properties.intrusions;
intrusions.forEach(function(list, listindex) {
    if (list.length > 0) {
        document.write("<span class='listnum'>List "+listindex+"</span>");
    }
    list.forEach(function(item) {
        document.write(item + "<br>");
    });
});
