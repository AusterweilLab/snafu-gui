// debug
var win = nw.Window.get()
win.showDevTools()

// Launch Python interface
var PythonShell = require('python-shell');
var pyshell = new PythonShell('py/interface.py', { mode: 'text' });

// wrapper to send command but also display loading gif
function pysend(command) {
    command = JSON.stringify(command);
    pyshell.send(command);
    $("#loading").css("visibility","visible");
}

pyshell.on('message', function (message) {
    message = JSON.parse(message);
    console.log("JSON response: ", message);
    messagetype = message.type;
    delete message.type;        // don't store return type in data/network properties
    if (messagetype == "data_properties") {
        delete data_properties.perseverations;      // these two properties may not get overwritten by Object.assign
        delete data_properties.intrusions;
        Object.assign(data_properties, message);
    } else if (messagetype == "network_properties") {
        Object.assign(network_properties, message);
    } else if (messagetype == "list_subjects_and_categories") {
        Object.assign(data_parameters, message);
    } else if (messagetype == "error") {
        alert("Unexpected Error: " + message.msg);
    }
    $("#loading").css("visibility","hidden");
});

function openwindow(loc, params) {
    nw.Window.open("html/"+loc, params);
}
