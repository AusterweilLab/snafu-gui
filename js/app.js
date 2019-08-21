var snafu_type = "nwjs-py";  // This is important! Are you using "nwjs-py" (Python scripts), "nwjs-app" (compiled for Mac), or "nwjs-win" (compiled for Windows)?
var debug_mode = 0;           // only applies to nwjs-py version only


// Takes JSON message send back from Python and inserts it into the model
function pyreplace(message) {
    console.log("JSON response: ", message);
    message = JSON.parse(message);
    messagetype = message.type;
    delete message.type;        // don't store return type in data/network properties
    if (messagetype == "directory_listing") {
        Object.assign(data_parameters, message);
    } else if (messagetype == "write_data") {
        window.open(message.filename);
    } else if (messagetype == "data_properties") {
        delete data_properties.perseverations;      // reset these two properties (they may not get overwritten)
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
}

// debug?
if (debug_mode) {
    var win = nw.Window.get();
    win.showDevTools();
}

// populate spellfiles and schemes. this could be in interface.py to be consistent with web version...
//
// data_parameters['freqfiles'].push("None");
// data_parameters['aoafiles'].push("None");
data_parameters['spellfiles'].push("None");
data_parameters['semantic_cluster_schemes'].push("None");

const fs = require('fs');
fs.readdirSync('spellfiles/').forEach(file => {
    if (file.search(".csv") >= 0) {
        data_parameters['spellfiles'].push(file.substr(0,file.search(".csv")).replace(/\_/g," "));
    }
})
fs.readdirSync('frequency/').forEach(file => {
    if (file.search(".csv") >= 0) {
        data_parameters['freqfiles'].push(file.substr(0,file.search(".csv")).replace(/\_/g," "));
    }
})
fs.readdirSync('aoa/').forEach(file => {
    if (file.search(".csv") >= 0) {
        data_parameters['aoafiles'].push(file.substr(0,file.search(".csv")).replace(/\_/g," "));
    }
})

fs.readdirSync('schemes/').forEach(file => {
    if (file.search(".csv") >= 0) {
        data_parameters['semantic_cluster_schemes'].push(file.substr(0,file.search(".csv")).replace(/\_/g," "));
    }
})

$("#fluency_dir").val(process.cwd() + "/uploads")

// Launch Python interface
if (snafu_type == "nwjs-py") {

    const PythonShell = require('python-shell');
    options  = { mode: 'text',
                 args: ['nwjs-py'] }
    const pyshell = new PythonShell('py/interface.py', options);
    pyshell.on('message', pyreplace);

    // wrapper to send command but also display loading gif
    function pysend(command) {
        command = JSON.stringify(command);
        pyshell.send(command);
        $("#loading").css("visibility","visible");
    }

// Compiled Python version
} else if (snafu_type == "nwjs-app" || snafu_type == "nwjs-win") {
    //var pyapp = require('../js/openinterface');
    //var pyinterface = pyapp.init(console);
   
    var gui = require('nw.gui');
    var win = gui.Window.get();

    var spawn = require('child_process').spawn;
    var pyapp;
    if(snafu_type=="nwjs-app")
        pyapp = spawn('./py/dist/interface.app/Contents/MacOS/interface',['nwjs-app']);
    else
        pyapp = spawn('./py/dist/interface/interface.exe',['nwjs-win']);

    var buffer = ''
    pyapp.stdout.on('data', function(data) {
        buffer += data.toString();
        try {
            message = JSON.parse(buffer);   // make sure json is valid
            pyreplace(buffer);
            buffer = '';                    // reset buffer if valid
            console.log('GOOD' + buffer);
        } catch(err) {
            // incomplete json buffer, wait for more data...
        }
    });
                                                
    pyapp.stdout.on('end', function(data) {
        console.log("END");
    });
                                                
    pyapp.stderr.on('data', function(data) {
        console.log("ERR");
    });

    // quit process when nwsjs quits
    win.on( 'close', function() {
        pysend({'type': 'quit'});   // shutdown python interface to avoid error message on close
        this.close(true);           // actually shut down
    } );

    // wrapper to send command but also display loading gif
    function pysend(command) {
        command = JSON.stringify(command);
        //pyapp.exec(console, pyinterface, command);
        pyapp.stdin.write(command + "\n");
        $("#loading").css("visibility","visible");
    }
    
}

function openwindow(loc, params) {
    nw.Window.open("html/"+loc, params);
}
